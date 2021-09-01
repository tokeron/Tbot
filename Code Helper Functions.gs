
function findHelper(id){
  var app = SpreadsheetApp.openByUrl(helpList);
  var helpers = app.getSheetByName('helper');
  var needsHelp = app.getSheetByName('needHelp');
  var cellFinder = needsHelp.createTextFinder(id);
  var cell = cellFinder.findNext();
  while (cell !== null && cell.getColumn() !== 1){
    cell = cellFinder.findNext();
  }
  var needsHelpRow;
  if (cell == null){ //the user is not in the table -> init user
    var nextPlace = needsHelp.getRange(1, 1).getValue();
    needsHelp.getRange(nextPlace, 1).setValue(id);
    needsHelp.getRange(1, 1).setValue(nextPlace+1);
    needsHelpRow = nextPlace;
  }else{
    needsHelpRow = cell.getRow();
  }
  var helperId = needsHelp.getRange(needsHelpRow,2).getValue();
  if (helperId) {
    return helperId;
  }
  //sendText(id, "looking for your helper..");
  //init helper - find and register
  helperId = 0;
  var maxScore = -1;
  var helperRow = 0;
  var helperRowTab = 0;
  var helperColTab = 0;
  var tableBase = 33;
  for (var i = tableBase; i <= tableBase + 22; ++i){//a table representing helpers by the number of students they are helping
    var nextFree = helpers.getRange(1,i).getValue();//if > 3 there is some helpers witn  #(i - tableBase) students in this col
    if (nextFree > 3){
      for (var j = nextFree-1; j > 2; j--){
        var tempHelperRow = helpers.getRange(j, i).getValue();
        
        //check if helper can help more people
        var maxHelp = helpers.getRange(tempHelperRow,8).getValue();
        var helpCount = helpers.getRange(tempHelperRow,9).getValue()-10;
        var tempHelperId = helpers.getRange(tempHelperRow,1).getValue();
        if (maxHelp > helpCount){
          var score = 0;
          if (tempHelperId == id) {
            score -= 1000;
            sendText(431936474, "tempHelperId == id");
          }
          var blackIndex = 6;
          var blackcounter = needsHelp.getRange(needsHelpRow, blackIndex).getValue();
          for (var k = 1; k <= blackcounter; k++){
            var blackId = needsHelp.getRange(needsHelpRow, blackIndex+k).getValue();
            if (tempHelperId == blackId) {
              score -= 1000;
              sendText(431936474, "tempHelperId == blackId");
            }
          }
          var helperPref = helpers.getRange(tempHelperRow, 5).getValue();
          var needsHelpPref = needsHelp.getRange(needsHelpRow, 5).getValue();
          if (helperPref.includes(needsHelpPref)) score += 6;
//          sendText(431936474, "Test");
          if (needsHelp.getRange(needsHelpRow, 3).getValue() == helpers.getRange(tempHelperRow, 7).getValue()) score += 14;//gender
          if (needsHelp.getRange(needsHelpRow, 4).getValue() == helpers.getRange(tempHelperRow, 6).getValue()){//faculty
            score += 1;
            if (needsHelpPref == "Studies") score += 1;//also looking for study help
          }
          if (helperPref == "All") score += 6;
          else if (needsHelpPref == helperPref || helperPref.includes(needsHelpPref)) score += 6;//topic
          else score -= 3; //Not in the same field. Some penalty.
//          sendText(431936474, tempHelperId+ "- id");
//          sendText(431936474, score);
          if ((score > 0) && (score > maxScore)){
            helperRow = tempHelperRow;
            maxScore = score;
            helperRowTab = j;
            helperColTab = i;
            helperId = tempHelperId;
          }
        }
      }
    }
  }
  
  if (helperRow !== 0){
    //swap with last in line - TODO CHECK & TESTS
    var nextFree = helpers.getRange(1, helperColTab).getValue();
    var lastInCol = helpers.getRange(nextFree-1, helperColTab).getValue();
    helpers.getRange(helperRowTab, helperColTab).setValue(lastInCol);
    helpers.getRange(nextFree-1, helperColTab).setValue(0);//optional
    helpers.getRange(1, helperColTab).setValue(nextFree-1);
    var nextFreeNextCol = helpers.getRange(1, helperColTab+1).getValue();
    helpers.getRange(nextFreeNextCol, helperColTab+1).setValue(helperRow);
    helpers.getRange(1, helperColTab+1).setValue(nextFreeNextCol+1);
    //update helper table
    var nextFreePlace = helpers.getRange(helperRow, 9).getValue();
    helpers.getRange(helperRow, nextFreePlace).setValue(id);
    helpers.getRange(helperRow, 9).setValue(nextFreePlace+1);
    helperId = helpers.getRange(helperRow, 1).getValue();
    needsHelp.getRange(needsHelpRow, 2).setValue(helperId);
  }
  return helperId;
}


