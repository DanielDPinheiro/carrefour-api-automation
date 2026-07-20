$ErrorActionPreference='Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)
if(-not(Test-Path 'node_modules/newman/bin/newman.js')){npm install;if($LASTEXITCODE-ne 0){exit $LASTEXITCODE}}
npm run api:test:local
exit $LASTEXITCODE
