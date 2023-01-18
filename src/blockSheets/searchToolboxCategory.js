import { ToolboxCategory } from 'blockly'
import { formatFunctionName } from './generatedBlocks/formatGeneratedFunctions'

const resultsLimit = 50;

// genAllBlocks is a generator toolbox item. Should include "search" key, lowercase
export function createSearchCategory(genAllBlocks) {
	class SearchCategory extends ToolboxCategory {
		constructor(categoryDef, toolbox, opt_parent) {
			super(categoryDef, toolbox, opt_parent);
		}
		createDom_() {
			// IDEA debounce
			const listener = () => {
				const toolbox = this.parentToolbox_;
				if (toolbox.getSelectedItem() !== this) {
					toolbox.setSelectedItem(this)
				} else {
					toolbox.refreshSelection()
				}
			}

			this.input = document.createElement('input');
			// TODO dispose
			this.input.className="search-bar"
			this.input.addEventListener('input', listener) 
			const d = super.createDom_()
			const row = d.children[0];
			row.append(this.input);
			row.className += " search-bar-row"
			return d;
		}
		getContents() {
			const searchKey = this.input.value.toLowerCase();
			const res = pipe(
				genAllBlocks(),
				a => filter(e => e?.search?.includes(searchKey), a),
				// go limit+1 so we can tell if results are truncated
				a => limit(resultsLimit+1, a),
				a => Array.from(a),
			)
			if (res.length > resultsLimit) {
				res.pop();
				// IDEA button to load more
				res.push({ kind: 'label', text: 'results truncated ...' })
				return res;
			} else if (res.length) {
				return res;
			} else {
				return [{
					kind: 'label',
					text: 'No Results'
				}]
			}
		}
	}
	return SearchCategory;
}

// IDEA fuzzy search
// IDEA sort search based on relevance
// IDEA intermediate for for fast search? trie?
function *filter(pred, arr) {
	for(let e of arr) {
		if (pred(e)) {
			yield e;
		}
	}
}
function *limit(n, iter) {
	let i = 0;
	for(let e of iter) {
		if (i == n) {
			return;
		}
		yield e;
		i++;
	}
}

function pipe(a,...fns) {
	for(let fn of fns) {
		a = fn(a);
	}
	return a;
}
