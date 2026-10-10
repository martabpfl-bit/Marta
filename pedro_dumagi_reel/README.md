# Pedro & Dumagi – The Never-Ending Dog Pile (simulated-motion reel)
Outputs in out/: silent 1080x1920 H.264 (30fps, 18s), same with synthesized SFX, 540x960 preview.
Rebuild: venv with numpy pillow opencv-python-headless rembg pymatting, then
  python make_monica_matte.py .   # Monica cut-out from 05
  python render_reel.py . out/x.mp4 [--range a b | --still t]   # timeline constants at top of file
  python make_sfx.py build/sfx.wav ; ffmpeg mux
NOT generative AI video: no video-model API was available. Stills are unaltered; motion is fan wipes,
camera impulses, soft local warps on dogs (Pedro's face protected) and a cut-out Monica layer.