function simpleText(id, text){
  if(text == About){
    sendText(id, "Hi! My name is Michael Toker and I am a student at the Computer Science department at the Technion");
    sendText(id, "I developed this bot as an open-source project for the use of Technion students, I hope that you find it useful!");
    sendKey(id, "You are more than welcome to contact me with any issue..", contactKeyBoard);
  }else if(text == ContactFacebook){
    sendText(id, "https://www.facebook.com/michael.toker");
  } else if(text == ContactEmail){
    sendText(id, "dontokeron@gmail.com");
  }else if(text == ContactLinkdIn){
    sendText(id, "https://www.linkedin.com/in/michael-toker-52814b153");
  }else if (text == usefulLink){
    sendKey(id,"Here are some useful links for you" ,usefulKeyBoard);   
  } else if (text == 'Copiers and printers'){
    sendText(id, 'General info - http://www.asat.org.il/academic/contents/print/צילום_והדפסה');
    sendText(id, 'in order to send a file to print start a new mail, type your ID in the SUBJECT.')
    sendText(id, 'Attach your files (Office documents, pictures and pdf files)');
    sendKey(id, 'Insert the recipient according to your desired task (click suitable tab to get email)', printKeyBoard)
  }else if (text == "A4 B&W single sided"){
    sendText(id, 'A4 B&W single sided – print.bws@campus.technion.ac.il');
  }else if (text == "A4 B&W two sided"){
    sendText(id, 'A4 B&W two sided – print.bwd@campus.technion.ac.il');
  } else if (text == "A4 Color single sided"){
    sendText(id, 'A4 Color single sided – print.color@campus.technion.ac.il');
  } else if (text == "A3 B&W single sided"){
    sendText(id, 'A3 B&W single sided – print.A3bws@campus.technion.ac.il')
  }else if (text == "A3 B&W two sided"){
    sendText(id, 'A3 B&W two sided – print.A3bwd@campus.technion.ac.il')
  } else if (text == "A3 Color single sided"){
    sendText(id, 'A3 Color single sided – print.A3color@campus.technion.ac.il')
  }else if (text == "B&W 2 slides per page, single sided"){
    sendText(id, 'B&W 2 slides per page, single sided – print.2pbws@campus.technion.ac.il')
  }else if(text == "B&W 2 slides per page, two sided"){
    sendText(id, 'B&W 2 slides per page, two sided – print.2pbwd@campus.technion.ac.il')
  }else if (text == "B&W 4 slides per page, single sided"){
    sendText(id, 'B&W 4 slides per page, single sided – print.4pbws@campus.technion.ac.il')
  }else if(text == "B&W 4 slides per page, two sided"){
    sendText(id, 'B&W 4 slides per page, two sided – print.4pbwd@campus.technion.ac.il')
  }else if (text == calendar){
    sendKey(id,"http://www.admin.technion.ac.il/dpcalendar/Student.aspx" ,usefulKeyBoard);   
  }else if (text == "אזור תל אביב-יפו והמרכז" || text == "אזור ירושליים" || text == "אזור חיפה והצפון" 
            || text == "אזור השפלה והדרום" || text == "אזור השרון" ){
    switch(text){
      case ("אזור תל אביב-יפו והמרכז"):
        sendKey(id, "Choose a city from the list below:", teKeyBoard);
        break;
      case ("אזור ירושליים"):
        sendKey(id, "Choose a city from the list below:", jeKeyBoard);
        break;
      case ("אזור חיפה והצפון"):
        sendKey(id, "Choose a city from the list below:", heKeyBoard);
        break;
      case ("אזור השפלה והדרום"):
        sendKey(id, "Choose a city from the list below:", soKeyBoard);
        break;
      case ("אזור השרון"):
        sendKey(id, "Choose a city from the list below:", shKeyBoard);
        break;
    }
  }else if (text == "טרמפים בפייסבוק"){
    sendText(id, "https://www.facebook.com/groups/301410316636087/"+" - "+"טרמפים יוצאים מהטכניון");
    sendText(id, "https://www.facebook.com/groups/135704829788347/"+ " - " + "טרמפים נכנסים לטכניון");
    sendKey(id, "מה תרצה לעשות כעת?",  ridesKeyBoard);
  }else if (text == "scans - cf"){
    sendText(id, "https://tscans.cf/");
  }else if (text == 'MyDegree'){
    sendText(id, "https://www.mydegree.co.il/");
  }else if (text == 'Technion Students FAQ (doc)'){
    sendText(id,"https://docs.google.com/document/d/1XGWWns6IZy9QpsAhWZu_WxIQTXYbRVeAV3XGr6pcMpc/edit?fbclid=IwAR1bBn5g3NBdxf2JFPbeWinOmQ3F0qa2KxlQGlMZ5wPyr31l0yRfo7ESPLc");
  }else if (text == 'useful links from facebook (doc)'){
    sendText(id,"https://docs.google.com/document/d/1tR8X8YawbK_h2VwQU1k1Fz4q12B0nWxOMSqxE_hV2sw/"+
             "edit?fbclid=IwAR1cQkxt1PG-gFwF_QWPG80u9ZNYuVwwBlWwmCes5MLst1ERmAIGijH8BRM");
  }else if (text == 'cheese&fork'){
    sendKey(id,"https://cheesefork.cf/",usefulKeyBoard);
  }else if (text == 'testock'){
    sendKey(id,"https://testock.tk/courses",usefulKeyBoard);
  }else if (text == 'ug '+ugSy) {
    sendKey(id, 'https://ug3.technion.ac.il/rishum/search',usefulKeyBoard );
  }else if (text == 'moodle '+moodleSy){
    sendKey(id, 'https://moodle.technion.ac.il/',usefulKeyBoard );
  }else if (text == "Git"){
    sendText(id, 'https://github.com/tokeron/Tbot');
  }else if (text == 'אסט'){
    sendKey(id,"http://www.asat.org.il/",usefulKeyBoard);
  }else if (text == 'ASA'){
    sendKey(id,"https://www.asatechnion.co.il/",usefulKeyBoard);
  }else if (text == 'ניב סקרביאנסקי'){
    sendKey(id, 'https://drive.google.com/file/d/11-zadZjM-0qDwc0qrWXHVygLN7aKkqna/view?usp=drivesdk', mainKeyBoard) ;
  }else if (text == Korona){
    sendText(id, "https://t.me/asat_technion");
  //}else if (text == 'חזור'){
  //  sendKey(id, "Choose from the list below", helpKeyBoard);
  }else if (text == help){
    sendKey(id, "This feature allows you to talk to a student at the Technion anonymously. You can talk about issues that are bothering you (topics such as mental distress, difficulty in studies or any other topic you would be happy to talk about with someone who can not judge you)", helpKeyBoard);
  }else if (text == fun){
    sendKey(id, "Choose your prefered type of activity and meet with new people!", funKeyBoard);
  }else if (text == "ספורט"){
    sendText(id, "https://t.me/joinchat/dQxFxMyugo5lMjI0");
  }else if (text == "טיולים"){
    sendText(id, "https://t.me/joinchat/z5np_mDyuQ4xMjBk");
  }else if (text == "משחקים"){
    sendText(id, "https://t.me/joinchat/0qbzGTf5jLVhNmFk");
  }else if (text == "פיתוח פרויקטים"){
    sendText(id, "https://t.me/joinchat/Amx7SinEWJBjNGM0");
  }
  else{
    return false;
  }
  return true;
}


