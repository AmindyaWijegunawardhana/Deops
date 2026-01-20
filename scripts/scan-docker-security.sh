#!/bin/bash
set -e

# Docker Security Scanning Script
# Scans built Docker images for vulnerabilities using Trivy

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Docker Security Scanning${NC}"
echo -e "${BLUE}========================================${NC}"

# Check if Trivy is installed
if ! command -v trivy &> /dev/null; then
    echo -e "${YELLOW}Trivy not found. Installing...${NC}"
    curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin
fi

# Function to scan image
scan_image() {
    local image=$1
    local severity=${2:-HIGH,CRITICAL}
    
    echo -e "${BLUE}Scanning image: ${image}${NC}"
    
    # Scan with Trivy
    if trivy image --severity "${severity}" "${image}"; then
        echo -e "${GREEN}✅ Image ${image} passed security scan${NC}"
        return 0
    else
        echo -e "${RED}❌ Image ${image} has vulnerabilities${NC}"
        return 1
    fi
}

# Function to generate SBOM (Software Bill of Materials)
generate_sbom() {
    local image=$1
    local output_file="sbom-${image//\//-}.json"
    
    echo -e "${BLUE}Generating SBOM for: ${image}${NC}"
    trivy image --format cyclonedx --output "${output_file}" "${image}"
    echo -e "${GREEN}SBOM saved to: ${output_file}${NC}"
}

# Main scanning logic
scan_backend=${1:-true}
scan_frontend=${2:-true}
exit_code=0

if [ "${scan_backend}" != "false" ]; then
    if scan_image "happy-tails-backend:latest" "HIGH,CRITICAL"; then
        generate_sbom "happy-tails-backend:latest"
    else
        exit_code=1
    fi
fi

if [ "${scan_frontend}" != "false" ]; then
    if scan_image "happy-tails-frontend:latest" "HIGH,CRITICAL"; then
        generate_sbom "happy-tails-frontend:latest"
    else
        exit_code=1
    fi
fi

echo -e "${BLUE}========================================${NC}"
if [ $exit_code -eq 0 ]; then
    echo -e "${GREEN}✅ All scans passed!${NC}"
else
    echo -e "${RED}❌ Some scans failed!${NC}"
fi
echo -e "${BLUE}========================================${NC}"

exit $exit_code
