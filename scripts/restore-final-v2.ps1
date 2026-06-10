# Restore ThaiPass UI from final-v2 snapshot (2026-06-10)
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$snap = Join-Path $root "snapshots\final-v2"

$map = @{
  "scroll-video-hero.tsx" = "apps\web\src\components\sections\scroll-video-hero.tsx"
  "packages-section.tsx"  = "apps\web\src\components\sections\packages-section.tsx"
  "brand-logo.tsx"        = "apps\web\src\components\brand\brand-logo.tsx"
  "footer.tsx"            = "apps\web\src\components\layout\footer.tsx"
  "process-section.tsx"   = "apps\web\src\components\sections\process-section.tsx"
  "hero-nav.tsx"          = "apps\web\src\components\layout\hero-nav.tsx"
  "header.tsx"            = "apps\web\src\components\layout\header.tsx"
}

foreach ($entry in $map.GetEnumerator()) {
  $src = Join-Path $snap $entry.Key
  $dst = Join-Path $root $entry.Value
  if (-not (Test-Path $src)) {
    throw "Snapshot missing: $src"
  }
  Copy-Item $src $dst -Force
  Write-Host "Restored $($entry.Value)"
}

Write-Host ""
Write-Host "ThaiPass final-v2 restored. Run: cd apps/web; npm run dev"
