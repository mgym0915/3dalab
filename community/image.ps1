param([string]$InputPath,[string]$OutputPath)
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$taskStream=[System.IO.File]::OpenRead($InputPath)
$taskImage=$null;$taskBitmap=$null;$taskGraphics=$null
try{
 $taskImage=[System.Drawing.Image]::FromStream($taskStream,$true,$true)
 if($taskImage.Width -gt 4096 -or $taskImage.Height -gt 4096 -or ($taskImage.Width*$taskImage.Height) -gt 16777216){throw 'Image dimensions exceed limit'}
 $taskRatio=[Math]::Min(1,1600/[Math]::Max($taskImage.Width,$taskImage.Height));$taskWidth=[int][Math]::Max(1,[Math]::Round($taskImage.Width*$taskRatio));$taskHeight=[int][Math]::Max(1,[Math]::Round($taskImage.Height*$taskRatio))
 $taskBitmap=[System.Drawing.Bitmap]::new($taskWidth,$taskHeight);$taskGraphics=[System.Drawing.Graphics]::FromImage($taskBitmap);$taskGraphics.Clear([System.Drawing.Color]::White);$taskGraphics.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic;$taskGraphics.DrawImage($taskImage,0,0,$taskWidth,$taskHeight)
 $taskCodec=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object {$_.MimeType -eq 'image/jpeg'}
 $taskParams=[System.Drawing.Imaging.EncoderParameters]::new(1);$taskParams.Param[0]=[System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality,[long]82)
 $taskBitmap.Save($OutputPath,$taskCodec,$taskParams);$taskParams.Dispose();Write-Output 'IMAGE_OK'
}finally{if($taskGraphics){$taskGraphics.Dispose()};if($taskBitmap){$taskBitmap.Dispose()};if($taskImage){$taskImage.Dispose()};$taskStream.Dispose()}
