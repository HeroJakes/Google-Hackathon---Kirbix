function handleProjectReportingSubmit(e) {
  var projectSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Project Reporting');
  var employeeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employee');
  
  var range = e.range;
  var row = range.getRow();
  
  var taskID = 'TASK-' + Utilities.getUuid().slice(0, 8);
  projectSheet.getRange(row, 2).setValue(taskID);
  projectSheet.getRange(row, 7).setValue("In Review");
  
  var taskName = projectSheet.getRange(row, 3).getValue();
  var submittedBy = projectSheet.getRange(row, 4).getValue();
  var submissionDate = projectSheet.getRange(row, 5).getValue();
  var fileSubmissionUrl = projectSheet.getRange(row, 6).getValue();
  
  var data = employeeSheet.getDataRange().getValues();
  var email = '';
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === submittedBy) {
      email = data[i][2];
      break;
    }
  }
  
  if (email) {
    var subject = 'Project Report Submitted';
    var body = 'Hello ' + submittedBy + ',\n\n' +
               'Your project report "' + taskName + '" has been successfully submitted on ' + submissionDate + '.\n\n' +
               'You can view your submission here: ' + fileSubmissionUrl + '\n\n' +
               'Your task has been received and is currently pending review by the project manager. You will be notified once your task has been reviewed.\n\n' +
               'Best regards,\n' +
               'Project Manager';
    MailApp.sendEmail(email, subject, body);
  } else {
    Logger.log('No email found for submittedBy: ' + submittedBy);
  }
}