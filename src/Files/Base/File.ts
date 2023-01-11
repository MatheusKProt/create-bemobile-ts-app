export abstract class File {
  protected abstract actions: { action: string; body?: any }[]

  private currentDir: string
  constructor(private basePath: string) {}

  protected addAction(action: string, body?: any): void {
    this.actions.push({ action, body })
  }

  protected getCommitActions() {
    return this.actions
  }

  protected getRevertActions() {
    return this.actions.slice().reverse()
  }

  protected cdIn() {
    this.currentDir = process.cwd()
    process.chdir(this.basePath)
  }

  protected cdOut() {
    process.chdir(this.currentDir)
  }
}
