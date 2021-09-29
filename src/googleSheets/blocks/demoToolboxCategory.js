const percentChangeXml = `
	<block type="sheets_arithmetic">
		<field name="OP">DIVIDE</field>
		<value name="A">
			<block type="sheets_arithmetic">
				<field name="OP">MINUS</field>
				<value name="A">
					<block type="sheets_cell">
						<field name="CELL">a1</field>
					</block>
				</value>
				<value name="B">
					<block type="sheets_cell">
						<field name="CELL">b2</field>
					</block>
				</value>
			</block>
		</value>
		<value name="B">
			<block type="sheets_ABS">
				<value name="VALUE">
					<block type="sheets_cell">
						<field name="CELL">b2</field>
					</block>
				</value>
			</block>
		</value>
	</block>
`;

const quadraticFormula = ` <block type="sheets_arithmetic">
	<field name="OP">DIVIDE</field>
	<value name="A">
		<block type="sheets_arithmetic">
			<field name="OP">ADD</field>
			<value name="A">
				<block type="sheets_negate">
					<value name="A">
						<block type="sheets_cell">
							<field name="CELL">b1</field>
						</block>
					</value>
				</block>
			</value>
			<value name="B">
				<block type="sheets_SQRT">
					<value name="VALUE">
						<block type="sheets_arithmetic">
							<field name="OP">MINUS</field>
							<value name="A">
								<block type="sheets_POW">
									<value name="BASE">
										<block type="sheets_cell">
											<field name="CELL">b1</field>
										</block>
									</value>
									<value name="EXPONENT">
										<block type="sheets_number">
											<field name="NUM">2</field>
										</block>
									</value>
								</block>
							</value>
							<value name="B">
								<block type="sheets_arithmetic">
									<field name="OP">MULTIPLY</field>
									<value name="A">
										<block type="sheets_arithmetic">
											<field name="OP">MULTIPLY</field>
											<value name="A">
												<block type="sheets_number">
													<field name="NUM">4</field>
												</block>
											</value>
											<value name="B">
												<block type="sheets_cell">
													<field name="CELL">a1</field>
												</block>
											</value>
										</block>
									</value>
									<value name="B">
										<block type="sheets_cell">
											<field name="CELL">c1</field>
										</block>
									</value>
								</block>
							</value>
						</block>
					</value>
				</block>
			</value>
		</block>
	</value>
	<value name="B">
		<block type="sheets_arithmetic">
			<field name="OP">MULTIPLY</field>
			<value name="A">
				<block type="sheets_number">
					<field name="NUM">2</field>
				</block>
			</value>
			<value name="B">
				<block type="sheets_cell">
					<field name="CELL">a1</field>
				</block>
			</value>
		</block>
	</value>
</block>`

const circumference = `<block type="sheets_arithmetic" x="0" y="0">
		<field name="OP">MULTIPLY</field>
		<value name="A">
			<block type="sheets_arithmetic">
				<field name="OP">MULTIPLY</field>
				<value name="A">
					<block type="sheets_number">
						<field name="NUM">2</field>
					</block>
				</value>
				<value name="B">
					<block type="sheets_PI"></block>
				</value>
			</block>
		</value>
		<value name="B">
			<block type="sheets_cell">
				<field name="CELL">r1</field>
			</block>
		</value>
	</block>`

const circleArea = `<block type="sheets_arithmetic" x="0" y="0">
		<field name="OP">MULTIPLY</field>
		<value name="A">
			<block type="sheets_PI"></block>
		</value>
		<value name="B">
			<block type="sheets_arithmetic">
				<field name="OP">POWER</field>
				<value name="A">
					<block type="sheets_cell">
						<field name="CELL">r1</field>
					</block>
				</value>
				<value name="B">
					<block type="sheets_number">
						<field name="NUM">2</field>
					</block>
				</value>
			</block>
		</value>
	</block>`

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
			"blockxml": circleArea,
		},
		{
			"kind": "label",
			"text": "Circle Circumference",
		},
		{
			"kind": "block",
			"blockxml": circumference,
		},
		{
			"kind": "label",
			"text": "Percent Change",
		},
		{
			"kind": "block",
			"blockxml": percentChangeXml,
		},
		{
			"kind": "label",
			"text": "Quadratic (+)",
		},
		{
			"kind": "block",
			"blockxml": quadraticFormula,
		},
	]
}
