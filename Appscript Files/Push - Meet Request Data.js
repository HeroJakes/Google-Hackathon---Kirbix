// Function to handle HTTP GET requests
function doGet() {
  return ContentService.createTextOutput(JSON.stringify(getFormattedData())).setMimeType(ContentService.MimeType.JSON);
}

// Function to format and return data from the "Meet appointments" sheet
function getFormattedData() {
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
  
  return formattedData;
}