function sendOpt(id, name, courses, courseRow){
  var excel = false;
  var cs = false;
  var teams = false;
  set(id, 'Course', name, courseRow);
  var courseNumber = courses.getRange(courseRow, 1).getValue();
  var courseName = courses.getRange(courseRow, 2).getValue();
  var mode = courses.getRange(courseRow, 5).getValue();
  var link = courses.getRange(courseRow, 3).getValue();
  if (mode == 1){
    sendText(id, courseName + " - "+ courseNumber );
    if (courses.getRange(courseRow, 6).getValue()) teams = true;
    if (link && teams){
      sendKey(id, "choose the required information", tgmalagKeyBoard);
    }
    else if (link){
      sendKey(id, "choose the required information", gmalagKeyBoard);
    }
    else if (teams){
      sendKey(id, "choose the required information", tmalagKeyBoard);
    }
    else sendKey(id, "choose the required information", malagKeyBoard);
    return;
  }
  else if (mode == 2){
    sendText(id, courseName + " - "+ courseNumber );
    if (link) sendKey(id, "choose the required information", gsportKeyBoard);
    else sendKey(id, "choose the required information", sportKeyBoard);
    return;
  }
  if ((courseNumber.indexOf('236') !== -1) || (courseNumber.indexOf('234') !== -1)){
    cs = true;
  }
  if (courses.getRange(courseRow, 4).getValue()) excel = true;
  if (courses.getRange(courseRow, 6).getValue()) teams = true;
  if (excel && cs && teams){
    sendText(id, courseName + " - "+ courseNumber );
    if (link) sendKey(id, "choose the required information", tgexcelCsKeyBoard);
    else sendKey(id, "choose the required information", texcelCsKeyBoard);
  }
  else if (excel && cs){
    sendText(id, courseName + " - "+ courseNumber );
    if (link) sendKey(id, "choose the required information", gexcelCsKeyBoard);
    else sendKey(id, "choose the required information", excelCsKeyBoard);
  }
  else if (cs && teams){
    sendText(id, courseName + " - "+ courseNumber );
    if (link) sendKey(id, "choose the required information", tgcsKeyBoard);
    else sendKey(id, "choose the required information", tcsKeyBoard)
      }
  else if (excel && teams){
    sendText(id, courseName + " - "+ courseNumber );
    if (link) sendKey(id, "choose the required information", tgexcelKeyBoard);
    else sendKey(id, "choose the required information", texcelKeyBoard)
      }
  else if (teams){
    sendText(id, courseName + " - "+ courseNumber );
    if (link) sendKey(id, "choose the required information", tgallKeyBoard);
    else sendKey(id, "choose the required information", tallKeyBoard);
  }
  else if (cs){
    sendText(id, courseName + " - "+ courseNumber );
    if (link) sendKey(id, "choose the required information", gcsKeyBoard);
    else sendKey(id, "choose the required information", csKeyBoard)
      }
  else if (excel){
    sendText(id, courseName + " - "+ courseNumber );
    if (link) sendKey(id, "choose the required information", gexcelKeyBoard);
    else sendKey(id, "choose the required information", excelKeyBoard)
      }
  else{
    sendText(id, courseName + " - "+ courseNumber );
    if (link) sendKey(id, "choose the required information", gallKeyBoard);
    else sendKey(id, "choose the required information", allKeyBoard)
  }
}


