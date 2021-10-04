
function findHelper(id){
  var dataBaseEx = SpreadsheetApp.openByUrl(dataBase);
  var helpers = dataBaseEx.getSheetByName("helpers");
  var needsHelp = dataBaseEx.getSheetByName("needsHelp");

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
          var blackIndex = 6;
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

// most of it can be replaced be single Object.
function simpleText(id, name, text){
  switch(text){
    case(About):
      sendText(id, "Hi! My name is Michael Toker and I am a student at the Computer Science department at the Technion");
      sendText(id, "I developed this bot as an open-source project for the use of Technion students, I hope that you find it useful!");
      sendKey(id, "You are more than welcome to contact me with any issue..", contactKeyBoard);
      return true
    case(ContactFacebook):
      sendText(id, "https://www.facebook.com/michael.toker")
      return true
    case(ContactEmail):
      sendText(id, "dontokeron@gmail.com")
      return true
    case(ContactLinkdIn):
      sendText(id, "https://www.linkedin.com/in/michael-toker-52814b153")
      return true
    case(usefulLink):
      sendKey(id,"Here are some useful links for you" ,usefulKeyBoard)
      return true
    case('Copiers and printers'):
      sendText(id, 'General info - http://www.asat.org.il/academic/contents/print/צילום_והדפסה');
      sendText(id, 'in order to send a file to print start a new mail, type your ID in the SUBJECT.')
      sendText(id, 'Attach your files (Office documents, pictures and pdf files)');
      sendKey(id, 'Insert the recipient according to your desired task (click suitable tab to get email)', printKeyBoard);
      updateClickOnLinksStats();
      return true
    case("A4 B&W single sided"):
      sendText(id, 'A4 B&W single sided – print.bws@campus.technion.ac.il');
      return true
    case("A4 B&W two sided"):
      sendText(id, 'A4 B&W two sided – print.bwd@campus.technion.ac.il');
      return true
    case("A4 Color single sided"):
      sendText(id, 'A4 Color single sided – print.color@campus.technion.ac.il');
      return true
    case("A3 B&W single sided"):
      sendText(id, 'A3 B&W single sided – print.A3bws@campus.technion.ac.il')
      return true
    case("A3 B&W two sided"):
      sendText(id, 'A3 B&W two sided – print.A3bwd@campus.technion.ac.il')
      return true
    case("A3 Color single sided"):
      sendText(id, 'A3 Color single sided – print.A3color@campus.technion.ac.il')
      return true
    case("B&W 2 slides per page, single sided"):
      sendText(id, 'B&W 2 slides per page, single sided – print.2pbws@campus.technion.ac.il')
      return true
    case("B&W 2 slides per page, two sided"):
      sendText(id, 'B&W 2 slides per page, two sided – print.2pbwd@campus.technion.ac.il')
      return true
    case("B&W 4 slides per page, single sided"):
      sendText(id, 'B&W 4 slides per page, single sided – print.4pbws@campus.technion.ac.il')
      return true
    case("B&W 4 slides per page, two sided"):
      sendText(id, 'B&W 4 slides per page, two sided – print.4pbwd@campus.technion.ac.il')
      return true
    case(calendar):
      sendKey(id,"http://www.admin.technion.ac.il/dpcalendar/Student.aspx" ,usefulKeyBoard);
      updateClickOnLinksStats();   
      return true
    case("אזור תל אביב-יפו והמרכז"):
      sendKey(id, "Choose a city from the list below:", teKeyBoard);
      return true
    case ("אזור ירושליים"):
      sendKey(id, "Choose a city from the list below:", jeKeyBoard);
      return true
    case ("אזור חיפה והצפון"):
      sendKey(id, "Choose a city from the list below:", heKeyBoard);
      return true
    case ("אזור השפלה והדרום"):
      sendKey(id, "Choose a city from the list below:", soKeyBoard);
      return true
    case ("אזור השרון"):
      sendKey(id, "Choose a city from the list below:", shKeyBoard);
      return true
    case("טרמפים בפייסבוק"):
      sendText(id, "https://www.facebook.com/groups/301410316636087/"+" - "+"טרמפים יוצאים מהטכניון");
      sendText(id, "https://www.facebook.com/groups/135704829788347/"+ " - " + "טרמפים נכנסים לטכניון");
      sendKey(id, "מה תרצה לעשות כעת?",  ridesKeyBoard);
      return true
    case("scans - cf"):
      sendText(id, "https://tscans.cf/");
      updateClickOnLinksStats();
      return true
    case('MyDegree'):
      sendText(id, "https://www.mydegree.co.il/");
      updateClickOnLinksStats();
      return true
    case('Technion Students FAQ (doc)'):
      sendText(id,"https://docs.google.com/document/d/1XGWWns6IZy9QpsAhWZu_WxIQTXYbRVeAV3XGr6pcMpc/edit?fbclid=IwAR1bBn5g3NBdxf2JFPbeWinOmQ3F0qa2KxlQGlMZ5wPyr31l0yRfo7ESPLc");
      updateClickOnLinksStats();
      return true
    case('useful links from facebook (doc)'):
      sendText(id,"https://docs.google.com/document/d/1tR8X8YawbK_h2VwQU1k1Fz4q12B0nWxOMSqxE_hV2sw/"+
               "edit?fbclid=IwAR1cQkxt1PG-gFwF_QWPG80u9ZNYuVwwBlWwmCes5MLst1ERmAIGijH8BRM");
      updateClickOnLinksStats();
      return true
    case('cheese&fork'):
      sendKey(id,"https://cheesefork.cf/",usefulKeyBoard);
      updateClickOnLinksStats();
      return true
    case('testock'):
      sendKey(id,"https://testock.tk/courses",usefulKeyBoard);
      updateClickOnLinksStats();
      return true
    case('ug '+ugSy):
      sendKey(id, 'https://ug3.technion.ac.il/rishum/search',usefulKeyBoard );
      updateClickOnLinksStats();
      return true
    case('moodle '+moodleSy):
      sendKey(id, 'https://moodle.technion.ac.il/',usefulKeyBoard );
      updateClickOnLinksStats();
      return true
    case("Git"):
      sendText(id, 'https://github.com/tokeron/Tbot');
      return true
    case('אסט'):
      sendKey(id,"http://www.asat.org.il/",usefulKeyBoard);
      updateClickOnLinksStats();
      return true
    case('ASA'):
      sendKey(id,"https://www.asatechnion.co.il/",usefulKeyBoard);
      updateClickOnLinksStats();
      return true
    case(Korona):
      sendText(id, "https://t.me/asat_technion");
      updateClickOnLinksStats();
      return true
    //}else if (text == 'חזור'){
    //  sendKey(id, "Choose from the list below", helpKeyBoard);
    case(help):
      sendKey(id, "This feature allows you to talk to a student at the Technion anonymously. You can talk about issues that are bothering you (topics such as mental distress, difficulty in studies or any other topic you would be happy to talk about with someone who can not judge you)", helpKeyBoard);
      return true
    case(fun):
      sendKey(id, "Choose your prefered type of activity and meet with new people!", funKeyBoard);
      return true
    case("ספורט"):
      sendText(id, "https://t.me/joinchat/dQxFxMyugo5lMjI0");
      return true
    case("טיולים"):
      sendText(id, "https://t.me/joinchat/z5np_mDyuQ4xMjBk");
      return true
    case("משחקים"):
      sendText(id, "https://t.me/joinchat/0qbzGTf5jLVhNmFk");
      return true
    case("פיתוח פרויקטים"):
      sendText(id, "https://t.me/joinchat/Amx7SinEWJBjNGM0");
      return true
    case(ride):
    case('רשימת אזורים'):
      sendKey(id, "Send the required city name or choose your region from the list below " + downSy, rideKeyBoard);
      oldSet(id, "Ride");
      return true
    case(course):
    case('Search For Another Course'):
      removeKey(id, "Please insert the course number or course name in hebrew");
      set(id, name, "Course", 0)
      return true
    case(faculty): 
    case("Department Groups \ud83c\udfeb"):
      sendKey(id, "Choose your faculty from the list below ", coursesKeyBoard);
      oldSet(id, 'faculty');
      return true
    case(feedback):
    case("/feedback"):
      removeKey(id, "You can send your feedback now");
      oldSet(id, 'feedback');
      return true
    default:
      return false;
    }
}

function updateClickOnLinksStats(){
  var dataBaseEx = SpreadsheetApp.openByUrl(dataBase);
  var statistics = dataBaseEx.getSheetByName("statistics");
  var todaysRow = statistics.getRange(stats.todaysRow.row, stats.todaysRow.col).getValue();
  statistics.getRange(todaysRow,stats.clicksOnLinksCol).setValue(statistics.getRange(todaysRow,stats.clicksOnLinksCol).getValue() + 1);
}


function sendOpt(id, name, courses, courseRow){
  var excel = false;
  var cs = false;
  var teams = false;
  set(id, null, 'Course', courseRow);
  var courseNumber = courses.getRange(courseRow, fieldCourses.courseNumber).getValue();
  var courseName = courses.getRange(courseRow, fieldCourses.courseName).getValue();
  sendKey(id, "Choose the required information",allKeyBoard)
  return
}


function getDone(id, name, reg2, command, users, courses){
  var courseRow = reg2
  if (courseRow){
    var courseNumber = courses.getRange(courseRow, fieldCourses.courseNumber).getValue();
    var courseName = courses.getRange(courseRow, fieldCourses.courseName).getValue();
    var group = courses.getRange(courseRow, fieldCourses.telegram).getValue();
    var teams = courses.getRange(courseRow, fieldCourses.teams).getValue();
    var whatsApp = courses.getRange(courseRow, fieldCourses.whatsApp).getValue();
    var zoom = courses.getRange(courseRow, fieldCourses.zoom).getValue();
    var excel = courses.getRange(courseRow, fieldCourses.spreadsheet).getValue()
    var csCourse = false;
    if ((courseNumber.indexOf('236') !== -1) || (courseNumber.indexOf('234') !== -1)){
      csCourse = true;
    }
    switch(command){
      case drive:
        sendText(id, "Looking for a link to the drive "+ driveSy);
        driveHandler(id, courseNumber, courseName);
        //var currentCounter = users.getRange(2, 9).getValue();
        //users.getRange(2, 9).setValue(++currentCounter);
        return;
      case telegramGroup:
        sendText(id, "Looking for telegram group" + groupSy);
        if (group) sendText(id, group);
        else sendText(id, "There is no telegram group for this course yet. you can open and add a groupby using 'Add group'");
        //var currentCounter = users.getRange(2, 8).getValue();
        //users.getRange(2, 8).setValue(++currentCounter);
        return;
      case "Teams Group \ud83d\udc6a":
        sendText(id, "Looking for Teams Group \ud83d\udc6a" + groupSy);
        if (teams) sendText(id, teams);
        else sendText(id, "There is no Teams Group \ud83d\udc6a for this course yet. you can open and add a groupby using 'Add group'")
        //var currentCounter = users.getRange(2, 8).getValue();
        //users.getRange(2, 8).setValue(++currentCounter);
        return;
      case testock:
        sendText(id, "Looking for a link to the test scans " + scansSy);
        scansHandler(id, courseNumber);
        //var currentCounter = users.getRange(2, 11).getValue();
        //users.getRange(2, 11).setValue(++currentCounter);
        return;
      case 'All tests - excel':
        sendText(id, "Looking for a link to the tests excel " + groupSy);
        sendText(id, excel);
        //var currentCounter = users.getRange(2, 11).getValue();
        //users.getRange(2, 11).setValue(++currentCounter);
        return;
      case reviews:
        reviewsHandler(id, courseRow, courses, 0);
        //var currentCounter = users.getRange(2, 10).getValue();
        //users.getRange(2, 10).setValue(++currentCounter);
        return;
      case facebook:
        facebookHandler(id, courseNumber, courseName);
        //var currentCounter = users.getRange(2, 7).getValue();
        //users.getRange(2, 7).setValue(++currentCounter);
        return;
      case youTube:
        youtubeHandler(id, courseNumber, courseName)
        //var currentCounter = users.getRange(2, 7).getValue();
        //users.getRange(2, 7).setValue(++currentCounter);
        return;
      case ug:
        sendText(id, "Looking for ug link " + ugSy);
        sendText(id, "https://ug3.technion.ac.il/rishum/course/"+courseNumber);
        //var currentCounter = users.getRange(2, 6).getValue();
        //users.getRange(2, 6).setValue(++currentCounter);
        return;
      case cs:
        sendText(id, "Looking for computer science link " + csSy);
        sendText(id, "https://webcourse.cs.technion.ac.il/"+courseNumber);
        //var currentCounter = users.getRange(2, 6).getValue();
        //users.getRange(2, 6).setValue(++currentCounter);
        return;
      case moodle:
        sendText(id, "Looking for moodle link " + moodleSy);
        sendText(id, "https://moodle.technion.ac.il/course/search.php?search="+courseNumber);
        //var currentCounter = users.getRange(2, 6).getValue();
        //users.getRange(2, 6).setValue(++currentCounter);
        return;
      case  "Course info":
        sendText(id, "Looking for info link ");
        sendText(id, "https://asatechnion.co.il/courses/syllabus"+courses.getRange(courseRow, 4).getValue()+".pdf");
        return;
      case "Panopto":
        panoptoHandler(id, courseNumber);
        return;
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
        //oldSet(id, 0, name, 0)
        //sendKey(id, "What would you like to do next?", mainKeyBoard);
        return;
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
    oldSet(id, 0, 0, data);
  }else if (otherData == "הנדסת חשמל"){
    sendKey(id, "Choose your study program from the list below ", electricProgramsKeyBoard);
    oldSet(id, data, 0, "ChooseElectricProgram");
  }else if (otherData == "ChooseElectricProgram"){
    var telegramExcel = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1nal2_52Pk29eosF81WpYhgCnLMPWziGBUPUROj_8yS8/edit#gid=0");
    var FacultyExcel = telegramExcel.getSheetByName("Electric");
    var row = FacultyExcel.createTextFinder(mode).findNext();
    var i = row.getRow();
    var programCol = 2;// default Electrical Engineering
    if (data == "Computer and Software Engineering") programCol = 3;
    else if (data == "Computer Engineering") programCol = 4;
    else if (data == "Electrical Engineering and Physics") programCol = 5;
    var pathName = data;
    var Semester = FacultyExcel.getRange(i,1).getValue();
    var currLink = FacultyExcel.getRange(i,programCol).getValue();
    sendText(id, currLink + ' - ' + Semester + ' - ' + pathName);
    oldSet(id,0,0,0);
  }else{
    var dataBaseEx = SpreadsheetApp.openByUrl(dataBase);
    var telegramLinks = dataBaseEx.getSheetByName("telegramLinks")
    var row = telegramLinks.createTextFinder(data).findNext();
    var i = row.getRow();
    var groupName = telegramLinks.getRange(i,3).getValue();
    var currLink = telegramLinks.getRange(i,2).getValue();
    sendText(id, currLink + ' - ' + groupName);
    if (groupName == 'סטודנטים בטכניון') sendText(id, 'https://teams.microsoft.com/l/team/19%3afde92135b254443db1e887147bbfdc09%40thread.skype/conversations?groupId=484ee060-222c-465a-9d1b-65803822e19f&tenantId=f1502c4c-ee2e-411c-9715-c855f6753b84 - Teams Group')
  }
}

function getIdFromUrl(url) { return url.match(/[-\w]{25,}/); }

//handler using drive
function driveHandler(id, courseNumber, courseName){
  var found = 0;
  var dApp = DriveApp;
  sendText(id, "Searching in CS..");
  var fileId = getIdFromUrl(csDriveUrl);
  var folder = dApp.getFolderById(fileId);
  var subFolderItr = folder.getFolders();
  while (subFolderItr.hasNext()){
    var subFolder = subFolderItr.next();
    var currFolderName = subFolder.getName();
    if (currFolderName.indexOf(courseNumber) !== -1){
      found = true;
      sendText(id, currFolderName);
      sendText(id, subFolder.getUrl());
      break;
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
      break;
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
      break;
    }
  }
  sendText(id, "Searching in Industrial Engineering and Management..");
  var fileId = getIdFromUrl(taonDriveUrl);
  var folder = dApp.getFolderById(fileId);
  var subFolderItr = folder.getFolders();
  while (subFolderItr.hasNext()){
    var subFolder = subFolderItr.next();
    var currFolderName = subFolder.getName();
    if (currFolderName.indexOf(courseName) !== -1){
      found = true;
      sendText(id, currFolderName);
      sendText(id, subFolder.getUrl());
      break;
    }
  }
  sendText(id, "Searching in Electrical Engineering..");
  var fileId = getIdFromUrl(electricalDriveUrl);
  var folder = dApp.getFolderById(fileId);
  var subFolderItr = folder.getFolders();
  while (subFolderItr.hasNext()){
    var subFolder = subFolderItr.next();
    var currFolderName = subFolder.getName();
    if (currFolderName.indexOf(courseNumber) !== -1){
      sendText(id, currFolderName);
      sendText(id, subFolder.getUrl());
      break;
    }
  }
  sendText(id, "Searching in Mechanical engineering..");
  var fileId = getIdFromUrl(mechanicalDriveUrl);
  var folder = dApp.getFolderById(fileId);
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
        break;
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
  var fileId = getIdFromUrl(physicsDriveUrl);
  var folder = dApp.getFolderById(fileId);
  var subFolderItr = folder.getFolders();
  while (subFolderItr.hasNext()){
    var subFolder = subFolderItr.next();
    var currFolderName = subFolder.getName();
    if (currFolderName.indexOf(courseNumber) !== -1){
      found = true;
      sendText(id, currFolderName);
      sendText(id, subFolder.getUrl());
      break;
    }
  }
  sendText(id, "Searching in Aerospace Engineering..");
  var fileId = getIdFromUrl(aeroDriveUrl);
  var folder = dApp.getFolderById(fileId);
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
        break;
      }
      else if(currFolderName.indexOf(courseNumber) !== -1){
        found = true;
        sendText(id, currFolderName);
        sendText(id, subFolder.getUrl());
        break;
      }
    }
  }
  if (!(found)){
    sendText(id, "sorry \u2639, can't find the drive for this course...");
  }
  else{
    sendText(id, 'Done');
  }
  return
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
  
