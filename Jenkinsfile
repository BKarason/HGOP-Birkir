node {
    def git = checkout scm
    stage("Clean") {
    	sh "echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'"
		  sh "git clean -dfxq"
		  sh "git stash"
    }
    stage("Setup") {
    	dir("${env.WORKSPACE}/game_api"){
		    sh "npm install"
		}
		dir("${env.WORKSPACE}/game_client"){
		    sh "npm install"
		}
    }
    stage("Lint") {
    	dir("${env.WORKSPACE}/game_api"){
		    sh "npm run eslint"
		}
    }
    stage("Test") {
    	dir("${env.WORKSPACE}/game_api"){
		    sh "npm run test:unit"
            step([
              $class: 'CloverPublisher',
              cloverReportDir: 'coverage',
              cloverReportFileName: 'clover.xml',
              healthyTarget: [methodCoverage: 80, conditionalCoverage: 80, statementCoverage: 80],
              unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50],
              failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
            ])
		}
    }
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
    stage("API Test") {
      sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} apitest"
      dir("game_api") {
          sh "./../scripts/api_test.sh"
      }
    }
    stage("Capacity Test") {
      sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} capacitytest"
      dir("game_api") {
          sh "./../scripts/capacity_test.sh"
      }
    }
    stage("Deploy") {
    	sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} production" 
    }
}