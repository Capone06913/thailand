# Extract hero scroll frames from hero-loop.mp4 for smooth scrubbing.
# Requires ffmpeg on PATH.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$video = Join-Path $root "apps\web\public\video\hero-loop.mp4"
$outDir = Join-Path $root "apps\web\public\video\hero-frames"

if (-not (Test-Path $video)) {
    Write-Error "Video not found: $video"
}

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

Write-Host "Extracting frames to $outDir ..."
ffmpeg -y -i $video -an -vf "fps=12,scale=1920:-2" -c:v libwebp -lossless 0 -q:v 80 (Join-Path $outDir "frame_%04d.webp")

$count = (Get-ChildItem $outDir -Filter "frame_*.webp").Count
$manifest = @{
    frameCount = $count
    fps        = 12
    pattern    = "/video/hero-frames/frame_%04d.webp"
} | ConvertTo-Json

$manifest | Set-Content (Join-Path $outDir "manifest.json") -Encoding UTF8
Write-Host "Done. $count frames written."
