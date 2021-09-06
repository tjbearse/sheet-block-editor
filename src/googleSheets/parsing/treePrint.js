// test helpers to compare and print trees

const bar = "│  "
const lpoint = "┌──"
const bpoint = "├──"
const rpoint = "└──"

// inspired by https://www.baeldung.com/java-print-binary-tree-diagram
const treeToString = (t, padding="", pointer="───", childLeft=false, childRight=false) => {
	let node, left, right;
	let preRoot = padding + pointer;
	let childPad = padding + bar;
	let childSpace = padding + "   ";
	switch(t.kind) {
		case 'value':
			return `${preRoot}v:${t.value} ${JSON.stringify(t)}\n`
		case 'range':
			return `${preRoot}r:${t.range}\n`
		case 'func':
			node = `${preRoot}f:${t.name}\n`
			for (let i=0; i < t.args.length - 1; i++) {
				node += treeToString(t.args[i], childRight? childPad : childSpace, bpoint, true, false)
			}
			// last one gets right pointer
			if (t.args.length > 0) {
				node += treeToString(t.args[t.args.length - 1], childRight? childPad : childSpace, rpoint, true, false)
			}
			return node
		case 'binaryOp':
			left = treeToString(t.left, childLeft? childPad : childSpace, lpoint, false, true)
			right = treeToString(t.right, childRight? childPad: childSpace, rpoint, true, false)
			node = `${preRoot}b:${t.symb}\n`
			return left + node + right
		case 'unaryOp':
			node = `${preRoot}u:${t.symb}\n`
			right = treeToString(t.right, childRight? childPad: childSpace, rpoint, true, false)
			return node + right
		default:
			return `${preRoot}?:${JSON.stringify(t)}\n`
	}
}


expect.extend({
	toTreeEqual(received, expected) {
		if (this.equals(received, expected)) {
			return {
				message: () =>
					`not expected:\n${treeToString(expected)}\ngot:\n${treeToString(received)}`,
				pass: true,
			};
		} else {
			return {
				message: () =>
					`expected:\n${treeToString(expected)}\ngot:\n${treeToString(received)}`,
				pass: false,
			};
		}
	},
});
