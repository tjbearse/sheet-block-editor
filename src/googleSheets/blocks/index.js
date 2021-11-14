import Blockly from 'blockly'

import './Logical/blocks'
import './Math/blocks'
import './Text/blocks'
import './Values/blocks'

import blocks from './generated/blocks.json'

Blockly.defineBlocksWithJsonArray(blocks)
