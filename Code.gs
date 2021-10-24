/**
 * This is a bot that was developed for the use of Technion students.
 * The bot is running on the google script platform and google sheets.
 */


/**
 * functions that handels the fetching the commands from the users
 */
function getMe() {
  var response =  UrlFetchApp.fetch(url + "/getMe");
  Logger.log(response.getContentText());
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Hello " + JSON.stringify(e)); 
}

/**
 * Execution of requestes of users (Main function)
 * @param {class} JSON
 */
function doPost(e){
  var contents = JSON.parse(e.postData.contents);
  var dataBaseEx = SpreadsheetApp.openByUrl(dataBase);
  var statistics = dataBaseEx.getSheetByName("statistics");

  //internal keyboard command - different from regular text
  if (contents.callback_query){
    handleCallback(contents);
  }
  //external massage command - same as regular text
  else if (contents.message){
    handleMessage(contents);
  }

  //stats update
  var todaysRow = statistics.getRange(stats.todaysRow.row,stats.todaysRow.col).getValue();
  statistics.getRange(todaysRow, stats.clicksCol).setValue(statistics.getRange(todaysRow, stats.clicksCol).getValue() + 1);
}


/**
 * Handle internal command.
 * Internal keyboard command - different from regular text
 */
function handleCallback(contents){
  //open spreadsheets
  var dataBaseEx = SpreadsheetApp.openByUrl(dataBase);
  var courses = dataBaseEx.getSheetByName("courses");
  var statistics = dataBaseEx.getSheetByName("statistics");
  var telegramLinks = dataBaseEx.getSheetByName("telegram");
  var busi = dataBaseEx.getSheetByName("busi");
  users = dataBaseEx.getSheetByName("users");
  var helpers = dataBaseEx.getSheetByName("helpers");
  var needsHelp = dataBaseEx.getSheetByName("needsHelp");
  var glassDoor = dataBaseEx.getSheetByName("glassDoor");

  //get user information
  var id = contents.callback_query.from.id;
  var data = contents.callback_query.data;
  var name = contents.callback_query.from.first_name;

  switch(data){
    case('Search For Another Course'):
      removeKey(id, "Please insert the course number or course name (can be partial name)"
              +"in order to search for a course. To add it to your list simply choose 'Add to my list'");
      set(id, name, "Course", 0);
      return;
    case ('Search For Another Course'):
      removeKey(id, "Please insert the course number or course name (can be partial name)"
              +"in order to search for a course. To add it to your list simply choose 'Add to my list'");
      set(id, name, "Course", 0);
      return;
    case(mainMenu):
      sendKey(id, "How may I help you?", mainKeyBoard);
      oldSet(id, 0, name, 0);
      return;
    case("Clean My List"):
      cleanList(id, users);
      return;
    case ("Delete A Course From My List"):
      oldSet(id, data, name, 0);
      sendText(id, "Please tap on a course in order to delete it from your list");
      return;
    }

  //get registers
  var user = findUser(id, users);
  if (user == null) {
    set(id, name); //first use, may be "set" should return the user.
    user = findUser(id, users);
  }
  var row = user.getRow();
  reg1 = users.getRange(row, fieldUsers.reg1).getValue();
  reg2 = users.getRange(row, fieldUsers.reg2).getValue();
  reg3 = users.getRange(row, fieldUsers.reg3).getValue();
  reg4 = users.getRange(row, fieldUsers.reg4).getValue();
  reg5 = users.getRange(row, fieldUsers.reg5).getValue();
  switch(reg1){
    case("help by number"): // helper is getting in contact with a student
      connectHelper(id, data, helpers, needsHelp)
      return
    case("Delete A Course From My List"):
      deleteCourse(id, name, data, users, courses)
      return
    case(SFS): //students fo students
      SFSHandler(id, name, busi, data, reg1)
      return
    case("Course"):
      //Searching a course
      var courseFinder = courses.createTextFinder(data);
      var currCourse = courseFinder.findNext();
      while(currCourse !== null && currCourse.getColumn() !== fieldCourses.courseNumber){
        currCourse = courseFinder.findNext();
      }
      if (currCourse){
        sendOpt(id, name, courses, currCourse.getRow());
      }
      return;
    case("authoriseMe"):
      sendText(id, "Please insert your Technion email address to get a verification code");
      set(id, name, "sendEmail");
      return;
    case(PRINT_SERVICE.symbol):
      if(PRINT_CB_HANDLERS.hasOwnProperty(data))
        PRINT_CB_HANDLERS[data](contents.callback_query);
      else
        PRINT_EDIT[reg2](contents.callback_query);
      return;
  }
  //Searching a course
  var courseFinder = courses.createTextFinder(data);
  var currCourse = courseFinder.findNext();
  while(currCourse !== null && currCourse.getColumn() !== 1){
    currCourse = courseFinder.findNext();
  }
  //Searching a course
  var courseFinder = courses.createTextFinder(data);
  var currCourse = courseFinder.findNext();
  while(currCourse !== null && currCourse.getColumn() !== 1){
    currCourse = courseFinder.findNext();
  }
  if (currCourse){
    sendOpt(id, name, courses, currCourse.getRow());
  }
  welcomeUser(id, name);
  return;
}

