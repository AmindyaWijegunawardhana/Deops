def DOCKER_HUB_CREDENTIALS = '2698a822-32d0-445d-b52f-e34b87034630'
def DOCKER_USER = 'amindya'
def BACKEND_IMAGE = "${DOCKER_USER}/backend-api"
def FRONTEND_IMAGE = "${DOCKER_USER}/react-app"

pipeline {
    agent any

    environment {
        BUILD_TAG = "${env.BUILD_NUMBER}"
    }

    stages {

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, 
                                                  passwordVariable: 'DOCKER_PASSWORD', 
                                                  usernameVariable: 'DOCKER_USER')]) {
                    sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}"
                }
            }
        }

        stage('Build & Push Backend') {
            steps {
                sh """
                    docker build -t ${BACKEND_IMAGE}:${BUILD_TAG} -t ${BACKEND_IMAGE}:latest ./backend
                    docker push ${BACKEND_IMAGE}:${BUILD_TAG}
                    docker push ${BACKEND_IMAGE}:latest
                """
            }
        }

        stage('Build & Push Frontend') {
            steps {
                sh """
                    docker build -f ./frontend/Dockerfile -t ${FRONTEND_IMAGE}:${BUILD_TAG} -t ${FRONTEND_IMAGE}:latest .
                    docker push ${FRONTEND_IMAGE}:${BUILD_TAG}
                    docker push ${FRONTEND_IMAGE}:latest
                """
            }
        }

        stage('Cleanup') {
            steps {
                sh """
                    docker rmi -f ${BACKEND_IMAGE}:latest || true
                    docker rmi -f ${FRONTEND_IMAGE}:latest || true
                """
            }
        }
    }
}
