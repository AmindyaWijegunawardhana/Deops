#!/usr/bin/env powershell

# Color output
$GREEN = "`e[32m"
$YELLOW = "`e[33m"
$RED = "`e[31m"
$RESET = "`e[0m"

Write-Host "${GREEN}================================${RESET}" 
Write-Host "${GREEN}GitHub Push Setup${RESET}"
Write-Host "${GREEN}================================${RESET}"
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"

# Validate input
if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "${RED}Error: Username cannot be empty${RESET}"
    exit 1
}

$repo = "happy-tails-pet-adoption"

Write-Host ""
Write-Host "${YELLOW}Steps to complete:${RESET}"
Write-Host "1. Go to https://github.com/new"
Write-Host "2. Repository name: $repo"
Write-Host "3. Choose 'Public'"
Write-Host "4. Do NOT initialize with README"
Write-Host "5. Click 'Create repository'"
Write-Host ""

$ready = Read-Host "Have you created the repository on GitHub? (yes/no)"

if ($ready -ne "yes") {
    Write-Host "${YELLOW}Please create the repository first, then run this script again.${RESET}"
    exit 1
}

Write-Host ""
Write-Host "${YELLOW}Pushing your code to GitHub...${RESET}"
Write-Host ""

# Set remote and push
try {
    git remote add origin "https://github.com/${username}/${repo}.git"
    Write-Host "${GREEN}✓ Remote added${RESET}"
    
    git branch -M main
    Write-Host "${GREEN}✓ Branch renamed to main${RESET}"
    
    git push -u origin main
    Write-Host "${GREEN}✓ Code pushed to GitHub!${RESET}"
    
    Write-Host ""
    Write-Host "${GREEN}================================${RESET}"
    Write-Host "${GREEN}Success! Your project is on GitHub!${RESET}"
    Write-Host "${GREEN}================================${RESET}"
    Write-Host ""
    Write-Host "View your repository at:"
    Write-Host "  https://github.com/${username}/${repo}"
    Write-Host ""
}
catch {
    Write-Host "${RED}Error: $_${RESET}"
    exit 1
}
