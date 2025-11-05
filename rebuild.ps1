# Build -> copy -> prepare -> gradle clean -> assembleDebug
# Adjust $repoRoot if your repo is somewhere else
$repoRoot = 'C:\Users\sincl\boydOral'
$cordovaDir = Join-Path $repoRoot 'FFK'
$distDir = Join-Path $repoRoot 'dist'
$wwwDir = Join-Path $cordovaDir 'www'
$androidPlatformDir = Join-Path $cordovaDir 'platforms\android'
$gradleExplicit = 'C:\Gradle\gradle-8.13\bin\gradle.bat'  # adjust only if you use a different gradle binary
$electronWwwDir = Join-Path $cordovaDir 'platforms\electron\www'

# Helper: get image dimensions (returns hashtable with Width/Height) - returns $null on failure
function Get-ImageDimensions($path) {
    try {
        Add-Type -AssemblyName System.Drawing -ErrorAction SilentlyContinue | Out-Null
        $img = [System.Drawing.Image]::FromFile($path)
        $w = $img.Width
        $h = $img.Height
        $img.Dispose()
        return @{ Width = $w; Height = $h }
    }
    catch {
        return $null
    }
}

# Ensure Electron www has usable icons. If icons are missing or wrong size in the electron www folder,
# attempt to copy the icons from the Cordova project root ($cordovaDir) if they are present and the
# PNG versions match the desired size. We deliberately do NOT resize images here.
function Ensure-ElectronIcons($electronWwwDir, $cordovaDir) {
    # Desired minimum size for ICO files used by electron-builder. Override by setting env var ELECTRON_ICON_PNG_SIZE.
    $desiredSize = 256
    if ($env:ELECTRON_ICON_PNG_SIZE) {
        [int]$parsed = 0
        if ([int]::TryParse($env:ELECTRON_ICON_PNG_SIZE, [ref]$parsed)) { $desiredSize = $parsed }
    }

    $icons = @('icon.png', 'icon.ico')
    foreach ($icon in $icons) {
        $target = Join-Path $electronWwwDir $icon
        $fallback = Join-Path $cordovaDir $icon

        if ($icon -ieq 'icon.png') {
            # Do not enforce PNG size. If PNG is missing in electron www, copy fallback if present.
            if (Test-Path $target) {
                Write-Output "Electron PNG icon present: $target"
            }
            else {
                if (Test-Path $fallback) {
                    Write-Output "Copying fallback PNG icon from $fallback -> $target"
                    try { Copy-Item -LiteralPath $fallback -Destination $target -Force -ErrorAction Stop } catch { Write-Warning "Failed copying fallback PNG icon: $($_)" }
                }
                else {
                    Write-Warning "No electron PNG icon at $target and no fallback at $fallback"
                }
            }
        }
        else {
            # For .ico enforce a minimum size (electron-builder requires at least 256x256). Copy fallback if target missing or too small.
            $ok = $false
            if (Test-Path $target) {
                $dims = Get-ImageDimensions $target
                if ($dims -and $dims.Width -ge $desiredSize -and $dims.Height -ge $desiredSize) {
                    Write-Output "Electron ICO icon present and meets minimum size ($($dims.Width)x$($dims.Height)): $target"
                    $ok = $true
                }
                else {
                    Write-Warning "Electron ICO icon exists but is smaller than ${desiredSize}x${desiredSize}: $target"
                }
            }

            if (-not $ok) {
                if (Test-Path $fallback) {
                    $fbDims = Get-ImageDimensions $fallback
                    if ($fbDims -and $fbDims.Width -ge $desiredSize -and $fbDims.Height -ge $desiredSize) {
                        Write-Output "Copying fallback ICO icon from $fallback -> $target"
                        try { Copy-Item -LiteralPath $fallback -Destination $target -Force -ErrorAction Stop } catch { Write-Warning "Failed copying fallback ICO icon: $($_)" }
                    }
                    else {
                        if ($fbDims) { Write-Warning "Fallback ICO at $fallback is smaller than ${desiredSize}x${desiredSize} (found $($fbDims.Width)x$($fbDims.Height)). Not copying." }
                        else { Write-Warning "Fallback ICO at $fallback could not be inspected for size. Not copying." }
                    }
                }
                else {
                    Write-Warning "No suitable ICO icon found at $target or fallback $fallback"
                }
            }
        }
    }
}

Write-Output "Repo root: $repoRoot"
Write-Output "Cordova project: $cordovaDir"
Write-Output "Built web source (dist): $distDir"
Write-Output "Cordova www: $wwwDir"
Write-Output "Android platform: $androidPlatformDir"

