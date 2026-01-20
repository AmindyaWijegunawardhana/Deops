# Complete Deployment Guide

## Prerequisites

```bash
# Install required tools
- Terraform >= 1.0
- kubectl >= 1.27
- Helm >= 3.0
- AWS CLI >= 2.0
- Ansible >= 2.10
- Docker >= 24.0
```

## Phase 1: Infrastructure Setup with Terraform

### 1.1 Initialize Terraform

```bash
cd terraform

# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Plan infrastructure
terraform plan -out=tfplan

# Review the plan output
```

### 1.2 Deploy Infrastructure

```bash
# Apply Terraform plan
terraform apply tfplan

# Save outputs
terraform output > outputs.txt

# Get kubeconfig
aws eks update-kubeconfig --region us-east-1 --name happy-tails-production
```

### 1.3 Verify Cluster

```bash
# Check cluster status
kubectl cluster-info

# Verify nodes
kubectl get nodes

# Check kube-system pods
kubectl get pods -n kube-system
```

## Phase 2: Kubernetes Namespace Setup

### 2.1 Create Namespace and Policies

```bash
# Apply namespace and initial policies
kubectl apply -f kubernetes/namespaces/namespace.yaml

# Verify namespace
kubectl get namespace happy-tails

# Check network policies
kubectl get networkpolicies -n happy-tails
```

## Phase 3: Secrets and ConfigMaps

### 3.1 Create Secrets

```bash
# Create backend secrets
kubectl apply -f kubernetes/secrets/secrets.yaml

# Verify secrets
kubectl get secrets -n happy-tails

# IMPORTANT: Update JWT_SECRET and DATABASE_URL with real values!
kubectl edit secret backend-secrets -n happy-tails
```

### 3.2 Create ConfigMaps

```bash
# Create configuration
kubectl apply -f kubernetes/configmaps/configmap.yaml

# Verify config
kubectl get configmaps -n happy-tails
```

## Phase 4: Application Deployment

### 4.1 Deploy Backend

```bash
# Apply backend deployment
kubectl apply -f kubernetes/deployments/backend-deployment.yaml

# Verify deployment
kubectl get deployment backend -n happy-tails

# Check pods
kubectl get pods -n happy-tails -l app=backend

# View backend logs
kubectl logs -f deployment/backend -n happy-tails

# Wait for ready status
kubectl wait --for=condition=available --timeout=300s \
  deployment/backend -n happy-tails
```

### 4.2 Deploy Frontend

```bash
# Apply frontend deployment
kubectl apply -f kubernetes/deployments/frontend-deployment.yaml

# Verify deployment
kubectl get deployment frontend -n happy-tails

# Check pods
kubectl get pods -n happy-tails -l app=frontend

# View frontend logs
kubectl logs -f deployment/frontend -n happy-tails

# Wait for ready status
kubectl wait --for=condition=available --timeout=300s \
  deployment/frontend -n happy-tails
```

## Phase 5: Expose Services

### 5.1 Create Services

```bash
# Apply services
kubectl apply -f kubernetes/services/services.yaml

# Verify services
kubectl get svc -n happy-tails

# Get service details
kubectl describe svc backend -n happy-tails
kubectl describe svc frontend -n happy-tails
```

### 5.2 Setup Ingress

```bash
# Install NGINX Ingress Controller (if not installed)
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx --create-namespace

# Wait for LoadBalancer to get external IP
kubectl get svc -n ingress-nginx --watch

# Apply ingress rules
kubectl apply -f kubernetes/ingress/ingress.yaml

# Verify ingress
kubectl get ingress -n happy-tails

# Get load balancer endpoint
kubectl get svc ingress-nginx-controller -n ingress-nginx \
  -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
```

## Phase 6: Network Policies

```bash
# Apply network policies
kubectl apply -f kubernetes/network-policies/network-policy.yaml

# Verify policies
kubectl get networkpolicies -n happy-tails

# Describe policy
kubectl describe networkpolicy allow-backend-from-frontend -n happy-tails
```

## Phase 7: Auto-scaling

```bash
# Apply HPA configuration
kubectl apply -f kubernetes/horizontal-pod-autoscaler/hpa.yaml

# Verify HPA
kubectl get hpa -n happy-tails

# Watch HPA in action
kubectl get hpa -n happy-tails --watch
```

## Phase 8: Storage (Optional)

