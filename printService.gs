/**
 * handles print message.
 * @param {TelegramMessage} msg Message that contains a file.
 */
function handlePrint(msg){
  var id = msg.from.id;
  let preferences = users.getRange(user.getRow(), fieldUsers.printPref).getValue();
  preferences = preferences?JSON.parse(preferences):{};
  var data;
  if(reg1==PRINT_SERVICE.symbol)data = JSON.parse(reg3);
  else {
    removeKey(id, PRINT_SERVICE.headerMessage);
    saveUser({id:id, reg1:PRINT_SERVICE.symbol, reg2:0, reg3:0, reg4:0, reg5:0});
    data = {type: preferences.type || 0, files:[], id: preferences.id || null}
  }
  if (msg.photo){
    let fid = msg.photo[msg.photo.length - 1].file_id;
    data.files.push({fid, name:fid+".jpg"});
  }
  if (msg.document){
    data.files.push({id:msg.document.file_id, name:msg.document.file_name});
  }
  let text = data.files.reduce((s,f, i)=>s+`\n${i+1}. ${f.name}`,PRINT_SERVICE.messageBase);
  if(reg1!=PRINT_SERVICE.symbol){
    data.message = sendText(id, text, PRINT_SERVICE.getMainKB(data));
  }else{
    data.message = editMessageText(id, data.message.message_id, text, PRINT_SERVICE.getMainKB(data));
  }
  saveUser({id:id, reg3:JSON.stringify(data)})
}

