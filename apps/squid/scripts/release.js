const { spawnSync } = require('child_process')

const projectName = process.env.PROJECT_NAME || 'wayfinder'
const githubUrl = process.env.GITHUB_URL || 'https://github.com/TalismanSociety/wayfinder-monorepo.git#main'
const version = '0'

const squidCommand = process.argv.includes('--update') ? 'update' : 'release'
const reset = squidCommand === 'update' && process.argv.includes('--reset') ? '--hardReset' : ''

const command = `sqd squid ${squidCommand} -v ${projectName}@${version} --source ${githubUrl} ${reset}`
console.log(command)
spawnSync(command, { shell: true, stdio: [process.stdin, process.stdout, process.stderr], encoding: 'utf-8' })
