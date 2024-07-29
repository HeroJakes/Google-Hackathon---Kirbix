function doGet() {
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
    
    // Log for debugging
    Logger.log(result);
    
    var output = ContentService.createTextOutput(JSON.stringify(result));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
}