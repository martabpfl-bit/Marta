"""Pedro & Dumagi - Never-Ending Dog Pile. Motion-graphics renderer (NOT generative video).
Usage: render_reel.py ROOT OUT.mp4 [--preview T] [--fps 30] [--range a b]
All stills are used untouched (no face regeneration); motion = fan-blade wipes, camera
impulses, soft local breathing/head-bob warps on dogs (never on Pedro's face) and a
cut-out Monica layer that physically drops in."""
import sys, math, subprocess, numpy as np, cv2
from PIL import Image, ImageDraw

W, H = 1080, 1920
K = W / 941.0                      # source px -> output px
FPS = 30
HUB = (45*K, 235*K)                # fan hub, matches blade baked into stills
REST = -18.0                       # blade angle (deg) that matches baked blades

def load(p): return cv2.resize(np.asarray(Image.open(p).convert('RGB')), (W, H), interpolation=cv2.INTER_LANCZOS4)
def S(root=None): pass

# ---------- timeline (seconds) ----------
# (start, duration, spin_degrees, from_idx, to_idx)
SWEEPS = [(1.6, 0.95, 90, 0, 1), (4.3, 0.85, 90, 1, 2), (6.9, 0.8, 180, 2, 3),
          (9.3, 0.75, 180, 3, 4)]
JUMP_T, LAND_T = 12.2, 12.75       # Monica leaves frame top / lands
FAN_FINAL = (11.6, 1.5, 270)       # fan whirls into the jump
DUR = 18.0
ARRIVALS = [2.55, 5.15, 7.7, 10.05, LAND_T]   # impact moments

# dog / head bump centres (source coords) per still: (cx, cy, radius, phase)
DOGS = {
 0: [],
 1: [(348,780,150,0.0),(170,1180,200,1.2)],
 2: [(336,790,150,0.0),(684,810,150,2.1),(150,1200,190,1.2),(700,1250,200,3.0)],
 3: [(369,765,140,0.0),(684,810,140,2.1),(204,1110,140,4.0),(489,1125,110,0.7),(669,1050,130,5.2)],
 4: [(252,615,120,4.0),(372,765,130,0.0),(732,555,130,5.2),(687,765,140,2.1),(372,1020,110,0.7),
     (822,1020,140,1.5),(642,1185,120,3.3),(237,1365,110,2.6)],
 5: [(165,570,120,4.0),(300,735,130,0.0),(690,610,130,5.2),(630,760,140,2.1),(255,915,110,0.7),
     (780,1020,140,1.5),(585,1140,120,3.3),(210,1125,110,2.6)],
}
PEDRO = {0:(450,570),1:(490,570),2:(456,555),3:(444,555),4:(441,555),5:(435,570)}

def smooth(x): x = min(max(x, 0.0), 1.0); return x*x*(3-2*x)
def ease_out(x): x = min(max(x, 0.0), 1.0); return 1-(1-x)**3

