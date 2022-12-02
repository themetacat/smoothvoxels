// import { hideBin } from 'yargs/helpers'
// import yargs from 'yargs'
import voxToSvox from '/Users/mzj/node_modules/smoothvoxels/src/vox-to-svox/index.js'
import ModelWriter from '/Users/mzj/node_modules/smoothvoxels/src/smoothvoxels/modelwriter.js'
import * as fs from 'fs'
// const { voxToSvox } = smoothvoxels

const voxData = fs.readFileSync('./MetaCat_Pet.vox')

// const voxData = fs.readFileSync('./origin.vox')
console.log(voxData)
const model = voxToSvox(voxData)
console.log(model)

// true
const compressed = 'auto' === 'auto' && Math.max(model.size.x, model.size.y, model.size.z) >= 32

// 31 32 31
const modelSize = model.size.x === model.size.y && model.size.x === model.size.z ? `${model.size.x}` : `${model.size.x} ${model.size.y} ${model.size.z}`

// get scale
const modelScale = ', scale = ' + (model.scale.x === model.scale.y && model.scale.x === model.scale.z ? `${model.scale.x}` : `${model.scale.x} ${model.scale.y} ${model.scale.z}`)
const modelOrigin = `, origin = ${model.origin}`
console.log('modelScale ', modelScale)
console.log('modelOrigin ', modelOrigin)

const modelLine = `size = ${modelSize}${modelScale}${modelOrigin}${'' ? ', ' + '' : ''}`
console.log('modelLine ',modelLine)
// debugger
const out = ModelWriter.writeToString(model, compressed, false, modelLine, 'lighting = both, deform = 4' || null)
debugger
if (argv.output === '-') {
  process.stdout.write(out)
} else {
  fs.writeFileSync(argv.output, out)
}
