# Component Connectivity and Networking Guide

## Architecture Overview

This document details how all components communicate with each other in the Happy Tails infrastructure.

## 1. Network Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                     Internet / Users                            │
└────────────────────────┬─────────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                 │
        ▼                                 ▼
   ┌────────────┐                  ┌─────────────┐
   │  AWS ELB   │                  │  CloudFront │
   │(Load Bal)  │                  │   (CDN)     │
   └─────┬──────┘                  └──────┬──────┘
         │                                │
         └────────────────┬───────────────┘
                          │
        ┌─────────────────▼─────────────────┐
        │  AWS IGW (Internet Gateway)       │
        └─────────────────┬─────────────────┘
                          │
        ┌─────────────────▼─────────────────┐
        │  VPC (Virtual Private Cloud)      │
        │  CIDR: 10.0.0.0/16                │
        │                                   │
        │  ┌─────────────────────────────┐  │
        │  │  Public Subnets (NGW)       │  │
        │  │  10.0.0.0/24, 10.0.1.0/24   │  │
        │  └──────────────┬──────────────┘  │
        │                 │                  │
        │  ┌──────────────▼──────────────┐  │
        │  │ EKS Cluster                 │  │
        │  │ Kubernetes 1.27             │  │
        │  │                             │  │
        │  │ ┌───────────────────────┐  │  │
        │  │ │ Ingress Controller    │  │  │
        │  │ │ (NGINX)               │  │  │
        │  │ └──────┬────────────────┘  │  │
        │  │        │                   │  │
        │  │ ┌──────┴─────────┬───────┐ │  │
        │  │ │                │       │ │  │
        │  │ ▼                ▼       ▼ │  │
        │  │ ┌──────┐    ┌────────┐   │ │  │
        │  │ │Backend   │Frontend │   │ │  │
        │  │ │Pods  │   │Pods    │   │ │  │
        │  │ │(3+)  │   │(3+)    │   │ │  │
        │  │ └──────┘   └────────┘   │ │  │
        │  │                         │ │  │
        │  │ ┌──────────────────────┐│ │  │
        │  │ │ Network Policies     ││ │  │
        │  │ │ Service Mesh (opt)   ││ │  │
        │  │ └──────────────────────┘│ │  │
        │  └─────────────────────────┘  │
        │                               │
        │  ┌──────────────────────────┐ │
        │  │  Private Subnets        │ │
        │  │  10.0.2.0/24, 10.0.3.0/24   │
        │  │  (Worker Nodes)         │ │
        │  └──────────────────────────┘ │
        └───────────────────────────────┘
                    │
        ┌───────────┴────────────┐
        │                        │
        ▼                        ▼
   ┌─────────┐            ┌──────────┐
   │  RDS    │            │  ElastiCache
   │ (MySQL) │            │  (Redis) │
   └─────────┘            └──────────┘
```

## 2. Component Communication Flows

### 2.1 Frontend to Backend Communication

**Route:**
```
User Browser → AWS ELB → Ingress (NGINX) → Frontend Service → Frontend Pods
                                                ↓
                                        Frontend (React/Nginx)
                                                ↓
                                    API Calls to http://backend:5000/api
                                                ↓
                                        Backend Service (ClusterIP)
                                                ↓
                                        Backend Pods (Node.js)
```

**Network Details:**
- Frontend makes API calls to `http://backend:5000/api`
- Uses Kubernetes Service Discovery (DNS)
- Service name resolves to: `backend.happy-tails.svc.cluster.local`
- ClusterIP ensures load balancing across backend pods

**DNS Resolution:**
```
Frontend Pod DNS Query:
  → Query: backend.happy-tails.svc.cluster.local
  → Response: 10.0.x.x (ClusterIP of backend service)
  → Connection established to backend pod
```

### 2.2 External User to Frontend Communication

**Route:**
```
User → Internet → AWS ELB (Port 443) 
    → Ingress Controller (NGINX) 
    → Frontend Service 
    → Frontend Pod (Port 80 on container)
```

**Ingress Rules:**
- `/` → routes to frontend service (React app)
- `/api/*` → routes to backend service

**TLS/SSL:**
- Certificates managed by cert-manager
- Let's Encrypt integration for automatic renewal
- Port 443 on ELB → Port 80 on ingress

### 2.3 Backend to Database Communication

**Route:**
```
Backend Pod → RDS Endpoint (aws-rds.amazonaws.com:3306)
    ↓
Database Connection Pool
    ↓
MySQL Database
```

