function myFunction() {
  Logger.log(Session.getEffectiveUser());
}


function setBotToken(){
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt("Please enter your bot's token");
  
  //Get the button that the user pressed.
  var button = result.getSelectedButton();
  
  if (button === ui.Button.OK) {
    Logger.log("The user clicked the [OK] button.");
    Logger.log(result.getResponseText());
  } else if (button === ui.Button.CLOSE) {
    Logger.log("The user clicked the [X] button and closed the prompt dialog."); 
  }
}

/**
 * Set webhook for the bot.
 * prints the results to the logger.
 */
 //Run every time webAppUrl is changed to connect the bot with this new webAppUrl
 function deleteWebhook() {
  var response =  UrlFetchApp.fetch(url + "/deleteWebhook");
  Logger.log(response.getContentText());
}


function demoPost(){
  m = {"update_id":666346941,
"message":{"message_id":1309,"from":{"id":986383258,"is_bot":false,"first_name":"d","username":"DAVlDST","language_code":"en"},"chat":{"id":986383258,"first_name":"d","username":"DAVlDST","type":"private"},"date":1634062821,"text":"2065"}}
  // Logger.log(m);
  doPost({postData:{contents:JSON.stringify(m)}});
}