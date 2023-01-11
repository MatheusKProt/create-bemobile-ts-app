import getopts from 'getopts'
import chalk from 'chalk'

import { getState, isEmptyDir, getPackageManager } from './src/Helpers'
import { tasks } from './tasks'
import { greet } from './src/Chalk/greet'
import { showArt } from './src/Chalk/art'
import { getHelp } from './src/Chalk/help'

import { tasks as tasksUi } from '@poppinss/cliui'

export async function runTasks(args: string[]) {
  showArt()

  const argv = getopts(args, {
    string: ['name'],
  })

  if (!argv._.length) {
    console.log(getHelp(getPackageManager(process.cwd())))

    return
  }

  const projectPath = argv._[0].trim()

  const state = await getState(projectPath, {
    projectName: argv.name,
  })

  if (!isEmptyDir(state.absPath)) {
    const errors = [
      `Cannot overwrite contents of {${projectPath}} directory.`,
      'Make sure to define path to an empty directory',
    ]

    console.log('')
    console.error(errors.join(' '))

    return
  }

  const tasksManager = tasksUi()

  tasks().forEach(({ title, actions }) => {
    tasksManager.add(title, async (taskLogger, task) => {
      for (let action of actions) {
        await action(state)
      }
      await task.complete()
    })
  })

  console.log('')
  console.log(chalk.green('RUNNING TASKS'))

  try {
    await tasksManager.run()
  } catch (error) {
    tasksManager.state = 'failed'
    tasksManager.error = error
  }

  console.log('Project created successfully')
  greet(state)
}
