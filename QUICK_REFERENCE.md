# Quick Reference Guide

## 🚀 Quick Start Commands

### Initialize Git Hooks
```bash
# Copy hooks to .git/hooks
cp .git-hooks/pre-commit .git/hooks/
cp .git-hooks/pre-push .git/hooks/
cp .git-hooks/commit-msg .git/hooks/

# Make executable
chmod +x .git/hooks/*
```

### Deploy Infrastructure
```bash
# Terraform
cd terraform
terraform init
terraform plan
terraform apply

# Get kubeconfig
aws eks update-kubeconfig --region us-east-1 --name happy-tails-production
```

### Deploy Applications
```bash
# Kubernetes namespace & config
kubectl apply -f kubernetes/namespaces/
kubectl apply -f kubernetes/secrets/
kubectl apply -f kubernetes/configmaps/

# Deployments & services
kubectl apply -f kubernetes/deployments/
kubectl apply -f kubernetes/services/
kubectl apply -f kubernetes/ingress/
kubectl apply -f kubernetes/network-policies/
kubectl apply -f kubernetes/horizontal-pod-autoscaler/
```

### Using Ansible
```bash
# Deploy
ansible-playbook playbooks/deploy-k8s.yml -i inventory/production.yml

# Configure
ansible-playbook playbooks/configure-app.yml -i inventory/production.yml

# Health checks
ansible-playbook playbooks/health-checks.yml -i inventory/production.yml

# Rollback
ansible-playbook playbooks/rollback.yml -i inventory/production.yml
```

### Jenkins Deployment
```groovy
// In Jenkinsfile - build and push
docker build -t happy-tails-backend:${BUILD_NUMBER} backend/
docker build -t happy-tails-frontend:${BUILD_NUMBER} frontend/

// Deploy
kubectl apply -f kubernetes/
```

---

## 🔍 Monitoring Commands

### Check Cluster Status
```bash
# Cluster info
kubectl cluster-info

# Nodes
kubectl get nodes
kubectl top nodes

# Namespaces
kubectl get namespaces
kubectl get all -n happy-tails
```

### Check Deployments
```bash
# Deployments
kubectl get deployments -n happy-tails
kubectl describe deployment backend -n happy-tails

# Pods
kubectl get pods -n happy-tails
kubectl get pods -n happy-tails -o wide

# Pod logs
kubectl logs -f pod/backend-xxx -n happy-tails
kubectl logs -f deployment/backend -n happy-tails
kubectl logs deployment/backend -n happy-tails --all-containers=true

# Pod events
kubectl describe pod/backend-xxx -n happy-tails
```

### Check Services
```bash
# Services
kubectl get services -n happy-tails
kubectl describe svc backend -n happy-tails

# Endpoints
kubectl get endpoints -n happy-tails

# Ingress
kubectl get ingress -n happy-tails
kubectl describe ingress happy-tails -n happy-tails
```

### Check Network Policies
```bash
# Policies
kubectl get networkpolicies -n happy-tails
kubectl describe networkpolicy allow-backend-from-frontend -n happy-tails
```

### Check Auto-scaling
```bash
# HPA status
kubectl get hpa -n happy-tails
kubectl describe hpa backend-hpa -n happy-tails

# Watch HPA in action
kubectl get hpa -n happy-tails --watch
```

---

## 🧪 Testing Commands

### Verify Connectivity
```bash
# Backend health
kubectl port-forward svc/backend 5000:5000 -n happy-tails &
curl http://localhost:5000/api/health

# Frontend health
kubectl port-forward svc/frontend 8080:80 -n happy-tails &
curl http://localhost:8080

# DNS resolution
kubectl exec -it pod/frontend-xxx -n happy-tails -- \
  nslookup backend.happy-tails.svc.cluster.local

# Pod to pod communication
kubectl exec -it pod/frontend-xxx -n happy-tails -- \
  curl http://backend:5000/api/health

# Service endpoints
kubectl get endpoints backend -n happy-tails
```

### Load Testing
```bash
# Install Apache Bench
apt-get install apache2-utils

# Test frontend
ab -n 1000 -c 10 http://localhost:8080/

# Test backend
ab -n 1000 -c 10 http://localhost:5000/api/health

# With wrk
wrk -t12 -c400 -d30s http://localhost:8080/
```

### Security Testing
```bash
# Scan images with Trivy
trivy image happy-tails-backend:latest
trivy image happy-tails-frontend:latest

# Check network policies
kubectl get networkpolicies -n happy-tails
kubectl run -it --rm debug --image=busybox --restart=Never -n happy-tails -- sh

# Inside debug pod
wget http://frontend:80
wget http://backend:5000
```

---

## 🛠️ Troubleshooting Commands

### Debug Pods
```bash
# Shell into pod
kubectl exec -it pod/backend-xxx -n happy-tails -- bash

# Check environment variables
kubectl exec pod/backend-xxx -n happy-tails -- env

# Check mounted volumes
kubectl exec pod/backend-xxx -n happy-tails -- df -h

# Check processes
kubectl exec pod/backend-xxx -n happy-tails -- ps aux
```

