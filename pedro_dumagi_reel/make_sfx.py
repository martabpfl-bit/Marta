"""Synthesised royalty-free SFX (whooshes + landing thumps + pop). Original, no samples."""
import sys, numpy as np, wave
SR=44100; D=18.0; out=np.zeros(int(SR*D)); rng=np.random.default_rng(7)
def add(t,x): i=int(t*SR); out[i:i+len(x)]+=x[:len(out)-i]
def whoosh(dur,gain):
    n=int(dur*SR); x=rng.standard_normal(n); env=np.sin(np.linspace(0,np.pi,n))**2
    k=np.cumsum(x); k-=np.convolve(k,np.ones(400)/400,'same')  # brown-ish noise
    k/=np.abs(k).max(); sweep=np.sin(2*np.pi*np.cumsum(np.linspace(180,900,n))/SR)*0.25
    return (k*0.8+sweep)*env*gain
def thump(gain,f0=95):
    n=int(0.5*SR); t=np.arange(n)/SR; return np.sin(2*np.pi*(f0*np.exp(-t*6))*t)*np.exp(-t*9)*gain
def pop(gain):
    n=int(0.12*SR); t=np.arange(n)/SR; return np.sin(2*np.pi*(500+900*t*8)*t)*np.exp(-t*40)*gain
for st,du in [(1.6,.95),(4.3,.85),(6.9,.8),(9.3,.75)]: add(st,whoosh(du,0.5)); 
add(11.6,whoosh(1.5,0.6))
for at in [2.55,5.15,7.7,10.05]: add(at,thump(0.5)); add(at,pop(0.25))
add(12.75,thump(1.0,70)); add(12.75,whoosh(0.35,0.4)); add(12.7,pop(0.4))
out=out/np.abs(out).max()*0.8
w=wave.open(sys.argv[1],'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype('int16').tobytes()); w.close()
