function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Task Management');
  var data = sheet.getDataRange().getValues();
  var jsonData = JSON.stringify(data);
  return ContentService.createTextOutput(jsonData).setMimeType(ContentService.MimeType.JSON);
}
