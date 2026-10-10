"""Cut Monica out of 05_monica_final.png (polygon trimap + closed-form matting).
Output: build/monica_rgba.png (full 941x1672 canvas, alpha = her matte)."""
import sys, numpy as np, cv2
from PIL import Image, ImageDraw
from pymatting import estimate_alpha_cf
root = sys.argv[1]
im = Image.open(f'{root}/assets/05_monica_final.png').convert('RGB')
W, H = im.size
poly = [(290,330),(305,275),(350,238),(430,226),(520,236),(600,226),(680,240),(760,265),(800,285),
 (870,300),(941,300),(941,722),(885,692),(852,610),(858,690),(872,722),(886,762),(902,820),(906,880),
 (882,906),(850,902),(822,862),(808,820),(812,770),(812,735),(800,700),(790,640),(770,580),(745,525),
 (715,492),(690,502),(640,490),(590,470),(560,452),(520,446),(460,440),(400,446),(340,456),(290,440)]
m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).polygon(poly, fill=255)
m = np.asarray(m)
k = lambda r: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2*r+1, 2*r+1))
fg = cv2.erode(m, k(10)); bg = cv2.dilate(m, k(14))
tri = np.full((H, W), 0.5); tri[fg > 0] = 1; tri[bg == 0] = 0
# keep image borders as solid where polygon touches them (pants run off-canvas)
tri[:, W-14:][m[:, W-14:] > 0] = 1
a = estimate_alpha_cf(np.asarray(im)/255.0, tri)
rgba = np.dstack([np.asarray(im), (np.clip(a, 0, 1)*255).astype('uint8')])
Image.fromarray(rgba, 'RGBA').save(f'{root}/build/monica_rgba.png')
prev = np.asarray(im).astype(float)*0.5 + np.array([0,255,0])*0.5
al = np.clip(a,0,1)[...,None]
Image.fromarray((np.asarray(im)*al + np.array([0,180,0])*(1-al)).astype('uint8')).crop((250,150,941,950)).save(f'{root}/build/monica_preview.png')
