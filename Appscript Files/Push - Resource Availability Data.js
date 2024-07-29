function doGet() {
  return ContentService.createTextOutput(JSON.stringify(getData())).setMimeType(ContentService.MimeType.JSON);
}

function getData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Resources");
  var data = sheet.getDataRange().getValues();
  return data;
}