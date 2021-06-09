
// https://github.com/zaach/jison/issues/300#issuecomment-533655312
import { readFileSync, writeFileSync } from "fs"
import jison from "jison"

const moduleName = "parser"

const source = new URL("./formula.jison", import.meta.url).pathname
const dest = new URL("./formula.js", import.meta.url).pathname

const grammar = readFileSync(source, "utf8")
const parser = new jison.Parser(grammar)

const parserSource = parser.generate({ moduleType: "js", moduleName })
writeFileSync(dest, `${parserSource}\nexport {${moduleName}}`)
