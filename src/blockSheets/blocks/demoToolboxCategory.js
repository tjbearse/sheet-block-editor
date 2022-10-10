import quadraticFormula from './demo/quadratic.json'
import percentChange from './demo/percentChange.json'
import circumference from './demo/circumference.json'
import circleArea from './demo/circleArea.json'

export default {
	"kind": "category",
	"name": "Demo Blocks",
	"contents": [
		{
			"kind": "label",
			"text": "Circle Area",
		},
		{
			"kind": "block",
			...circleArea,
		},
		{
			"kind": "label",
			"text": "Circle Circumference",
		},
		{
			"kind": "block",
			...circumference,
		},
		{
			"kind": "label",
			"text": "Percent Change",
		},
		{
			"kind": "block",
			...percentChange,
		},
		{
			"kind": "label",
			"text": "Quadratic (+)",
		},
		{
			"kind": "block",
			...quadraticFormula,
		},
	]
}
