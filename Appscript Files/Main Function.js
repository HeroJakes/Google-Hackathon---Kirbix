function onFormSubmitHandler(e) {
  var sheet = e.range.getSheet();
  var sheetName = sheet.getName();
  
  if (sheetName === 'Project Reporting') {
    handleProjectReportingSubmit(e);
  } else if (sheetName === 'Resources') {
    onFormSubmitUpdateResource(e);
  } else if (sheetName === 'Meet Appointments') {
    sendEmailOnAppointmentSubmit(e);
  } else if (sheetName === 'Employee Form') {
    onFormSubmitEmployee(e);
  } else {
    Logger.log('No handler for sheet: ' + sheetName);
  }
}