**Connection Details:**
- Connection string via environment variable `DATABASE_URL`
- Stored in Kubernetes Secret `db-secrets`
- SSL/TLS for secure communication

### 2.4 Inter-Pod Communication (Service-to-Service)

**Example: Backend Pod to another Backend Pod**
```
Backend Pod 1 → Kubernetes DNS → Service ClusterIP
            ↓
    Backend Pod 2 or Pod 3 (load balanced)
```

**Service Discovery:**
- Uses CoreDNS in kube-system namespace
- Pod-to-pod communication via pod IPs directly
- Service names resolve to stable ClusterIP

## 3. Network Policies

### 3.1 Ingress Policies (Incoming Traffic)

```yaml
# Allow frontend pods to receive traffic from ingress controller
ingress:
  from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
  ports:
    - protocol: TCP
      port: 80

# Allow backend pods to receive traffic only from frontend
ingress:
  from:
    - podSelector:
        matchLabels:
          app: frontend
  ports:
    - protocol: TCP
      port: 5000
```

### 3.2 Egress Policies (Outgoing Traffic)

```yaml
# Allow DNS queries (port 53 TCP/UDP)
egress:
  - to:
      - namespaceSelector: {}
    ports:
      - protocol: TCP
        port: 53
      - protocol: UDP
        port: 53

# Allow pod-to-pod communication
egress:
  - to:
      - podSelector: {}
```

## 4. Service Discovery

### 4.1 Kubernetes DNS

**CoreDNS Setup:**
- Running in kube-system namespace
- Provides cluster DNS on 10.0.0.10:53
- All pods configured to use it

**DNS Resolution Patterns:**

```
# Service within same namespace
backend.happy-tails.svc.cluster.local

# Service in different namespace
backend.default.svc.cluster.local

# Pod DNS
pod-name.deployment-name.namespace.svc.cluster.local
```

### 4.2 Service Types and Their Usage

| Service Type | Use Case | Connectivity |
|---|---|---|
| ClusterIP | Internal communication | Pod-to-pod only |
| NodePort | External access to pods | Node IP + Port |
| LoadBalancer | Production external access | AWS ELB |
| ExternalName | External service reference | DNS CNAME |

## 5. Load Balancing

### 5.1 Frontend Load Balancing
```
External User
    ↓
AWS ELB (port 443) - Layer 4
    ↓
Ingress NGINX (Layer 7)
    ↓
Frontend Service (ClusterIP) - Load balanced across replicas
    ↓
Frontend Pod 1, 2, 3...
```

### 5.2 Backend Load Balancing
```
Frontend Pod
    ↓
Backend Service (ClusterIP) - Round-robin load balancing
    ↓
Backend Pod 1, 2, 3...
```

### 5.3 Auto-scaling Based on Metrics

```
Horizontal Pod Autoscaler (HPA) monitors:
  - CPU Utilization (target: 70%)
  - Memory Utilization (target: 80%)
    ↓
  If exceeded → Scale up to max 10 pods
  If below → Scale down to min 2 pods
```

## 6. Security: Network Policies in Action

### 6.1 Default Deny All

```yaml
# No traffic allowed by default
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

### 6.2 Allow Specific Traffic

```yaml
# Only allow frontend → backend
from:
  - podSelector:
      matchLabels:
        app: frontend
ports:
  - protocol: TCP
    port: 5000
```

## 7. Data Flow Diagrams

### 7.1 Complete Request Flow

```
1. User Browser (192.168.1.100)
    ↓ HTTPS request to app.happy-tails.com
2. AWS Route53 (DNS)
    ↓ Resolves to ELB IP
3. AWS ELB (Layer 4 LB)
    ↓ Forwards to Ingress Controller (10.0.0.x)
4. Ingress NGINX Controller (Layer 7)
    ↓ Routes based on path
    ├→ / → frontend-service:80
    └→ /api → backend-service:5000
5. Frontend Service (ClusterIP: 10.1.x.x)
    ↓ Round-robin to pods
    ├→ frontend-pod-1 (10.244.x.x)
    ├→ frontend-pod-2 (10.244.x.x)
    └→ frontend-pod-3 (10.244.x.x)
6. Frontend Pod (React/Nginx)
    ↓ User sees application
    ↓ Makes API call to http://backend:5000/api
7. Backend Service DNS Resolution
    ↓ backend → backend.happy-tails.svc.cluster.local
    ↓ Resolves to ClusterIP: 10.1.y.y