/**
 * not so usefull feature, probably goes down
 * 
 * */
function reviewsHandler(id, i, courses, isAll){
  // sendText(id, "Looking for reviews " + reviewsSy);
  // var j = 7;
  // while (courses.getRange(i,j).getValue()){
  //   sendText(id, courses.getRange(i,j).getValue());
  //   j++;
  // }
  // if (j==7){
  //   if (!(isAll)) sendText(id, "sorry \u2639 there is no reviews for this course yet");
  //   return;
  // }
}

//important function oldSet(id, data, name, num)
//Description: the function changes the cell in the sheets according to the data and num variables. 
//That way the bot can "remmeber" the previous commands in order to complete the commands.
//input: user id, data(string) that determines the state of the student in the sheets,
//name of the user and num that most of the time is the number of the course

function oldSet(id, data, name, num){
  set(id, name, data, num);
}

/**
 * important function oldSet(id, data, name, num)
 * Description: the function changes the cell in the sheets according to the data and num variables. 
 * That way the bot can "remmeber" the previous commands in order to complete the commands.
 * input: user id, data(string) that determines the state of the student in the sheets,
 * name of the user and num that most of the time is the number of the course
 * @param {id} key the name of the variable to decrement.
 * @param {name}  
 * @param {reg1} helper parameter for "remembering" previous user data
 * @param {reg2} helper parameter for "remembering" previous user data
 * @param {reg3} helper parameter for "remembering" previous user data
 * @param {reg4} helper parameter for "remembering" previous user data
 * @param {reg5} helper parameter for "remembering" previous user data 
 */

