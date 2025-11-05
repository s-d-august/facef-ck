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

# --- Basic environment / tool checks -------------------------------------------------
function Test-CommandExists($cmd) {
    return (Get-Command $cmd -ErrorAction SilentlyContinue) -ne $null
}

Write-Output "`n==> Verifying required tools and environment"

# Node/npm
if (-not (Test-CommandExists 'node')) { Write-Error "node is not found in PATH. Install Node.js and try again."; exit 1 }
if (-not (Test-CommandExists 'npm')) { Write-Error "npm is not found in PATH. Install Node.js/npm and try again."; exit 1 }

# npx/cordova
if (-not (Test-CommandExists 'npx')) { Write-Error "npx is not available. Ensure npm is recent enough or install npx."; exit 1 }

# Java
if (-not (Test-CommandExists 'java')) {
    Write-Warning "java not found on PATH. Ensure JDK is installed and JAVA_HOME is set to the JDK root."
}
else {
    & java -version 2>&1 | ForEach-Object { Write-Output "  $_" }
}

# Parse local.properties for sdk.dir if ANDROID_SDK_ROOT/ANDROID_HOME missing
if (-not $env:ANDROID_SDK_ROOT -and -not $env:ANDROID_HOME) {
    $localProps = Join-Path $androidPlatformDir 'local.properties'
    if (Test-Path $localProps) {
        try {
            $content = Get-Content $localProps -ErrorAction Stop
            foreach ($line in $content) {
                if ($line -match '^\s*sdk\.dir\s*=\s*(.+)') {
                    $sdkPath = $Matches[1].Trim()
                    # Normalize Windows path separators
                    $sdkPath = $sdkPath -replace '/', '\\'
                    $env:ANDROID_SDK_ROOT = $sdkPath
                    $env:ANDROID_HOME = $sdkPath
                    Write-Output "Set ANDROID_SDK_ROOT from local.properties: $sdkPath"
                    break
                }
            }
        }
        catch {
            Write-Warning "Failed reading local.properties: $_"
        }
    }
    else {
        Write-Warning "ANDROID_SDK_ROOT/ANDROID_HOME not set and local.properties not found at $localProps"
    }
}
else {
    if ($env:ANDROID_SDK_ROOT) { $sdkVal = $env:ANDROID_SDK_ROOT }
    elseif ($env:ANDROID_HOME) { $sdkVal = $env:ANDROID_HOME }
    else { $sdkVal = '' }
    Write-Output "ANDROID_SDK_ROOT or ANDROID_HOME already set: $sdkVal"
}

# Verify Android SDK folder exists
if (-not $env:ANDROID_SDK_ROOT -or -not (Test-Path $env:ANDROID_SDK_ROOT)) {
    Write-Warning "Android SDK not found at ANDROID_SDK_ROOT='$env:ANDROID_SDK_ROOT'. Gradle may fail."
}

# gradlew check
if (-not (Test-Path (Join-Path $androidPlatformDir 'gradlew.bat'))) {
    Write-Output "gradlew.bat not found in $androidPlatformDir. Script will attempt to generate wrapper (requires an explicit Gradle binary)."
    if (-not (Test-Path $gradleExplicit)) { Write-Warning "Explicit gradle binary not found at $gradleExplicit. You can set correct path in the script." }
}

# Quick cordova availability check (will rely on npx)
if (-not (Test-CommandExists 'cordova')) { Write-Output "cordova not found globally; npx will be used to invoke cordova." }

# PowerShell execution policy hint
try { $ep = Get-ExecutionPolicy -Scope Process -ErrorAction SilentlyContinue } catch { $ep = $null }
if (-not $ep) { $ep = Get-ExecutionPolicy -ErrorAction SilentlyContinue }
Write-Output "PowerShell ExecutionPolicy: $ep"
# ------------------------------------------------------------------------------------

# 1) Build web assets
Write-Output "`n==> Step 1: building web assets (npm run build) in $repoRoot"
Set-Location $repoRoot
if (-not (Test-Path package.json)) { Write-Error "package.json not found in $repoRoot. Abort."; exit 1 }
Write-Output "Running npm install (if needed) then npm run build..."
$nodeModules = Join-Path $repoRoot 'node_modules'
if (-not (Test-Path $nodeModules)) {
    Write-Output "node_modules not found — running npm install..."
    npm install
    if ($LASTEXITCODE -ne 0) { Write-Error "npm install failed (exit $LASTEXITCODE). Fix that first."; exit 1 }
}
else {
    Write-Output "node_modules exists — skipping npm install. To force reinstall, delete node_modules or run 'npm install' manually."
}

Write-Output "Running npm run build..."
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
}
else {
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
}
else {
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
    Select-Object FullName, Length, @{Name = 'LastWriteTime'; Expression = { $_.LastWriteTime.UtcDateTime } }
    $entries | Sort-Object FullName | Format-Table -AutoSize
    $zip.Dispose()
}
else {
    Write-Warning "APK not found at expected path: $apkPath"
}
Write-Output "`nDone. If you expected different files inside the APK, check the 'Listing web assets inside APK' output and timestamps."