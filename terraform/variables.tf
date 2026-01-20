variable "aws_region" {
  type        = string
  description = "AWS region"
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "Project name"
  default     = "happy-tails"
}

variable "environment" {
  type        = string
  description = "Environment name (dev, staging, production)"
  default     = "production"
  
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "Environment must be dev, staging, or production."
  }
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block for VPC"
  default     = "10.0.0.0/16"
}

variable "eks_cluster_version" {
  type        = string
  description = "Kubernetes version for EKS"
  default     = "1.27"
}

variable "eks_node_group_desired_size" {
  type        = number
  description = "Desired number of worker nodes"
  default     = 3
}

variable "eks_node_group_min_size" {
  type        = number
  description = "Minimum number of worker nodes"
  default     = 2
}

variable "eks_node_group_max_size" {
  type        = number
  description = "Maximum number of worker nodes"
  default     = 10
}

variable "eks_node_instance_types" {
  type        = list(string)
  description = "Instance types for EKS worker nodes"
  default     = ["t3.medium", "t3.large"]
}

variable "enable_monitoring" {
  type        = bool
  description = "Enable CloudWatch monitoring"
  default     = true
}

variable "enable_logging" {
  type        = bool
  description = "Enable EKS control plane logging"
  default     = true
}

variable "container_image_backend" {
  type        = string
  description = "Docker image for backend"
  default     = "happy-tails-backend:latest"
}

variable "container_image_frontend" {
  type        = string
  description = "Docker image for frontend"
  default     = "happy-tails-frontend:latest"
}

variable "replicas_backend" {
  type        = number
  description = "Number of backend replicas"
  default     = 3
}

variable "replicas_frontend" {
  type        = number
  description = "Number of frontend replicas"
  default     = 3
}

variable "tags" {
  type        = map(string)
  description = "Common tags to apply to resources"
  default = {
    Application = "happy-tails"
    ManagedBy   = "Terraform"
  }
}
