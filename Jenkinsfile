pipeline {
  agent any
  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Run UI Cucumber tests') {
      steps {
        // allow passing tags via parameter
        script {
          def tags = params.TEST_TAGS ?: '@ui'
          sh "npm run test:ui -- --tags \"${tags}\""
        }
      }
    }
  }
  parameters {
    string(name: 'TEST_TAGS', defaultValue: '@ui', description: 'Tags to filter Cucumber scenarios')
  }
}
