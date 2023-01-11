export type TaskFn = (state: CliState) => void | Promise<void>

export type CliState = {
  baseName: string
  absPath: string
  projectName: string
}
