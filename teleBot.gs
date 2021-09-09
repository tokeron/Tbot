

/**
 * downloads file from the user.
 * @param {(String|Number)} fileId The identifier of the file to download.
 * @param {String} fileName The name of the file.
 * @return {Blob} The downloaded file. 
 */
function downloadFile(fileId,fileName){
  var response = UrlFetchApp.fetch(url + '/getFile?file_id=' + fileId);
  var urlphoto = 'https://api.telegram.org/file/bot' + token + '/' + JSON.parse(response.getContentText()).result.file_path;
  var file = UrlFetchApp.fetch(urlphoto);
  var blob = file.getBlob();
  blob.setName(fileName);
  return blob;
}

/**
 * Get bot updates from telegram.
 * prints the results to the logger.
 */
function getUpdates() {
  var response =  UrlFetchApp.fetch(url + "/getUpdates");
  Logger.log(response.getContentText());
}

/**
 * Set webhook for the bot.
 * prints the results to the logger.
 */
 //Run every time webAppUrl is changed to connect the bot with this new webAppUrl
 function setWebhook() {
  var response =  UrlFetchApp.fetch(url + "/setWebhook?url=" + webAppUrl);
  Logger.log(response.getContentText());
}

/**
 * Sends text with optional internal keyboard.
 * @param {(String|Number)} chatId Identifier of the chat to send the text to.
 * @param {String} text The text to send.
 * @param {TelegramInlineKeyboard} keyboard The inline keyboard to send.
 */
//sendText(chatId, text, keyboard)
//Description: sends text to chatId with(optional) exeternal keyboard.
//input: chat id, string and(optional) the name of the exeternal keyboared.
function sendText(chatId, text, keyboard) {
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatId),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify({
        "inline_keyboard": keyboard,
      })
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

/**
 * Sends text with optional external keyboard.
 * @param {(String|Number)} chatId Identifier of the chat to send the text to.
 * @param {String} text The text to send.
 * @param {TelegramKeyboard} keyboard The keyboard to pop-up.
 */
//sendKey(chatId, text, keyBoard)
//Description: sends text to chatId with internal keyboared(optional).
//input: chat id, string and the name of the internal keyboared(optional).
function sendKey(chatId, text, keyBoard) {
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatId),
      text: text,
      parse_mode: "Markdown",
      reply_markup: JSON.stringify({
        "keyboard": keyBoard,
      })
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}
/**
 * Sends text and remove the external keyboard.
 * @param {(String|Number)} chatId Identifier of the chat to send the text to.
 * @param {String} text The text to send.
 */
function removeKey(chatId, text) {
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatId),
      text: text,
      reply_markup: JSON.stringify({
        remove_keyboard: true })
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}