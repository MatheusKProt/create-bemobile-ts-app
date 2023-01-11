import chalk from 'chalk'

export const getHelp = (packageManager: 'npm' | 'pnpm' | 'yarn') => {
  const runSentence =
    packageManager === 'yarn'
      ? 'yarn create bemobile-ts-app'
      : packageManager === 'pnpm'
      ? 'pnpm init bemobile-ts-app'
      : 'npm init bemobile-ts-app'

  return `${chalk.green(runSentence)} ${chalk.dim('<project-name>')}`
}
