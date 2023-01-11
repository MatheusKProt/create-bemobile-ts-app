import gradient from 'gradient-string'

const art = Buffer.from(
  'CiAgX19fXyAgICAgICAgICAgICAgICAgICAgICAgXyAgICAgXyBfICAgICAgCiB8IF9fICkgIF9fXyBfIF9fIF9fXyAgIF9fXyB8IHxfXyAoXykgfCBfX18gCiB8ICBfIFwgLyBfIFwgJ18gYCBfIFwgLyBfIFx8ICdfIFx8IHwgfC8gXyBcCiB8IHxfKSB8ICBfXy8gfCB8IHwgfCB8IChfKSB8IHxfKSB8IHwgfCAgX18vCiB8X19fXy8gXF9fX3xffCB8X3wgfF98XF9fXy98Xy5fXy98X3xffFxfX198CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCg==',
  'base64'
).toString()

export const showArt = () => console.log(gradient(['#0C479A', '#5984C0', '#B2CEF5']).multiline(art))
