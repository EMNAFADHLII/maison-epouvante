param(
  [string]$ImageName = "maison-epouvante-backend:local",
  [string]$ContainerName = "maison-epouvante-backend-local",
  [string]$EnvFile = "backend/.env",
  [int]$HostPort = 3000
)

$ErrorActionPreference = "Stop"

Write-Host "== Local CD: build + deploy backend =="

if (-not (Test-Path "backend/package-lock.json")) {
  throw "backend/package-lock.json not found."
}

if (-not (Test-Path $EnvFile)) {
  throw "Env file not found: $EnvFile"
}

Write-Host "1) Install + test backend..."
Push-Location backend
npm ci
npm test
Pop-Location

Write-Host "2) Build Docker image..."
docker build -f backend/dockerfile -t $ImageName ./backend

Write-Host "3) Replace running container if it exists..."
$existing = docker ps -a --filter "name=^/$ContainerName$" --format "{{.Names}}"
if ($existing -eq $ContainerName) {
  docker rm -f $ContainerName | Out-Null
}

Write-Host "4) Start new container..."
docker run -d `
  --name $ContainerName `
  --env-file $EnvFile `
  -p "${HostPort}:3000" `
  $ImageName | Out-Null

Write-Host "5) Done."
Write-Host "Backend deployed locally on http://localhost:$HostPort"
