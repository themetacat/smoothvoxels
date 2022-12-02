import SIZEHandler from './SIZE.js'
import XYZIHandler from './XYZI.js'
import RGBAHandler from './RGBA.js'
import PACKHandler from './PACK.js'
import MATTHandler from './MATT.js'
import nTRNHandler from './nTRN.js'
import nGRPHandler from './nGRP.js'
import nSHPHandler from './nSHP.js'
import LAYRHandler from './LAYR.js'
import MATLHandler from './MATL.js'
import rOBJHandler from './rOBJ.js'
import IMAPHandler from './IMAP.js'
import SKIPHandler from './SKIP.js'

const chunkHandlers = {
  SIZE: SIZEHandler,
  XYZI: XYZIHandler,
  RGBA: RGBAHandler,
  PACK: PACKHandler,
  MATT: MATTHandler,
  nTRN: nTRNHandler,
  nGRP: nGRPHandler,
  nSHP: nSHPHandler,
  LAYR: LAYRHandler,
  MATL: MATLHandler,
  rOBJ: rOBJHandler,
  IMAP: IMAPHandler
}

export default function getChunkData (state, id, startIndex, endIndex) {
  if (!chunkHandlers[id]) {
    console.log('Unsupported chunk type ' + id)
    return SKIPHandler(state, startIndex, endIndex)
  }
  return chunkHandlers[id](state, startIndex, endIndex)
};
