import Blockly from 'blockly'

import './Logical/blocks'
import './Math/blocks'
import './Text/blocks'
import './Values/blocks'

import { createBlockFromArrayDef } from './formatGeneratedFunctions'

import blocks from './generated/blocks.json'

blocks.forEach(d => createBlockFromArrayDef(d))
