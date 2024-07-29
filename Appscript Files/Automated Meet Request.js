function sendEmailOnAppointmentSubmit(e) {
  var meetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Meet Appointments');
  var employeeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employee');
  
  var formResponses = e.values;
  var meetEmployeeName = formResponses[1]; 
  var meetDate = formResponses[2]; 
  var meetTime = formResponses[3];
  var meetPurpose = formResponses[4];
  
  var lastRow = meetSheet.getLastRow();
  var newId = lastRow;
  meetSheet.getRange(lastRow, 2).setValue(newId);
  
  var data = employeeSheet.getDataRange().getValues();
  var email = '';
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === meetEmployeeName) {
      email = data[i][2];
      break;
    }
  }
  
  if (email) {
    var subject = 'Thank you for submitting your appointment request.';
    var body = 'Appointment Details:\n' +
               'Purpose: ' + meetPurpose + '\n' +
               'Preferred Date: ' + meetDate + '\n' +
               'Preferred Time: ' + meetTime + '\n\n' +
               'Your appointment request is currently pending review. You will be notified once it has been reviewed.\n\n' +
               'Best regards,\nKirbix';
    MailApp.sendEmail(email, subject, body);
    Logger.log('Email sent to: ' + email);
  } else {
    Logger.log('No email found for submittedBy: ' + meetEmployeeName);
  }
}