8. Backend Service (ClusterIP)
    ↓ Round-robin to backend pods
    ├→ backend-pod-1 (10.244.y.y)
    ├→ backend-pod-2 (10.244.y.y)
    └→ backend-pod-3 (10.244.y.y)
9. Backend Pod (Node.js)
    ↓ Processes API request
    ↓ Queries database
10. Database Connection
    ↓ Connection string: mysql://user:pass@aws-rds.amazonaws.com:3306/happy_tails
    ↓ RDS Instance (in private subnet via NAT)
    ↓ Returns data
11. Response Chain (reverse)
    Backend → Frontend → User Browser
```

## 8. Environment Variable Propagation

### 8.1 Frontend Environment Variables

```
ConfigMap: frontend-config
  ├─ VITE_API_URL=http://backend:5000/api
  └─ VITE_APP_VERSION=1.0.0

↓ Injected into Frontend Pod

Container receives:
  process.env.VITE_API_URL = "http://backend:5000/api"
  process.env.VITE_APP_VERSION = "1.0.0"
```

### 8.2 Backend Environment Variables

```
ConfigMap: backend-config
  ├─ NODE_ENV=production
  ├─ SERVER_PORT=5000
  └─ LOG_LEVEL=info

Secret: backend-secrets
  ├─ JWT_SECRET=****
  ├─ DATABASE_URL=****
  └─ API_KEY=****

↓ Injected into Backend Pod

process.env = {
  NODE_ENV: "production",
  SERVER_PORT: "5000",
  LOG_LEVEL: "info",
  JWT_SECRET: "****",
  DATABASE_URL: "****",
  API_KEY: "****"
}
```

## 9. Connectivity Verification Commands

```bash
# Check if services are running
kubectl get svc -n happy-tails

# Verify pods are communicating
kubectl exec -it frontend-pod-xyz -n happy-tails -- \
  curl http://backend:5000/api/health

# Check DNS resolution
kubectl exec -it frontend-pod-xyz -n happy-tails -- \
  nslookup backend.happy-tails.svc.cluster.local

# View network policies
kubectl get networkpolicies -n happy-tails

# Check service endpoints
kubectl get endpoints -n happy-tails

# View logs
kubectl logs -f deployment/backend -n happy-tails
kubectl logs -f deployment/frontend -n happy-tails

# Port forward for testing
kubectl port-forward svc/backend 5000:5000 -n happy-tails
kubectl port-forward svc/frontend 8080:80 -n happy-tails
```

## 10. Troubleshooting Connectivity Issues

### Issue: Frontend cannot reach backend

**Check points:**
1. Verify backend pod is running: `kubectl get pods -n happy-tails`
2. Check service exists: `kubectl get svc backend -n happy-tails`
3. Verify network policies allow traffic
4. Check backend logs: `kubectl logs -l app=backend -n happy-tails`
5. Test DNS: `kubectl exec pod/frontend-xxx -n happy-tails -- nslookup backend`

### Issue: External users cannot reach application

**Check points:**
1. Verify ingress: `kubectl get ingress -n happy-tails`
2. Check ingress controller logs
3. Verify DNS is pointing to ELB
4. Check AWS security groups
5. Verify TLS certificates are valid

### Issue: Database connection failed

**Check points:**
1. Verify RDS is accessible: `kubectl exec pod/backend-xxx -- telnet rds-endpoint 3306`
2. Check database credentials in secrets
3. Verify backend can reach RDS (NAT gateway config)
4. Check RDS security groups

## 11. Performance and Optimization

### 11.1 Connection Pooling
- Backend uses connection pools to RDS
- Reduces latency for database queries

### 11.2 Service Mesh (Optional: Istio/Linkerd)
- Advanced traffic management
- Circuit breaking
- Distributed tracing
- Mutual TLS

### 11.3 CDN (CloudFront)
- Frontend static assets cached
- Reduces latency for global users
- Offloads bandwidth

## 12. Monitoring Connectivity

### 12.1 Prometheus Metrics
- Pod network I/O
- Service latency
- Connection counts

### 12.2 Grafana Dashboards
- Network traffic visualization
- Pod-to-pod communication matrix
- DNS resolution times

### 12.3 Jaeger Tracing
- Distributed request tracing
- Service call graph
- Latency analysis

## References

- [Kubernetes Networking](https://kubernetes.io/docs/concepts/services-networking/)
- [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [DNS for Services](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)
- [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
