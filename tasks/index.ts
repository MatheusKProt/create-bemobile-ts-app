import copyTemplates from './Scaffold/copyTemplates'

export const tasks = function () {
  return [
    {
      title: 'Scaffold project',
      actions: [copyTemplates],
    },
  ]
}
