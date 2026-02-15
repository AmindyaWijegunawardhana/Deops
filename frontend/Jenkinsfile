pipeline {
    agent any

    environment {
        REGISTRY = 'docker.io'
        REGISTRY_CREDENTIALS = 'docker-registry-credentials'
        IMAGE_BACKEND = 'happy-tails-backend:${BUILD_NUMBER}'
        IMAGE_FRONTEND = 'happy-tails-frontend:${BUILD_NUMBER}'
        DOCKER_COMPOSE_VERSION = '3.8'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo '🔄 Cloning repository...'
                    git branch: 'main', url: 'https://github.com/AmindyaWijegunawardhana/Happy-Tails',
                    credentialsId: 'github-token'
                }
            }
        }

        stage('Validate Docker Compose') {
            steps {
                script {
                    echo '✅ Validating docker-compose.yml...'
                    sh 'docker-compose config'
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    echo '🔨 Building backend Docker image...'
                    sh '''
                    cd backend
                    docker build -t ${IMAGE_BACKEND} \
                        --build-arg NODE_ENV=production \
                        -f Dockerfile .
                    echo "Backend image built: ${IMAGE_BACKEND}"
                    '''
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    echo '🔨 Building frontend Docker image...'
                    sh '''
                    cd frontend
                    docker build -t ${IMAGE_FRONTEND} \
                        --build-arg NODE_ENV=production \
                        -f Dockerfile-frontend .
                    echo "Frontend image built: ${IMAGE_FRONTEND}"
                    '''
                }
            }
        }

        stage('Scan Images with Trivy') {
            steps {
                script {
                    echo '🔍 Scanning Docker images for vulnerabilities...'
                    sh '''
                    echo "Installing Trivy if not exists..."
                    command -v trivy >/dev/null 2>&1 || {
                        curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin
                    }
                    
                    echo "Scanning backend image..."
                    trivy image --severity HIGH,CRITICAL ${IMAGE_BACKEND} || true
                    
                    echo "Scanning frontend image..."
                    trivy image --severity HIGH,CRITICAL ${IMAGE_FRONTEND} || true
                    '''
                }
            }
        }

        stage('Stop & Clean Previous Containers') {
            steps {
                script {
                    echo '🧹 Cleaning up previous containers...'
                    sh '''
                    docker-compose down --volumes || true
                    docker system prune -f --volumes || true
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    echo '🚀 Starting services with docker-compose...'
                    sh '''
                    export NODE_ENV=production
                    docker-compose up -d --remove-orphans
                    echo "Waiting for services to be healthy..."
                    sleep 10
                    '''
                }
            }
        }

        stage('Health Checks') {
            steps {
                script {
                    echo '💓 Running health checks...'
                    sh '''
                    echo "Checking Backend Health..."
                    for i in {1..30}; do
                        if docker exec happy-tails-backend node -e "require('http').get('http://localhost:5000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})" 2>/dev/null; then
                            echo "✅ Backend is healthy"
                            break
                        fi
                        if [ $i -eq 30 ]; then
                            echo "❌ Backend health check failed"
                            exit 1
                        fi
                        echo "Attempt $i/30 - retrying..."
                        sleep 2
                    done
                    
                    echo "Checking Frontend Health..."
                    for i in {1..30}; do
                        if docker exec happy-tails-frontend wget --quiet --tries=1 --spider http://localhost/index.html 2>/dev/null; then
                            echo "✅ Frontend is healthy"
                            break
                        fi
                        if [ $i -eq 30 ]; then
                            echo "❌ Frontend health check failed"
                            exit 1
                        fi
                        echo "Attempt $i/30 - retrying..."
                        sleep 2
                    done
                    '''
                }
            }
        }

        stage('Verify Services') {
            steps {
                script {
                    echo '📊 Verifying running containers...'
                    sh '''
                    echo "Running containers:"
                    docker ps -a
                    
                    echo "\\nContainer logs (backend):"
                    docker logs happy-tails-backend --tail=20 || true
                    
                    echo "\\nContainer logs (frontend):"
                    docker logs happy-tails-frontend --tail=20 || true
                    
                    echo "\\nNetwork information:"
                    docker network inspect happy-tails-network || true
                    '''
                }
            }
        }
    }

    post {
        success {
            script {
                echo '✅ Pipeline completed successfully!'
                echo '''
                =================================================
                Build Successful!
                =================================================
                Backend Image: ${IMAGE_BACKEND}
                Frontend Image: ${IMAGE_FRONTEND}
                
                Services are running on:
                - Frontend: http://localhost:80
                - Backend API: http://localhost:5000/api
                =================================================
                '''
            }
        }
        failure {
            script {
                echo '❌ Pipeline failed!'
                sh '''
                echo "Collecting debug information..."
                docker ps -a
                docker volume ls
                docker network ls
                '''
            }
        }
        always {
            script {
                echo '🧹 Cleanup: Removing unused Docker resources...'
                sh 'docker system prune -f || true'
            }
        }
    }
}