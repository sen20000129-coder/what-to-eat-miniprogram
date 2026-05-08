Add-Type -AssemblyName System.Drawing

$icons = @(
    @{Name = 'icon_home.png'; Color = '999999'},
    @{Name = 'icon_home_active.png'; Color = 'FF6B6B'},
    @{Name = 'icon_community.png'; Color = '999999'},
    @{Name = 'icon_community_active.png'; Color = 'FF6B6B'}
)

foreach ($icon in $icons) {
    $bmp = New-Object System.Drawing.Bitmap(48, 48)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $color = [System.Drawing.Color]::FromArgb(
        [convert]::ToByte($icon.Color.Substring(0, 2), 16),
        [convert]::ToByte($icon.Color.Substring(2, 2), 16),
        [convert]::ToByte($icon.Color.Substring(4, 2), 16)
    )
    $brush = New-Object System.Drawing.SolidBrush($color)
    $g.FillRectangle($brush, 0, 0, 48, 48)
    $bmp.Save("images\$($icon.Name)", [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Created: $($icon.Name)"
}

Write-Host "All icons created successfully!"