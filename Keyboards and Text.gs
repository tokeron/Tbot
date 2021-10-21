/**
 * Macros
 */
var TESTMODE = false;

/**
 * symbols
 */
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
var telegramGroup = "Telegram group "+groupSy;
var whatsappGroup = "whatsapp group "+groupSy;
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

/**
 * function that makes an internal keyboard from the numbers in the spreadsheet. 
 */
function makeKeyBoard(id, names, numbers){
  var num = names.length;
  var newKeyBoard = [];
  for (var i = 0; i < num; i++) {
    //sendText(id, names[i] + " - " + numbers[i]);//test
    newKeyBoard.push([{"text": names[i], 'callback_data': numbers[i]}]);
  }
  newKeyBoard.push([{"text": 'Main Menu \ud83c\udfe0', 'callback_data': 'Main Menu \ud83c\udfe0'}]);
  sendText(id, "Select from the list below", newKeyBoard);
}
  



/**
 * keyBoards
 */ 
var mainKeyBoard = [
  [{text: course }, { text: "My Courses \ud83d\udccc" }],
  [{ text: SFS}/*, {text: "Glass Door"}*/,{ text: help }],
  [{ text: ride}, { text: fun} ,{ text: faculty}],
  [{ text: usefulLink},{text: "print 🖨"}], //{text: add}],
  [{ text: feedback}],
  [{ text: "Statistics"}],
  [{ text: About}]
]

var rideKeyBoard = [
  [{ text: "אזור ירושליים" }, { text: "אזור תל אביב-יפו והמרכז" }, { text: "אזור חיפה והצפון" }],
  [{ text: "אזור השפלה והדרום" }, { text: "אזור השרון" }, { text: "טרמפים בפייסבוק" }],
  [{ text: "תפריט ראשי" }]
]
var jeKeyBoard = [
  [{ text: "מעלה אדומים" }, { text: "ביתר עילית" }],
  [{ text: "ירושלים" }, { text: "בית שמש" }],
  [{ text: "רשימת אזורים" }],
  [{ text: "תפריט ראשי" }]
]
var teKeyBoard = [
  [{ text: "חולון" }, { text: "תל אביב-יפו" }, { text: "קרית אונו" }],
  [{ text: "אור יהודה" }, { text: "יהוד-מונוסון" }, { text: "רמת השרון" }],
  [{ text: "בת ים" }, { text: "גבעתיים" }, { text: "בני ברק" }],
  [{ text: "רמת גן" }, { text: "פתח תקוה" }, { text: "אלעד" }],
  [{ text: "אריאל" }, { text: "ראש העין" }, { text: "ראשון לציון" }],
  [{ text:"רשימת אזורים"}],
  [{ text: "תפריט ראשי" }]
]
var heKeyBoard = [
  [{ text: "טבריה" }, { text: "קרית שמונה" }, { text: "צפת" }],
  [{ text: "מגדל העמק" }, { text: "עפולה" }, { text: "נשר" }],
  [{ text: "חיפה" }, { text: "טירת כרמל" }, { text: "אור עקיבא" }],
  [{ text: "קרית אתא" }, { text: "קרית מוצקין" }, { text: "קרית ביאליק" }],
  [{ text: "קרית ים" }, { text: "כרמיאל" }, { text: "מעלות-תרשיחא" }],
  [{ text: "יקנעם" }, { text: "נהריה" }, { text: "עכו" }],
  [{ text: "חדרה" }, { text: "נצרת" }, { text: "בית שאן" }],
  [{ text:"רשימת אזורים"}],
  [{ text: "תפריט ראשי" }]
]
var soKeyBoard = [
  [{ text: "ערד"  }, { text: "דימונה" }, { text: "באר שבע" }],
  [{ text: "רהט" }, { text: "רמלה" }, { text: "מודיעין-מכבים-רעות" }],
  [{ text: "יבנה" }, { text: "רחובות" }, { text: "נס ציונה" }],
  [{ text: "לוד" }, { text: "קרית מלאכי" }, { text: "קרית גת" }],
  [{ text: "אשדוד" }, { text: "אשקלון" }, { text: "שדרות" }],
  [{ text: "אילת" }, { text: "נתיבות" }],
  [{ text:"רשימת אזורים"}],
  [{ text: "תפריט ראשי" }]
]
var shKeyBoard = [
  [{ text: "רעננה"  }, { text: "הוד השרון" }, { text: "הרצליה" }],
  [{ text: "כפר סבא" }, { text: "נתניה" }, { text: "טירה" }],
  [{ text:"רשימת אזורים"}],
  [{ text: "תפריט ראשי" }]
]
var usefulKeyBoard = [
  [{ text: "Technion Students FAQ (doc)" }, { text: "useful links from facebook (doc)" }],
  [{ text: "cheese&fork" }, { text: "scans - cf"}],
  [{ text: "moodle "+moodleSy }, {text: "ug "+ugSy }, { text: calendar}],
  [{ text: "ASA" }, { text: "אסט" }, { text: "Copiers and printers" }], 
  [{text: "MyDegree"}, { text: Korona }],
  [{ text: mainMenu }]
]
var printKeyBoard = [
  [{ text: "A4 B&W single sided" }, { text: "A4 B&W two sided" }],
  [{ text: "A4 Color single sided" }], 
  [{ text: "A3 B&W single sided" }, { text: "A3 B&W two sided" }],
  [{ text: "A3 Color single sided" }], 
  [{ text: "B&W 2 slides per page, single sided" }, { text: "B&W 2 slides per page, two sided" }],
  [{ text: "B&W 4 slides per page, single sided" }, { text: "B&W 4 slides per page, two sided" }],   
  [{ text: mainMenu }]
  ]


