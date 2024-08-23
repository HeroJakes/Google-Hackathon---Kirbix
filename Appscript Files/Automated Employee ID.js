function onFormSubmitEmployee(e) {
  // Get the submitted data
  const formResponses = e.values; // This contains the row data submitted by the form
  const employeeName = formResponses[1]; // Assuming Employee Name is in the 2nd column of the form
  const email = formResponses[2]; // Assuming Email is in the 3rd column of the form

  // Define the target sheet and range
  const employeeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employee');

  // Generate Employee ID based on the number of entries in the Employee sheet
  const lastRow = employeeSheet.getLastRow();
  const employeeId = 'E' + lastRow.toString().padStart(2, '0'); // Adjust padding as needed

  // Append the new employee data to the Employee sheet
  employeeSheet.appendRow([employeeId, employeeName, email]);
}