function set(id, name, reg1, reg2, reg3, reg4, reg5){
  //open spreadsheet
  var dataBaseEx = SpreadsheetApp.openByUrl(dataBase);
  var users = dataBaseEx.getSheetByName("users");
  var statistics =  dataBaseEx.getSheetByName("statistics");
  //if (!(users)) sendText(id, "users is not defined");
  userFinder = users.createTextFinder(id);
  user = userFinder.findNext();
  while (user !== null && user.getColumn() !== 1) user = userFinder.findNext(); //seach the row with the id in the first row
  if (user !== null){
    row = user.getRow();
    if ((name || name == 0) && (name !== 'null')) users.getRange(row, fieldUsers.name).setValue(name);
    if ((reg1 || reg1 == 0) && (name !== 'null')) users.getRange(row, fieldUsers.reg1).setValue(reg1);
    if ((reg2 || reg2 == 0) && (name !== 'null')) users.getRange(row, fieldUsers.reg2).setValue(reg2);
    if ((reg3 || reg3 == 0) && (name !== 'null')) users.getRange(row, fieldUsers.reg3).setValue(reg3);
    if ((reg4 || reg4 == 0) && (name !== 'null')) users.getRange(row, fieldUsers.reg4).setValue(reg4);
    if ((reg5 || reg5 == 0) && (name !== 'null')) users.getRange(row, fieldUsers.reg5).setValue(reg5);
    updateUserStats(row);
    return;
  }
  else{ //new user

    var nextRow = users.getRange(1, 4).getValue();
    var numOfUsers = users.getRange(1, 2).getValue();
    users.getRange(nextRow, fieldUsers.id).setValue(id);
    if (name || name == 0) users.getRange(nextRow, fieldUsers.name).setValue(name);
    if (reg1 || reg1 == 0) users.getRange(nextRow, fieldUsers.reg1).setValue(reg1);
    if (reg2 || reg2 == 0) users.getRange(nextRow, fieldUsers.reg2).setValue(reg2);
    if (reg3 || reg3 == 0) users.getRange(nextRow, fieldUsers.reg3).setValue(reg3);
    if (reg4 || reg4 == 0) users.getRange(nextRow, fieldUsers.reg4).setValue(reg4);
    if (reg5 || reg5 == 0) users.getRange(nextRow, fieldUsers.reg5).setValue(reg5);

    users.getRange(1, 4).setValue(++nextRow);
    users.getRange(1, 2).setValue(++numOfUsers);

    // Stats part
    var statUsersAllTime = statistics.getRange(stats.users.allTime.row,stats.users.allTime.col).getValue();
    var statUsersMonthly = statistics.getRange(stats.users.month.row,stats.users.month.col).getValue();
    var statUsersWeekly = statistics.getRange(stats.users.week.row,stats.users.week.col).getValue();
    var statUsersDaily = statistics.getRange(stats.users.day.row,stats.users.day.col).getValue();

    statistics.getRange(stats.users.allTime.row,stats.users.allTime.col).setValue(++statUsersAllTime);
    statistics.getRange(stats.users.month.row,stats.users.month.col).setValue(++statUsersMonthly);
    statistics.getRange(stats.users.week.row,stats.users.week.col).setValue(++statUsersWeekly);
    statistics.getRange(stats.users.day.row,stats.users.day.col).setValue(++statUsersDaily);
    statistics.getRange(statistics.getRange(stats.todaysRow.row,stats.todaysRow.col).getValue(),stats.numOfUsersCol).setValue(statistics.getRange(statistics.getRange(stats.todaysRow.row,stats.todaysRow.col).getValue(),stats.numOfUsersCol).getValue() + 1);
    return;
  }
}
/**
 * function updateUserStats
 * updates the user statistics when a known user is using the bot again.
 * @param {row} the row of the user that logged-in in the users spreadsheet.
 */
