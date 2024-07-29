function doGet() {
  return ContentService.createTextOutput(JSON.stringify(getEmployeeData()))
      .setMimeType(ContentService.MimeType.JSON);
}

function getEmployeeData() {
  var sheet = SpreadsheetApp.openById('1rz8CykksXRD_59hUil9fgc0SSJPSV_ZNwRhErpSUJDU').getSheetByName('Employee');
  var data = sheet.getDataRange().getValues();
  return data;
}