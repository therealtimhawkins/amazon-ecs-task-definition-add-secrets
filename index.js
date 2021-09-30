const core = require("@actions/core")
const github = require("@actions/github")

try {
  console.log("Adding secrets...")
  const taskDefinition = core.getInput("task-definition")
  const secrets = core.getInput("secrets")

  const taskDefinitionPath = path.isAbsolute(taskDefinition)
    ? taskDefinition
    : path.join(process.env.GITHUB_WORKSPACE, taskDefinition)
  if (!fs.existsSync(taskDefinitionPath)) {
    throw new Error(`Task definition file does not exist: ${taskDefinition}`)
  }

  const secretsPath = path.isAbsolute(secrets)
    ? secrets
    : path.join(process.env.GITHUB_WORKSPACE, secrets)
  if (!fs.existsSync(secretsPath)) {
    throw new Error(`Secrets file does not exist: ${secrets}`)
  }

  const taskDefinitionContents = require(taskDefinitionPath)
  const secretsContents = require(secretsPath)

  console.log(taskDefinitionContents, secretsContents)
} catch (error) {
  core.setFailed(error.message)
}