function getDone(id, name, command, users, courses){
  var cellFinder = users.createTextFinder(id);
  var cell = cellFinder.findNext();
  while (cell && (cell.getColumn() !== 1)) cell = cellFinder.findNext();
  var idRow = cell.getRow();
  var courseRow = users.getRange(idRow, 4).getValue();
  if (courseRow){
    var courseNumber = courses.getRange(courseRow, 1).getValue();
    var courseName = courses.getRange(courseRow, 2).getValue();
    var group = courses.getRange(courseRow, 3).getValue();
    var excel = courses.getRange(courseRow, 4).getValue();
    var teams = courses.getRange(courseRow, 6).getValue();
    var csCourse = false;
    if ((courseNumber.indexOf('236') !== -1) || (courseNumber.indexOf('234') !== -1)){
      csCourse = true;
    }
    switch(command){
      case drive:
        sendText(id, "Looking for a link to the drive "+ driveSy);
        driveHandler(id, courseNumber, courseName);
        var currentCounter = users.getRange(2, 9).getValue();
        users.getRange(2, 9).setValue(++currentCounter);
        break;
      case courseGroup:
        sendText(id, "Looking for telegram group" + groupSy);
        if (group) sendText(id, group);
        else sendText(id, "There is no telegram group for this course yet. you can open and add a groupby using 'Add group'");
        var currentCounter = users.getRange(2, 8).getValue();
        users.getRange(2, 8).setValue(++currentCounter);
        break;
      case "Teams Group \ud83d\udc6a":
        sendText(id, "Looking for Teams Group \ud83d\udc6a" + groupSy);
        if (teams) sendText(id, teams);
        else sendText(id, "There is no Teams Group \ud83d\udc6a for this course yet. you can open and add a groupby using 'Add group'")
        var currentCounter = users.getRange(2, 8).getValue();
        users.getRange(2, 8).setValue(++currentCounter);
        break;
      case testock:
        sendText(id, "Looking for a link to the test scans " + scansSy);
        scansHandler(id, courseNumber);
        var currentCounter = users.getRange(2, 11).getValue();
        users.getRange(2, 11).setValue(++currentCounter);
        break;
      case 'All tests - excel':
        sendText(id, "Looking for a link to the tests excel " + groupSy);
        sendText(id, excel);
        var currentCounter = users.getRange(2, 11).getValue();
        users.getRange(2, 11).setValue(++currentCounter);
        break;
      case reviews:
        reviewsHandler(id, courseRow, courses, 0);
        var currentCounter = users.getRange(2, 10).getValue();
        users.getRange(2, 10).setValue(++currentCounter);
        break;
      case facebook:
        facebookHandler(id, courseNumber, courseName);
        var currentCounter = users.getRange(2, 7).getValue();
        users.getRange(2, 7).setValue(++currentCounter);
        break;
      case youTube:
        youtubeHandler(id, courseNumber, courseName)
        var currentCounter = users.getRange(2, 7).getValue();
        users.getRange(2, 7).setValue(++currentCounter);
        break;
      case ug:
        sendText(id, "Looking for ug link " + ugSy);
        sendText(id, "https://ug3.technion.ac.il/rishum/course/"+courseNumber);
        var currentCounter = users.getRange(2, 6).getValue();
        users.getRange(2, 6).setValue(++currentCounter);
        break;
      case cs:
        sendText(id, "Looking for computer science link " + csSy);
        sendText(id, "https://webcourse.cs.technion.ac.il/"+courseNumber);
        var currentCounter = users.getRange(2, 6).getValue();
        users.getRange(2, 6).setValue(++currentCounter);
        break;
      case moodle:
        sendText(id, "Looking for moodle link " + moodleSy);
        sendText(id, "https://moodle.technion.ac.il/course/search.php?search="+courseNumber);
        var currentCounter = users.getRange(2, 6).getValue();
        users.getRange(2, 6).setValue(++currentCounter);
        break;
      case  "Course info":
        sendText(id, "Looking for info link ");
        sendText(id, "https://asatechnion.co.il/courses/syllabus"+courses.getRange(courseRow, 4).getValue()+".pdf");
        break;
      case "Panopto":
        panoptoHandler(id, courseNumber);
        break;
      case 'Get all':
        if (group){
          sendText(id, "Looking for a link to the telegram group " + groupSy);
          sendText(id, group);
        }
        if (teams){
          sendText(id, "Looking for Teams Group \ud83d\udc6a" + groupSy);
          if (teams) sendText(id, teams);
        }
        sendText(id, "Looking for a link to the test scans " + scansSy);
        scansHandler(id, courseNumber);
        if (excel) sendText(id, excel);
        reviewsHandler(id, courseRow, courses, 1);
        facebookHandler(id, courseNumber, courseName);
        youtubeHandler(id, courseNumber, courseName);
        sendText(id, "Looking for ug link " + ugSy);
        sendText(id, "https://ug3.technion.ac.il/rishum/course/"+courseNumber);
        if (csCourse){
          sendText(id, "Looking for computer science link " + csSy);
          sendText(id, "https://webcourse.cs.technion.ac.il/"+courseNumber);
        }
        sendText(id, "Looking for moodle link " + moodleSy);
        sendText(id, "https://moodle.technion.ac.il/course/search.php?search="+courseNumber);
        driveHandler(id, courseNumber, courseName);
        set(id, 0, name, 0)
        sendKey(id, "What would you like to do next?", mainKeyBoard);
        break;
    }
  }
}