# --- Basic environment / tool checks -------------------------------------------------
function Test-CommandExists($cmd) {
    return $null -ne (Get-Command $cmd -ErrorAction SilentlyContinue)
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
    & java -version 2>&1 | ForEach-Object { Write-Output "  $($_)" }
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
            Write-Warning "Failed reading local.properties: $($_)"
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

# Prompt which targets to rebuild: APK (a), ZIP (z), both (b) or none (n).
# If running non-interactively, you can set the environment variable REBUILD_TARGETS to a/z/b/n.
$doApk = $true
$doZip = $true
try {
    if ($Host -and $Host.UI -and $Host.UI.RawUI) {
        $prompt = "Rebuild targets? (a) APK, (z) ZIP, (b) both, (n) none — enter a/z/b/n (default b)"
        $choice = Read-Host -Prompt $prompt
        if ([string]::IsNullOrWhiteSpace($choice)) { $choice = 'b' }
    }
    elseif ($env:REBUILD_TARGETS) {
        $choice = $env:REBUILD_TARGETS
    }
    else {
        $choice = 'b'
    }
    $choice = $choice.ToLower().Trim()
    switch ($choice.Substring(0, 1)) {
        'a' { $doApk = $true; $doZip = $false }
        'z' { $doApk = $false; $doZip = $true }
        'b' { $doApk = $true; $doZip = $true }
        default { $doApk = $false; $doZip = $false }
    }
    $sel = @()
    if ($doApk) { $sel += 'APK' }
    if ($doZip) { $sel += 'ZIP' }
    if ($sel.Count -eq 0) { $selText = 'none' } else { $selText = ($sel -join ', ') }
    Write-Output "Selected rebuild targets: $selText"
}
catch {
    Write-Warning "Unable to prompt for rebuild targets; defaulting to both APK and ZIP."
    $doApk = $true; $doZip = $true
}

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

# Remove current www contents (but keep the directory) — preserve platform-specific root files
Write-Output "Removing existing content inside $wwwDir... (preserving platform files if present)"
# Files at the root of www that belong to platforms and should not be deleted/overwritten
$preserveRoot = @('icon.ico', 'icon.png', 'package.json')

# Backup any preserve files to a temporary safe location before cleaning (prevents accidental deletion/overwrite)
$backupRoot = Join-Path $repoRoot '.rebuild_backup\www_preserve'
if (Test-Path $backupRoot) { Remove-Item -LiteralPath $backupRoot -Recurse -Force -ErrorAction SilentlyContinue }
New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null
foreach ($fname in $preserveRoot) {
    $fpath = Join-Path $wwwDir $fname
    if (Test-Path $fpath) {
        Write-Output "Backing up platform file: $fname"
        try { Copy-Item -LiteralPath $fpath -Destination $backupRoot -Force -ErrorAction SilentlyContinue } catch { Write-Warning "Failed backing up $($fpath): $($_)" }
    }
}

# Now delete everything in www except the preserve list (we already have backups just in case)
Get-ChildItem -Path $wwwDir -Force | ForEach-Object {
    $name = $_.Name
    if ($preserveRoot -contains $name) {
        Write-Output "Preserving platform file: $name"
    }
    else {
        try {
            Remove-Item -LiteralPath $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
        }
        catch {
            Write-Warning "Failed to remove $($($_.FullName)): $($_)"
        }
    }
}

Write-Output "Copying new files... (preserving platform-specific files)"
# Avoid overwriting platform-specific files (like Electron's icon or package.json) that may live in the www folder.
# We'll copy all files from $distDir into $wwwDir but skip a small list of root-level files.

# Ensure directory structure exists and copy files while skipping excluded root files
Get-ChildItem -Path $distDir -Recurse -Force | ForEach-Object {
    $sourcePath = $_.FullName
    $relPath = $sourcePath.Substring($distDir.Length).TrimStart('\', '/')
    $destPath = Join-Path $wwwDir $relPath

    if ($_.PSIsContainer) {
        # create the directory if needed
        if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
        return
    }

    # Skip root-level files that would overwrite platform files (match only top-level entries)
    if ($relPath -match '^[\\/]*([^\\/]+)$') {
        $top = $Matches[1]
        if ($skipRoot -contains $top) {
            Write-Output "Skipping platform file: $top"
            return
        }
    }

    Copy-Item -Path $sourcePath -Destination $destPath -Force
}
Write-Output "Copy complete."

# Restore any preserved platform files from backup (overwrite any accidental replacements)
foreach ($fname in $preserveRoot) {
    $backupFile = Join-Path $backupRoot $fname
    if (Test-Path $backupFile) {
        try {
            Write-Output "Restoring platform file: $fname"
            Copy-Item -LiteralPath $backupFile -Destination (Join-Path $wwwDir $fname) -Force -ErrorAction SilentlyContinue
        }
        catch {
            Write-Warning "Failed to restore $($backupFile): $($_)"
        }
    }
}

# Remove backup folder
if (Test-Path $backupRoot) {
    try { Remove-Item -LiteralPath $backupRoot -Recurse -Force -ErrorAction SilentlyContinue } catch { Write-Warning "Failed to remove backup folder $($backupRoot): $($_)" }
}

# 3) Cordova prepare (copies www into platforms/android as required)
if ($doApk) {
    Write-Output "`n==> Step 3: cordova prepare android in $cordovaDir"
    Set-Location $cordovaDir
    npx cordova prepare android
    if ($LASTEXITCODE -ne 0) { Write-Error "cordova prepare android failed (exit $LASTEXITCODE). Check output above."; exit 1 }
}
else {
    Write-Output "Skipping Android prepare/build as requested."
}

# 4) Ensure gradle wrapper exists (if not, generate wrapper using explicit gradle)
if ($doApk) {
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
}
else {
    Write-Output "Skipping gradle wrapper/check because APK build was skipped."
}

# 5) Clean and assemble debug
if ($doApk) {
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
}
else {
    Write-Output "Skipping gradle build because APK build was skipped."
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

if ($doApk) {
    # Informational success/failure message for APK and pause interactively so window doesn't close immediately
    if (Test-Path $apkPath) {
        Write-Output "`n==> APK packaging SUCCESSFUL. APK: $apkPath"
        try {
            if ($Host -and $Host.UI -and $Host.UI.RawUI) {
                Read-Host -Prompt "Press Enter to continue"
            }
        }
        catch {
            # ignore if Read-Host not available
        }
    }
    else {
        Write-Warning "APK was not produced at $apkPath. Check earlier output for gradle errors."
        try {
            if ($Host -and $Host.UI -and $Host.UI.RawUI) {
                Read-Host -Prompt "Press Enter to continue"
            }
        }
        catch {
        }
    }
}
else {
    Write-Output "Skipping APK packaging/messages as requested."
}

# 7) Prepare and package desktop (Cordova-electron -> portable zip)
if ($doZip) {
    Write-Output "`n==> Step 5: prepare and package Electron (desktop)"
    Set-Location $cordovaDir
    if (Test-Path (Join-Path $cordovaDir 'platforms\electron')) {
        Write-Output "Running 'npx cordova prepare electron' to ensure platform is up-to-date"
        npx cordova prepare electron
        $cpExit = $LASTEXITCODE
        Write-Output "cordova prepare electron exit code: $cpExit"
        if ($cpExit -ne 0) {
            Write-Warning "cordova prepare electron failed (exit $cpExit). Will attempt packaging anyway if possible."
        }

        if (-not (Test-Path $electronWwwDir)) {
            Write-Warning "Electron www folder not found at $electronWwwDir. Cannot package Electron app." 
        }
        else {
            Set-Location $electronWwwDir

            # Ensure electron icons are present and valid. If missing or wrong size here, attempt to copy from the Cordova project root ($cordovaDir).
            try {
                Ensure-ElectronIcons -electronWwwDir $electronWwwDir -cordovaDir $cordovaDir
            }
            catch {
                Write-Warning "Ensure-ElectronIcons encountered an error: $($_)"
            }

            # Before packaging: ensure package.json has pack script or build config
            # Also temporarily disable automatic DevTools so packaged builds don't open devtools.
            $settingsFile = Join-Path $electronWwwDir 'cdv-electron-settings.json'
            $settingsBackupDir = Join-Path $repoRoot '.rebuild_backup\electron_settings'
            $settingsWasModified = $false
            if (Test-Path $settingsFile) {
                try {
                    $settings = Get-Content $settingsFile -Raw | ConvertFrom-Json
                    if ($settings.browserWindow -and $settings.browserWindow.webPreferences -and $settings.browserWindow.webPreferences.devTools) {
                        # Backup original settings
                        if (-not (Test-Path $settingsBackupDir)) { New-Item -ItemType Directory -Path $settingsBackupDir -Force | Out-Null }
                        Copy-Item -LiteralPath $settingsFile -Destination (Join-Path $settingsBackupDir 'cdv-electron-settings.json') -Force
                        # Disable devTools for packaging
                        $settings.browserWindow.webPreferences.devTools = $false
                        $settings | ConvertTo-Json -Depth 10 | Set-Content $settingsFile -Force
                        $settingsWasModified = $true
                        Write-Output "Temporarily disabled DevTools in $settingsFile for packaging (backup saved to $settingsBackupDir)."
                    }
                }
                catch {
                    Write-Warning "Failed to adjust devTools setting in $($settingsFile): $($_)"
                }
            }

            # Ensure package.json has pack script or build config
            if (-not (Test-Path package.json)) {
                Write-Warning "No package.json in $electronWwwDir. Skipping Electron packaging." 
            }
            else {
                # Install dependencies if node_modules missing
                if (-not (Test-Path (Join-Path $electronWwwDir 'node_modules'))) {
                    Write-Output "Installing npm dependencies in Electron www folder... (this may take a minute)"
                    npm install --no-audit --no-fund
                    $npmExit = $LASTEXITCODE
                    Write-Output "npm install exit code: $npmExit"
                    if ($npmExit -ne 0) { Write-Warning "npm install in Electron www failed (exit $npmExit). Attempting to continue but packaging will likely fail." }
                }

                # Cleanup previous electron build artifacts (non-fatal)
                try {
                    $expectedBuildDir = Join-Path $electronWwwDir '..\build'
                    $resolved = Resolve-Path $expectedBuildDir -ErrorAction SilentlyContinue
                    if ($resolved) {
                        $buildPath = $resolved.Path
                        Write-Output "Cleaning previous Electron build artifacts in $buildPath"
                        # remove zip and unpacked folders but don't fail the script if deletion fails
                        Get-ChildItem -Path $buildPath -Force -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
                    }
                    else {
                        Write-Output "No existing Electron build folder found at $expectedBuildDir; nothing to clean."
                    }
                }
                catch {
                    Write-Warning "Failed to clean previous Electron build artifacts: $_. Continuing..."
                }

                Write-Output "Running npm run pack:win to build portable ZIP..."
                npm run pack:win
                $packExit = $LASTEXITCODE
                Write-Output "npm run pack:win exit code: $packExit"
                if ($packExit -ne 0) { 
                    Write-Warning "electron-builder packaging failed (exit $packExit). See npm output for details. Packaging is non-fatal; script will continue."
                }

                # find produced zip
                $buildOut = Join-Path $electronWwwDir '..\build' | Resolve-Path -ErrorAction SilentlyContinue
                if ($buildOut) {
                    $buildOut = $buildOut.Path
                    $zip = Get-ChildItem -Path $buildOut -Filter '*.zip' -File -Recurse | Sort-Object LastWriteTime | Select-Object -Last 1
                    if ($zip) { 
                        Write-Output "Electron package created: $($zip.FullName)" 
                        $electronPackagePath = $zip.FullName
                    }
                    else { Write-Output "Electron build completed but no zip artifact was found in $buildOut" }
                }
                else {
                    Write-Output "Electron build completed but build output folder not found (expected ../build)"
                }
                # Final packaging status message and optional pause so window doesn't close immediately
                if ($null -ne $electronPackagePath) {
                    Write-Output "`n==> Electron packaging SUCCESSFUL. Package: $electronPackagePath"
                    # Pause only if interactive host to avoid blocking CI
                    try {
                        if ($Host -and $Host.UI -and $Host.UI.RawUI) {
                            Read-Host -Prompt "Press Enter to finish"
                        }
                    }
                    catch {
                        # ignore if Read-Host not available
                    }
                }
                else {
                    Write-Warning "Electron packaging did not produce a zip artifact. Check previous npm/electron-builder output above for errors."
                    try {
                        if ($Host -and $Host.UI -and $Host.UI.RawUI) {
                            Read-Host -Prompt "Press Enter to finish"
                        }
                    }
                    catch {
                    }
                }
                # Restore settings file if we modified it
                if ($settingsWasModified) {
                    try {
                        $orig = Join-Path $settingsBackupDir 'cdv-electron-settings.json'
                        if (Test-Path $orig) {
                            Copy-Item -LiteralPath $orig -Destination $settingsFile -Force
                            Remove-Item -LiteralPath $orig -Force
                            Write-Output "Restored original $settingsFile from backup."
                        }
                        Remove-Item -LiteralPath $settingsBackupDir -Recurse -Force -ErrorAction SilentlyContinue
                    }
                    catch {
                        Write-Warning "Failed to restore original settings from $($settingsBackupDir): $($_)"
                    }
                }
            }
        }
    }
    else {
        Write-Output "No electron platform found at $cordovaDir\platforms\electron — skipping desktop packaging."
    }
}
else {
    Write-Output "Skipping Electron packaging as requested."
}