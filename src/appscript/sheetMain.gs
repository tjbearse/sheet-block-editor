function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Blocks')
      .addItem('Edit as Blocks', 'showBlockEditDialog')
      .addToUi();
}

function showBlockEditDialog() {
  var html = HtmlService.createHtmlOutputFromFile('blocks')
      .setWidth(1000)
      .setHeight(800);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Edit As Blocks');
}

function getActiveCellFormula() {
  // var activeRange = selection.getActiveRange();
  var currentCell = SpreadsheetApp.getActiveSheet().getActiveCell();

  var formula = currentCell.getFormula()
  return formula
}

function setActiveCellFormula(formula) {
  // var activeRange = selection.getActiveRange();
  var currentCell = SpreadsheetApp.getActiveSheet().getActiveCell();
  currentCell.setFormula(formula)
}