### Check Resources
```bash
# CPU/Memory usage
kubectl top pods -n happy-tails
kubectl top nodes

# Resource requests/limits
kubectl describe pod pod-name -n happy-tails

# Check available resources
kubectl describe nodes
```

### Network Debugging
```bash
# Install network tools
kubectl run nettools --image=nicolaka/netshoot -it -n happy-tails

# Inside nettools pod
nslookup backend.happy-tails.svc.cluster.local
curl http://backend:5000/api/health
traceroute backend
telnet backend 5000
```

### View Events
```bash
# Cluster events
kubectl get events -A --sort-by='.lastTimestamp'

# Namespace events
kubectl get events -n happy-tails

# Pod events
kubectl describe pod pod-name -n happy-tails | grep -A 20 Events
```

---

## 📊 Key Metrics

### Health Check Endpoints
```
Backend:
- GET /api/health (comprehensive)
- GET /api/live (liveness probe)
- GET /api/ready (readiness probe)

Frontend:
- GET /index.html (health check)
```

### Service Discovery
```
Backend: backend.happy-tails.svc.cluster.local:5000
Frontend: frontend.happy-tails.svc.cluster.local:80

From frontend pods:
http://backend:5000/api
```

### Resource Limits
```
Backend Pod:
- Request: 256Mi memory, 250m CPU
- Limit: 512Mi memory, 500m CPU

Frontend Pod:
- Request: 128Mi memory, 100m CPU
- Limit: 256Mi memory, 200m CPU

HPA Triggers:
- CPU > 70%
- Memory > 80%
```

---

## 🔑 Important File Locations

```
Terraform:          terraform/
Kubernetes:         kubernetes/
Ansible:            ansible/
Docker Compose:     frontend/docker-compose.yml
Jenkins:            frontend/Jenkinsfile
Git Hooks:          .git-hooks/
GitHub Actions:     .github/workflows/
Documentation:      docs/
Health Checks:      backend/server.js (lines 11-30)
```

---

## 🔐 Secrets Management

### Update Secrets
```bash
# Edit backend secrets
kubectl edit secret backend-secrets -n happy-tails

# Edit database secrets
kubectl edit secret db-secrets -n happy-tails

# Create new secret
kubectl create secret generic my-secret --from-literal=key=value -n happy-tails
```

### View Secrets (Decoded)
```bash
# Get secret
kubectl get secret backend-secrets -n happy-tails -o yaml

# Decode specific value
kubectl get secret backend-secrets -n happy-tails \
  -o jsonpath='{.data.JWT_SECRET}' | base64 -d
```

---

## 📝 Commit Message Format

```
<type>(<scope>): <subject>

Valid types:
- feat:     New feature
- fix:      Bug fix
- docs:     Documentation
- style:    Code style
- refactor: Code refactoring
- perf:     Performance improvement
- test:     Test addition
- chore:    Maintenance
- ci:       CI/CD changes
- build:    Build changes

Examples:
feat(auth): add JWT token validation
fix(backend): fix database connection pool
docs(deployment): add K8s guide
```

---

## 🚨 Emergency Commands

### Rollback Deployment
```bash
# View history
kubectl rollout history deployment/backend -n happy-tails

# Rollback
kubectl rollout undo deployment/backend -n happy-tails

# Rollback to specific revision
kubectl rollout undo deployment/backend -n happy-tails --to-revision=2

# Or use Ansible
ansible-playbook playbooks/rollback.yml -i inventory/production.yml
```

### Scale Deployments
```bash
# Manual scale
kubectl scale deployment backend --replicas=5 -n happy-tails

# Check HPA (auto-scaling)
kubectl get hpa -n happy-tails
```

### Restart Pods
```bash
# Restart deployment
kubectl rollout restart deployment/backend -n happy-tails

# Delete and recreate
kubectl delete pod pod-name -n happy-tails
```

### Cleanup
```bash
# Delete namespace (removes all resources)
kubectl delete namespace happy-tails

# Delete specific resource
kubectl delete deployment backend -n happy-tails

# Clean docker
docker system prune -a
```

---

## 📞 Quick Help

```bash
# Get resource help
kubectl explain deployment
kubectl explain pod.spec

# Get available API resources
kubectl api-resources

# Get API version
kubectl api-versions

# Describe commands
kubectl describe node node-name
kubectl describe node --all-namespaces
```

---

## 🔗 Resource Links

- [Kubernetes Cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [kubectl Reference](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands)
- [Helm](https://helm.sh/docs/)
- [Docker CLI](https://docs.docker.com/engine/reference/commandline/docker/)
- [Terraform CLI](https://www.terraform.io/cli/commands)
- [Ansible CLI](https://docs.ansible.com/ansible/latest/cli/ansible.html)

---

## ⚡ Performance Tips

```bash
# Faster kubectl commands
alias k=kubectl
alias kn='kubectl -n happy-tails'

# Watch pods in real-time
watch kubectl get pods -n happy-tails

# Tail logs
kubetail -n happy-tails  # Install: npm install -g kubetail

# Fast port-forward
kubectl port-forward svc/backend 5000:5000 -n happy-tails &
```

---

**Last Updated:** January 19, 2026  
**Version:** 1.0  
**Status:** Production Ready ✅
