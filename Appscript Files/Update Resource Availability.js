function onFormSubmitUpdateResource(e) {
  // Get the form responses from the "Request Resources" sheet
  var responses = e.values;
  
  // Extract relevant data from the form submission
  var itemName = responses[1];  // Resource Name from the form (2nd column in "Request Resources")
  var quantityRequested = parseInt(responses[2]);  // Quantity Requested from the form (3rd column in "Request Resources")
  
  // Access the "Resources" sheet
  var resourcesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Resources");
  var resourcesData = resourcesSheet.getDataRange().getValues();
  
  // Iterate through the rows in the "Resources" sheet to find the matching resource name
  for (var i = 1; i < resourcesData.length; i++) {
    if (resourcesData[i][0] === itemName) {  // Check if the resource name matches (1st column in "Resources")
      // Subtract the requested quantity from the available quantity
      var currentQuantity = parseInt(resourcesData[i][1]);  // Available Quantity (2nd column in "Resources")
      var newQuantity = currentQuantity - quantityRequested;
      
      // Update the available quantity in the "Resources" sheet
      resourcesSheet.getRange(i + 1, 2).setValue(newQuantity);  // Update 2nd column (Available Quantity)
      
      // Add the requested quantity to the allocated quantity
      var allocatedQuantity = parseInt(resourcesData[i][3]);  // Allocated Quantity (4th column in "Resources")
      var newAllocatedQuantity = allocatedQuantity + quantityRequested;
      
      // Update the allocated quantity in the "Resources" sheet
      resourcesSheet.getRange(i + 1, 4).setValue(newAllocatedQuantity);  // Update 4th column (Allocated Quantity)
      
      // Update the status if the available quantity is 0 or less
      if (newQuantity <= 0) {
        resourcesSheet.getRange(i + 1, 5).setValue("Not Available");  // Update 5th column (Status)
      }
      break;  // Stop the loop once the item is found and updated
    }
  }
}