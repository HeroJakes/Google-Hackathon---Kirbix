// Main entry point for GET requests
function doGet(e) {
    var path = e.parameter.path;
    switch (path) {
        case 'getTaskData':
            return doGetTaskData();
        case 'getResourceAvailability':
            return doGetResourceAvailability();
        case 'getResourceRequests':
            return doGetResourceRequests();
        case 'getMeetRequests':
            return doGetMeetRequests();
        case 'getProjectReporting':
            return doGetProjectReporting();
        case 'getEmployeeData':
            return doGetEmployeeData();
        default:
            return ContentService.createTextOutput("Invalid GET request path").setMimeType(ContentService.MimeType.TEXT);
    }
}

// Main entry point for POST requests
function doPost(e) {
    var path = e.parameter.path;
    switch (path) {
        case 'updateProgress':
            return doPostUpdateProgress(e);
        default:
            return ContentService.createTextOutput("Invalid POST request path").setMimeType(ContentService.MimeType.TEXT);
    }
}

// Fetch Task Data
function doGetTaskData() {
    var sheet = SpreadsheetApp.openById('1hO7NPBr8WGoCYKbh_mO5_Bt6ivWD22R6wGYgKoXH-d8').getSheetByName('Sheet1');
    var data = sheet.getDataRange().getValues();
    return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
}

// Update Task Progress
function doPostUpdateProgress(e) {
    var sheet = SpreadsheetApp.openById('1hO7NPBr8WGoCYKbh_mO5_Bt6ivWD22R6wGYgKoXH-d8').getSheetByName('Sheet1');
    var taskId = e.parameter.taskId;
    var newProgress = e.parameter.progress;

    var range = sheet.getDataRange();
    var values = range.getValues();

    for (var i = 1; i < values.length; i++) {
        if (values[i][0] == taskId) { // Assuming Task ID is in the first column
            sheet.getRange(i + 1, 8).setValue(newProgress); // Update the progress in the 8th column
            return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
        }
    }
    return ContentService.createTextOutput("Task ID not found").setMimeType(ContentService.MimeType.TEXT);
}

// Fetch Resource Availability
function doGetResourceAvailability() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Resources");
    var data = sheet.getDataRange().getValues();
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// Fetch Resource Requests
function doGetResourceRequests() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Request Resources");
    var data = sheet.getDataRange().getValues();

    var result = [];
    for (var i = 1; i < data.length; i++) {
        var row = {
            timestamp: data[i][0],
            resourceName: data[i][1],
            quantityRequest: data[i][2],
            purpose: data[i][3]
        };
        result.push(row);
    }

    var output = ContentService.createTextOutput(JSON.stringify(result));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
}

// Fetch Meet Request Data
function doGetMeetRequests() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Meet Appointments");
    var data = sheet.getDataRange().getValues();
  
    // Get headers from the first row
    var headers = data[0];
  
    // Process data to format date and time
    var formattedData = data.map(function(row, rowIndex) {
        if (rowIndex === 0) {
            // Return headers as-is
            return row;
        }
    
        var dateValue = new Date(row[3]); // Adjusted index for Date
        var timeValue = new Date(row[4]); // Adjusted index for Time
    
        // Convert time to UTC+8 with 42-minute adjustment
        var adjustedTime = new Date(timeValue.getTime() + 42 * 60 * 1000); // Add 42 minutes in milliseconds
    
        var formattedDate = dateValue.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        var formattedTime = Utilities.formatDate(adjustedTime, Session.getScriptTimeZone(), "hh:mm a"); // Format time as HH:MM AM/PM
    
        var formattedRow = row.slice(); // Create a copy of the row
        formattedRow[3] = formattedDate; // Adjusted index for Date
        formattedRow[4] = formattedTime; // Adjusted index for Time
    
        return formattedRow;
    });
  
    return ContentService.createTextOutput(JSON.stringify(formattedData)).setMimeType(ContentService.MimeType.JSON);
}
// Fetch Project Reporting Data
function doGetProjectReporting() {
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

// Fetch Employee Data
function doGetEmployeeData() {
    var sheet = SpreadsheetApp.openById('1hO7NPBr8WGoCYKbh_mO5_Bt6ivWD22R6wGYgKoXH-d8').getSheetByName('Employee');
    var data = sheet.getDataRange().getValues();
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}