function updateUserStats(row){
  var dataBaseEx = SpreadsheetApp.openByUrl(dataBase);
  var users = dataBaseEx.getSheetByName("users");
  var statistics =  dataBaseEx.getSheetByName("statistics");

  const DAY = 1000 * 60 * 60 * 24; // ms per day

  var lastSeen = users.getRange(row, fieldUsers.lastSeen).getValue();
  var now = new Date();
  var diff = now - lastSeen;

  if(diff > DAY){
    statistics.getRange(stats.users.day.row,stats.users.day.col).setValue(statistics.getRange(stats.users.day.row,stats.users.day.col).getValue() + 1);
    statistics.getRange(stats.test.row,stats.test.col).setValue(1);
    statistics.getRange(statistics.getRange(stats.todaysRow.row,stats.todaysRow.col).getValue(),stats.numOfUsersCol).setValue(statistics.getRange(statistics.getRange(stats.todaysRow.row,stats.todaysRow.col).getValue(),stats.numOfUsersCol).getValue() + 1);
    if(diff > 7*DAY){
      statistics.getRange(stats.users.week.row,stats.users.week.col).setValue(statistics.getRange(stats.users.week.row,stats.users.week.col).getValue() + 1);
      if(diff > 30*DAY){
        statistics.getRange(stats.users.month.row,stats.users.month.col).setValue(statistics.getRange(stats.users.month.row,stats.users.month.col).getValue() + 1);
        }
      }
    }
  return;
}
/**
 * statTrigger:
 * A function that updates the number of active users in the last day/week/month.
 * Should be called daily by a trigger.
 */
