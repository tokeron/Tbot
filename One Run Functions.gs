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
  var year = new Date().getFullYear();
  var month = new Date().getMonth()
  var semesterNum;
  year = year - 1
  switch(month){
    case(8):
    case(9):
    case(10):
    case(11):
      semesterNum = "01"
      break
    case(0):
    case(1):
      year = year - 1 
      semesterNum = "01"
      break
    case(2):
    case(3):
    case(4):
    case(5):
      year = year - 1 
      semesterNum = "02"
      break
    case(6):
    case(7):
      year = year - 1  
      semesterNum = "03"
      break
  }
  var year = year.toFixed()
  var url = urlCourses+year+semesterNum+".js"
  Logger.log(url)
  var response = UrlFetchApp.fetch(url);
  var response  = response.getContentText();
  eval(response)
  return courses_from_rishum;
}

/**
 * This function uses the json from cheese&fork git in order to fetch courses info from
 * To update the information just run this function 
 */
function updateCourses(){
  var courses_from_rishum  = getCourses();
  var dataBaseEx = SpreadsheetApp.openByUrl(dataBase);
  var courses = dataBaseEx.getSheetByName("courses");

  nextRow = courses.getRange(1,1).getValue()
  courses_from_rishum.forEach((course) => {
    faculty = course.general[fieldNamesGeneral.faculty]
    courseName = course.general[fieldNamesGeneral.courseName]
    courseNumber = course.general[fieldNamesGeneral.courseNumber]
    nakaz = course.general[fieldNamesGeneral.nakaz]
    lecture = course.general[fieldNamesGeneral.lecture]
    tutorial= course.general[fieldNamesGeneral.tutorial]
    lab = course.general[fieldNamesGeneral.lab]
    seminar = course.general[fieldNamesGeneral.seminar]
    silabus = course.general[fieldNamesGeneral.silabus]
    kdam = course.general[fieldNamesGeneral.kdam]
    lead = course.general[fieldNamesGeneral.lead]
    examA = course.general[fieldNamesGeneral.examA]
    examB = course.general[fieldNamesGeneral.examB]
    
    //course is already in the list. only update the information 
    var textFinder = courses.createTextFinder(courseNumber);
    nextCourse = textFinder.findNext()
    while(nextCourse !== null && nextCourse.getColumn() !== fieldCourses.courseNumber) nextCourse = textFinder.findNext()
    if (nextCourse){ //The course already in the table
      
    }else{  //course is not in the list yet
      //if information exists, update the spreadsheets
      if (faculty) courses.getRange(nextRow,fieldCourses.faculty).setValue(faculty)
      if (courseName) courses.getRange(nextRow,fieldCourses.courseName).setValue(courseName)
      if (courseNumber) courses.getRange(nextRow,fieldCourses.courseNumber).setValue(courseNumber)
      if (nakaz) courses.getRange(nextRow,fieldCourses.nakaz).setValue(nakaz)
      if (lecture) courses.getRange(nextRow,fieldCourses.lecture).setValue(lecture)
      if (tutorial) courses.getRange(nextRow,fieldCourses.tutorial).setValue(tutorial)
      if (lab) courses.getRange(nextRow,fieldCourses.lab).setValue(lab)
      if (seminar) courses.getRange(nextRow,fieldCourses.seminar).setValue(seminar)
      if (kdam) courses.getRange(nextRow,fieldCourses.kdam).setValue(kdam)
      if (silabus) courses.getRange(nextRow,fieldCourses.silabus).setValue(silabus)
      if (lead) courses.getRange(nextRow,fieldCourses.lead).setValue(lead)
      if (examA) courses.getRange(nextRow,fieldCourses.examA).setValue(examA)
      if (examB) courses.getRange(nextRow,fieldCourses.examB).setValue(examB)
      //update the counter 
      courses.getRange(1,1).setValue(++nextRow)
    }
  });
  Logger.log("done")
}

/**
 * This function fetches the links from old dataset to the new dataset
 */
function getLinks(){
  var dataBaseEx = SpreadsheetApp.openByUrl(dataBase);
  var courses = dataBaseEx.getSheetByName("courses");
  
  var old = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1X0hW9bVrshckxj8ft0whEgRnTiquoKfzoHSr5Ji2n5E/edit#gid=0").getActiveSheet();
  
  nextRow = courses.getRange(1,1).getValue()

  for (i = 3; i < nextRow; ++i){
    currCourse = courses.getRange(i, fieldCourses.courseNumber).getValue();
    courseFinder = old.createTextFinder(currCourse);
    nexrCell = courseFinder.findNext();
    while(nexrCell !== null && nexrCell.getColumn() !== 1) nexrCell = courseFinder.findNext();
    if (nexrCell){
      telegram = old.getRange(nexrCell.getRow(), 3).getValue()
      teams = old.getRange(nexrCell.getRow(), 6).getValue()
      spreadsheet = old.getRange(nexrCell.getRow(), 4).getValue()
      if (telegram) courses.getRange(i, fieldCourses.telegram).setValue(telegram)
      if (teams) courses.getRange(i, fieldCourses.teams).setValue(teams)
      if (spreadsheet) courses.getRange(i, fieldCourses.spreadsheet).setValue(spreadsheet)
    }
  }
  Logger.log("done")
}
