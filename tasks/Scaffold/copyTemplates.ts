import { join } from 'path'
import { fsReadAll } from '@poppinss/utils/build/helpers'

import { TaskFn } from '../../src/Contracts'
import { MustacheFile } from '../../src/Files/Formats/Mustache'

const task: TaskFn = (state) => {
  const baseDir = join(__dirname, '..', '..', 'template')

  const templateFiles = fsReadAll(baseDir, () => true)

  const dictNames = {
    'env': '.env',
    'editorconfig': '.editorconfig',
    'eslintignore': '.eslintignore',
    'eslintrc.json': '.eslintrc.json',
    'gitignore': '.gitignore',
    'prettierrc': '.prettierrc',
  } as any

  templateFiles.forEach((name: string) => {
    const outputFileName = (dictNames[name] || name).replace(/\.txt$/, '.ts')

    const src = join(baseDir, name)

    new MustacheFile(state.absPath, outputFileName, src).apply(state).commit()
  })
}

export default task
