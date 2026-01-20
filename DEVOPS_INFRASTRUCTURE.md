# Happy Tails - DevOps & Infrastructure Guide

This guide covers the complete DevOps infrastructure setup including Git, Jenkins, Ansible, Terraform, Docker, Kubernetes, and component connectivity.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     GitHub Repository                            │
│          (Git - Version Control & Webhooks)                      │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ Webhook Trigger
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Jenkins CI/CD Pipeline                          │
│     (Build, Test, Security Scan, Deploy Orchestration)          │
└──────────────────────┬──────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    ┌────────┐   ┌──────────┐   ┌─────────────┐
    │ Docker │   │ Terraform│   │   Ansible   │
    │ Build  │   │   IaC    │   │ Configuration│
    │ Images │   │ Provision│   │ Management  │
    └────────┘   └──────────┘   └─────────────┘
        │              │              │
        └──────────────┼──────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│         Kubernetes Cluster (Orchestration Layer)                 │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Namespace: happy-tails                                    │ │
│  │                                                            │ │
│  │  ┌──────────────────┐        ┌──────────────────────┐     │ │
│  │  │  Backend Pods    │        │  Frontend Pods       │     │ │
│  │  │  (Node.js App)   │◄──────►│  (React/Nginx)       │     │ │
│  │  │  Service: backend│        │  Service: frontend   │     │ │
│  │  │  Port: 5000      │        │  Port: 80            │     │ │
│  │  └──────────────────┘        └──────────────────────┘     │ │
│  │           ▲                           ▲                    │ │
│  │           │                           │                    │ │
│  │      Config Map               Config Map                   │ │
│  │      Secrets                  Secrets                      │ │
│  │                                                            │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │  Ingress Controller (NGINX/Traefik)                │ │ │
│  │  │  Routes requests to frontend & backend services   │ │ │
│  │  │  TLS/SSL Termination                              │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                            │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │  Service Mesh (optional): Istio/Linkerd            │ │ │
│  │  │  - Traffic management                              │ │ │
│  │  │  - Security policies                               │ │ │
│  │  │  - Observability                                   │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
        ▲                    ▲                    ▲
        │                    │                    │
        │                    │                    │
   ┌────┴──────┐      ┌──────┴──────┐     ┌──────┴──────┐
   │  Storage  │      │  Monitoring │     │  Logging    │
   │  (PVC)    │      │  (Prometheus)     │  (ELK/Loki) │
   └───────────┘      └──────────────┘    └─────────────┘
```

## Components Breakdown

### 1. **Git - Version Control**
- GitHub repository with branch protection
- Pre-commit hooks for code quality
- Webhook integration with Jenkins

### 2. **Jenkins - CI/CD Orchestration**
- Build, test, and deploy pipeline
- Security scanning integration
- Artifact management
- Environment staging (dev, staging, prod)

### 3. **Terraform - Infrastructure as Code**
- Provision Kubernetes cluster (AWS EKS, GCP GKE, Azure AKS)
- Create networking resources
- Set up persistent volumes
- Configure monitoring infrastructure

### 4. **Ansible - Configuration Management**
- Deploy applications to Kubernetes
- Manage configurations
- Handle secrets
- Deploy supporting services

### 5. **Docker - Containerization**
- Backend container (Node.js)
- Frontend container (React/Nginx)
- Multi-stage builds for optimization

### 6. **Kubernetes - Orchestration**
- Container orchestration and scaling
- Load balancing
- Self-healing
- Rolling updates

## Files in This Setup

```
happy-tails/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # GitHub Actions CI
│   │   ├── code-quality.yml          # Code quality checks
│   │   └── security-scan.yml         # Security scanning
│   └── PULL_REQUEST_TEMPLATE.md      # PR template
│
├── .git-hooks/
│   ├── pre-commit                    # Pre-commit validation
│   ├── pre-push                      # Pre-push checks
│   └── commit-msg                    # Commit message validation
│
├── terraform/
│   ├── main.tf                       # Main infrastructure
│   ├── variables.tf                  # Input variables
│   ├── outputs.tf                    # Output values
│   ├── eks-cluster.tf                # AWS EKS cluster
│   ├── networking.tf                 # VPC & networking
│   ├── storage.tf                    # Storage resources
│   ├── monitoring.tf                 # Monitoring setup
│   ├── terraform.tfvars              # Terraform variables
│   └── README.md                     # Terraform docs
│
├── ansible/
│   ├── playbooks/
│   │   ├── deploy-k8s.yml            # Deploy to Kubernetes
│   │   ├── configure-app.yml         # Application config
│   │   ├── health-checks.yml         # Health checks
│   │   └── rollback.yml              # Rollback procedure
│   ├── roles/
│   │   ├── backend/
│   │   │   ├── tasks/
│   │   │   ├── templates/
│   │   │   └── vars/
│   │   ├── frontend/
│   │   │   ├── tasks/
│   │   │   ├── templates/
│   │   │   └── vars/
│   │   └── monitoring/
│   ├── inventory/
│   │   ├── production.yml            # Production inventory
│   │   ├── staging.yml               # Staging inventory
│   │   └── dev.yml                   # Development inventory
│   ├── ansible.cfg                   # Ansible config
│   └── README.md                     # Ansible docs
│
├── kubernetes/
│   ├── namespaces/
│   │   └── namespace.yaml            # happy-tails namespace
│   ├── configmaps/
│   │   ├── backend-config.yaml
│   │   └── frontend-config.yaml
│   ├── secrets/
│   │   ├── backend-secrets.yaml
│   │   └── db-secrets.yaml
│   ├── deployments/
│   │   ├── backend-deployment.yaml
│   │   └── frontend-deployment.yaml
│   ├── services/
│   │   ├── backend-service.yaml
│   │   └── frontend-service.yaml
│   ├── ingress/
│   │   └── ingress.yaml              # Ingress controller
│   ├── network-policies/
│   │   └── network-policy.yaml       # Network policies
│   ├── horizontal-pod-autoscaler/
│   │   └── hpa.yaml                  # Auto-scaling
│   ├── persistent-volumes/
│   │   └── pvc.yaml                  # Storage claims
│   ├── monitoring/
│   │   ├── prometheus.yaml
│   │   ├── grafana.yaml
│   │   └── alerting.yaml
│   ├── kustomization.yaml            # Kustomize config
│   └── helm/                         # Helm charts (optional)
│
├── frontend/Jenkinsfile              # Enhanced pipeline
├── backend/health-checks.js          # Health check endpoints
├── docker-compose.yml                # Local development
│
└── docs/
    ├── DEPLOYMENT.md                 # Deployment guide
    ├── CONNECTIVITY.md               # Connectivity guide
    ├── TROUBLESHOOTING.md            # Troubleshooting
    └── MONITORING.md                 # Monitoring guide
```

## Next Steps

1. **Review each section** in this guide
2. **Configure Git** - Set up hooks and workflows
3. **Set up Terraform** - Provision infrastructure
4. **Deploy with Ansible** - Configure applications
5. **Deploy to Kubernetes** - Use kubectl/Helm
6. **Set up Monitoring** - Prometheus & Grafana
7. **Test Connectivity** - Service-to-service communication

Each section has detailed setup instructions in separate documentation files.