```bash
# Apply persistent volumes
kubectl apply -f kubernetes/persistent-volumes/pvc.yaml

# Verify PVCs
kubectl get pvc -n happy-tails

# Check PV status
kubectl get pv
```

## Phase 9: Deployment with Ansible

### 9.1 Prepare Ansible

```bash
cd ansible

# Install required collections
ansible-galaxy collection install kubernetes.core

# Verify inventory
ansible-inventory -i inventory/production.yml --list
```

### 9.2 Run Deployment Playbook

```bash
# Deploy applications
ansible-playbook playbooks/deploy-k8s.yml -i inventory/production.yml

# Configure applications
ansible-playbook playbooks/configure-app.yml -i inventory/production.yml

# Run health checks
ansible-playbook playbooks/health-checks.yml -i inventory/production.yml
```

## Phase 10: Verification and Testing

### 10.1 Health Checks

```bash
# Check pods status
kubectl get pods -n happy-tails -o wide

# Check pod events
kubectl describe pod <pod-name> -n happy-tails

# Test backend health
kubectl port-forward svc/backend 5000:5000 -n happy-tails &
curl http://localhost:5000/api/health

# Test frontend
kubectl port-forward svc/frontend 8080:80 -n happy-tails &
curl http://localhost:8080
```

### 10.2 Connectivity Tests

```bash
# Test frontend to backend connectivity
kubectl exec -it deployment/frontend -n happy-tails -- \
  curl http://backend:5000/api/health

# Test DNS resolution
kubectl exec -it deployment/backend -n happy-tails -- \
  nslookup frontend.happy-tails.svc.cluster.local

# Test network policies
kubectl exec -it deployment/backend -n happy-tails -- \
  curl http://frontend:80
```

### 10.3 Load Testing

```bash
# Install Apache Bench (if not present)
apt-get install apache2-utils

# Load test frontend
ab -n 1000 -c 10 http://<loadbalancer-url>/

# Load test backend
ab -n 1000 -c 10 http://<backend-url>/api/health
```

## Phase 11: Monitoring Setup (Optional)

```bash
# Install Prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack \
  -n monitoring --create-namespace

# Install Grafana
helm repo add grafana https://grafana.github.io/helm-charts
helm install grafana grafana/grafana -n monitoring

# Port forward to Grafana
kubectl port-forward svc/grafana 3000:80 -n monitoring
```

## Phase 12: CI/CD Integration

### 12.1 Update Jenkins

```groovy
// In Jenkinsfile
pipeline {
    stages {
        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    # Update kubeconfig
                    aws eks update-kubeconfig --region us-east-1 --name happy-tails-production
                    
                    # Deploy with kubectl
                    kubectl apply -f kubernetes/
                    
                    # Wait for deployment
                    kubectl rollout status deployment/backend -n happy-tails
                    kubectl rollout status deployment/frontend -n happy-tails
                '''
            }
        }
    }
}
```

## Troubleshooting

### Issue: Pods not starting

```bash
# Check pod logs
kubectl logs pod/<pod-name> -n happy-tails

# Describe pod for events
kubectl describe pod/<pod-name> -n happy-tails

# Check resource availability
kubectl top nodes
kubectl top pods -n happy-tails
```

### Issue: Services not communicating

```bash
# Verify service endpoints
kubectl get endpoints -n happy-tails

# Check network policies
kubectl get networkpolicies -n happy-tails

# Test connectivity
kubectl exec -it pod/<pod-name> -n happy-tails -- bash
# Inside pod: curl http://backend:5000/api/health
```

### Issue: Ingress not working

```bash
# Check ingress status
kubectl describe ingress happy-tails -n happy-tails

# Verify ingress controller
kubectl get pods -n ingress-nginx

# Check ingress controller logs
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller
```

## Cleanup

```bash
# Delete applications
kubectl delete namespace happy-tails

# Destroy infrastructure (Terraform)
cd terraform
terraform destroy

# Remove kubeconfig
aws eks delete-cluster --name happy-tails-production --region us-east-1
```

## Next Steps

1. Setup monitoring and alerting
2. Configure backup and disaster recovery
3. Implement service mesh (Istio)
4. Setup log aggregation (ELK stack)
5. Configure auto-scaling policies
6. Implement secrets rotation
7. Setup compliance scanning

## References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Ansible Kubernetes Module](https://docs.ansible.com/ansible/latest/collections/kubernetes/core/index.html)
- [EKS Best Practices](https://aws.github.io/aws-eks-best-practices/)
