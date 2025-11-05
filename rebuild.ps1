# Build -> copy -> prepare -> gradle clean -> assembleDebug
# Adjust $repoRoot if your repo is somewhere else
$repoRoot = 'C:\Users\sincl\boydOral'
$cordovaDir = Join-Path $repoRoot 'FFK'
$distDir = Join-Path $repoRoot 'dist'
$wwwDir = Join-Path $cordovaDir 'www'
$androidPlatformDir = Join-Path $cordovaDir 'platforms\android'
$gradleExplicit = 'C:\Gradle\gradle-8.13\bin\gradle.bat'  # adjust only if you use a different gradle binary

Write-Output "Repo root: $repoRoot"
Write-Output "Cordova project: $cordovaDir"
Write-Output "Built web source (dist): $distDir"
Write-Output "Cordova www: $wwwDir"
Write-Output "Android platform: $androidPlatformDir"

# 1) Build web assets
Write-Output "`n==> Step 1: building web assets (npm run build) in $repoRoot"
Set-Location $repoRoot
if (-not (Test-Path package.json)) { Write-Error "package.json not found in $repoRoot. Abort."; exit 1 }
Write-Output "Running npm install (safe) then npm run build..."
npm install
if ($LASTEXITCODE -ne 0) { Write-Error "npm install failed (exit $LASTEXITCODE). Fix that first."; exit 1 }
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "npm run build failed (exit $LASTEXITCODE). Fix build errors first."; exit 1 }

# 2) Replace Cordova www with dist
Write-Output "`n==> Step 2: copying $distDir -> $wwwDir"
if (-not (Test-Path $distDir)) { Write-Error "dist folder not found at $distDir. Ensure build output location is correct."; exit 1 }

# Ensure www exists
if (-not (Test-Path $wwwDir)) {
    Write-Output "Creating www directory: $wwwDir"
    New-Item -ItemType Directory -Path $wwwDir -Force | Out-Null
}

# Remove current www contents (but keep the directory)
Write-Output "Removing existing content inside $wwwDir..."
Get-ChildItem -Path $wwwDir -Force | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

Write-Output "Copying new files..."
Copy-Item -Path (Join-Path $distDir '*') -Destination $wwwDir -Recurse -Force
Write-Output "Copy complete."

# 3) Cordova prepare (copies www into platforms/android as required)
Write-Output "`n==> Step 3: cordova prepare android in $cordovaDir"
Set-Location $cordovaDir
npx cordova prepare android
if ($LASTEXITCODE -ne 0) { Write-Error "cordova prepare android failed (exit $LASTEXITCODE). Check output above."; exit 1 }

# 4) Ensure gradle wrapper exists (if not, generate wrapper using explicit gradle)
Set-Location $androidPlatformDir
if (-not (Test-Path ".\gradlew.bat")) {
    Write-Output "`nNo gradlew.bat found in $androidPlatformDir, attempting to generate wrapper using explicit Gradle binary..."
    if (-not (Test-Path $gradleExplicit)) {
        Write-Warning "Explicit Gradle binary not found at $gradleExplicit. Please install Gradle or adjust the path in this script."
        Write-Error "Cannot create gradle wrapper. Install Gradle or place gradlew.bat in $androidPlatformDir. Abort."
        exit 1
    }
    & $gradleExplicit wrapper --gradle-version 8.13 --distribution-type all --info --stacktrace
    if ($LASTEXITCODE -ne 0) { Write-Error "Failed to generate gradle wrapper (exit $LASTEXITCODE). See above logs."; exit 1 }
    Write-Output "gradle wrapper created."
} else {
    Write-Output "gradlew.bat already exists. Skipping wrapper generation."
}

# 5) Clean and assemble debug
Write-Output "`n==> Step 4: gradle clean and assembleDebug (using gradlew.bat)"
# Use gradlew.bat if present
$gradlew = Join-Path $androidPlatformDir 'gradlew.bat'
if (Test-Path $gradlew) {
    & $gradlew clean
    if ($LASTEXITCODE -ne 0) { Write-Warning "gradle clean returned non-zero exit; continuing to build." }
    & $gradlew assembleDebug --info --stacktrace
    if ($LASTEXITCODE -ne 0) { Write-Error "gradle assembleDebug failed (exit $LASTEXITCODE). Check logs above."; exit 1 }
} else {
    Write-Error "gradlew.bat not found and explicit gradle path not used/available. Abort."
    exit 1
}

# 6) Show APK path and inspect contents for index.html and CSS
$apkPath = Join-Path $androidPlatformDir 'app\build\outputs\apk\debug\app-debug.apk'
if (Test-Path $apkPath) {
    Write-Output "`n==> Build successful. APK located at:"
    Get-Item $apkPath | Select-Object FullName, Length, LastWriteTime

    Write-Output "`nListing web assets inside APK (index.html + CSS files)"
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $zip = [System.IO.Compression.ZipFile]::OpenRead($apkPath)
    $entries = $zip.Entries | Where-Object { $_.FullName -match 'www\/(index\.html|.*\.css|.*\.html|assets/.*)' } |
        Select-Object FullName, Length, @{Name='LastWriteTime';Expression={$_.LastWriteTime.UtcDateTime}}
    $entries | Sort-Object FullName | Format-Table -AutoSize
    $zip.Dispose()
} else {
    Write-Warning "APK not found at expected path: $apkPath"
}
Write-Output "`nDone. If you expected different files inside the APK, check the 'Listing web assets inside APK' output and timestamps."