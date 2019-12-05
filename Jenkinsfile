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
    }
    stage("Lint") {
    	dir("${env.WORKSPACE}/game_api"){
		    sh "npm run eslint"
		}
    }
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
}