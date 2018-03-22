#!/usr/bin/env groovy

void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/nicksenger/react-arcgis"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

pipeline {

    agent {
        docker {
            image 'node'
            args '-u root'
        }
    }

    stages {
        stage('Install') {
            steps {
                setBuildStatus("Installing dependencies..", "PENDING");
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                setBuildStatus("Running the tests..", "PENDING");
                echo 'Testing...'
                sh 'npm run test:junit'
                sh 'npm run report:cobertura'
            }
        }
        stage('Build') {
            steps {
                setBuildStatus("Building the library..", "PENDING");
                echo 'Building...'
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'package.json', fingerprint: true
            junit("*.xml");
            step([$class: 'CoberturaPublisher', coberturaReportFile: 'coverage/cobertura-coverage.xml'])
        }
        failure {
            setBuildStatus("¯\\_(ツ)_/¯", "FAILURE");
        }
        success {
            setBuildStatus("(b^_^)b", "SUCCESS");
        }
    }
}