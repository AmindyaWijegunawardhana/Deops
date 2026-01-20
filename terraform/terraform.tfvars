environment = "production"
aws_region  = "us-east-1"

project_name = "happy-tails"

vpc_cidr                         = "10.0.0.0/16"
eks_cluster_version              = "1.27"
eks_node_group_desired_size      = 3
eks_node_group_min_size          = 2
eks_node_group_max_size          = 10
eks_node_instance_types          = ["t3.medium", "t3.large"]

enable_monitoring = true
enable_logging    = true

container_image_backend = "happy-tails-backend:latest"
container_image_frontend = "happy-tails-frontend:latest"

replicas_backend  = 3
replicas_frontend = 3

tags = {
  Project     = "happy-tails"
  Environment = "production"
  ManagedBy   = "Terraform"
  Owner       = "DevOps Team"
}
