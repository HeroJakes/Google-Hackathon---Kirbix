function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Project Reporting'); 
  const data = sheet.getDataRange().getValues();
  
  const result = [];
  
  for (let i = 1; i < data.length; i++) {
    result.push({
      taskId: data[i][1],
      taskName: data[i][2],
      submittedBy: data[i][3],
      submissionDate: data[i][4],
      fileSubmission: data[i][5],
      status: data[i][6]
    });
  }
  
  const output = JSON.stringify(result);
  
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}