function statTrigger(){
  var dataBaseEx = SpreadsheetApp.openByUrl(dataBase);
  var users = dataBaseEx.getSheetByName("users");
  var statistics =  dataBaseEx.getSheetByName("statistics");

  const DAY = 1000 * 60 * 60 * 24; // ms per day
  var today = new Date();
  var nextFreeRow = users.getRange(fieldUsers.nextFreeRow.row,fieldUsers.nextFreeRow.col).getValue();
  var statUsersMonthly = 0;
  var statUsersWeekly = 0;
  var statUsersDaily = 0;
  for(let row=3;row<nextFreeRow;row++){
    var diff = today - users.getRange(row, fieldUsers.lastSeen).getValue();
    if(diff < 30*DAY){
      statUsersMonthly++;
      if(diff < 7*DAY){
        statUsersWeekly++;
        if(diff < DAY){
          statUsersDaily++;
        }
      }
    }
  }
  statistics.getRange(stats.users.month.row,stats.users.month.col).setValue(statUsersMonthly);
  statistics.getRange(stats.users.week.row,stats.users.week.col).setValue(statUsersWeekly);
  statistics.getRange(stats.users.day.row,stats.users.day.col).setValue(statUsersDaily);

  var row = Math.floor((today - new Date(2021,9,3))/DAY + 2.1); //row of the day that comes after tommorow
  statistics.getRange(stats.todaysRow.row,stats.todaysRow.col).setValue(row);
  statistics.getRange(row,stats.numOfUsersCol).setValue(0);
  statistics.getRange(row,stats.clicksCol).setValue(0);
  statistics.getRange(row,stats.clicksOnLinksCol).setValue(0);
  return;
}

function reset(id, name){
  set(id, name, 0, 0, 0, 0, 0)
}


/**
 * fetch and increment the script-property with the given key.
 * @param {String} key the name of the variable to increment.
 * @return {Number} the old value of key.
 */
function fetchAndInc(key){
  var v = +ScriptProperties.getProperty(key);
  ScriptProperties.setProperty(key,1+v);
  return v;
}

/**
 * fetch and decrement the script-property with the given key.
 * @param {String} key the name of the variable to decrement.
 * @return {Number} the old value of key.
 */
function fetchAndDec(key){
  var v = +ScriptProperties.getProperty(key);
  ScriptProperties.setProperty(key,v-1);
  return v;
}

/**
 * This function cleans the list of cources for the user
 * @param {string} id user id
 * @param {spreadsheet} users users spreadsheet
 */
function cleanList(id, users){
  var cellFinder = users.createTextFinder(id);
  var cell = cellFinder.findNext();
  while (cell !== null && cell.getColumn() !== 1){
    cell = cellFinder.findNext();
  }
  if (cell){
    var idRow = cell.getRow();
    for (var currCol = 14;currCol <=29; currCol++){
      users.getRange(idRow, currCol).setValue(0);
    }
    sendText(id, "Your list is clean");
  }
}

/**
 * This function finds the cell location of the user in users spreadsheet
 * @param {string} id user id
 * @param {spreadsheet} users users spreadsheet
 */
function findUser(id, users){
  var cellFinder = users.createTextFinder(id)
  var cell = cellFinder.findNext()
  while (cell !== null && cell.getColumn() !== 1)
  {
    cell = cellFinder.findNext(); 
  }
  return cell;
}

/**
 * 
 */
