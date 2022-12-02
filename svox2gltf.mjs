
// import ModelReader from 'smoothvoxels'
import ModelReader from '/Users/mzj/node_modules/smoothvoxels/src/smoothvoxels/modelreader.js'
import SvoxMeshGenerator from '/Users/mzj/node_modules/smoothvoxels/src/smoothvoxels/svoxmeshgenerator.js'
import SvoxToThreeMeshConverter from '/Users/mzj/node_modules/smoothvoxels/src/smoothvoxels/svoxtothreemeshconverter.js'
import Buffers from '/Users/mzj/node_modules/smoothvoxels/src/smoothvoxels/buffers.js'

// import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
// import * as THREE from 'three'
import { Blob } from 'buffer'
// import FileReader from 'filereader'
// const { SVOXBuffers, ModelReader, SvoxMeshGenerator, SvoxToThreeMeshConverter } = smoothvoxels
// global.THREE = THREE
// global.FileReader = FileReader
global.Blob = Blob
// global.window = { FileReader }

// const argv = yargs(hideBin(process.argv))
//   .command('$0 <input> [output]', 'Convert SVOX file to GLTF file', (argv) => {
//     argv
//       .option('binary', { alias: 'b', description: 'Save binary (.glb) GLTF file', type: 'boolean', default: false })
//       .positional('input', { describe: 'Input MagicaVoxel format VOX file', type: 'string' })
//       .positional('output', { describe: 'Output SVOX file', type: 'string', default: '-' })
//   }).help().argv
import * as fs from 'fs'
// 读取文件，再从读取内容中转化生成svox文件那步之前的结果
const svoxData = fs.readFileSync('./2MetaCat_Pet.svox')
console.log(svoxData)
// Model {name: 'main', light: ...}
// 对应生成svox的model
const model = ModelReader.readFromString(svoxData.toString())
console.log(model)

// buffers {maxFaces: 393216, ..}
const _buffers = new Buffers(1024 * 768 * 2)
console.log(_buffers)
const svoxmesh = SvoxMeshGenerator.generate(model, _buffers)
console.log(svoxmesh)

const mesh = SvoxToThreeMeshConverter.generate(svoxmesh)
console.log(mesh)
debugger

// const exporter = new GLTFExporter()
// const exportoptions = {
//   binary: !!argv.binary,
//   onlyVisible: true,
//   trs: true,
//   embedImages: true,
//   forcePowerOfTwoTextures: false,
//   truncateDrawRange: false,
//   forceIndices: true
// }

// exporter.parse(mesh, function (gltf) {
//   gltf = argv.binary ? gltf : JSON.stringify(gltf)

//   if (argv.output === '-') {
//     process.stdout.write(gltf)
//   } else {
//     fs.writeFileSync(argv.output, gltf)
//   }
// }, exportoptions)
