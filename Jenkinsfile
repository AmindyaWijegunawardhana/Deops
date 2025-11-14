def DOCKER_HUB_CREDENTIALS = '2698a822-32d0-445d-b52f-e34b87034630'
def DOCKER_USER = 'amindya'
def BACKEND_IMAGE = "${DOCKER_USER}/backend-api"
def FRONTEND_IMAGE = "${DOCKER_USER}/react-app"
def BUILD_TAG = ""

pipeline {
    agent any

    stages {

        stage('Prepare Build Tag') {
            steps {
                script {
                    BUILD_TAG = env.BUILD_NUMBER
                }
            }
        }

        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/AmindyaWijegunawardhana/Happy-Tails'
            }
        }
        
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER')]) {
                    sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}"
                }
            }
        }
        
        stage('Build & Push Backend') {
            steps {
                sh "docker build -t ${BACKEND_IMAGE}:${BUILD_TAG} -t ${BACKEND_IMAGE}:latest ./backend"
                sh "docker push ${BACKEND_IMAGE}:${BUILD_TAG}"
                sh "docker push ${BACKEND_IMAGE}:latest"
            }
        }
        
        stage('Build & Push Frontend') {
            steps {
                sh "docker build -f ./frontend/Dockerfile -t ${FRONTEND_IMAGE}:${BUILD_TAG} -t ${FRONTEND_IMAGE}:latest ."
                sh "docker push ${FRONTEND_IMAGE}:${BUILD_TAG}"
                sh "docker push ${FRONTEND_IMAGE}:latest"
            }
        }
        
        stage('Cleanup') {
            steps {
                sh "docker rmi -f ${BACKEND_IMAGE}:latest || true"
                sh "docker rmi -f ${FRONTEND_IMAGE}:latest || true"
            }
        }
    }
}
