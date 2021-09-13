function establishSQL(){
  var url = "jdbc:google:mysql://tbot-322209:us-central1:tbot2021";
  var userName = "root";
  var password = "91tbot21tobt";
  var conn = Jdbc.getCloudSqlConnection(url, userName, password);
  return conn;
}


//function that runs once a day and deletes long convarsations from yesterday.
function deleteNotInUse(){
  var userEx = SpreadsheetApp.openByUrl(userExcel);
  var users = userEx.getActiveSheet();
  var today = Utilities.formatDate(new Date(), "GMT+3", "dd/MM/yyyy");
  var talkFinder = users.createTextFinder("Talk");
  var nextInTalk = talkFinder.findNext();
  while (nextInTalk !== null){
    var userRow =  nextInTalk.getRow();
    var userLastUse = users.getRange(userRow, 5).getValue();
    var partnerId = users.getRange(userRow, 4).getValue();
    var id = users.getRange(userRow, 1).getValue();
    if (today !== userLastUse){
      sendText(431936474, "id: "+id + " " + partnerId + " unconnected");
      oldSet(id, -1,-1,-1);
      oldSet(partnerId, -1,-1,-1);
      sendText(id, "The conversation is not active for a long time, therefore the conversation is over now.");
      sendText(partnerId, "The conversation is not active for a long time, therefore the conversation is over now.");
    }
    var nextInTalk = talkFinder.findNext();
  }
}



//functions that runs once a day and updates the courses acording to ug updates
function getCourses(){
  var urlCourses = "https://raw.githubusercontent.com/michael-maltsev/cheese-fork/gh-pages/courses/courses_";
  var year = "2020";
  var semesterNum = "02";
  var response = UrlFetchApp.fetch(urlCourses+year+semesterNum+".min.js");
  var response  = response.getContentText();
  //response = '"'+response.slice(0,25)+'"'+response.slice(26);
  //console.log(response);
  //var coursesJSON = JSON.parse(response);
  return response;
}

function updateCourses(){
  var str = getCourses();
  var crs = SpreadsheetApp.openByUrl(courseExcel).getActiveSheet();
  //var crs = ss.getSheetByName('Courses');
  while (str.indexOf("general") !== -1){
    str = str.slice(str.indexOf("general"));
    str = str.slice(str.indexOf("פקולטה"));
    str = str.slice(str.indexOf(":"));
    str = str.slice(2);
    var crsFaculty = str.slice(0, str.indexOf('"'));
    str = str.slice(str.indexOf("שם מקצוע"));
    str = str.slice(str.indexOf(":"));
    str = str.slice(2);
    var crsName = str.slice(0, str.indexOf('"'));
    str = str.slice(str.indexOf("מספר מקצוע"));
    str = str.slice(str.indexOf(":"));
    str = str.slice(2);
    var crsNum = str.slice(0, str.indexOf('"'));
    var silIndex = str.indexOf("סילבוס");
    if (silIndex !== -1){
      str = str.slice(str.indexOf("סילבוס"));
      str = str.slice(str.indexOf(":"));
      str = str.slice(2);
      var crsSil = str.slice(0, str.indexOf('"'));
    }
    var kdamIndex = str.indexOf("מקצועות קדם")
    if (kdamIndex !== -1){
      str = str.slice(str.indexOf("מקצועות קדם"));
      str = str.slice(str.indexOf(":"));
      str = str.slice(2);
      var crsKdam = str.slice(0, str.indexOf('"'));
    }
    var profIndex = str.indexOf("אחראים");
    if (profIndex !== -1){
      str = str.slice(str.indexOf("אחראים"));
      str = str.slice(str.indexOf(":"));
      str = str.slice(2);
      var crsProf = str.slice(0, str.indexOf('"'));
    }
    var AIndex = str.indexOf("מועד א");
    if (AIndex !== -1){
      str = str.slice(str.indexOf("מועד א"));
      str = str.slice(str.indexOf(":"));
      str = str.slice(2);
      var crsA = str.slice(0, str.indexOf('"'));
    }
    var BIndex = str.indexOf("מועד ב");
    if (BIndex){
      str = str.slice(str.indexOf("מועד ב"));
      str = str.slice(str.indexOf(":"));
      str = str.slice(2);
      var crsB = str.slice(0, str.indexOf('"'));
    }
    var courseFinder = crs.createTextFinder(crsNum);    
    var cell = courseFinder.findNext();
    if (!(cell)){
      var nextFreeRow = crs.getRange(1292, 1).getValue();
      crs.getRange(1292, 1).setValue(nextFreeRow+1);
      crs.getRange(nextFreeRow, 5).setValue(crsFaculty);
      crs.getRange(nextFreeRow, 2).setValue(crsName);
      crs.getRange(nextFreeRow, 1).setValue(crsNum);
      if (silIndex) crs.getRange(nextFreeRow, 7).setValue(crsSil);
      if (kdamIndex) crs.getRange(nextFreeRow, 8).setValue(crsKdam);
      if (profIndex) crs.getRange(nextFreeRow, 9).setValue(crsProf);
      if (AIndex) crs.getRange(nextFreeRow, 10).setValue(crsA);
      if (BIndex) crs.getRange(nextFreeRow, 11).setValue(crsB);
      crs.getRange(1292, 1).setValue(++nextFreeRow);
    }
      else{
      nextFreeRow = cell.getRow();
      crs.getRange(nextFreeRow, 5).setValue(crsFaculty);
      //crs.getRange(nextFreeRow, 2).setValue(crsName);
      //crs.getRange(nextFreeRow, 1).setValue(crsNum);
      if (silIndex) crs.getRange(nextFreeRow, 7).setValue(crsSil);
      if (kdamIndex) crs.getRange(nextFreeRow, 8).setValue(crsKdam);
      if (profIndex) crs.getRange(nextFreeRow, 9).setValue(crsProf);
      if (AIndex) crs.getRange(nextFreeRow, 10).setValue(crsA);
      if (BIndex) crs.getRange(nextFreeRow, 11).setValue(crsB);
    }
     console.log(crsNum);
  }
}