/**
 * Handle regular massage
 */
function handleMessage(contents){
  //open spreadsheets
  var dataBaseEx = SpreadsheetApp.openByUrl(dataBase);
  var courses = dataBaseEx.getSheetByName("courses");
  var statistics = dataBaseEx.getSheetByName("statistics");
  var telegramLinks = dataBaseEx.getSheetByName("telegramLinks");
  var busi= dataBaseEx.getSheetByName("busi");
  users = dataBaseEx.getSheetByName("users");
  var helpers = dataBaseEx.getSheetByName("helpers");
  var needsHelp = dataBaseEx.getSheetByName("needsHelp");
  var glassDoor = dataBaseEx.getSheetByName("glassDoor");
  //get user data
  var id = contents.message.from.id;
  var name = contents.message.from.first_name;
  var text = contents.message.text;

  //find user and load his registers
  user = findUser(id, users);
  if (user == null) {
    set(id, name); //first use, may be "set" should return the user.
    user = findUser(id, users);
  }
  var row = user.getRow();
  reg1 = users.getRange(row, fieldUsers.reg1).getValue();
  reg2 = users.getRange(row, fieldUsers.reg2).getValue();
  reg3 = users.getRange(row, fieldUsers.reg3).getValue();
  reg4 = users.getRange(row, fieldUsers.reg4).getValue();
  reg5 = users.getRange(row, fieldUsers.reg5).getValue();

  if(contents.message.document || contents.message.photo){
    handlePrint(contents.message);
    return;
  }
  // clean quotation marks in case it separated to parts - for example חדו"א
  if(!text)return;
  text = cleanQuotationMarks(text)

  //Boolean - true only if the user is authorized with the Technion email
  var authorized = users.getRange(row, fieldUsers.authorized).getValue();

  //save the timestamp
  //var date = Utilities.formatDate(new Date(), "GMT+3", "dd/MM/yyyy");
  var date = new Date();
  users.getRange(row, fieldUsers.lastSeen).setValue(date);

  //if simple command: execute
  var isDone = simpleText(id, name, text);
  if (isDone) return;



  switch(text){
    case("/start"):
      welcomeUser(id, name);
      return;
    case('תפריט ראשי'):
    case('Main Menu'):
    case(mainMenu):
    case('home'):
      sendKey(id, "How may I help you?", mainKeyBoard);
      reset(id, name)
      return;
    case(drive):
    case(telegramGroup):
    case(whatsappGroup):
    case(zoom):
    case(reviews):
    case('Get all'):
    case(facebook):
    case(youTube):
    case(ug):
    case(cs):
    case('All tests - Excel'):
    case(moodle):
    case("Panopto"):
    case("Course info"):
    case('Teams Group \ud83d\udc6a'):
    case(silabus):
    case(kdamim):
    case(prof):
    case(exams):
      getDone(id, name, reg2, text, users, courses);
      return
    case(WantToHelp):
      registrationToHelp(id, helpers);
      return
    case('Write a review'):
      removeKey(id, "Please write  your review");
      oldSet(id, text);
      return;
    case(add):
      oldSet(id, 'Add course');
      removeKey(id, "Please insert the course number, course name and group link in the following format:"
                + " course number-course name-group link. If there is no telegram group, please insert: course number-course name-");
      return
    case('Add telegram group'):
      oldSet(id, text);
      sendText(id, "Please insert the group link");
      sendText(id, "Note: to get a group link you need to open a group, then go to: Manage group (or click the edit symbol using smartphone) -> Group type -> Copy link");
      sendText(id, "Don't forget to make the group visible so new members will see messages that were sent before they joined");
      return
    case("Add Teams link"):
      oldSet(id, text);
      sendText(id, "Please insert the group link");
      return
    case("Add to my course list \ud83d\udccd"):
      addToList(id, reg2, row,users, courses);
      return
    case("My Courses \ud83d\udccc"):
      loadCourses(id, row, users, courses);
      return
    case("Clean My List"):
      cleanList(id, users);
      return
    case(WantToTalk): //set an anonymous talk
      incTalkStats(id);
      setAnonymousTalk(id, users, helpers)
      return
    case("Settings and Preference"):
      sendHelperSettings(id, name, text, needsHelp)
      return
    case(SFS):
      sendSFS(id, name, text, busi)
      return
    case("Statistics"):
      sendKey(id,"Which statistics do you want to see?", statsKeyboard);
      return
    case("Users"+groupSy): //from stats
      var allTime = statistics.getRange(2,2).getValue();
      var monthly = statistics.getRange(3,2).getValue();
      var weekly = statistics.getRange(4,2).getValue();
      var daily = statistics.getRange(5,2).getValue();
      sendText(id, "Users Statistics:\nAll Time Users: "+ allTime +
                    "\nLast Month: "+ monthly +
                    "\nLast Week: " + weekly +
                    "\nLast Day: " + daily);
      return;
    case("authoriseMe"):
      sendText(id, "Please insert your Technion email address to get a verification code");
      set(id, name, "sendEmail");
      return;
    case (PRINT_SERVICE.symbol):
      sendText(id, "Any file you send to the bot will be sent to the printer!");
      handlePrint(contents.message);
      return;
  }

  switch(reg1){
    case("GoodPass"):
    //helper function of STS: edit business // (id, GoodPass, busi name, information to change)
      updateBusi(id, busi, reg2)
      return
    case("Talk"):
      sendMassage(id, text, users)
      return
    case('feedback'):
      sendFeedback(id, name, text)
      return
    case('Ride'):
      sendRideLink(id, telegramLinks, text)
      return
    case('Add course'):
      addCourseToSpreadsheet(id, courseNumber, courseName, courseLink, courses)
      return
    case('Write a review'):
      addCourseReview(id, name, row, users, course)
      return
    case('Add telegram group'):
      addTelegramGroup(id, name, row, courses, users)
      return
    case('Add Teams link'):
      addTeamsGroup(id, name, users, courses)
    case('Add exams Excel'):
      addExamExcel(id, name, users, courses)
      return
    case("faculty"):
      facultyGroupHandler(id, text, reg1, reg2);
    case("Course"):
      findCourse(id, name, text, courses)
      return
    case("Settings and Preference"):
      handleSettingsSFS(id, name, text, reg1, needsHelp)
      return
    case("Delete by Course Number"):
      deleteByNumber(id, name, users, courses)
      return
    case("sendEmail"):
      sendVerificationCode(id, name, text, users);
      return;
    case("insertPass"):
      checkIfPass(id, name, text, users);
      return;
    case(SFS):     
      var maxCol = busi.getRange(2, 2).getValue();
      var maxRow = busi.getRange(3, 2).getValue();
      var topicBase = busi.getRange(4, 2).getValue();
      var sectionBase = busi.getRange(5, 2).getValue();
      var sectionsNum = busi.getRange(6, 2).getValue();
      var topicNum = busi.getRange(7, 2).getValue(); 
      var currBusi = busi.createTextFinder(reg2).findNext();
      if (currBusi){
        var busiCol = currBusi.getColumn();
        var busiRow = currBusi.getRow();
      }
      switch(reg2){
        case("Faculty"):
        case('Gender'):
        case('Topic'):
          if (text == "Back" || text == 'חזור') sendKey(id, "Choose from the list below", settingsKeyBoard);
          return
        case("Add a Topic \ud83c\udfea"):
          addTopicSFS(id, name, text, busi)
          return
        case("הנדסת חשמל"):
        case("ChooseElectricProgram"):
          facultyGroupHandler(id, text, reg1, reg2)
          return
        case("Pass"):   //password is inserted in order to delete business
          deleteBusi(id, reg3, busi)
          return
        case("PassToEdit"):   //password is inserted in order to edit businesss
          editBusi(id, name, text, busi)
          return
        case("GoodPass"):
          oldSet(id, "GoodPass", 0, text);//(id, GoodPass, busi name, information to change)
          sendText(id, "please send the new information");
          return;
        case("Password"):
          createBusi(id, text, reg1, reg3, busi)
          return;
        case("Description"):    //User gets here after sending the password
          busi.getRange(topicBase+topicCounter, topicCol-1).setValue(text);//set password
          sendText(id, "Your password is "+text+". Please send a description for your business");
          var topic = reg3;
          var currTopic = busi.createTextFinder(topic).findNext();
          var topicCol = 0;
          var topicCounter = 0;
          //sendText(id, "curr topic: "+topic+" "+currTopic);
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
          return;
//    case("Location"){//User gets here after sending the description
//       busi.getRange(topicBase+topicCounter, topicCol+1).setValue(text);//set description
//       sendText(id, "Please send the location details for your business");
//       oldSet(id, reg1, 0, "Contact");
//       return;
//     }
//     case("Prices"){//User gets here after sending the contact information
//       busi.getRange(topicBase+topicCounter, topicCol+3).setValue(text);//set contact information
//       sendText(id, "Got it! The contact information is initialized. Now send the prices for your business");
//       oldSet(id, reg1, 0, "Done");
//       return;
//     }
        case("Contact"):    //User gets here after sending the location
          busi.getRange(topicBase+topicCounter, topicCol+1).setValue(text);//set Description
          sendText(id, "We almost done! Please send the contact information for your business");
          oldSet(id, reg1, 0, "Done");
          return;
        case("Done"):   //User gets here after sending the prices
          busi.getRange(topicBase+topicCounter, topicCol+3).setValue(text);//set contact info
          sendText(id, "Got it! Your business information is initialized, wish you luck!");
          oldSet(id, reg1, name, "null");
          return;
        case("Delete My Business \ud83d\udcdb"):
           var isExist = busi.createTextFinder(text).findNext();
          if (!(isExist)) sendText(id, "There is no business with that name. Please check the name and try again");
          else{
            var businessRow = isExist.getRow();
            sendText(id, "Please insert you password in order to delete your business");
            oldSet(id, reg1, text, "Delete if Password");
          }
          return;
        case("Delete if Password"):
          deleteIfPass(text, busi)
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
          return;
        default:
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
      }
    case(PRINT_SERVICE.symbol):
      if(reg2 != 0)PRINT_EDIT[reg2](contents.message);
      return;
  }

  sendKey(id,"How may I help you?",mainKeyBoard);
}