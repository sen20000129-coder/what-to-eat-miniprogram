Add-Type -AssemblyName System.Drawing

function Create-Icon {
    param(
        [string]$Name,
        [string]$Color,
        [string]$IconType
    )
    
    $bmp = New-Object System.Drawing.Bitmap(48, 48)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'AntiAlias'
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.PixelOffsetMode = 'HighQuality'
    
    $colorObj = [System.Drawing.Color]::FromArgb(
        [convert]::ToByte($Color.Substring(0, 2), 16),
        [convert]::ToByte($Color.Substring(2, 2), 16),
        [convert]::ToByte($Color.Substring(4, 2), 16)
    )
    $brush = New-Object System.Drawing.SolidBrush($colorObj)
    $pen = New-Object System.Drawing.Pen($colorObj, 3)
    
    switch ($IconType) {
        "home" {
            $g.FillRectangle($brush, 8, 8, 32, 32)
            $g.FillPolygon([System.Drawing.Brushes]::White, @(
                (New-Object System.Drawing.Point(24, 12)),
                (New-Object System.Drawing.Point(12, 24)),
                (New-Object System.Drawing.Point(36, 24))
            ))
        }
        "community" {
            $g.FillEllipse($brush, 6, 8, 36, 32)
            $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
            $g.FillEllipse($whiteBrush, 10, 12, 10, 10)
            $g.FillEllipse($whiteBrush, 24, 12, 10, 10)
            $g.FillEllipse($whiteBrush, 17, 26, 10, 10)
        }
        "profile" {
            $g.FillEllipse($brush, 14, 6, 20, 20)
            $g.FillEllipse($brush, 8, 26, 32, 20)
        }
    }
    
    $bmp.Save("images\$Name", [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Created: $Name"
}

$icons = @(
    @{Name = 'icon_home.png'; Color = 'A0A0A0'; Type = 'home'},
    @{Name = 'icon_home_active.png'; Color = 'FF6B6B'; Type = 'home'},
    @{Name = 'icon_community.png'; Color = 'A0A0A0'; Type = 'community'},
    @{Name = 'icon_community_active.png'; Color = 'FF6B6B'; Type = 'community'},
    @{Name = 'icon_profile.png'; Color = 'A0A0A0'; Type = 'profile'},
    @{Name = 'icon_profile_active.png'; Color = 'FF6B6B'; Type = 'profile'}
)

foreach ($icon in $icons) {
    Create-Icon -Name $icon.Name -Color $icon.Color -IconType $icon.Type
}

Write-Host "All icons created successfully!"