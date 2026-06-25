#!/usr/bin/env python3
"""Generate all 6 production gallery images for Aion sales site"""
from diffusers import StableDiffusionXLPipeline
import torch, time, os
from pathlib import Path

OUT = Path("/Users/nrgco/projects/nfinnite-landing/public/generated")
OUT.mkdir(parents=True, exist_ok=True)

print("Loading SDXL-Turbo on CPU...")
pipe = StableDiffusionXLPipeline.from_pretrained(
    "stabilityai/sdxl-turbo",
    torch_dtype=torch.float32,
    use_safetensors=True,
    local_files_only=True,
)
pipe = pipe.to("cpu")
pipe.enable_attention_slicing()

images = [
    ("aether", "Fantasy landscape with floating crystal islands, ethereal purple and blue aurora, photorealistic, cinematic lighting, 8k quality"),
    ("vortex", "Futuristic holographic chat interface with neural network connections glowing in cyan and blue, cyberpunk aesthetic, volumetric lighting"),
    ("foundry", "Abstract visualization of neural network training, orange and amber data flowing through glowing layers of light, detailed"),
    ("cluster", "Server rack with glowing GPUs emitting blue volumetric light, tech aesthetic, cinematic, highly detailed"),
    ("aion-chain", "3D blockchain network visualization with interconnected glowing nodes in emerald and teal, futuristic, digital art"),
    ("axis", "Futuristic trading dashboard holographic interface with candlestick charts and ML prediction lines, dark theme, cinematic"),
]

total = len(images)
for i, (name, prompt) in enumerate(images, 1):
    print(f"[{i}/{total}] {name}...", end=" ", flush=True)
    t0 = time.time()
    result = pipe(prompt=prompt, num_inference_steps=4, guidance_scale=0.0, width=768, height=768)
    img = result.images[0]
    path = OUT / f"{name}.png"
    img.save(path)
    elapsed = time.time() - t0
    size = os.path.getsize(path)
    valid = "✓" if size > 10000 else "✗"
    print(f"{valid} {elapsed:.0f}s, {size//1024}KB")

print(f"\nDone! {total} images in {OUT}")
