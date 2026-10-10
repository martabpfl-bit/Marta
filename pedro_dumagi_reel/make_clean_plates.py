"""Remove the baked-in ceiling fan from every still (colour-segmented mask + LaMa inpainting).
Writes build/clean_{i}.png at 1080x1920 and build/fanmask_{i}.png."""
import sys, numpy as np, cv2
from PIL import Image
root = sys.argv[1]; names = ['00_pedro_alone','01_black_dog','02_german_shepherd','03_more_dogs','04_all_dogs','05_monica_final']
roi = np.zeros((1672, 941), np.uint8)
# hand-fitted fan footprint (same in all stills): blade 1, blade 2, hub
for poly in ([(55,85),(490,-5),(625,-5),(625,62),(140,222)],
             [(0,395),(125,380),(190,600),(252,762),(338,924),(300,966),(205,1034),(55,1034),(0,720)]):
    cv2.fillPoly(roi, [np.array(poly, np.int32)], 255)
cv2.ellipse(roi, (48,235), (82,205), 0, 0, 360, 255, -1)
lama = None
for i, n in enumerate(names):
    im = np.asarray(Image.open(f'{root}/assets/{n}.png').convert('RGB'))
    hsv = cv2.cvtColor(im, cv2.COLOR_RGB2HSV); h, s, v = hsv[...,0].astype(int), hsv[...,1].astype(int), hsv[...,2].astype(int)
    r, g, b = [im[..., k].astype(int) for k in range(3)]
    keep = cv2.dilate(roi, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (17,17)))
    Image.fromarray(keep).save(f'{root}/build/fanmask_{i}.png')
    if '--maskonly' in sys.argv: continue
    if lama is None:
        from simple_lama_inpainting import SimpleLama; lama = SimpleLama()
    out = np.asarray(lama(Image.fromarray(im), Image.fromarray(keep)))[:1672, :941]
    out = cv2.resize(out, (1080, 1920), interpolation=cv2.INTER_LANCZOS4)
    Image.fromarray(out).save(f'{root}/build/clean_{i}.png')
    print('done', i, flush=True)
