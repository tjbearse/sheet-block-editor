import Blockly from 'blockly'
import blocks from './blocks.json'
import { createRegisteredGenerators } from '../../blockDefToGenerator'

createRegisteredGenerators(blocks)
