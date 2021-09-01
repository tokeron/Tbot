///version 2
// This is a bot that was developed for the use of Technion students.
// The bot was developed by Michael Toker for the purpose to help students and has no profit.
// The bot is running on the google script platform and using google sheets to store the information to operate.
// The bot can handle multiple requests, analyze commands, and execute them.drive
// The bot is in constant testing and improvement. 

//Macros
var TESTMODE = false;

//Symbols
var groupSy = "\ud83d\udc6b"; 
var driveSy = "\ud83d\udcc1";
var csSy = "\ud83d\udcbb";
var ugSy = "\ud83d\udcca";
var moodleSy = "\ud83d\udccb";
var reviewsSy = "\ud83d\udcad";
var facebookSy = "\ud83d\udc65";
var scansSy = "\ud83d\udcda";
var attentionSy = "\ud83d\udc49";
var downSy = "\ud83d\udc47";
var YouTubeSy = "\ud83d\udcfa";
var mainSy = "\ud83c\udfe0";
var Korona = "אסט - עדכונים";
var help = "Talk To Me" +" \ud83d\udd34";
var About = "About "+ "\ud83c\udf0e";
var WantToHelp = "I want to help";
var fun = "Groups for Hobbies " + "\ud83d\ude0e"
    
var ride = "Ride Groups \ud83d\ude97";
var faculty = "Department Groups \ud83c\udfeb";
var add = "Add course to the bot \ud83d\udcd7";
var course = "Courses \ud83d\udcda";
var usefulLink = "Useful Links \ud83d\udd25";
var feedback = "feedback \ud83d\udcdd"; 
var calendar = "Calendar \ud83d\udcc5";

var drive = "Drive "+driveSy;
var courseGroup = "Telegram group "+groupSy;
var testock = "Scans - testock "+scansSy;
var facebook = "Facebook "+facebookSy;
var youTube = "YouTube " +YouTubeSy;
var reviews = "Reviews "+reviewsSy;
var mainMenu = "Main Menu "+mainSy;
var ug = "Ug "+ugSy;
var moodle = "Moodle "+moodleSy;
var cs = "CS "+csSy;

var ContactFacebook = "facebook";
var ContactEmail = "email";
var ContactLinkdIn = "linkedin";
var WantToTalk = "Anonymous talk with a student";
var SFS = "Students Business "+	"\ud83d\udcb8";
 
 //Run every time webAppUrl is changed to connect the bot with this new webAppUrl
 function setWebhook() {
  var response =  UrlFetchApp.fetch(url + "/setWebhook?url=" + webAppUrl);
  Logger.log(response.getContentText());
}

//functions that handels the fetching the commands from the users
function getMe() {
  var response =  UrlFetchApp.fetch(url + "/getMe");
  Logger.log(response.getContentText());
}

function getUpdates() {
  var response =  UrlFetchApp.fetch(url + "/getUpdates");
  Logger.log(response.getContentText());
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Hello " + JSON.stringify(e)); 
}