//simple handlers - adds the course number to the url to return link to a query with the course number in the site
function panoptoHandler(id, courseNumber){
  sendText(id, "Looking for Panopto link " + YouTubeSy);
  sendText(id, "https://panoptotech.cloud.panopto.eu/Panopto/Pages/Sessions/List.aspx#query=%22"+courseNumber+"%22");
}


function youtubeHandler(id, courseNumber, courseName){
  sendText(id, "Looking for YouTube link " + YouTubeSy);
  var splited = courseName.split(' ');
  var combined = "+";
  for(var i = 0; splited[i]; i++){
    combined += splited[i];
    combined += '+';
  }
  sendText(id, "https://www.youtube.com/results?search_query=+"+combined+courseNumber);
}

function facebookHandler(id, courseNumber, courseName){
  sendText(id, "Looking for facebook link" + facebookSy);
  var nameCheck = courseName.split('(');
  if (nameCheck.length > 1){
    courseName = nameCheck[0];
  }
  var nameList = courseName.split(' ');
  var len = nameList.length;
  if (len > 1){
    var tempName = "";
    for(var count = 0; count < len; count++){
      tempName=tempName+"%20";
      tempName=tempName+nameList[count];
      courseName = tempName;
    }
  }
  else courseName = "%20"+courseName
  sendText(id, "https://www.facebook.com/search/top/?q="+courseNumber+courseName+"&epa=SEARCH_BOX"); 
}

