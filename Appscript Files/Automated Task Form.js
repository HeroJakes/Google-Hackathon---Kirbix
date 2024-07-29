const sheets = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1rz8CykksXRD_59hUil9fgc0SSJPSV_ZNwRhErpSUJDU/edit?gid=0#gid=0");
const sheet = sheets.getSheetByName("Task Management");

function doPost(e) {
  let data = e.parameter;

  // Generate a custom task ID
  let customTaskId = generateCustomTaskId();

  // Get the current date and format it to display only the date part
  let currentDate = new Date();
  let formattedDate = Utilities.formatDate(currentDate, Session.getScriptTimeZone(), "yyyy-MM-dd");

  // Append the new task data to the sheet with the current date as the start date
  sheet.appendRow([customTaskId, data.taskName, data.assignedTo, formattedDate, data.dueDate, data.priority, data.status, data.progress, data.taskDetails]);

  // Call the function to send task assignment emails after appending the row
  sendTaskAssignmentEmails();

  return ContentService.createTextOutput("Success");
}

function generateCustomTaskId() {
  let lastRow = sheet.getLastRow(); // Get the last row number
  let nextIdNumber = lastRow; // The next ID is one more than the last row number
  return nextIdNumber;
}

function sendTaskAssignmentEmails() {
  var taskSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Task Management');
  var employeeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employee');
  
  var taskData = taskSheet.getDataRange().getValues();
  var employeeData = employeeSheet.getDataRange().getValues();
  
  var emailSentColumn = 10;
  var statusColumn = 7;
  var progressColumn = 8;

  for (var i = 1; i < taskData.length; i++) {
    Logger.log('Processing row: ' + (i + 1));
    Logger.log('Task data: ' + JSON.stringify(taskData[i]));

    if (!taskData[i][statusColumn - 1]) {
      Logger.log('Setting status to In Progress and progress to 0% for row: ' + (i + 1));
      taskSheet.getRange(i + 1, statusColumn).setValue('In Progress');
      taskSheet.getRange(i + 1, progressColumn).setValue('0%');
    }

    if (!taskData[i][emailSentColumn - 1]) {
      var assignedTo = taskData[i][2]; // Assigned To column
      var email = getEmailFromEmployeeData(assignedTo, employeeData);

      if (email) {
        var taskName = taskData[i][1]; // Task Name column
        var dueDate = taskData[i][4]; // Due Date column
        var priority = taskData[i][5]; // Priority column
        var taskDetails = taskData[i][8]; // Task Details column

        var subject = "New Task Assignment: " + taskName;
        var body = "Hello,\n\nYou have been assigned a new task.\n\n" +
                   "Task Name: " + taskName + "\n" +
                   "Due Date: " + dueDate + "\n" +
                   "Priority: " + priority + "\n" +
                   "Details: " + taskDetails + "\n\n" +
                   "Please review and take the necessary actions.\n\n" +
                   "Best regards,\nProject Manager";

        MailApp.sendEmail(email, subject, body);

        taskSheet.getRange(i + 1, emailSentColumn).setValue('Yes');
      }
    }
  }
}

function getEmailFromEmployeeData(employeeName, employeeData) {
  for (var i = 1; i < employeeData.length; i++) {
    if (employeeData[i][1] === employeeName) { // Employee Name column
      return employeeData[i][2]; // Email column
    }
  }
  return null;
}