function  SFSHandler(id, name, busi, data, reg1)
{
  var maxCol = busi.getRange(2, 2).getValue();
  var maxRow = busi.getRange(3, 2).getValue();
  var topicBase = busi.getRange(4, 2).getValue();
  var sectionBase = busi.getRange(5, 2).getValue();
  var sectionsNum = busi.getRange(6, 2).getValue();
  var topicNum = busi.getRange(7, 2).getValue();
  switch(data){
    case("Add a Topic \ud83c\udfea"):
      oldSet(id, reg1, 0, data);
      sendText(id, "We glad that you decided to join us! Please insert the topic");
      return;
    case("Add a Business \ud83c\udfea"):
      sendText(id, "We glad that you decided to join us! Please insert your business name");
      oldSet(id, reg1, 0, "Password");//abuse of notation: using name as additional data holder
      return;
    case("Delete My Business \ud83d\udcdb"):
      oldSet(id, SFS, name, data);
      sendText(id, "Please tap on your business in order to delete it from the list");
      return;
    case("Edit My Business \ud83d\udcdd"):
      oldSet(id, SFS, name, data);
      sendText(id, "Please tap on your business in order to edit it");
      return;
    case("Delete My Business \ud83d\udcdb"):
      sendText(id, "In order to continue please provide your password");
      oldSet(id, SFS, data, "Pass");
      return;
    case("Edit My Business \ud83d\udcdd"):
      sendText(id, "In order to continue please provide your password");
      oldSet(id, SFS, data, "PassToEdit");
      return;
    }
    if(data == SFS){
      var courseList = [];
      var numberList = [];
      for (var i = sectionBase + 1; i < sectionBase*sectionsNum; i += sectionBase){
        var currTopic = busi.getRange(1, i).getValue();
        numberList.push(currTopic);
        courseList.push(currTopic);
      }
      courseList.push("Add a Topic \ud83c\udfea");
      numberList.push("Add a Topic \ud83c\udfea");
      makeKeyBoard(id, courseList, numberList);
      oldSet(id, SFS, name, "Wait");
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
      var topicCol = busi.createTextFinder(data).findNext();
      if (!topicCol) return;
      var topiCol = topicCol.getColumn();
      var counter = busi.getRange(2, topiCol-1).getValue();
      if (counter == 0) sendText(id, "There is no business here yet. Tap on 'Add a Business' in order to add your business to the list.")
      for (var i = topicBase + 1; i < topicBase + counter + 1; ++i){
        var currBusi = busi.getRange(i, topiCol).getValue();
        if (!currBusi) return;
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
      oldSet(id, reg1, data, data);
    }else if (currBusi){//Show busiKeyBoard and set topic reg1
      oldSet(id, reg1, name, data);
      var description = busi.getRange(busiRow, busiCol+1).getValue();
      sendKey(id, description, busiKeyBoard);
      return;
    }
}

/**
 * This function deletes one course from the list of cources for the user
 * @param {string} id user id
 * @param {string} name 
 * @param {string} data 
 * @param {spreadsheet} users
 * @param {spreadsheet} courses
 */
function deleteCourse(id, name, data, users, courses){
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
  oldSet(id, 0, name, 0);
  sendText(id, "Course number " + data + " is not on your list anymore");
  return;
}

/**
 * Connects an helper with one of his patients
 * @param {string} id
 * @param {string} data
 * @param {spreadsheet} helpers
 */
function connectHelper(id, data, helpers){
  var helperRow = reg2;
  var integer = parseInt(data, 10);
  var needsHelpCol = 9 + integer;
  var needsHelpId = helpers.getRange(helperRow, needsHelpCol).getValue();
  oldSet(id, "Talk","" ,needsHelpId);
  oldSet(needsHelpId, "Talk","" ,id);
  sendText(id, "You are connected with student number "+ data);
  removeKey(id, "To end the connection just type 'goodbye' or 'ביי'");
  sendText(needsHelpId, "Your helper want's to talk to you. You are connected");
  sendText(needsHelpId, "To end the connection just type 'goodbye' or 'ביי'");
  return;
}

/**
 * 
 */
function cleanQuotationMarks(text){
  var tmpText = text.split('"');
  if (tmpText.length == 2){
    text=clean[0]+clean[1];
  }
  return text;
}

/**
 * 
 */
function isAuthorized(id, users){
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
          oldSet(id, 0, name, 0);
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
  return true;
}

/**
 * 
 */
function registrationToHelp(id, helpers){
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
    oldSet(id, "help by number",0,helperRow);
  }else{
    sendText(id, "על מנת להיכנס למאגר העוזרים עלייך למלא את הטופס הבא וניצור איתך קשר בהקדם");
    sendText(id, "בשדה id בשאלון הכנס בבקשה את המספר הבא: "+ id);
    sendText(id, "https://forms.gle/ECq5NxEvJAMD9pTn8");
  }
}

/**
 * Add a cource to the users' list
 * @param {string} id
 * @param {string} reg2
 * @param {int} row user row
 * @param {spreadsheet} courses
 */
function addToList(id, reg2, row, users, courses){
  var added = false;
  if (row){ //user found in the course list
    var idRow = row;
    var courseToAdd = reg2;
    var currCol = 14;
    while (currCol <= 29){
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
        return;
      }
    }
    if (!(added)){
      sendtext(id, "The list is full");
      return;
    }
  }
}

/**
 * 
 */
function loadCourses(id, row, users, courses){
  sendText(id, "Loading your Courses..");
  var idRow = row;
  if (idRow){
    var currCol = 14;
    var courseList = [];
    var numberList = [];
    while (currCol <= 28){
      var courseRow = users.getRange(idRow, currCol).getValue();
      if (courseRow){
        var courseNumber = courses.getRange(courseRow, fieldCourses.courseNumber).getValue();
        var courseName = courses.getRange(courseRow, fieldCourses.courseName).getValue();
        numberList.push(courseNumber);
        courseList.push(courseName+" - "+courseNumber);
        currCol++;
      }else{
        currCol = 29;
      }
    }
    if (numberList.length > 0){
      courseList.push("Delete A Course From My List");
      numberList.push("Delete A Course From My List");
      courseList.push("Clean My List");
      numberList.push("Clean My List");
      courseList.push("Search For Another Course");
      numberList.push("Search For Another Course");
      set(id, null, "Course", 0);
      makeKeyBoard(id, courseList, numberList);
    }
    else{
      sendText(id, "There is no registered courses yet");
    }
  }
}

/**
 * 
 */
function setAnonymousTalk(id, users, helpers){
  var helperCol = 2;
  sendText(id, "Searching for an helper" );
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
    oldSet(id, "Talk","" ,helperId);
    oldSet(helperId, "Talk","" ,id);
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
}

/**
 * 
 */
function sendHelperSettings(id, name, text, needsHelp){
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
  set(id, name, text, 0, 0, 0, 0);
  var gender = needsHelp.getRange(row, 3).getValue();
  var faculty = needsHelp.getRange(row, 4).getValue();
  var topic = needsHelp.getRange(row, 5).getValue();
  if ((!(gender)) && (!(faculty)) && (!(topic))) sendText(id, "There is no preference yet");
  else sendText(id, "Your current settings are:");
  if (gender) sendText(id, "Gender: "+gender);
  if (faculty) sendText(id, "Faculty: "+faculty);
  if (topic) sendText(id, "Topic: "+topic);
  sendKey(id, "Choose the settings you are willing to change", settingsKeyBoard);
  return
}

/**
 * 
 */
function sendSFS(id, name, text, busi){
  sendText(id, "Students for Students is a project designed to encourage students to support other students businesses");
  var maxCol = busi.getRange(2, 2).getValue();
  var maxRow = busi.getRange(3, 2).getValue();
  var topicBase = busi.getRange(4, 2).getValue();
  var sectionBase = busi.getRange(5, 2).getValue();
  var sectionsNum = busi.getRange(6, 2).getValue();
  //var topicNum = busi.getRange(7, 2).getValue(  
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
  oldSet(id, text, name, "Wait");
}