function scansHandler(id, number){
  sendText(id, "https://testock.tk/course/"+number);
  return;
}
//handler using sheets
function facultyGroupHandler(id, data, mode, otherData){
  if(data == "הנדסת חשמל") {
    sendKey(id, "Choose your semester from the list below ", electricSemesterKeyBoard);
    set(id, 0, 0, data);
  }else if (otherData == "הנדסת חשמל"){
    sendKey(id, "Choose your study program from the list below ", electricProgramsKeyBoard);
    set(id, data, 0, "ChooseElectricProgram");
  }else if (otherData == "ChooseElectricProgram"){
    var telegramExel = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1nal2_52Pk29eosF81WpYhgCnLMPWziGBUPUROj_8yS8/edit#gid=0");
    var FacultyExel = telegramExel.getSheetByName("Electric");
    var row = FacultyExel.createTextFinder(mode).findNext();
    var i = row.getRow();
    var programCol = 2;// default Electrical Engineering
    if (data == "Computer and Software Engineering") programCol = 3;
    else if (data == "Computer Engineering") programCol = 4;
    else if (data == "Electrical Engineering and Physics") programCol = 5;
    var pathName = data;
    var Semester = FacultyExel.getRange(i,1).getValue();
    var currLink = FacultyExel.getRange(i,programCol).getValue();
    sendText(id, currLink + ' - ' + Semester + ' - ' + pathName);
    set(id,0,0,0);
  }else{
    var facultyEX = SpreadsheetApp.openByUrl(facultyRidesExel);
    var faculties = facultyEX.getActiveSheet();
    var row = faculties.createTextFinder(data).findNext();
    var i = row.getRow();
    var groupName = faculties.getRange(i,3).getValue();
    var currLink = faculties.getRange(i,2).getValue();
    sendText(id, currLink + ' - ' + groupName);
    if (groupName == 'סטודנטים בטכניון') sendText(id, 'https://teams.microsoft.com/l/team/19%3afde92135b254443db1e887147bbfdc09%40thread.skype/conversations?groupId=484ee060-222c-465a-9d1b-65803822e19f&tenantId=f1502c4c-ee2e-411c-9715-c855f6753b84 - Teams Group')
  }
}
 

