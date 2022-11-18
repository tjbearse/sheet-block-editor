import unittest
from unittest.case import skip
from generate import parseArgs

class TestParseArgs(unittest.TestCase):

    def test_basic(self):
        a, v = parseArgs("ARRAY_CONSTRAIN(input_range, num_rows, num_cols)")
        self.assertEqual(a, ['input_range', 'num_rows', 'num_cols'])
        self.assertEqual(v, None)

    def test_optional(self):
        a, v = parseArgs("GROWTH(known_data_y, [known_data_x], [new_data_x], [b])")
        self.assertEqual(a, ['known_data_y', '[known_data_x]', '[new_data_x]', '[b]'])
        self.assertEqual(v, None)

    def test_variadic_in_optional(self):
        a, v = parseArgs("FLATTEN(range1,[range2,...])")
        self.assertEqual(a, ['range1'])
        self.assertEqual(v, dict(
            argNames=['range'],
            enumStart=2,
            positionStart=1,
        ))

    def test_trailing_variadic(self):
        a, v = parseArgs(u"TEXTJOIN(delimiter, ignore_empty, text1, [text2], …)")
        self.assertEqual(a, ['delimiter', 'ignore_empty', 'text1'])
        self.assertEqual(v, dict(
            argNames=['text'],
            enumStart=2,
            positionStart=3,
        ))

    def test_trailing_pair_variadic(self):
        # [a1,b1], ...
        a, v = parseArgs("SORTN(range, [n], [display_ties_mode], [sort_column1, is_ascending1], ...)")
        self.assertEqual(a, ['range', '[n]', '[display_ties_mode]'])
        self.assertEqual(v, dict(
            argNames=['sort_column', 'is_ascending'],
            enumStart=1,
            positionStart=3,
        ))

    def test_interior_pair_variadic(self):
        # [a2, b2, ...]
        a, v = parseArgs("SUMIFS(sum_range, criteria_range1, criterion1, [criteria_range2, criterion2, ...])")
        self.assertEqual(a, ['sum_range', 'criteria_range1', 'criterion1'])
        self.assertEqual(v, dict(
            argNames=['criteria_range', 'criterion'],
            enumStart=2,
            positionStart=3,
        ))

    def test_variadic_offset(self):
        a, v = parseArgs("SWITCH(expression, case1, value1, [default or case2, value2], …)")
        self.assertEqual(a, ['expression', 'case1', 'value1', 'default'])
        self.assertEqual(v, dict(
            argNames=['case', 'value'],
            enumStart=2,
            positionStart=3,
        ))

    @skip('js not ready to receive serial variadics, github issue #36')
    def test_series_variadic(self):
        a, v = parseArgs("GETPIVOTDATA(value_name, any_pivot_table_cell, [original_column, ...], [pivot_item, ...])")
        self.assertEqual(a, [
            'value_name',
            'any_pivot_table_cell'
        ])
        self.assertEqual(v, dict(
            argNames=['original_column', 'pivot_item'],
            enumStart=1,
            positionStart=2,
            series=True,
        ))

if __name__ == '__main__':
    unittest.main()