/**
 * 
 */
function  updateBusi(id, busi, reg2){
  var maxCol = busi.getRange(2, 2).getValue();
  var maxRow = busi.getRange(3, 2).getValue();
  var topicBase = busi.getRange(4, 2).getValue();
  var sectionBase = busi.getRange(5, 2).getValue();
  var sectionsNum = busi.getRange(6, 2).getValue();
  var topicNum = busi.getRange(7, 2).getValue(); 
  var currBusi = busi.createTextFinder(reg3).findNext();
  var busiRow = currBusi.getRow();
  var busiCol = currBusi.getColumn();
  //(reg2 == "Business name") busiCol+=0;
  if (reg2 == "Description") busiCol += 1;
  else if (reg2 == "Contact Information") busiCol += 3;
  else if (reg2 == "Password") busiCol -= 1;
  busi.getRange(busiRow, busiCol).setValue(text);
  sendKey(id, "The "+reg2+" has been updated to "+ text, mainKeyBoard);
  return;
}

/**
 * 
 */
function sendMassage(id, text, users){
  var otherId = users.getRange(row, 4).getValue();
  if (text == "ביי" || text == "goodbye"){
    sendText(otherId, text);
    sendText(id, "The conversation is over");
    sendText(otherId, "The conversation is over");
    oldSet(id, 0, name, 0);
    oldSet(otherId, 0, 0, 0);
    sendKey(id, "How may I help you?", mainKeyBoard);
    sendKey(otherId, "How may I help you?", mainKeyBoard);
    //TODO send some feedback about the conversation
  }else{
    sendText(otherId, text);
  }
  return
}


/**
 * 
 */
function sendFeedback(id, name, text){
  // Fetch the email address
  var emailAddress = "technobot404@gmail.com";
  // Send Alert Email.
  var message = text;       
  var subject = 'You have a new feedback from technoBot user';
  MailApp.sendEmail(emailAddress, subject, message + 'id: '+id+' ');
  sendText(id, "Thank you for your feedback! \uD83D\uDE4F");
  oldSet(id, 0, name, 0);
  sendKey(id, "What would you like to do next?", mainKeyBoard);
  return
}

/**
 * 
 */
function sendRideLink(id, telegramLinks, text){
  var list = telegramLinks.createTextFinder(text).findAll();
  if (list.length > 0){
    var row = list[0].getRow();
    var courseName = telegramLinks.getRange(row,1).getValue();
    var link = telegramLinks.getRange(row,3).getValue();
    sendText(id, link + ' - ' + courseName);
  }
  return
}

/**
 * 
 */
function addCourseToSpreadsheet(id, courseNumber, courseName, courseLink, courses){
  if (!(courseNumber) || !(courseName)){
    sendText(id, "Wrong format. please inset your review in the followog format: course number-course name-group link");
    sendKey(id, "What would you like to do next?", mainKeyBoard);
  }
  else{
    courseAdd(id, courseNumber, courseName, courseLink, courses);
    oldSet(id, 0);
    sendKey(id, "What would you like to do next?", mainKeyBoard);
  }
  return
}

/**
 * 
 */
function addCourseReview(id, name, row, users, course){
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
    oldSet(id, 0, name, 0);
  }
}

/**
 * 
 */
function addTelegramGroup(id, name, row, courses, users){
  var courseRow = 0;
  var idRow = row;
  courseRow = users.getRange(idRow, 4).getValue();
  var courseNumber = courses.getRange(courseRow, 1).getValue();
  var courseName = courses.getRange(courseRow, 2).getValue();
  var group = courses.getRange(courseRow, 3).getValue();
  if (group){
    sendText(id, 'The group is already exist');
    sendText(id, group);
    oldSet(id, 0, name, 0);
    sendKey(id,'What would you like to do next?',mainKeyBoard)
    return;
  }
  if (courseRow){
    var checkIfLink = text.split('ttps://t.me/joinchat');
    if (checkIfLink.length !== 2){
      sendText(id, 'This is not a link to telegram group. Please try again');
      sendKey(id,'What would you like to do next?',mainKeyBoard)
      oldSet(id, 0, name, 0);
    }
    else{
      courses.getRange(courseRow, 3).setValue(text);
      sendText(id, "The group is added to " + courseNumber + ' ' + courseName);
      oldSet(id, 0, name, 0);
      sendKey(id,'What would you like to do next?',mainKeyBoard)
    }
  }
}

/**
 * 
 */
 function addTeamsGroup(id, name, users, courses){
  var courseRow = 0;
  var idRow = row;
  courseRow = users.getRange(idRow, 4).getValue();
  var courseNumber = courses.getRange(courseRow, 1).getValue();
  var courseName = courses.getRange(courseRow, 2).getValue();
  var group = courses.getRange(courseRow, 6).getValue();
  if (group){
    sendText(id, 'The group is already exist');
    sendText(id, group);
    oldSet(id, 0, name, 0);
    sendKey(id,'What would you like to do next?',mainKeyBoard)
    return;
  }
  if (courseRow){
    var checkIfLink = text.split('ttps://teams.microsoft.com');
    if (checkIfLink.length !== 2){
      sendText(id, 'This is not a link to Teams Group \ud83d\udc6a. Please try again');
      sendKey(id,'What would you like to do next?',mainKeyBoard)
      oldSet(id, 0, name, 0);
    }
    else{
      courses.getRange(courseRow, 6).setValue(text);
      sendText(id, "The group is added to " + courseNumber + ' ' + courseName);
      oldSet(id, 0, name, 0);
      sendKey(id,'What would you like to do next?',mainKeyBoard)
    }
  }
}

/**
 * 
 */
function addExamExcel(id, name, users, courses){
  var courseRow = 0;
  var idRow = row;
  courseRow = users.getRange(idRow, 4).getValue();
  var courseNumber = courses.getRange(courseRow, 1).getValue();
  var courseName = courses.getRange(courseRow, 2).getValue();
  if (courseRow){
    courses.getRange(courseRow, 4).setValue(text);
    sendText(id, "The Excel is added to " + courseNumber + ' ' + courseName);
  }
}

/**
 * 
 */