class Reel:
    def __init__(self, root):
        self.imgs = [load(f'{root}/assets/{n}.png') for n in
                     ['00_pedro_alone','01_black_dog','02_german_shepherd','03_more_dogs','04_all_dogs','05_monica_final']]
        m = np.asarray(Image.open(f'{root}/build/monica_rgba.png').convert('RGBA'))
        self.mon = cv2.resize(m, (W, H), interpolation=cv2.INTER_LANCZOS4).astype(np.float32)
        ys, xs = np.mgrid[0:H, 0:W].astype(np.float32)
        self.xs, self.ys = xs, ys
        self.phi = np.degrees(np.arctan2(ys-HUB[1], xs-HUB[0]))
        self.fan_cache = {}
        import os
        mask = (self._fan_once(REST, grow=1.25, solid=True)[..., 3] > 128).astype(np.uint8)*255
        self.clean = []
        for i, im in enumerate(self.imgs):
            p = f'{root}/build/clean_{i}.png'
            if os.path.exists(p): self.clean.append(np.asarray(Image.open(p).convert('RGB')))
            else:
                c = cv2.inpaint(im, mask, 7, cv2.INPAINT_TELEA); Image.fromarray(c).save(p); self.clean.append(c)

    # ----- soft local motion warp for dogs -----
    def layer(self, idx, t, energy, fan_on):
        if fan_on <= 0: return self.warp(idx, t, energy, self.imgs)
        if fan_on >= 1: return self.warp(idx, t, energy, self.clean)
        a = self.warp(idx, t, energy, self.imgs).astype(np.float32); b = self.warp(idx, t, energy, self.clean).astype(np.float32)
        return (a*(1-fan_on) + b*fan_on).astype(np.uint8)

    def warp(self, idx, t, energy, src=None):
        src = self.imgs if src is None else src
        dogs = DOGS[idx]
        if not dogs: return src[idx]
        dx = np.zeros((H, W), np.float32); dy = np.zeros((H, W), np.float32)
        px, py = PEDRO[idx]; px, py = px*K, py*K
        prot = 1 - np.exp(-(((self.xs-px)**2 + (self.ys-py)**2) / (2*(120*K)**2)))
        for (cx, cy, r, ph) in dogs:
            cx, cy, r = cx*K, cy*K, r*K
            ex, ey = self.xs-cx, self.ys-cy
            w = np.exp(-(ex**2+ey**2)/(2*(0.65*r)**2)) * prot
            breath = (0.007 + 0.016*energy) * math.sin(2*math.pi*(0.5+0.9*energy)*t + ph)
            bob = (2.0 + 9.0*energy) * math.sin(2*math.pi*(0.8+2.2*energy)*t + ph*1.7)
            sway = (1.0 + 6.0*energy) * math.sin(2*math.pi*(0.6+1.6*energy)*t + ph*0.9)
            dx += w*(-ex*breath + sway); dy += w*(-ey*breath + bob)
        return cv2.remap(src[idx], self.xs - dx, self.ys - dy, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

    # ----- fan overlay -----
    def fan(self, ang, blur_deg):
        key = (round(ang, 1), round(blur_deg, 1))
        if key in self.fan_cache: return self.fan_cache[key]
        n = 1 if blur_deg < 1 else min(9, 2+int(blur_deg/4))
        acc = np.zeros((H, W, 4), np.float32)
        for i in range(n):
            a = ang - (blur_deg*(i/(n-1)) if n > 1 else 0)
            acc += self._fan_once(a)
        out = acc / n
        if len(self.fan_cache) > 8: self.fan_cache.clear()
        self.fan_cache[key] = out
        return out

    def _fan_once(self, ang, grow=1.0, solid=False):
        ss = 2
        w_, h_ = W//ss, H//ss
        im = Image.new('RGBA', (w_, h_), (0,0,0,0)); d = ImageDraw.Draw(im)
        hx, hy = HUB[0]/ss, HUB[1]/ss; k = K/ss
        for b in range(4):
            a = math.radians(ang + 90*b); ux, uy = math.cos(a), math.sin(a); nx, ny = -uy, ux
            r0, r1 = 40*k, 840*k
            def P(r, w): return (hx+ux*r+nx*w, hy+uy*r+ny*w)
            wa, wb = 58*k*grow, 98*k*grow
            body = [P(r0, wa), P(r1, wb), P(r1+14*k, wb*0.7), P(r1+14*k, -wb*0.7), P(r1, -wb), P(r0, -wa)]
            col = (96, 55, 36, 255) if not solid else (255,255,255,255)
            d.polygon(body, fill=col)
            if not solid:
                for f, c in ((0.62,(112,64,40,255)), (0.30,(122,72,44,255))):   # lighter core = rounded blade
                    d.polygon([P(r0, wa*f), P(r1, wb*f), P(r1, -wb*f*0.6), P(r0, -wa*f*0.6)], fill=c)
                for f in (-0.35, 0.05, 0.45):                                     # wood grain streaks
                    d.line([P(r0*2, wa*f), P(r1*0.97, wb*f)], fill=(78,42,26,255), width=max(1,int(2*k)))
        rx, ry = 78*k, 185*k
        d.ellipse([hx-rx, hy-ry, hx+rx, hy+ry], fill=(30,28,28,255) if not solid else (255,255,255,255))
        if not solid:
            d.ellipse([hx-rx*0.62, hy-ry*0.62, hx+rx*0.62, hy+ry*0.62], fill=(48,46,48,255))
            d.ellipse([hx-rx*0.3, hy-ry*0.3, hx+rx*0.3, hy+ry*0.3], fill=(24,22,24,255))
        return np.asarray(im.resize((W, H), Image.LANCZOS)).astype(np.float32)

    # ----- one frame -----
    def frame(self, t):
        # which still is "current", sweep state
        cur, old, swept, fan_ang, fan_blur, new_zoom, fan_on = 0, None, 0.0, REST, 0.0, 1.0, 0.0
        for (st, du, spin, a, b) in SWEEPS:
            if t >= st: cur = b
            if st <= t < st+du:
                x = (t-st)/du; p = smooth(x); old = a; cur = b
                ang_now = spin*p
                swept = min(ang_now, 90.0)
                fan_ang = REST + ang_now
                fan_blur = abs(spin*(smooth(x+0.02)-smooth(x-0.02)))*0.9
                new_zoom = 1.05 - 0.05*ease_out(x)
                fan_on = min(1.0, x*du/0.14, (1-x)*du/0.14)
        if t >= LAND_T: cur = 5
        elif t >= SWEEPS[-1][0] + SWEEPS[-1][1]: cur = 4
        fs, fd, fspin = FAN_FINAL
        if fs <= t < fs+fd:
            x = (t-fs)/fd; p = smooth(x); fan_ang = REST + fspin*p
            fan_blur = abs(fspin*(smooth(x+0.02)-smooth(x-0.02)))*0.9
            fan_on = min(1.0, x*fd/0.14, (1-x)*fd/0.14)
        # energy of dog motion: arrivals excite everyone briefly; Monica = party
        energy = 0.0
        for at in ARRIVALS:
            if t >= at: energy = max(energy, (0.9 if at == LAND_T else 0.45)*math.exp(-(t-at)/(2.2 if at == LAND_T else 0.9)))

        base_idx = cur if cur != 5 else 5
        if JUMP_T <= t < LAND_T: base_idx = 4
        img = self.layer(base_idx, t, energy, fan_on)
        if old is not None:
            img_old = self.layer(old, t, energy*0.5, fan_on)
            # new layer arrives from slightly closer (zoom) while the seam hides behind the blade
            M = cv2.getRotationMatrix2D(HUB, 0, new_zoom)
            img_new = cv2.warpAffine(img, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
            rel = np.mod(((REST + (fan_ang-REST) ) - self.phi), 90.0)
            m = np.clip((swept - rel)/0.6 + 0.5, 0, 1) if swept < 90 else np.ones((H, W), np.float32)
            m = m[..., None]
            img = (img_new*m + img_old*(1-m)).astype(np.uint8)
        # landing crossfade 04 -> 05 hidden under Monica's impact
        if LAND_T-0.05 <= t < LAND_T+0.35:
            x = smooth((t-(LAND_T-0.05))/0.3)
            img = (img.astype(np.float32)*(1-x) + self.layer(5, t, energy, fan_on).astype(np.float32)*x).astype(np.uint8)
        elif t >= LAND_T+0.35 and base_idx == 5:
            pass

        # camera impulses: damped thump at each arrival + landing
        zoom, ox, oy, rot = 1.0, 0.0, 0.0, 0.0
        for at in ARRIVALS:
            dt = t-at
            if 0 <= dt < 1.3:
                amp = 0.034 if at == LAND_T else 0.016
                zoom += amp*math.exp(-dt*5.5)*math.cos(dt*22)*(1 if dt > 0 else 0)
                if at == LAND_T:
                    oy += 26*math.exp(-dt*5)*math.cos(dt*24); rot += 0.7*math.exp(-dt*4)*math.cos(dt*19)
        if t >= LAND_T: # laughing jiggle that decays
            dt = t-LAND_T
            oy += 7*math.exp(-dt/2.8)*math.sin(dt*31); ox += 3*math.exp(-dt/2.8)*math.sin(dt*23)
        zoom += 0.004*math.sin(t*1.3)   # slow handheld-ish drift
        M = cv2.getRotationMatrix2D((W/2, H/2), rot, zoom); M[0,2] += ox; M[1,2] += oy
        img = cv2.warpAffine(img, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

        # Monica: real falling motion
        if JUMP_T <= t < LAND_T+1.2:
            img = self.monica(img, t, M)
        # fan on top
        if fan_on > 0:
            f = self.fan(fan_ang, fan_blur)
            a = f[..., 3:4]/255.0*fan_on
            sh = cv2.GaussianBlur(a[..., 0], (0,0), 18)[..., None]*0.3
            img = img.astype(np.float32)*(1-sh)
            img = np.clip(img*(1-a) + f[..., :3]*a, 0, 255).astype(np.uint8)
        return img

    def monica(self, img, t, camM):
        tt = t-JUMP_T; total = LAND_T-JUMP_T
        if t < LAND_T:
            x = tt/total; fall = x*x            # accelerating (gravity)
            dy = -(1-fall)*1500; sc = 1.0 + 0.55*(1-fall); rot = 14*(1-fall) - 3*math.sin(x*math.pi)
            dx = 120*(1-fall); vel = 2*x/total*1500/ (1)   # px/s (approx)
        else:
            dt = t-LAND_T
            dy = 0.0; dx = 0.0; rot = 0.0
            sc = 1.0 + 0.045*math.exp(-dt*7)*math.cos(dt*26)*(-1)   # squash on landing
            dy = 14*math.exp(-dt*7)*math.sin(dt*20) + 5*math.exp(-dt/2.8)*math.sin(dt*31)*(dt > 0.4)
            vel = 0
        cx, cy = 0.62*W, 0.2*H
        M = cv2.getRotationMatrix2D((cx, cy), rot, sc); M[0,2] += dx; M[1,2] += dy
        # follow camera shake so she stays glued to the frame
        M3 = np.vstack([M, [0,0,1]]); C3 = np.vstack([camM, [0,0,1]]); T = (C3 @ M3)[:2]
        n = 1 if vel < 300 else 7
        acc = np.zeros((H, W, 4), np.float32); 
        for i in range(n):
            Ti = T.copy(); Ti[1,2] -= (i/(max(n-1,1)))*vel*0.012 if n > 1 else 0
            acc += cv2.warpAffine(self.mon, Ti, (W, H), flags=cv2.INTER_LINEAR, borderValue=(0,0,0,0))
        mon = acc/n
        a = mon[..., 3:4]/255.0
        # soft contact shadow under her once she is low enough
        out = img.astype(np.float32)
        if t > JUMP_T+0.25*total:
            sa = cv2.GaussianBlur(a[...,0], (0,0), 22)[...,None]*0.35*smooth((t-JUMP_T)/total)
            out = out*(1-sa)
        out = out*(1-a) + mon[..., :3]*a
        return np.clip(out, 0, 255).astype(np.uint8)

def main():
    root, outp = sys.argv[1], sys.argv[2]
    args = sys.argv[3:]
    r = Reel(root)
    if '--still' in args:
        t = float(args[args.index('--still')+1]); Image.fromarray(r.frame(t)).save(outp); return
    t0, t1 = 0, DUR
    if '--range' in args:
        i = args.index('--range'); t0, t1 = float(args[i+1]), float(args[i+2])
    ff = subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),
        '-i','-','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-profile:v','high',
        '-movflags','+faststart','-an',outp], stdin=subprocess.PIPE)
    n = int((t1-t0)*FPS)
    for i in range(n):
        ff.stdin.write(r.frame(t0 + i/FPS).tobytes())
        if i % 60 == 0: print(i, n, flush=True)
    ff.stdin.close(); ff.wait()
main()
