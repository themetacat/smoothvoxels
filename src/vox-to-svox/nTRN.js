import readDict from './read-dict.js'

export default function nTRNHandler (state, startIndex, endIndex) {
  const ret = {}

  // node id
  ret.node_id = state.Buffer.readInt32LE(state.readByteIndex)
  state.readByteIndex += 4

  // DICT node attributes
  ret.attributes = readDict(state)
  // child node id
  ret.child_id = state.Buffer.readInt32LE(state.readByteIndex)
  state.readByteIndex += 4

  // reserved id
  ret.reserved_id = state.Buffer.readInt32LE(state.readByteIndex)
  console.assert(ret.reserved_id === -1, 'reserved id must be -1')
  state.readByteIndex += 4

  // layer id
  ret.layer_id = state.Buffer.readInt32LE(state.readByteIndex)
  state.readByteIndex += 4

  // num of frames
  ret.num_of_frames = state.Buffer.readInt32LE(state.readByteIndex)
  console.assert(ret.num_of_frames >= 1, 'num frames must be 1')
  state.readByteIndex += 4

  ret.frame_transforms = []
  for (let i = 0; i < ret.num_of_frames; i++) {
    ret.frame_transforms.push(readDict(state))
  }

  console.assert(state.readByteIndex === endIndex, `nTRN chunk length mismatch: ${state.readByteIndex} ${endIndex}`)

  return ret
};