function getLinks(){
  var coursesExcelNew = "https://docs.google.com/spreadsheets/d/1hkWNJhWBHJfsVWV-0DcMRphsJXE79JvuJAXhvlnC7OY/edit#gid=0";
  var newCrs = SpreadsheetApp.openByUrl(coursesExcelNew);
  var crs = newCrs.getSheetByName('Courses');
  var old = SpreadsheetApp.openByUrl(courseExcel).getActiveSheet();
  
  var row = 966;
  var courseNumber = old.getRange(row, 1).getValue();
  while(courseNumber !== -1){
    var crsName = old.getRange(row, 2).getValue()
    var telegramLink = old.getRange(row, 3).getValue();
    var excelLink = old.getRange(row, 4).getValue();
    var teamsLink = old.getRange(row, 6).getValue();
    if (courseNumber == null || courseNumber == "" || courseNumber == 0) {
      
    }else{
      var courseFinder = crs.createTextFinder(courseNumber);
      var nextCourse = courseFinder.findNext();
      while (nextCourse !== null && nextCourse.getColumn() !== 1){
        var nextCourse = courseFinder.findNext();
      }
      if (nextCourse){
        var courseRow = nextCourse.getRow();
        crs.getRange(courseRow, 3).setValue(telegramLink);
        crs.getRange(courseRow, 4).setValue(excelLink);
        crs.getRange(courseRow, 6).setValue(teamsLink);
      }else{//add course
        var nextFreeRow = crs.getRange(1, 2).getValue();
        crs.getRange(nextFreeRow, 2).setValue(crsName);
        crs.getRange(nextFreeRow, 1).setValue(courseNumber);
        crs.getRange(nextFreeRow, 3).setValue(telegramLink);
        crs.getRange(nextFreeRow, 4).setValue(excelLink);
        crs.getRange(nextFreeRow, 6).setValue(teamsLink);
        crs.getRange(1, 2).setValue(++nextFreeRow);
      }
    }
    courseNumber = old.getRange(++row, 1).getValue();
  }
}