var coursesKeyBoardEn = [
  [{ text: "Computer Science" }, { text: 'Electrical Engineering' }, { text: 'Mechanical Engineering' }],
  [{ text: 'Civil and Environmental Engineering' }, { text: 'Industrial Engineering and Management' }, { text: 'Biomedical Engineering' }],
  [{ text: 'Chemical Engineering' }, { text: 'Biotechnology and Food Engineering' }, { text: 'Materials Science & Engineering' }],
  [{ text: 'Mathematics faculty' }, { text: 'Chemistry faculty' }, { text: 'Physics faculty' }, { text: 'Biology faculty' }],
  [{ text: 'Medicine faculty' }, { text: 'Architecture and Town Planning' }, { text: 'Education in Science and Technology' }],
  [{ text: "עברית" }],
  [{ text: mainMenu }]
]


var coursesKeyBoard = [
  [{text: "סטודנטים בטכניון" }],
  [{ text: "מדעי המחשב" }, { text: 'הנדסת חשמל' }, { text: 'הנדסת מכונות' }],
  [{ text: 'הנדסה אזרחית וסביבתית' }, { text: 'הנדסת תעשייה וניהול' }, { text: 'הנדסה ביו-רפואית' }],
  [{ text: 'הנדסה כימית' },{ text: 'הנדסת ביוטכנולוגיה ומזון' }, { text: 'מדע והנדסה של חומרים' }],
  [{ text: 'הפקולטה למתמטיקה' }, { text: 'הפקולטה לכימיה' }, { text: 'הפקולטה לפיסיקה' }],
  [{ text: 'הפקולטה לביולוגיה'}, { text: 'רפואה' }, { text: 'ארכיטקטורה ובינוי ערים' }], 
  [{ text: 'חינוך למדע וטכנולוגיה' }, {text: 'הפקולטה להנדסת אוירונוטיקה וחלל'}],
  [{ text: 'חזור'}],
  [{ text: "תפריט ראשי" }]
]

var electricSemesterKeyBoard = [
  [{text: "Semester 1"}, {text: "Semester 2"}, {text: "Semester 3"}, {text: "Semester 4"}],
  [{text: "Semester 5"}, {text: "Semester 6"}, {text: "Semester 7"}, {text: "Semester 8"}],
  [{text: "All Semesters"}],
  [{ text: mainMenu }]
]

var electricProgramsKeyBoard = [
   [{text: "Electrical Engineering"}],
   [{text: "Computer and Software Engineering"}],
   [{text: "SComputer Engineering"}],
   [{text: "Electrical Engineering and Physics"}],
   [{ text: mainMenu }]
  ]
  

var ridesBackKeyBoard = [
  [{ text: "רשימת אזורים" }],
  [{ text: "תפריט ראשי" }]
]

var allKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: drive }, { text: ug }, { text: moodle }, { text: cs }],
  [{ text: whatsappGroup }, { text: telegramGroup }, { text: 'Teams Group \ud83d\udc6a' }],
  [{ text: testock }, { text: facebook }, { text: 'Panopto' }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]
  

var contactKeyBoard = [
  [{ text: "Git"}],
  [{ text: ContactLinkdIn},  { text: ContactEmail } ],
  [{ text: mainMenu }]
]

var settingsKeyBoard = [
  [{ text: "Gender"}],
  [{ text: "Faculty"}],
  [{ text: "Topic"}],
  [{ text: "Change helper"}],
  [{ text: "Back"}],
  [{ text: mainMenu }]
]

var genderKeyBoard = [
  [{ text: "Male"}],
  [{ text: "Female"}],
  [{ text: "Back"}],
  [{ text: mainMenu }]
]

var topicKeyBoard = [
  [{ text: "Studies"}],
  [{ text: "Emotional Distress"}],
  [{ text: "Military experiences"}],
  [{ text: "Violence or harassment"}],
  [{ text: "Back"}],
  [{ text: mainMenu }]
]

var helpKeyBoard = [
  [{ text: "Settings and Preference"}],
  [{ text: WantToTalk}],
  [{ text: WantToHelp}],
  [{ text: mainMenu }]
]

var busiKeyBoard = [
  //[{ text : "Location"}],
  [{ text: "Get in Contact"}],
  //[{ text: "Prices"}],
  [{ text: mainMenu }]
]

var busiEditKeyBoard = [
  [{ text : "Password"}],
  [{ text : "Description"}],
  [{ text : "Business name"}],
  [{ text: "Contact Information"}],
  [{ text: mainMenu }]
]

var funKeyBoard = [
  [{ text : "ספורט"}],
  [{ text : "טיולים"}],
  [{ text : "משחקים"}],
  [{ text : "פיתוח פרויקטים"}],
  [{ text: mainMenu }]
]

var GDKeyBoard = [
  [{ text : "הכנס את המשכורת שלך"}],
  [{ text : "ברר משכורות"}],
  [{ text: mainMenu }]
]

var statsKeyboard = [
  [{ text: "Users" + groupSy}],
  [{ text: mainMenu}]
]
