pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                bat '"C:\\Users\\laxmi\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker-compose.exe" build'
            }
        }

        stage('Deploy Application') {
            steps {
                bat '"C:\\Users\\laxmi\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker-compose.exe" up -d'
            }
        }

        stage('Verify Services') {
            steps {
                bat '"C:\\Users\\laxmi\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" ps'
            }
        }
    }
}