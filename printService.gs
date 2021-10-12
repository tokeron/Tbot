/**
 * handles print message.
 * @param {TelegramMessage} msg Message that contains a file.
 */
function handlePrint(msg){
  var id = msg.from.id;
  var data = {type:0, files:[]};
  if(reg1==PRINT_SERVICE.symbol)data = JSON.parse(reg3);
  else saveUser({id:id, reg1:PRINT_SERVICE.symbol, reg2:0, reg3:0, reg4:0, reg5:0});
  var file = null;
  if (msg.photo){
    // file = downloadFile(msg.photo[msg.photo.length - 1].file_id, "photo.jpg");
    var id = msg.photo[msg.photo.length - 1].file_id;
    file = {id, name:id+".jpg"};
  }
  if (msg.document){
    // file = downloadFile(msg.document.file_id, msg.document.file_name);
    file = {id:msg.document.file_id, name:msg.document.file_name};
  } 
  if(file){
    data.files.push(file);
    if(reg1!=PRINT_SERVICE.symbol){
      let text = PRINT_SERVICE.messageBase+`\n1. ${file.name}`;
      data.message = sendText(id, text, PRINT_SERVICE.defaultKeyboard);
    }else{
      data.message.text += `\n${data.files.length}. ${file.name}`;
      editMessageText(id, data.message.message_id, data.message.text, data.message.reply_markup.inline_keyboard);
    }
    saveUser({id:id, reg3:JSON.stringify(data)})
  }
}

/**
 * Send an email with files to print servise.
 * @param {Blob[]} files The files to send.
 * @param {(String|Number)} chatId The identifier of the telegram chat.
 * @param {(String|Number)} studentId The ID number of the student.
 * @param {String} printType the type of the print.
 *              avilable types: bws, bwd, A3bws, A3bwd, color,A3color ,2pbws (2 slides per page), 2pbwd, 4pbws, 4pbwd
 */
function sendEmail(files,chatId, studentId,printType){
  //GmailApp.sendEmail('dontokeron@gmail.com', studentId,"hello", {
  GmailApp.sendEmail('Print.' + printType + '@campus.technion.ac.il', studentId,"print for me please", {
    attachments: files,
    name: 'Automatic Emailer Script',
    replyTo: Session.getEffectiveUser().getEmail().replace("@",`+${chatId}@`)
  });
  if(fetchAndInc(PRINT_SERVICE.counter)==0){
  ScriptApp.newTrigger(PRINT_SERVICE.responseFunc).timeBased()
  .everyMinutes(1).create();
  }
}

/**
 * Checking for new mails from the printing service and notify the users
 * (using the printerResponseNotify function)
 */
function readPrinterEmailResponse(){
  GmailApp.search(PRINT_SERVICE.mailQuery)
  .reduce((coll,t)=>{
    coll.push(...t.getMessages().filter(m=>m.isUnread()));
    return coll;}, [])
  .forEach(printerResponseNotify);
}

/**
 * Notify the user about response for the printing requst.
 * @param {GmailApp.GmailMessage} mail The response from the printing service.
 */
async function printerResponseNotify(mail){
  if(fetchAndDec(PRINT_SERVICE.counter)==1){
    ScriptApp.deleteTrigger(
      ScriptApp.getScriptTriggers()
      .filter(t=>t.getHandlerFunction()===PRINT_SERVICE.responseFunc)[0]);
  }
  var chatId = mail.getTo().split(/[+@]/)[1];
  var content = mail.getPlainBody();
  sendText(chatId, content.split("Hello\n",2)[1]);
  mail.markRead();
}

/**
 * reset the counter of the print service. need to be done in case of error.
 */
function resetPrinterCounter(){
  ScriptProperties.setProperty(PRINT_SERVICE.counter,0);
  // Logger.log(ScriptProperties.getProperty(PRINT_SERVICE.counter))
}


const PRINT_CB_HANDLERS = {};

PRINT_CB_HANDLERS[PRINT_SERVICE.cb.cancel] = /** @param {TelegramCallbackQuery} cb */ function(cb){
  let id = cb.from.id;
  let message = JSON.parse(reg3).message;
  editMessageText(id, message.message_id, "הפעולה בוטלה", []);
  reset(id);
};


PRINT_CB_HANDLERS[PRINT_SERVICE.cb.chengeID] = /** @param {TelegramCallbackQuery} cb */ function(cb){
  let id = cb.from.id;
  saveUser({id, reg2:PRINT_SERVICE.cb.chengeID})
  sendText(id,"מה התז שלך?")
}

PRINT_CB_HANDLERS[PRINT_SERVICE.cb.chengeType] = /** @param {TelegramCallbackQuery} cb */ function(cb){
  let id = cb.from.id;
  let message = cb.message;
  editMessageText(id, message.message_id, "בחר שיטת הדפסה", PRINT_SERVICE.typeNames.reduce((k,t, i)=>{k.push([{text:t, callback_data:i}]);return k;}, []));
  saveUser({id, reg2:PRINT_SERVICE.cb.chengeType});
}

PRINT_CB_HANDLERS[PRINT_SERVICE.cb.send] = /** @param {TelegramCallbackQuery} cb */ function(cb){
  let id = cb.from.id;
  let data = JSON.parse(reg3);
  sendEmail(data.files.reduce((fs,f)=>{fs.push(downloadFile(f.id, f.name));return fs;}, []),id,data.id||id, PRINT_SERVICE.types[data.type]);
  editMessageText(id, data.message.message_id, "נשלח להדפסה.\nבעוד מספר רגעים תקבל אישור קליטה.", []);
  reset(id);
}

const PRINT_EDIT = {};

PRINT_EDIT[PRINT_SERVICE.cb.chengeID] = /** @param {TelegramMessage} msg */function(msg){
  let id = msg.from.id;
  let data = JSON.parse(reg3);
  data.id = msg.text;
  editMessageText(id, data.message.message_id, data.message.text, []);
  let kb = data.message.reply_markup.inline_keyboard;
  kb[1][1].text = msg.text;
  data.message = sendText(id, data.message.text, kb);
  saveUser({id, reg2:0, reg3:JSON.stringify(data)});
}

PRINT_EDIT[PRINT_SERVICE.cb.chengeType] = /** @param {TelegramCallbackQuery} cb */function(cb){
  let id = cb.from.id;
  let data = JSON.parse(reg3);
  data.type = cb.data;
  let kb = data.message.reply_markup.inline_keyboard;
  kb[1][0].text = PRINT_SERVICE.typeNames[cb.data];
  editMessageText(id, data.message.message_id, data.message.text, kb);
  saveUser({id, reg2:0, reg3:JSON.stringify(data)});
}












