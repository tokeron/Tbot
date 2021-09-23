/**
 * Const values for print service.
 */
var PRINT_SERVICE = {
  counter: "printerCounter",
  responseFunc: "readPrinterEmailResponse",
  mailQuery: "from:print.bws@campus.technion.ac.il is:unread"
}


function handlePrint(msg){
  var file;
  if (msg.photo){
    var id = msg.from.id;
    sendText(id, "got an image..");
    file = downloadFile(msg.photo[msg.photo.length - 1].file_id, "photo.jpg", id);
  }
  if (msg.document){
    var id = msg.from.id;
    sendText(id, "got an doc..");
    var fileid = msg.document.file_id;
    sendText(id, "got an doc.2.");
    var fileName = msg.document.file_name;
    sendText(id, "got an doc.1.");
    file = downloadFile(fileid, fileName, id);
    sendText(id, "got an doc.3.");
  } 
  if(file){
    var studentId = "123456789";   // studentId
    var printType = "bws";         // avilable types: bws, bwd, A3bws, A3bwd, color,A3color ,2pbws (2 slides per page), 2pbwd, 4pbws, 4pbwd
    sendEmail([file],msg.chat.id,studentId, printType );
    return;
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
  sendText(chatId, "sending..");
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
  sendText(chatId, "done..");
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