function findCourse(id, name, text, courses){
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
        courseRow = list[count].getRow();
        if (courseCol == 1 || courseCol == 2){
          var courseName = courses.getRange(courseRow, fieldCourses.courseName).getValue();
          var courseNumber = courses.getRange(courseRow, fieldCourses.courseNumber).getValue();
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
  }else{
    sendKey(id, "can't find "+text+". Try typing somthing else or type 'home' to return to main menu.");
  }
}



/**
 * 
 */
function handleSettingsSFS(id, name, text, reg1, needsHelp){
  // init user in needsHelp table
  var rowFinder = needsHelp.createTextFinder(id);
  var currID = rowFinder.findNext();
  var row;
  while (currID !== null && currID.getColumn() !== 1) {
    currID = rowFinder.findNext();
  }
  if (currID == null){
    var nextFree = needsHelp.getRange(1, 1).getValue();
    needsHelp.getRange(nextFree,1).setValue(id);
    needsHelp.getRange(nextFree,6).setValue(0);//init black list
    needsHelp.getRange(1, 1).setValue(nextFree+1);
    row = nextFree;
  }
  else row = currID.getRow();
  switch(text){
    case("Gender"):
      sendKey(id, "Choose the required gender", genderKeyBoard);
      set(id, name, reg1, text);
      return;
    case("Faculty"):
      sendKey(id, "Choose the required faculty", coursesKeyBoard);
      set(id, name, reg1, text);
      return;
    case("Topic"):
      sendKey(id, "Choose the required topic", topicKeyBoard);
      set(id, name, reg1, text);
      return
    case("Change helper"):
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
    case("Back"):
    case('חזור'):        
      sendKey(id, "Choose from the list below", helpKeyBoard);
      return;

    case("Male"):
    case("Female"):
      needsHelp.getRange(row, 3).setValue(text);
      sendKey(id, "Your prefernce has been updated "+text+" gender", settingsKeyBoard);
      return
    case("Studies"):
    case("Emotional Distress"):
    case("Military experiences"):
    case("Violence or harassment"):
      needsHelp.getRange(row, 5).setValue(text);
      sendKey(id, "Your prefernce has been updated: "+text+" topic", settingsKeyBoard);
      return
    case("מדעי המחשב"):
    case('הנדסת חשמל'):
    case('הנדסת מכונות'):
    case('הנדסה אזרחית וסביבתית'):
    case('הנדסת תעשייה וניהול'):
    case('הנדסת ביוטכנולוגיה ומזון'):
    case('מדע והנדסה של חומרים'):
    case('הפקולטה למתמטיקה'):
    case('הפקולטה לכימיה'):
    case('הפקולטה לפיסיקה'):
    case('הפקולטה לביולוגיה'):
    case('רפואה'):
    case('ארכיטקטורה ובינוי ערים'):
    case('חינוך למדע וטכנולוגיה'): 
    case('הפקולטה להנדסת אוירונוטיקה וחלל'):
    needsHelp.getRange(row, 4).setValue(text);
    sendKey(id, "Your prefernce has been updated "+text+" faculty", settingsKeyBoard);
    return;
  }
}

/**
 * 
 */
function deleteByNumber(id, name, users, courses){
  //get course row
  var courseToDelete = courses.createTextFinder(text).findNext().getRow();
  sendText(id, courseToDelete);//test
  var courseCol = 0;
  var lastInCol;
  var index = 5;
  var currCourse = users.getRange(row, index).getValue();
  while (currCourse){
    if (currCourse == courseToDelete) courseCol = index;
    currCourse = users.getRange(row, ++index).getValue();
  }
  if (courseCol){
    var lastCourse = users.getRange(row, index-1).getValue();
    users.getRange(row, courseCol).setValue(lastCourse);
    users.getRange(row, index-1).setValue(0);
  }
  sendText(id, "Course number " + text + " is not on your list anymore");
}

/**
 * 
 */
function addTopicSFS(id, name, text, busi){
  var isExist = busi.createTextFinder(text).findNext();
  if (isExist){
    sendText(id, "This topic is already exists. You can add your business by 'Add a Business \ud83c\udfea' button after entering the topic");
    }else{
      busi.getRange(1, sectionBase*sectionsNum+1).setValue(text);
      busi.getRange(2, sectionBase*sectionsNum).setValue(0);
      busi.getRange(6, 2).setValue(sectionsNum+1);
      sendText(id, "Got it! "+text+" topic is initialized");          
      oldSet(id, "null", name, "null");
    }
    return;
}

/**
 * 
 */
function deleteBusi(id, reg3, busi){
  var textFinder = busi.createTextFinder(reg3);
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
}

/**
 * 
 */
function deleteIfPass(text, busi){
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

/**
 * 
 */
function editBusi(id, text, busi){
  var textFinder = busi.createTextFinder(reg3);
  var next = textFinder.findNext();
  if (next !== null){
    var nextRow = next.getRow();
    var nextCol = next.getColumn();
    if (text == busi.getRange(nextRow, nextCol - 1).getValue()){ //the password is good
      sendKey(id, "What information wuold you like to modify?", busiEditKeyBoard);
      oldSet(id, SFS, 0, "GoodPass")
    }else{
      sendText(id, "The password is wrong! please try again. You can contanct us in case that you forgot your password.");
    }
  }
  return;
}

/**
 * 
 */
function createBusi(id, text, reg1, reg3, busi){
  var topic = reg3;
  var currTopic = busi.createTextFinder(topic).findNext();
  var topicCol = 0;
  var topicCounter = 0;
  if (currTopic){
   topicCol = currTopic.getColumn();
   topicCounter = busi.getRange(2, topicCol-1).getValue(); 
  }
  var isExist = busi.createTextFinder(text).findNext();
  if (text.length >= 34) sendText(id, "The name is too long. Please choose another name for your business");
  else if (isExist) sendText(id, "This name is already taken. Please choose another name for your business");
  else{
    busi.getRange(topicBase+topicCounter+1, topicCol).setValue(text);//set name
    sendText(id, text+" is initialized. Please send a password in order to be able to make changes in the future..");
    busi.getRange(2, topicCol-1).setValue(topicCounter+1);//conter++
    oldSet(id, reg1, 0, "Description");
  }
}