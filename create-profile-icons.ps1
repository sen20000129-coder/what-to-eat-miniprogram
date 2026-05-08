Add-Type -AssemblyName System.Drawing

$icons = @(
    @{Name = 'icon_profile.png'; Color = '999999'},
    @{Name = 'icon_profile_active.png'; Color = 'FF6B6B'}
)

foreach ($icon in $icons) {
    $bmp = New-Object System.Drawing.Bitmap(48, 48)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'HighQuality'
    $g.InterpolationMode = 'HighQualityBicubic'
    
    $color = [System.Drawing.Color]::FromArgb(
        [convert]::ToByte($icon.Color.Substring(0, 2), 16),
        [convert]::ToByte($icon.Color.Substring(2, 2), 16),
        [convert]::ToByte($icon.Color.Substring(4, 2), 16)
    )
    $brush = New-Object System.Drawing.SolidBrush($color)
    
    $g.FillEllipse($brush, 4, 8, 20, 20)
    $pen = New-Object System.Drawing.Pen($color, 4)
    $g.DrawEllipse($pen, 4, 4, 40, 40)
    $g.FillEllipse($brush, 12, 12, 24, 24)
    $g.FillEllipse([System.Drawing.Brushes]::White, 16, 16, 16, 16)
    $g.FillEllipse($brush, 18, 18, 12, 12)
    $g.FillEllipse($brush, 20, 28, 8, 12)
    
    $bmp.Save("images\$($icon.Name)", [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Created: $($icon.Name)"
}

Write-Host "Profile icons created successfully!"