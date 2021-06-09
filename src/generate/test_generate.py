import unittest
from generate import parseArgs

class TestParseArgs(unittest.TestCase):

    def test_multiple_multi_option_arg(self):
        a, _ = parseArgs("GETPIVOTDATA(value_name, any_pivot_table_cell, [original_column, ...], [pivot_item, ...])")
        self.assertEqual(a, [
            ('value name', 'VALUE_NAME'),
            ('any pivot table cell', 'ANY_PIVOT_TABLE_CELL'),
            ('[original column]', 'ORIGINAL_COLUMN'),
            ('[pivot item]', 'PIVOT_ITEM'),
        ])

    def test_variadic(self):
        a, _ = parseArgs(u"TEXTJOIN(delimiter, ignore_empty, text1, [text2], …)")
        self.assertEqual(a, [
            ('delimiter', 'DELIMITER'),
            ('ignore empty', 'IGNORE_EMPTY'),
            ('text1', 'TEXT1'),
            ('[text2]', 'TEXT2'),
        ])

    def test_flatten(self):
        a, _ = parseArgs("FLATTEN(range1,[range2,...])")
        self.assertEqual(a, [
            ('range1', 'RANGE1'),
            ('[range2]', 'RANGE2'),
        ])
# Array	FLATTEN	FLATTEN(range1,[range2,...])	Flattens all the values from one or more ranges into a single column. Learn more

if __name__ == '__main__':
    unittest.main()
