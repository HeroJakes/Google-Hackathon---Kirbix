function onFormSubmitUpdateResource(e) {
  var responses = e.values;
  var itemName = responses[1];
  var quantityRequested = parseInt(responses[2]);
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Resources");
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === itemName) {
      var currentQuantity = parseInt(data[i][1]);
      var newQuantity = currentQuantity - quantityRequested;
      sheet.getRange(i + 1, 2).setValue(newQuantity);
      
      var allocatedQuantity = parseInt(data[i][3]);
      var newAllocatedQuantity = allocatedQuantity + quantityRequested;
      sheet.getRange(i + 1, 4).setValue(newAllocatedQuantity);
      
      if (newQuantity === 0) {
        sheet.getRange(i + 1, 5).setValue("Not Available");
      }
      break;
    }
  }
}