//handler using drive
function driveHandler(id, courseNumber, courseName){
  var found = 0;
  var dApp = DriveApp;
  sendText(id, "Searching in CS..");
  var folderItr = dApp.getFoldersByName("Technion CS");
  var folder = folderItr.next();
  var subFolderItr = folder.getFolders();
  while (subFolderItr.hasNext()){
    var subFolder = subFolderItr.next();
    var currFolderName = subFolder.getName();
    if (currFolderName.indexOf(courseNumber) !== -1){
      found = true;
      sendText(id, currFolderName);
      sendText(id, subFolder.getUrl());
      return;
    }
  }
  var scienceItr = folder.getFoldersByName("קורסים מדעיים");
  var science = scienceItr.next();
  var subFolderItr = science.getFolders()
  while (subFolderItr.hasNext()){
    var s = subFolderItr.next();
    var currFolderName = s.getName();
    if (currFolderName.indexOf(courseNumber) !== -1){
      found = true;
      sendText(id, currFolderName);
      sendText(id, s.getUrl());
      return;
    }
  }
  var folderItr = dApp.getFoldersByName("Technion CS");
  var folder = folderItr.next();
  var humanItr = folder.getFoldersByName("קורסים הומניים");
  var human = humanItr.next();
  var subFolderItr = human.getFolders()
  while (subFolderItr.hasNext()){
    var h = subFolderItr.next();
    var currFolderName = h.getName();
    if (currFolderName.indexOf(courseNumber) !== -1){
      found = true;
      sendText(id, currFolderName);
      sendText(id, h.getUrl());
      return;
    }
  }
  sendText(id, "Searching in Industrial Engineering and Management..");
  var folderItr = dApp.getFoldersByName("Technion Drive - Public");
  var folder = folderItr.next();
  var subFolderItr = folder.getFolders();
  while (subFolderItr.hasNext()){
    var subFolder = subFolderItr.next();
    var currFolderName = subFolder.getName();
    if (currFolderName.indexOf(courseName) !== -1){
      found = true;
      sendText(id, currFolderName);
      sendText(id, subFolder.getUrl());
      return;
    }
  }
  sendText(id, "Searching in Electrical Engineering..");
  var folderItr = dApp.getFoldersByName('הדרייב הפקולטי על שם שי בן-דוד ז"ל');
  var folder = folderItr.next();
  var subFolderItr = folder.getFolders();
  while (subFolderItr.hasNext()){
    var subFolder = subFolderItr.next();
    var currFolderName = subFolder.getName();
    if (currFolderName.indexOf(courseNumber) !== -1){
      sendText(id, currFolderName);
      sendText(id, subFolder.getUrl());
      return;
    }
  }
  sendText(id, "Searching in Mechanical engineering..");
  var folderItr = dApp.getFoldersByName("הנדסת מכונות - דרייב פקולטי");
  var folder = folderItr.next();
  var semestersItr = folder.getFolders();
  while (semestersItr.hasNext()){
    var semesters = semestersItr.next();
    var subFolderItr = semesters.getFolders();
    while (subFolderItr.hasNext()){
      var subFolder = subFolderItr.next();
      var currFolderName = subFolder.getName();
      if (currFolderName.indexOf(courseNumber) !== -1){
        found = true;
        sendText(id, currFolderName);
        sendText(id, subFolder.getUrl());
        return;
      }
    }
  }
  //The drive has beed deleted
//  sendText(id, "Searching in Civil engineering..");
//  var folderItr = dApp.getFoldersByName("אזרחית 2014");
//  var folder = folderItr.next();
//  var semestersItr = folder.getFolders();
//  while (semestersItr.hasNext()){
//    var semesters = semestersItr.next();
//    var subFolderItr = semesters.getFolders();
//    while (subFolderItr.hasNext()){
//      var subFolder = subFolderItr.next();
//      var currFolderName = subFolder.getName();
//      if (currFolderName.indexOf(courseName) !== -1){
//        found = true;
//        sendText(id, currFolderName);
//        sendText(id, subFolder.getUrl());
//        return;
//      }
//    }
//  }
  sendText(id, "Searching in Physics..");
  var folderItr = dApp.getFoldersByName("PhysicsDrive");
  var folder = folderItr.next();
  var subFolderItr = folder.getFolders();
  while (subFolderItr.hasNext()){
    var subFolder = subFolderItr.next();
    var currFolderName = subFolder.getName();
    if (currFolderName.indexOf(courseNumber) !== -1){
      found = true;
      sendText(id, currFolderName);
      sendText(id, subFolder.getUrl());
      return;
    }
  }
  sendText(id, "Searching in Aerospace Engineering..");
  var folderItr = dApp.getFoldersByName("טכניון");
  var folder = folderItr.next();
  var semestersItr = folder.getFolders();
  while (semestersItr.hasNext()){
    var semesters = semestersItr.next();
    var subFolderItr = semesters.getFolders();
    while (subFolderItr.hasNext()){
      var subFolder = subFolderItr.next();
      var currFolderName = subFolder.getName();
      if (currFolderName.indexOf(courseName) !== -1){
        found = true;
        sendText(id, currFolderName);
        sendText(id, subFolder.getUrl());
        return;
      }
      else if(currFolderName.indexOf(courseNumber) !== -1){
        found = true;
        sendText(id, currFolderName);
        sendText(id, subFolder.getUrl());
        return;
      }
    }
  }
  if (!(found)){
    sendText(id, "sorry \u2639, can't find the drive for this course...");
    return;
  }
  else{
    sendText(id, 'Done');
  }
}

