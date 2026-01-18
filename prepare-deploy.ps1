# Script PowerShell pour préparer les fichiers à transférer via FTP
# Usage: .\prepare-deploy.ps1

Write-Host "📦 Préparation des fichiers pour le déploiement..." -ForegroundColor Yellow

# Créer un dossier temporaire
$tempDir = "deploy-temp"
if (Test-Path $tempDir) {
    Remove-Item -Path $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

Write-Host "📁 Copie des fichiers..." -ForegroundColor Yellow

# Copier le dossier client (exclure node_modules, dist, .env)
$clientExclude = @("node_modules", "dist", ".env", ".git")
Get-ChildItem -Path "client" -Recurse | Where-Object {
    $exclude = $false
    foreach ($pattern in $clientExclude) {
        if ($_.FullName -like "*\$pattern\*" -or $_.FullName -like "*\$pattern") {
            $exclude = $true
            break
        }
    }
    -not $exclude
} | Copy-Item -Destination {
    $_.FullName -replace "^client\\", "$tempDir\client\"
} -Force

# Copier le dossier server (exclure node_modules, .env)
$serverExclude = @("node_modules", ".env", ".git")
Get-ChildItem -Path "server" -Recurse | Where-Object {
    $exclude = $false
    foreach ($pattern in $serverExclude) {
        if ($_.FullName -like "*\$pattern\*" -or $_.FullName -like "*\$pattern") {
            $exclude = $true
            break
        }
    }
    -not $exclude
} | Copy-Item -Destination {
    $_.FullName -replace "^server\\", "$tempDir\server\"
} -Force

# Copier les fichiers à la racine
Copy-Item -Path "package.json" -Destination "$tempDir\" -Force
Copy-Item -Path "package-lock.json" -Destination "$tempDir\" -Force -ErrorAction SilentlyContinue

# Créer l'archive
$archiveName = "katymurr-deploy.zip"
if (Test-Path $archiveName) {
    Remove-Item -Path $archiveName -Force
}

Write-Host "📦 Création de l'archive..." -ForegroundColor Yellow
Compress-Archive -Path "$tempDir\*" -DestinationPath $archiveName -Force

# Nettoyer
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "✅ Archive créée : $archiveName" -ForegroundColor Green
Write-Host "📤 Vous pouvez maintenant transférer cette archive via FTP" -ForegroundColor Cyan