/**
 * Send an email with files to the print service.
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
  welcomeUser(chatId);
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
  editMessageText(id, message.message_id, "בחר שיטת הדפסה", PRINT_SERVICE.typesKB);
  saveUser({id, reg2:PRINT_SERVICE.cb.chengeType});
}

// PRINT_CB_HANDLERS[PRINT_SERVICE.cb.settings] = /** @param {TelegramCallbackQuery} cb */ function(cb){
//   let id = cb.from.id;
//   let message = cb.message;
//   editMessageText(id, message.message_id, "<u><b>הגדרות</b></u>", PRINT_SERVICE.settings);
//   saveUser({id, reg2:PRINT_SERVICE.cb.settings});
// }

PRINT_CB_HANDLERS[PRINT_SERVICE.cb.editFiles] = /** @param {TelegramCallbackQuery} cb */ function(cb){
  let id = cb.from.id;
  let data = JSON.parse(reg3);
  let message = cb.message;
  let kb = PRINT_SERVICE.getEditKB(data);
  data.filesMessage = editMessageText(id, message.message_id, "לחץ על הקובץ כדי לשנות את שמו, או על ❌ כדי למחוק אותו", kb);
  saveUser({id, reg2:PRINT_SERVICE.cb.editFiles, reg3:JSON.stringify(data)});
}

PRINT_CB_HANDLERS[PRINT_SERVICE.cb.send] = /** @param {TelegramCallbackQuery} cb */ function(cb){
  let id = cb.from.id;
  let data = JSON.parse(reg3);
  print_id = data.id || id;
  sendEmail(data.files.reduce((fs,f)=>{fs.push(downloadFile(f.id, f.name));return fs;}, []), id, print_id, PRINT_SERVICE.types[data.type]);
  editMessageText(id, data.message.message_id, `נשלח להדפסה עם מספר הזהות: ${print_id}.\nבעוד מספר רגעים יתקבל אישור קליטה.`, []);
  welcomeUser(id);
  reset(id);
}

PRINT_CB_HANDLERS[PRINT_SERVICE.cb.deleteID] = /** @param {TelegramCallbackQuery} cb */function(cb){
  let id = cb.from.id;
  let data = JSON.parse(reg3);
  let user = findUser(id, users);
  let preferencesCell = users.getRange(user.getRow(), fieldUsers.printPref);
  let preferences = preferencesCell.getValue();
  preferences = preferences?JSON.parse(preferences):{};
  delete data.id;
  delete preferences.id;
  preferencesCell.setValue(JSON.stringify(preferences));
  editMessageText(id, cb.message.message_id, cb.message.text, PRINT_SERVICE.getMainKB(data));
  saveUser({id, reg2:0, reg3:JSON.stringify(data)});
}


const PRINT_EDIT = {};

PRINT_EDIT[PRINT_SERVICE.cb.chengeID] = /** @param {TelegramMessage} msg */function(msg){
  let id = msg.from.id;
  if (!/^\d+$/.test(msg.text)){
    sendText(id, "נא להזין ספרות בלבד.");
    return;
  }
  let data = JSON.parse(reg3);
  data.id = msg.text;
  let r2 = 0;
  editMessageText(id, data.message.message_id, data.message.text, []);
  let preferences = users.getRange(user.getRow(), fieldUsers.printPref).getValue();
  preferences = preferences?JSON.parse(preferences):{};
  if (preferences.never_ask){
    data.message = sendText(id, data.message.text, PRINT_SERVICE.getMainKB(data));
  }
  else{
    let text = "Do you want to save this number?";
    let m = sendText(id, text, PRINT_SERVICE.changeIdKeyboard);
    data.message.message_id = m.message_id;
    r2 = PRINT_SERVICE.cb.chengeID+1;
  }
  saveUser({id, reg2:r2, reg3:JSON.stringify(data)});
}

PRINT_EDIT[PRINT_SERVICE.cb.chengeID+1] = /** @param {TelegramCallbackQuery} cb */ function(cb){
  let id = cb.from.id;
  let data = JSON.parse(reg3);
  let user = findUser(id, users);
  let preferencesCell = users.getRange(user.getRow(), fieldUsers.printPref);
  let preferences = preferencesCell.getValue();
  preferences = preferences?JSON.parse(preferences):{};
  switch (cb.data){
    case "yes":
      preferences.id = data.id;
      break;
    case "no":
      break;
    case "never":
      preferences.never_ask = 1;
      break;
  }
  preferencesCell.setValue(JSON.stringify(preferences));
  data.message = editMessageText(id, data.message.message_id, data.message.text, PRINT_SERVICE.getMainKB(data));
  saveUser({id, reg2:0, reg3:JSON.stringify(data)});
}



PRINT_EDIT[PRINT_SERVICE.cb.chengeType] = /** @param {TelegramCallbackQuery} cb */function(cb){
  let id = cb.from.id;
  let data = JSON.parse(reg3);
  data.type = cb.data;
  data.message = editMessageText(id, data.message.message_id, data.message.text, PRINT_SERVICE.getMainKB(data));
  saveUser({id, reg2:0, reg3:JSON.stringify(data)});
  let preferencesCell = users.getRange(user.getRow(), fieldUsers.printPref);
  let preferences = preferencesCell.getValue();
  preferences = preferences?JSON.parse(preferences):{};
  preferences.type = data.type;
  preferencesCell.setValue(JSON.stringify(preferences));
}


PRINT_EDIT[PRINT_SERVICE.cb.editFiles] = /** @param {TelegramCallbackQuery & TelegramMessage} obj */function(obj){
  let id = obj.from.id;
  let data = JSON.parse(reg3);
  /** @type TelegramInlineKeyboard */
  let kb;
  let text;
  if(obj.message_id){
    if(data.hasOwnProperty("renameFile")){
      let fileName = obj.text;
      let extention = /\.\w+$/.exec(data.files[data.renameFile].name);
      if(extention && !fileName.endsWith(extention[0]))fileName+=extention[0];
      data.files[data.renameFile].name = fileName;
      text = data.filesMessage.text;
      // sendText(id, text);
      kb = data.filesMessage.reply_markup.inline_keyboard;
      kb[data.renameFile][0].text = fileName;
      delete data.renameFile;
    }else{
      return;
    }
  }
  else{
    text = obj.message.text;
    kb = obj.message.reply_markup.inline_keyboard;
    if(obj.data=="done"){
      text = data.files.reduce((s,f,i)=>{s+=`\n${i+1}. ${f.name}`;return s}, PRINT_SERVICE.messageBase);
      kb = PRINT_SERVICE.getMainKB(data);
      saveUser({id, reg2:0});
    }
    else if(obj.data.startsWith("d")){//deleting file from the list
      i = parseInt(obj.data.slice(1));
      data.files.splice(i,1);
      kb = PRINT_SERVICE.getEditKB(data);
    }
    else {
      let fileId = parseInt(obj.data);
      if(data.renameFile){
        kb[data.renameFile][0].text = data.files[data.renameFile].name;
      }
      if(data.renameFile == fileId){
        delete data.renameFile;
        return;
      }
      data.renameFile = fileId;
      kb[fileId][0].text += "✏️";
    }
  }
  data.message = editMessageText(id, data.message.message_id, text, kb);
  saveUser({id, reg3:JSON.stringify(data)});
}