//adds a course to the list. Can be deleted after automation
function courseAdd(id ,courseNumber, courseName, link, courses){
  if (courseNumber == "" || courseNumber == 0){
    sendText(id, "Wrong course number", mainKeyBoard);
    return;
  }
  var list = courses.createTextFinder(courseNumber).findAll();
  if (list.length >= 1){
    sendKey(id, "The course is already registered", mainKeyBoard);
  }
  else{
    var i = courses.getRange(numberOfCourses, numberOfReviews).getValue();
    if (i == numberOfCourses){
      sendKey(id, 'The list is full', mainKeyBoard);
      return;
    }
    courses.getRange(i, 1).setValue(courseNumber);
    courses.getRange(i, 2).setValue(courseName);
    if (link) courses.getRange(i, 3).setValue(link);
    sendText(id, courseNumber+ ' - ' +courseName + " course is added, thank you for the information \uD83D\uDE4F");
    courses.getRange(numberOfCourses, numberOfReviews).setValue(++i);
  }
}
  
//not so usefull feature, probably goes down
function reviewsHandler(id, i, courses, isAll){
  sendText(id, "Looking for reviews " + reviewsSy);
  var j = 7;
  while (courses.getRange(i,j).getValue()){
    sendText(id, courses.getRange(i,j).getValue());
    j++;
  }
  if (j==7){
    if (!(isAll)) sendText(id, "sorry \u2639 there is no reviews for this course yet");
    return;
  }
}

//important function set(id, data, name, num)
//Description: the function changes the cell in the sheets according to the data and num variables. 
//That way the bot can "remmeber" the previous commands in order to complete the commands.
//input: user id, data(string) that determines the state of the student in the sheets,
//name of the user and num that most of the time is the number of the course
function set(id, data, name, num){
  var app = SpreadsheetApp.openByUrl(userExel);
  var ss = app.getActiveSheet();
  var rowFinder = ss.createTextFinder(id);
  var row = rowFinder.findNext();
  while (row !== null && row.getColumn() !== 1) row = rowFinder.findNext();
  if (row !== null){
    row = row.getRow();
    ss.getRange(row, 2).setValue(data);
    if (name) ss.getRange(row, 3).setValue(name);
    else if (name == 0) ss.getRange(row, 3).setValue(0);
    if (num) ss.getRange(row, 4).setValue(num);
    else if (num == 0)ss.getRange(row, 4).setValue(0);
    return;
  }
  else{
    //   sendText(id, row);//test
    var next = ss.getRange(2, 4).getValue();
//    if (next == numberOfCourses){
//      // Fetch the email address
//      var emailAddress = "technobot404@gmail.com";
//      // Send Alert Email.
//      var message = "The 'mode' list is full!!"; 
//      var subject = 'You have a problem in TBot';
//      MailApp.sendEmail(emailAddress, subject, message);
//      sendText(id, 'There is a temporary error');
//    }
    ss.getRange(next, 1).setValue(id);
    ss.getRange(next, 2).setValue(data);
    if (name) ss.getRange(next, 3).setValue(name);
    if (num) ss.getRange(next, 4).setValue(num);
    ss.getRange(2, 4).setValue(++next);
    return;
  }
}

//function do download file from user
function downloadFile(fileid,fileName, userId){
  sendText(userId, "downloading...");
  var response = UrlFetchApp.fetch(url + '/getFile?file_id=' + fileid);
  sendText(userId, "downloading...1");
  var urlphoto = 'https://api.telegram.org/file/bot' + token + '/' + JSON.parse(response.getContentText()).result["file_path"];
  sendText(userId, "downloading...2");
  var file = UrlFetchApp.fetch(urlphoto);
  //var blob = file.getBlob();
  //blob.setName(fileName)
  //var jum = DriveApp.createFile(blob).setName(new Date().toLocaleString());
  return file
}

//sunction to send an emailwith file
function sendEmail(file,chat_id, studentId,printType,fileName){
  sendText(chat_id, "sending..");
  //GmailApp.sendEmail('dontokeron@gmail.com', studentId,"hello", {
  GmailApp.sendEmail('Print.' + printType + '@campus.technion.ac.il', studentId,"print for me please", {
    attachments: [file],
    name: 'Automatic Emailer Script'
    //replyTo: "tbotaviv" +chat_id + "@gmail.com"
});
  sendText(chat_id, "done..");
}
