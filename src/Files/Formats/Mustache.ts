import mustache from 'mustache'
import { file } from 'mrm-core'
import { readFileSync } from 'fs'
import { File } from '../Base/File'

export class MustacheFile extends File {
  private partialsPaths: { [key: string]: string } = {}
  private templateData: any = {}
  protected actions = []

  public filePointer: ReturnType<typeof file>
  public removeOnRollback = true
  public overwrite = false

  constructor(basePath: string, filename: string, private templatePath: string) {
    super(basePath)

    this.cdIn()
    this.filePointer = file(filename)
    this.cdOut()
  }

  private getPartials() {
    return Object.keys(this.partialsPaths).reduce((result: any, name) => {
      result[name] = this.readTemplate(this.partialsPaths[name])

      return result
    }, {})
  }

  private readTemplate(templatePath: string) {
    try {
      return readFileSync(templatePath, 'utf8')
    } catch (err) {
      throw Error(`Template file not found: ${templatePath}`)
    }
  }

  public get() {
    return this.filePointer.get()
  }

  public exists() {
    return this.filePointer.exists()
  }

  public partials(partials: { [key: string]: string }): this {
    this.partialsPaths = partials

    return this
  }

  public apply(contents?: any) {
    this.templateData = contents || {}

    return this
  }

  public commit() {
    this.cdIn()

    if (this.filePointer.exists() && !this.overwrite) {
      this.cdOut()

      return
    }

    try {
      this.filePointer.save(
        mustache.render(this.readTemplate(this.templatePath), this.templateData, this.getPartials())
      )
      this.cdOut()
    } catch (error) {
      this.cdOut()
      throw error
    }
  }

  public rollback() {
    this.cdIn()

    if (this.filePointer.exists() && this.removeOnRollback) {
      this.filePointer.delete()
    }

    this.cdOut()
  }
}
