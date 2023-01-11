import { CliState } from '../Contracts'
import chalk from 'chalk'

export const greet = ({ baseName }: CliState) => {
  console.log('')

  console.log(chalk.dim('Run following commands to get started'))
  console.log(chalk.cyan(`> cd ${baseName}`))
  console.log(chalk.cyan('> yarn'))
  console.log(chalk.cyan('> yarn dev'))

  console.log('')
}
