import { isAbsolute, join } from 'path'

import { readdirSync } from 'fs'

import { CliState } from 'src/Contracts'
import { ensureDirSync } from 'fs-extra'

import { resolve } from 'path'
import { pathExistsSync } from 'fs-extra'

export async function getState(
  projectRoot: string,
  options: {
    projectName?: string
  }
): Promise<CliState> {
  const absPath = isAbsolute(projectRoot) ? projectRoot : join(process.cwd(), projectRoot)

  ensureDirSync(absPath)

  return {
    baseName: projectRoot,
    absPath,
    projectName: options.projectName!,
  }
}

export function isEmptyDir(location: string): boolean {
  try {
    const files = readdirSync(location)

    return files.length === 0
  } catch (error) {
    return false
  }
}

export function getPackageManager(appRoot: string): 'yarn' | 'pnpm' | 'npm' {
  if (pathExistsSync(resolve(appRoot, 'yarn.lock'))) {
    return 'yarn'
  }

  if (pathExistsSync(resolve(appRoot, 'pnpm-lock.yaml'))) {
    return 'pnpm'
  }

  if (process.env.npm_config_user_agent) {
    if (process.env.npm_config_user_agent.includes('yarn')) {
      return 'yarn'
    }

    if (process.env.npm_config_user_agent.includes('pnpm')) {
      return 'pnpm'
    }
  }

  return 'npm'
}