//Description: main function. Execution of the requestes.
//input: JSON. It may contain callback_query - input from exeternal keyboard, 
//or massege - input from text sent from the user or internal keyboard.
function doPost(e){
  var userEx = SpreadsheetApp.openByUrl(userExcel);
  var users = userEx.getActiveSheet();
  var coursesEX = SpreadsheetApp.openByUrl(courseExcel);
  var courses = coursesEX.getActiveSheet();
  var contents = JSON.parse(e.postData.contents);
  var file;
  if (contents.message.photo){
    var id = contents.message.from.id;
    sendText(id, "got an image..");
    file = downloadFile(contents.message.photo[contents.message.photo.length - 1].file_id);
  }
  if (contents.message.document){
    var id = contents.message.from.id;
    sendText(id, "got an doc..");
    var fileid = contents.message.document.file_id;
    sendText(id, "got an doc.2.");
    var fileName = contents.message.document.file_name;
    sendText(id, "got an doc.1.");
    file = downloadFile(fileid, fileName, id);
    sendText(id, "got an doc.3.");
    var studentId = "123456789";   // studentId
    var printType = "bws";         // avilable types: bws, bwd, A3bws, A3bwd, color,A3color ,2pbws (2 slides per page), 2pbwd, 4pbws, 4pbwd
    sendEmail(file,contents.message.chat.id,studentId, printType,fileName );
  } 
  
  //internal keyboard command - different from regular text
  if (contents.callback_query){
    var id = contents.callback_query.from.id;
    var data = contents.callback_query.data;
    var name = contents.callback_query.from.first_name;
    
    if (data == 'Search For Another Course'){
      removeKey(id, "Please insert the course number or course name (can be partial name)"
                +"in order to search for a course. To add it to your list simply choose 'Add to my list'");
      set(id, "Course", name, 0);
      return;
    }
    else if (data == mainMenu){
      sendKey(id, "How may I help you?", mainKeyBoard);
      set(id, 0, name, 0);
      return;
    }
    else if(data == "Clean My List"){
      var cellFinder = users.createTextFinder(id);
      var cell = cellFinder.findNext();
      while (cell !== null && cell.getColumn() !== 1){
        cell = cellFinder.findNext();
      }
      if (cell){
        var idRow = cell.getRow();
        for (var currCol = 5;currCol <=15; currCol++){
          users.getRange(idRow, currCol).setValue(0);
        }
        sendText(id, "Your list is clean");
      }
      return;
    
    }else if (data == "Delete A Course From My List"){    
      set(id, data, name, 0);
      sendText(id, "Please tap on a course in order to delete it from your list");
      return;
    }
    //get mode
    var cellFinder = users.createTextFinder(id);
    var cell = cellFinder.findNext();
    while (cell !== null && cell.getColumn() !== 1) cell = cellFinder.findNext(); 
    var mode = 0;
    var otherMode = 0;
    var otherMode2 = 0;
    if (cell) {
      var row = cell.getRow(); 
      mode = users.getRange(row, 2).getValue();
      otherMode = users.getRange(row, 4).getValue();
      otherMode2 = users.getRange(row, 3).getValue();
    }else{
      sendKey(id, "How may I help you?", mainKeyBoard);
    }
    if (mode == "help by number"){ // helper get in contact with a student
      var app = SpreadsheetApp.openByUrl(helpList);
      var helpers = app.getSheetByName('helper');
      var needsHelp = app.getSheetByName('needHelp');
      var helperRow = otherMode;
      var integer = parseInt(data, 10);
      var needsHelpCol = 9 + integer;
      var needsHelpId = helpers.getRange(helperRow, needsHelpCol).getValue();
      set(id, "Talk","" ,needsHelpId);
      set(needsHelpId, "Talk","" ,id);
      sendText(id, "You are connected with student number "+ data);
      removeKey(id, "To end the connection just type 'goodbye' or 'ביי'");
      sendText(needsHelpId, "Your helper want's to talk to you. You are connected");
      sendText(needsHelpId, "To end the connection just type 'goodbye' or 'ביי'");
      return;
    }
    //course have been chosen
    if (mode == "Delete A Course From My List"){//course to delete
      var flag = false;
      var courseCol = 0;
      var lastInCol;
      var index = 5;
      var currCourseRow = users.getRange(row, index).getValue();
      var currCourse;
      
      while (currCourseRow){//while there is courses in the list
        currCourse = courses.getRange(currCourseRow, 1).getValue();
        if (currCourse == data) courseCol = index;//the course to delete is found
        currCourseRow = users.getRange(row, ++index).getValue();
      }
 
      if (courseCol){//swap with last and delete
        var lastCourse = users.getRange(row, index-1).getValue();
        users.getRange(row, courseCol).setValue(lastCourse);
        users.getRange(row, index-1).setValue(0);
      }
      set(id, 0, name, 0);
      sendText(id, "Course number " + data + " is not on your list anymore");
    }else if (mode == SFS){//students fo students
      var app = SpreadsheetApp.openByUrl(businessExcel);
      var busi = app.getSheetByName('info');
      
      var maxCol = busi.getRange(2, 2).getValue();
      var maxRow = busi.getRange(3, 2).getValue();
      var topicBase = busi.getRange(4, 2).getValue();
      var sectionBase = busi.getRange(5, 2).getValue();
      var sectionsNum = busi.getRange(6, 2).getValue();
      var topicNum = busi.getRange(7, 2).getValue();   
      if (data == "Add a Topic \ud83c\udfea"){
        set(id, mode, 0, data);
        sendText(id, "We glad that you decided to join us! Please insert the topic");
        return;
      }else if (data == "Add a Business \ud83c\udfea"){
        sendText(id, "We glad that you decided to join us! Please insert your business name");
        set(id, mode, 0, "Password");//abuse of notation: using name as additional data holder
        return;
      }else if (data == "Delete My Business \ud83d\udcdb"){
        set(id, SFS, name, data);
        sendText(id, "Please tap on your business in order to delete it from the list");
        return;
      }else if (data == "Edit My Business \ud83d\udcdd"){
        set(id, SFS, name, data);
        sendText(id, "Please tap on your business in order to edit it");
        return;
      }else if(otherMode == "Delete My Business \ud83d\udcdb"){
        sendText(id, "In order to continue please provide your password");
        set(id, SFS, data, "Pass");
      }else if(otherMode == "Edit My Business \ud83d\udcdd"){
        sendText(id, "In order to continue please provide your password");
        set(id, SFS, data, "PassToEdit");
      }else if(data == SFS){
        var courseList = [];
        var numberList = [];
        for (var i = sectionBase + 1; i < sectionBase*sectionsNum; i += sectionBase){
          var currTopic = busi.getRange(1, i).getValue();
          //sendText(id, "test: currTopic: "+currTopic); 
          numberList.push(currTopic);
          courseList.push(currTopic);
        }
        courseList.push("Add a Topic \ud83c\udfea");
        numberList.push("Add a Topic \ud83c\udfea");
        makeKeyBoard(id, courseList, numberList);
        set(id, SFS, name, "Wait");
      }
      else{
        var currBusi = busi.createTextFinder(data).findNext();
        if (currBusi){
          var busiCol = currBusi.getColumn();
          var busiRow = currBusi.getRow();
        }
      }
      if (currBusi && busiRow == 1){//Show all business in the topic
        var courseList = [];
        var numberList = [];
        var topiCol = busi.createTextFinder(data).findNext().getColumn();
        var counter = busi.getRange(2, topiCol-1).getValue();
        if (counter == 0) sendText(id, "There is no business here yet. Tap on 'Add a Business' in order to add your business to the list.")
        
        for (var i = topicBase + 1; i < topicBase + counter + 1; ++i){
          var currBusi = busi.getRange(i, topiCol).getValue();
          numberList.push(currBusi);
          courseList.push(currBusi);
        }
        courseList.push("Add a Business \ud83c\udfea");
        numberList.push("Add a Business \ud83c\udfea");
        courseList.push("Delete My Business \ud83d\udcdb");
        numberList.push("Delete My Business \ud83d\udcdb");
        courseList.push("Edit My Business \ud83d\udcdd");
        numberList.push("Edit My Business \ud83d\udcdd");
        courseList.push(SFS);
        numberList.push(SFS);
        makeKeyBoard(id, courseList, numberList);
        set(id, mode, data, data);
      }else if (currBusi){//Show busiKeyBoard and set topic mode
        set(id, mode, name, data);
        var description = busi.getRange(busiRow, busiCol+1).getValue();
        sendKey(id, description, busiKeyBoard);
        return;
      }
    }else{//looking for course options
      var courseFinder = courses.createTextFinder(data);
      var currCourse = courseFinder.findNext();
      while(currCourse !== null && currCourse.getColumn() !== 1){
        currCourse = courseFinder.findNext();
      }
      if (currCourse){
        sendOpt(id, name, courses, currCourse.getRow());
      }
    }
  }
  
  //external massage command - same as regular text
  else if (contents.message){
    //Logger.log('test..101');
    //Statistics update
    var current = users.getRange(2, 12).getValue();
    users.getRange(2, 12).setValue(++current);
   
    //Clean text
    var id = contents.message.from.id;
    var name = contents.message.from.first_name;
    var text = contents.message.text;
    var clean = text.split('"');
    if (clean.length == 2){
      text=clean[0]+clean[1];
    }
    var info = text.split('-');
    if (info.length == 2){
      var courseNumber = info[0];
      var courseReview = info[1];
    }
    if (info.length == 3){
      var courseNumber = info[0];
      var courseName = info[1];
      var courseLink = info[2];
    }
    ///////////////////////////////////////////////password - not in use for now
    /*
    var app = SpreadsheetApp.openByUrl(userExcel);
    var ss = app.getActiveSheet();
    var rows = ss.createTextFinder(id).findAll();
    if (rows.length == 0){
      sendText(id, "Hi " + name + " \ud83d\udc4b, welcome to Tbot \ud83d\udcd6");   
      sendText(id, "To get access to the bot Please insert your Technion email address to get the first time log-in password");
      var next = ss.getRange(2, 4).getValue();
      ss.getRange(next, 1).setValue(id);
      ss.getRange(next, 2).setValue("need to be verified");
      if (name) ss.getRange(next, 3).setValue(name);
      ss.getRange(2, 4).setValue(++next);
      return;
    }else{
      var row = rows[0].getRow();
      if (ss.getRange(row, 2).getValue() == "need to be verified"){
        if (text.includes(fisrtLogInPassword)){
          set(id, 0, name, 0);
          sendKey(id, "How may I help you?", mainKeyBoard);
          sendText(id, "To add a course to your list, simply search for it in the courses, and click 'Add to My List' button");
        }else if (text.includes("technion.ac.il")){
          sendText(id, "The passwors is sent to "+ text+ " please insert the password now");
          // Fetch the email address
          var emailAddress = text;
              // Send Alert Email.
              var message = text; 
              var subject = 'Tbot first log-in password';
          MailApp.sendEmail(emailAddress, subject, "The password is: "+fisrtLogInPassword);
          //TODO sent email
        }else{
          sendText(id, "To get access to the bot Please insert your Technion email address to get the first time log-in password");
        }
        return;
      }
    }*/
    /*
    else if (text == 'Re 404'){
      sendText( , 'Hi, thank you for your feedback');
      sendText( ,'You are right, I have not yet added a button that deletes a specific course. In the meantime, you can clear the list and build a new one. Hope to add an option to remove a specific course soon ..');
      sendText(id, 'Your massage sent');
    }*/
    
    if (text == "/start"){ // || text == "hey" || text == 'היי' || text == "hello" || text == 'hi'
      sendText(id, "Hi, test101 Holla " + name + " \ud83d\udc4b, Welcome to Tbot \ud83d\udcd6");  
      Logger.log('heyy');
      console.log('Row');    
      sendKey(id, "How may I help you?", mainKeyBoard);
      console.log("hello!");  
      sendText(id, "To add a course to your list, simply search for it in the courses, and click 'Add to My List' button");
      set(id, 0, name, 0);
      return;
    }else if (text == 'תפריט ראשי' || text == 'Main Menu' || text == mainMenu || text == "home"){
      sendKey(id, "How may I help you?", mainKeyBoard);
      set(id, 0, name, 0);
      return;
    }
    //find the user in the table and check his mode
    var cellFinder = users.createTextFinder(id);
    var cell = cellFinder.findNext();
    while (cell !== null && cell.getColumn() !== 1) cell = cellFinder.findNext(); 
    var row = -1;
    var mode;
    var otherMode = 0;
    var otherMode2 = 0;
    if (cell) {
      var row = cell.getRow(); 
      mode = users.getRange(row, 2).getValue();
      otherMode = users.getRange(row, 4).getValue();
      otherMode2 = users.getRange(row, 3).getValue();
      var date = Utilities.formatDate(new Date(), "GMT+3", "dd/MM/yyyy");
      users.getRange(row, 5).setValue(date);
    }else{
      set(id,0,name,0);
      sendKey(id, "How may I help you?", mainKeyBoard);
    }
    
    //if simple test command - sent it and return
    var isDone = simpleText(id, text);
    if (isDone) return;
    
    //Check for other commands
    if (text == ride || text == 'רשימת אזורים'){
      sendKey(id, "Send the required city name or choose your region from the list below " + downSy, rideKeyBoard);
      set(id, "Ride");
    }else if (text == course || text == 'Search For Another Course'){
      removeKey(id, "Please insert the course number or course name in hebrew");
      set(id, "Course", name, 0);
    } else if (text == faculty || text == "Department Groups \ud83c\udfeb"){
      sendKey(id, "Choose your faculty from the list below ", coursesKeyBoard);
      set(id, 'faculty');
    }else if (text == feedback || text == "/feedback"){
      removeKey(id, "You can send your feedback now");
      set(id, 'feedback');
    }else if (text == drive || text == courseGroup || text == reviews || text == 'Get all' || text == facebook
              || text == youTube || text == ug || text == cs || text == 'All tests - Excel'
              || text == moodle || text == testock || text == "Panopto"||  text == "Course info" || text == 'Teams Group \ud83d\udc6a'){
      getDone(id, name, text, users, courses);
    } 
    else if(text == WantToHelp){
      var app = SpreadsheetApp.openByUrl(helpList);
      var helpers = app.getSheetByName('helper');
      var helperFinder = helpers.createTextFinder(id);
      var nextCell = helperFinder.findNext();
      while (nextCell !== null && nextCell.getColumn() !== 1){
        nextCell = helperFinder.findNext();
      }
      if (nextCell !== null && nextCell.getColumn() == 1){//it is an helper
        var helperRow = nextCell.getRow();
        var maxIndex = helpers.getRange(helperRow, 9).getValue();
        var num = [];
        var numList = [];
        for (var i = 10; i < maxIndex ; ++i){
          var currNum = i - 9;
          num.push(currNum);
          numList.push(currNum);
        }
        sendText(id, "Tap on the number of the student you want to talk with");
        makeKeyBoard(id, num, numList);
        set(id, "help by number",0,helperRow);
      }else{
        sendText(id, "על מנת להיכנס למאגר העוזרים עלייך למלא את הטופס הבא וניצור איתך קשר בהקדם");
        sendText(id, "בשדה id בשאלוון הכנס בבקשה את המספר הבא: "+ id);
        sendText(id, "https://forms.gle/ECq5NxEvJAMD9pTn8");
      }
    }
    else if (text == 'Write a review'){
      removeKey(id, "Please write  your review");
      set(id, text);
    }
    else if (text == add){
      set(id, 'Add course');
      removeKey(id, "Please insert the course number, course name and group link in the following format:"
                + " course number-course name-group link. If there is no telegram group, please insert: course number-course name-");
    }
    else if (text == 'Add telegram group'){
      set(id, text);
      sendText(id, "Please insert the group link");
      sendText(id, "Note: to get a group link you need to open a group, then go to: Manage group (or click the edit symbol using smartphone) -> Group type -> Copy link");
      sendText(id, "Don't forget to make the group visible so new members will see messages that were sent before they joined");
    }  
    else if (text == "Add Teams link"){
      set(id, text);
      sendText(id, "Please insert the group link");
    }else if (text == "Add to my course list \ud83d\udccd"){
      var added = false;
      if (row){
        var idRow = row;
        var courseToAdd = users.getRange(idRow, 4).getValue();
        var currCol = 10;
        while (currCol <= 26){
          var currNumber = users.getRange(idRow, currCol).getValue();
          if (courseToAdd == currNumber){
            sendText(id, "This course is already in your course list");
            return;
          }
          if (currNumber) currCol++;
          else{
            (users.getRange(idRow, currCol).setValue(courseToAdd));
            var currCourseName = courses.getRange(courseToAdd, 2).getValue();
            sendText(id, currCourseName+" is added to your list")
            added = true;
            currCol = 27;
          }
        }
        if (!(added)){
          sendtext(id, "The list is full");
        }
      }
    }else if(text == "My Courses \ud83d\udccc"){
      sendText(id, "Loading your Courses..");
      var idRow = row;
      if (idRow){
        var currCol = 10;
        var courseList = [];
        var numberList = [];
        while (currCol <= 26){
          var courseRow = users.getRange(idRow, currCol).getValue();
          if (courseRow){
            var courseNumber = courses.getRange(courseRow, 1).getValue();
            var courseName = courses.getRange(courseRow, 2).getValue();
            numberList.push(courseNumber);
            courseList.push(courseName+" - "+courseNumber);
            currCol++;
          }else{
            currCol = 27;
          }
        }
        if (numberList.length > 0){
          courseList.push("Delete A Course From My List");
          numberList.push("Delete A Course From My List");
          courseList.push("Clean My List");
          numberList.push("Clean My List");
          courseList.push("Search For Another Course");
          numberList.push("Search For Another Course");
          set(id, "Course", name, 0);
          makeKeyBoard(id, courseList, numberList);
        }
        else{
          sendText(id, "There is no registered courses yet");
        }
      }
    }else if(text == "Clean My List"){
      var idRow = row;
      for (var currCol = 5;currCol <=15; currCol++){
        users.getRange(idRow, currCol).setValue(0);
      }
      sendText(id, "your list is clean");
//    }else if (text == "1928tok send"){
//      sendText(810039866, "היי, ראיתי שניסית לדבר עם מישהו ולא היה לי עם מי לחבר אותך. כעת יש סטודנט פנוי שישמח לדבר איתך. אם אתה עדיין מעוניין לדבר תשלח חזרה את המילה כן");
//      sendText(id, "היי, ראיתי שניסית לדבר עם מישהו ולא היה לי עם מי לחבר אותך. כעת יש סטודנט פנוי שישמח לדבר איתך. אם אתה עדיין מעוניין לדבר תשלח חזרה את המילה כן");
//      sendText(id, "done")
    }else if(text == WantToTalk){ //set an anonymous talk //id wanted to talk
      var app = SpreadsheetApp.openByUrl(helpList);
      var helpers = app.getSheetByName('helper');
      var needsHelp = app.getSheetByName('needHelp');
      var helperCol = 2;
      sendText(id, "Searching for an helper for you.. You can always change your preference for an helper and i'll try to find"+
               " the best one for you.. ");
      var helperId = findHelper(id);
      if (helperId == 0){
        sendText(id, "There is no availble helper for now, please try again later..");
        return;
      }
      //check if in talk already
      var isAvail = false;
      var helperFinder = users.createTextFinder(helperId);
      var helperCell = helperFinder.findNext();
      while (helperCell && helperCell.getColumn() !== 1){
        helperCell = helperFinder.findNext();
      }
      if (helperCell){
        if (users.getRange(helperCell.getRow(), 2).getValue() !== "Talk"){
          isAvail = true;
        }else{
          sendText(id, "Your helper is in another conversation right now, you can wait a while or change your helper");
          return;
        }
      }
      if (helperId && isAvail){
        set(id, "Talk","" ,helperId);
        set(helperId, "Talk","" ,id);
        var needsHelpColFinder = helpers.createTextFinder(id);
        var needsHelpCol = needsHelpColFinder.findNext().getColumn();
        while (needsHelpCol == 1) needsHelpCol = needsHelpColFinder.findNext().getColumn();
        var needsHelpNum = helpers.getRange(2, needsHelpCol).getValue();
        sendText(id, "You are connected with your helper");
        removeKey(id, "To end the connection just type 'goodbye' or 'ביי'");
        sendText(helperId, "Student no. "+ needsHelpNum + " want's to talk to you. You are connected");
        sendText(helperId, "To end the connection just type 'goodbye' or 'ביי'");
        return;
      }
    }else if (text == "Settings and Preference"){
      var app = SpreadsheetApp.openByUrl(helpList);
      var helpers = app.getSheetByName('helper');
      var needsHelp = app.getSheetByName('needHelp');
      var cellFinder = needsHelp.createTextFinder(id);
      var needsHelpCell = cellFinder.findNext();
      while(needsHelpCell !== null && needsHelpCell.getColumn() !== 1){
        needsHelpCell = cellFinder.findNext();
      }
      if (!(needsHelpCell)){ //the user is not in the table -> init user
        var nextPlace = needsHelp.getRange(1, 1).getValue();
        needsHelp.getRange(nextPlace, 1).setValue(id);
        needsHelp.getRange(1, 1).setValue(nextPlace+1);
        row = nextPlace;
      }else{
        row = needsHelpCell.getRow();
      }
      set(id, text, name, 0);
      var gender = needsHelp.getRange(row, 3).getValue();
      var faculty = needsHelp.getRange(row, 4).getValue();
      var topic = needsHelp.getRange(row, 5).getValue();
      if ((!(gender)) && (!(faculty)) && (!(topic))) sendText(id, "There is no preference yet");
      else sendText(id, "Your current settings are:");
      if (gender) sendText(id, "Gender: "+gender);
      if (faculty) sendText(id, "Faculty: "+faculty);
      if (topic) sendText(id, "Topic: "+topic);
      sendKey(id, "Choose the settings you are willing to change", settingsKeyBoard);
    }else if (text == SFS){
      sendText(id, "Students for Students is a project designed to encourage students to support other students businesses");
      var app = SpreadsheetApp.openByUrl(businessExcel);
      var busi = app.getSheetByName('info');
      
      var maxCol = busi.getRange(2, 2).getValue();
      var maxRow = busi.getRange(3, 2).getValue();
      var topicBase = busi.getRange(4, 2).getValue();
      var sectionBase = busi.getRange(5, 2).getValue();
      var sectionsNum = busi.getRange(6, 2).getValue();
      //var topicNum = busi.getRange(7, 2).getValue();
      
      var courseList = [];
      var numberList = [];
      for (var i = sectionBase + 1; i < sectionBase*sectionsNum; i += sectionBase){
        var currTopic = busi.getRange(1, i).getValue();
        //sendText(id, "test: currTopic: "+currTopic); 
        numberList.push(currTopic);
        courseList.push(currTopic);
      }
      courseList.push("Add a Topic \ud83c\udfea");
      numberList.push("Add a Topic \ud83c\udfea");
      //      courseList.push("Add a Business \ud83c\udfea");
      //      numberList.push("Add a Business \ud83c\udfea");
      //      courseList.push("Delete My Business \ud83d\udcdb");
      //      numberList.push("Delete My Business \ud83d\udcdb");
      makeKeyBoard(id, courseList, numberList);
      set(id, text, name, "Wait");
    }
    
    //if mode - handle
    else if (mode == "Talk"){
      var otherId = users.getRange(row, 4).getValue();
      //sendText(id, otherId);//test
      //var app = SpreadsheetApp.openByUrl(helpList);
      //var helpers = app.getSheetByName('helper');
      //var needsHelp = app.getSheetByName('needHelp');
      if (text == "ביי" || text == "goodbye"){ //text == "end" || text == "End" || text == 'quit' || text == "Quit"|| text == 'done' || text == "Done" || 
        sendText(otherId, text);
        sendText(id, "The conversation is over");
        sendText(otherId, "The conversation is over");
        set(id, 0, name, 0);
        set(otherId, 0, 0, 0);
        sendKey(id, "How may I help you?", mainKeyBoard);
        sendKey(otherId, "How may I help you?", mainKeyBoard);
        //TODO send some feedback about the conversation
      }else{
        sendText(otherId, text);
      }
    }else if (mode == 'feedback'){
      // Fetch the email address
      var emailAddress = "technobot404@gmail.com";
      // Send Alert Email.
      var message = text;       
      var subject = 'You have a new feedback from technoBot user';
      MailApp.sendEmail(emailAddress, subject, message + 'id: '+id+' ');
      sendText(id, "Thank you for your feedback! \uD83D\uDE4F");
      set(id, 0, name, 0);
      sendKey(id, "What would you like to do next?", mainKeyBoard);
    }else if (mode == 'Ride'){
      var RidesEX = SpreadsheetApp.openByUrl(facultyRidesExcel);
      var Rides = RidesEX.getActiveSheet();
      var list = Rides.createTextFinder(text).findAll();
      if (list.length > 0){
        var row = list[0].getRow();
        var name = Rides.getRange(row,1).getValue();
        var link = Rides.getRange(row,3).getValue();
        sendText(id, link + ' - ' + name);
      }
    }else if (mode == 'Add course'){
      if (!(courseNumber) || !(courseName)){
        sendText(id, "Wrong format. please inset your review in the followog format: course number-course name-group link");
        sendKey(id, "What would you like to do next?", mainKeyBoard);
      }
      else{
        courseAdd(id, courseNumber, courseName, courseLink, courses);
        set(id, 0);
        sendKey(id, "What would you like to do next?", mainKeyBoard);
      }
    }else if (mode == 'Write a review'){
      var idRow = row;
      var courseRow = users.getRange(idRow, 4).getValue();
      var courseNumber = courses.getRange(courseRow, 1).getValue();
      var courseName = courses.getRange(courseRow, 2).getValue();
      if (courseRow){
        var j = 7;
        while (courses.getRange(courseRow,j).getValue()){
          j++;
        }
        courses.getRange(courseRow,j).setValue(text);
        sendText(id, "Your review is added to " + courseNumber + ' ' + courseName);
        sendKey(id, "What would you like to do next?", mainKeyBoard);
        set(id, 0, name, 0);
      }
    }else if (mode == 'Add telegram group'){
      //var row = users.createTextFinder(id).findAll();
//      sendText(id, "Adding..");
      var courseRow = 0;
      var idRow = row;
      courseRow = users.getRange(idRow, 4).getValue();
//      sendText(id, "courseRow"+courseRow);
      var courseNumber = courses.getRange(courseRow, 1).getValue();
      var courseName = courses.getRange(courseRow, 2).getValue();
      var group = courses.getRange(courseRow, 3).getValue();
      if (group){
        sendText(id, 'The group is already exist');
        sendText(id, group);
        set(id, 0, name, 0);
        sendKey(id,'What would you like to do next?',mainKeyBoard)
        return;
      }
      if (courseRow){
//        sendText(id, "Cheking..");
        var checkIfLink = text.split('ttps://t.me/joinchat');
        if (checkIfLink.length !== 2){
          sendText(id, 'This is not a link to telegram group. Please try again');
          sendKey(id,'What would you like to do next?',mainKeyBoard)
          set(id, 0, name, 0);
        }
        else{
          courses.getRange(courseRow, 3).setValue(text);
          sendText(id, "The group is added to " + courseNumber + ' ' + courseName);
          set(id, 0, name, 0);
          sendKey(id,'What would you like to do next?',mainKeyBoard)
        }
      }
    }else if (mode == 'Add Teams link'){
      var courseRow = 0;
      var idRow = row;
      courseRow = users.getRange(idRow, 4).getValue();
      var courseNumber = courses.getRange(courseRow, 1).getValue();
      var courseName = courses.getRange(courseRow, 2).getValue();
      var group = courses.getRange(courseRow, 6).getValue();
      if (group){
        sendText(id, 'The group is already exist');
        sendText(id, group);
        set(id, 0, name, 0);
        sendKey(id,'What would you like to do next?',mainKeyBoard)
        return;
      }
      if (courseRow){
        var checkIfLink = text.split('ttps://teams.microsoft.com');
        if (checkIfLink.length !== 2){
          sendText(id, 'This is not a link to Teams Group \ud83d\udc6a. Please try again');
          sendKey(id,'What would you like to do next?',mainKeyBoard)
          set(id, 0, name, 0);
        }
        else{
          courses.getRange(courseRow, 6).setValue(text);
          sendText(id, "The group is added to " + courseNumber + ' ' + courseName);
          set(id, 0, name, 0);
          sendKey(id,'What would you like to do next?',mainKeyBoard)
        }
      }
    }else if (mode == 'Add exams Excel'){
      var courseRow = 0;
      var idRow = row;
      courseRow = users.getRange(idRow, 4).getValue();
      var courseNumber = courses.getRange(courseRow, 1).getValue();
      var courseName = courses.getRange(courseRow, 2).getValue();
      if (courseRow){
        courses.getRange(courseRow, 4).setValue(text);
        sendText(id, "The Excel is added to " + courseNumber + ' ' + courseName);
      }
    }else if (mode == "faculty" || otherMode == "הנדסת חשמל" || otherMode == "ChooseElectricProgram" ){
      facultyGroupHandler(id, text, mode, otherMode);
    }else if (mode == 'Course'){
      var list = courses.createTextFinder(text).findAll();
      var len = list.length;
      if (len == 1){
        sendOpt(id, name, courses, list[0].getRow());
      }
      else if (len > 1){
        var tooLong = false;
        if (len > 50){
          tooLong = true;
          sendText(id, 'There is too many courses containing: '+text);
          sendText(id, 'Try to search full course name or course number');
        }
        if (!(tooLong)){
          sendText(id, "looking for relevant courses..");
          var courseNames = [];
          var courseNumbers = [];
          var count = 0;
          while (count < len){
            var courseCol = list[count].getColumn();
            if (courseCol == 1 || courseCol == 2){
              var courseRow = list[count].getRow();
              var courseName = courses.getRange(courseRow, 2).getValue();
              var courseNumber = courses.getRange(courseRow, 1).getValue();
              //if (!(courseNumbers.includes(courseNumber))){
              courseNames.push(courseName+" - "+courseNumber);
              courseNumbers.push(courseNumber)
            }
            count++;
            //}
          }
          courseNames.push("Search For Another Course");
          courseNumbers.push("Search For Another Course");
          makeKeyBoard(id, courseNames, courseNumbers);
        }
      }
      else{ //len in 0  
        //set(id, 0, name, 0);
        sendKey(id, "can't find "+text+". Try typing somthing else or type 'home' to return to main menu.");
      }
    }else if (mode == "Settings and Preference"){
      if (text == "Gender"){
        sendKey(id, "Choose the required gender", genderKeyBoard);
        set(id, mode, name, text);
        return;
      }else if (text == "Faculty" && data == "Settings and Preference"){
        sendKey(id, "Choose the required faculty", coursesKeyBoard);
        set(id, mode, name, text);
        return;
      }else if (text == "Faculty"){
        sendKey(id, "Choose the required faculty", coursesKeyBoard);
        set(id, mode, name, text);
        return;
      }else if (text == "Topic"){
        sendKey(id, "Choose the required topic", topicKeyBoard);
        set(id, mode, name, text);
        return;
      }
      //getData
      var app = SpreadsheetApp.openByUrl(helpList);
      var helpers = app.getSheetByName('helper');
      var needsHelp = app.getSheetByName('needHelp');
      var rowFinder = needsHelp.createTextFinder(id);
      var currID = rowFinder.findNext();
      var row;
      while (currID !== null && currID.getColumn() !== 1) {
        currID = rowFinder.findNext();
        //sendText(id, "test "+row.getColumn());
      }
      if (currID == null){
        var nextFree = needsHelp.getRange(1, 1).getValue();
        needsHelp.getRange(nextFree,1).setValue(id);
        needsHelp.getRange(nextFree,6).setValue(0);//init black list
        needsHelp.getRange(1, 1).setValue(nextFree+1);
        row = nextFree;
      }
      else row = currID.getRow();
      if (text == "Change helper"){
        var helperId = needsHelp.getRange(row, 2).getValue();
        if (helperId == 0) {
          sendText(id, "You have no helper yet. Choose 'anonymous chat' button to start a chat with a student.");
          return;
        }
        needsHelp.getRange(row, 2).setValue(0);
        var BLCounter = needsHelp.getRange(row, 6).getValue();
        needsHelp.getRange(row, 6 + BLCounter + 1).setValue(helperId);
        needsHelp.getRange(row, 6).setValue(BLCounter+1);
        if (helperId){
          sendText(id, "Sure, next time you'll get another helper");
          sendText(id, "You are welcome to fill the next form in order to give a feedback about your helper. Your helper id is: "+helperId);
          //findHelper(id);
          //free helper
          var finderHelper = helpers.createTextFinder(helperId);
          var helper = finderHelper.findNext();
          while (helper !== null && helper.getColumn() !== 1){
            helper = finderHelper.findNext();
          }
          var baseCol = 33;
          if (helper){
            var helperRow = helper.getRow();
            var helperCol = helper.getColumn();
            var nextFree = helpers.getRange(helperRow, 9).getValue();
            helpers.getRange(helperRow, 9).setValue(nextFree - 1);
            //swap with last
            //find id place in first table
            var finderIdPlace = helpers.createTextFinder(id);
            var IdCell = finderIdPlace.findNext();
            while (IdCell !== null && IdCell.getRow() !== helperRow){
              IdCell = finderIdPlace.findNext();
            }
            var IdCol = IdCell.getColumn();
            var lastId =  helpers.getRange(helperRow,nextFree-1).getValue();
            helpers.getRange(helperRow, IdCol).setValue(lastId);
            
            //sendText to hlper
            if (IdCol !== nextFree-1){
              var studentNumber = IdCol-9;
              sendText(helperId, "Student number "+studentNumber+" no longer needs your help.");
              var lastNumber = nextFree-1 - 9;
              sendText(helperId, "From now student number "+lastNumber+" has a new number: "+studentNumber); 
            }
            //find in table and move to right place
            var numberOfPatients = nextFree - 10;
            var max = helpers.getRange(1, numberOfPatients + baseCol).getValue();
            for (var i = 3; i < max; i++){
              var currIndex = helpers.getRange(i, numberOfPatients + baseCol).getValue();
              if (currIndex == helperRow){ //found in table. swap with last, update counter and move Back
                var last = helpers.getRange(max-1, numberOfPatients + baseCol).getValue();
                helpers.getRange(i, numberOfPatients + baseCol).setValue(last);//insert last instead
                helpers.getRange(1, numberOfPatients + baseCol).setValue(max-1);//update counter
                var beforeMax = helpers.getRange(1, numberOfPatients + baseCol - 1).getValue();
                helpers.getRange(1, numberOfPatients + baseCol - 1).setValue(beforeMax+1);//update counter
                helpers.getRange(beforeMax, numberOfPatients + baseCol - 1).setValue(helperRow);//insert curr to the prev col
              }
            }
          }
          
        }else{
          sendText(id, "There is no helper set yet");
        }
        return;
      }else if ((text == "Back" || text == 'חזור') && mode == 'Settings and Preference'){
        sendKey(id, "Choose from the list below", helpKeyBoard);
        return;
      }else if ((text == "Back" || text == 'חזור') && (otherMode == "Faculty" || otherMode == "Gender" || otherMode == "Topic") ){
        sendKey(id, "Choose from the list below", settingsKeyBoard);
        return;
      }if (text == "Male" || text == "Female"){//gender
        needsHelp.getRange(row, 3).setValue(text);
        sendKey(id, "Your prefernce has been updated "+text+" gender", settingsKeyBoard);
      }else if (text == "Studies" || text == "Emotional Distress" || text == "Military experiences" || text == "Violence or harassment"){//topic
        needsHelp.getRange(row, 5).setValue(text);
        sendKey(id, "Your prefernce has been updated: "+text+" topic", settingsKeyBoard);
      }else if (text == "מדעי המחשב" || text == 'הנדסת חשמל' || text ==  'הנדסת מכונות' || text == 'הנדסה אזרחית וסביבתית' || text == 'הנדסת תעשייה וניהול' || text == 'הנדסה ביו-רפואית' ||
                text == 'הנדסה כימית' || text == 'הנדסת ביוטכנולוגיה ומזון' || text == 'מדע והנדסה של חומרים' || text == 'הפקולטה למתמטיקה' || text == 'הפקולטה לכימיה' 
                || text == 'הפקולטה לפיסיקה'|| text == 'הפקולטה לביולוגיה'|| text == 'רפואה' || text== 'ארכיטקטורה ובינוי ערים' || text == 'חינוך למדע וטכנולוגיה' 
                || text == 'הפקולטה להנדסת אוירונוטיקה וחלל'){//faculty
        needsHelp.getRange(row, 4).setValue(text);
        sendKey(id, "Your prefernce has been updated "+text+" faculty", settingsKeyBoard);
        return;
      }
      //    }else if (mode == "Delete by Course Number"){
      //      sendText(id, "Test");
      //      //get course row
      //      var courseToDelete = courses.createTextFinder(text).findNext().getRow();
      //      sendText(id, courseToDelete);//test
      //      var courseCol = 0;
      //      var lastInCol;
      //      var index = 5;
      //      var currCourse = users.getRange(row, index).getValue();
      //      while (currCourse){
      //        if (currCourse == courseToDelete) courseCol = index;
      //        currCourse = users.getRange(row, ++index).getValue();
      //      }
      //      if (courseCol){
      //        var lastCourse = users.getRange(row, index-1).getValue();
      //        users.getRange(row, courseCol).setValue(lastCourse);
      //        users.getRange(row, index-1).setValue(0);
      //      }
      //      sendText(id, "Course number " + text + " is not on your list anymore");
    }else if (mode == SFS){
      var app = SpreadsheetApp.openByUrl(businessExcel);
      var busi = app.getSheetByName('info');
      
      var maxCol = busi.getRange(2, 2).getValue();
      var maxRow = busi.getRange(3, 2).getValue();
      var topicBase = busi.getRange(4, 2).getValue();
      var sectionBase = busi.getRange(5, 2).getValue();
      var sectionsNum = busi.getRange(6, 2).getValue();
      var topicNum = busi.getRange(7, 2).getValue(); 
      
      var currBusi = busi.createTextFinder(otherMode).findNext();
      if (currBusi){
        var busiCol = currBusi.getColumn();
        var busiRow = currBusi.getRow();
      }
      if (otherMode == "Add a Topic \ud83c\udfea"){
        var isExist = busi.createTextFinder(text).findNext();
        if (isExist) sendText(id, "This topic is already exists. You can add your business by 'Add a Business \ud83c\udfea' button after entering the topic");
        else{
          busi.getRange(1, sectionBase*sectionsNum+1).setValue(text);
          busi.getRange(2, sectionBase*sectionsNum).setValue(0);
          busi.getRange(6, 2).setValue(sectionsNum+1);
          sendText(id, "Got it! "+text+" topic is initialized");          
          set(id, "null", name, "null");
        }
        return;
      }else if (otherMode == "Pass"){//password is inserted in order to delete business
        var textFinder = busi.createTextFinder(otherMode2);
        var next = textFinder.findNext();
        if (next !== null){
          var nextRow = next.getRow();
          var nextCol = next.getColumn();
          if (text == busi.getRange(nextRow, nextCol - 1).getValue()){ //the password is good
            var lastRow = 2 + busi.getRange(2, nextCol-1).getValue();
            for (var i = nextCol-1; i < nextCol-1+6; i++){//move last to this row
              var temp = busi.getRange(lastRow,i).getValue();
              busi.getRange(nextRow,i).setValue(temp);
            }
            busi.getRange(2, nextCol-1).setValue(lastRow-2-1);
            sendText(id, "Your business has been deleted");
          }else{
            sendText(id, "The password is wrong! please try again. You can contanct us in case that you forgot your password.");
          }
        }
        return;
      }else if (otherMode == "PassToEdit"){//password is inserted in order to edit businesss
        var textFinder = busi.createTextFinder(otherMode2);
        var next = textFinder.findNext();
        if (next !== null){
          var nextRow = next.getRow();
          var nextCol = next.getColumn();
          if (text == busi.getRange(nextRow, nextCol - 1).getValue()){ //the password is good
            sendKey(id, "What information wuold you like to modify?", busiEditKeyBoard);
            set(id, SFS, 0, "GoodPass")
          }else{
            sendText(id, "The password is wrong! please try again. You can contanct us in case that you forgot your password.");
          }
        }
        return;
      }else if(otherMode == "GoodPass"){
        set(id, "GoodPass", 0, text);//(id, GoodPass, busi name, information to change)
        sendText(id, "please send the new information");
        return;
      }
      var topic = otherMode2;//in name there is the topic in witch the user wants to insert the information
      var currTopic = busi.createTextFinder(topic).findNext();
      var topicCol = 0;
      var topicCounter = 0;
      //sendText(id, "curr topic: "+topic+" "+currTopic);
      if (currTopic){
        topicCol = currTopic.getColumn();
        topicCounter = busi.getRange(2, topicCol-1).getValue(); 
      }
      
      if (otherMode == "Password"){
        //sendText(id,"test");
        var isExist = busi.createTextFinder(text).findNext();
        if (text.length >= 34) sendText(id, "The name is too long. Please choose another name for your business");
        else if (isExist) sendText(id, "This name is already taken. Please choose another name for your business");
        else{
          busi.getRange(topicBase+topicCounter+1, topicCol).setValue(text);//set name
          sendText(id, text+" is initialized. Please send a password in order to be able to make changes in the future..");
          busi.getRange(2, topicCol-1).setValue(topicCounter+1);//conter++
          set(id, mode, 0, "Description");
        }
        return;
      }else if (otherMode ==  "Description"){//User gets here after sending the password
        //sendText(id, "test "+topicBase+" "+topicCounter+" "+topicCol);
        busi.getRange(topicBase+topicCounter, topicCol-1).setValue(text);//set password
        sendText(id, "Your password is "+text+". Please send a description for your business");
        //set(id, mode, 0, "Location");
        set(id, mode, 0, "Contact");
        return;
      }
//      else if (otherMode ==  "Location"){//User gets here after sending the description
//        busi.getRange(topicBase+topicCounter, topicCol+1).setValue(text);//set description
//        sendText(id, "Please send the location details for your business");
//        set(id, mode, 0, "Contact");
//        return;
//      }
      else if (otherMode ==  "Contact"){//User gets here after sending the location
        busi.getRange(topicBase+topicCounter, topicCol+1).setValue(text);//set Description
        sendText(id, "We almost done! Please send the contact information for your business");
        //set(id, mode, 0, "Prices");
        set(id, mode, 0, "Done");
        return;
      }
//      else if (otherMode ==  "Prices"){//User gets here after sending the contact information
//        busi.getRange(topicBase+topicCounter, topicCol+3).setValue(text);//set contact information
//        sendText(id, "Got it! The contact information is initialized. Now send the prices for your business");
//        set(id, mode, 0, "Done");
//        return;
//      }
      else if (otherMode ==  "Done"){//User gets here after sending the prices
        busi.getRange(topicBase+topicCounter, topicCol+3).setValue(text);//set contact info
        sendText(id, "Got it! Your business information is initialized, wish you luck!");
        set(id, mode, name, "null");
        return;
      }else if (otherMode == "Delete My Business \ud83d\udcdb"){
         var isExist = busi.createTextFinder(text).findNext();
        if (!(isExist)) sendText(id, "There is no business with that name. Please check the name and try again");
        else{
          var businessRow = isExist.getRow();
          sendText(id, "Please insert you password in order to delete your business");
          set(id, mode, text, "Delete if Password");
        }
        return;
      }else if (otherMode == "Delete if Password"){
        var busiToDelete = busi.createTextFinder(text).findNext();
        var busiRow = busiToDelete.getRow();
        var busiCol = busiToDelete.getColumn();
        var afteLastInCol = busi.getRange(1, busiCol).getValue();
        var lastInCol = busi.getRange(afteLastInCol-1, busiCol).getValue();
        var lastInColPass = busi.getRange(afteLastInCol-1, busiCol-1).getValue();
        var lastInColDes = busi.getRange(afteLastInCol-1, busiCol+1).getValue();
        var lastInColContact = busi.getRange(afteLastInCol-1, busiCol+3).getValue();
        
        busi.getRange(busiRow, busiCol).setValue(lastInCol);
        busi.getRange(busiRow-1, busiCol).setValue(lastInColPass);
        busi.getRange(busiRow+1, busiCol).setValue(lastInColDes);
        busi.getRange(busiRow+3, busiCol).setValue(lastInColContact);
        busi.getRange(1, busiCol).setValue(afteLastInCol-1);
      }
        
      if (text == "Location"){
        if (currBusi){
          var textToSend = busi.getRange(busiRow, busiCol+2).getValue();
          sendText(id, textToSend);
        }
      }else if (text == "Get in Contact"){
        if (currBusi){
          var textToSend = busi.getRange(busiRow, busiCol+3).getValue();
          sendText(id, textToSend);
        }
      }else if (text == "Prices"){
        if (currBusi){
          var textToSend = busi.getRange(busiRow, busiCol+4).getValue();
          sendText(id, textToSend);
        }
      }
    }else if (mode == "GoodPass"){//helper function of STS: edit business // (id, GoodPass, busi name, information to change)
      var app = SpreadsheetApp.openByUrl(businessExcel);
      var busi = app.getSheetByName('info');
      
      var maxCol = busi.getRange(2, 2).getValue();
      var maxRow = busi.getRange(3, 2).getValue();
      var topicBase = busi.getRange(4, 2).getValue();
      var sectionBase = busi.getRange(5, 2).getValue();
      var sectionsNum = busi.getRange(6, 2).getValue();
      var topicNum = busi.getRange(7, 2).getValue(); 
      var currBusi = busi.createTextFinder(otherMode2).findNext();
      var busiRow = currBusi.getRow();
      var busiCol = currBusi.getColumn();
      //(otherMode == "Business name") busiCol+=0;
      if (otherMode == "Description") busiCol += 1;
      else if (otherMode == "Contact Information") busiCol += 3;
      else if (otherMode == "Password") busiCol -= 1;
      busi.getRange(busiRow, busiCol).setValue(text);
      sendKey(id, "The "+otherMode+" has been updated to "+ text, mainKeyBoard);
      return;
    }
    else{
      sendKey(id,"How may I help you?",mainKeyBoard);
    }
  }
}
