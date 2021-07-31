//keyBoards
var mainKeyBoard = [
  [{text: course }, { text: "My Courses \ud83d\udccc" }],
  [{ text: SFS}, { text: help }],
  [{ text: ride}, { text: fun} ,{ text: faculty}],
  [{ text: usefulLink}], //{text: add}],
  [{ text: feedback}],
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
  [{ text: "cheese&fork" }, { text: "scans - cf"}, { text: "testock" }],
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

/*
var coursesKeyBoardEn = [
  [{ text: "Computer Science" }, { text: 'Electrical Engineering' }, { text: 'Mechanical Engineering' }],
  [{ text: 'Civil and Environmental Engineering' }, { text: 'Industrial Engineering and Management' }, { text: 'Biomedical Engineering' }],
  [{ text: 'Chemical Engineering' }, { text: 'Biotechnology and Food Engineering' }, { text: 'Materials Science & Engineering' }],
  [{ text: 'Mathematics faculty' }, { text: 'Chemistry faculty' }, { text: 'Physics faculty' }, { text: 'Biology faculty' }],
  [{ text: 'Medicine faculty' }, { text: 'Architecture and Town Planning' }, { text: 'Education in Science and Technology' }],
  [{ text: "עברית" }],
  [{ text: mainMenu }]
]
*/

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
  [{ text: ug }, { text: moodle }],
  [{ text: drive }, { text: testock }],
  [{ text: facebook }],
  [{ text: "Add telegram group" } ],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var gallKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }],
  [{ text: drive }, { text: courseGroup }, { text: testock }],
  [{ text: facebook }, { text: 'Panopto' } ],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var tgallKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }],
  [{ text: drive }, { text: courseGroup }, { text: testock }],
  [{ text: facebook }, { text: 'Panopto' }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]


var tallKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }],
  [{ text: drive }, { text: testock }],
  [{ text: facebook },  { text: 'Panopto' }],
  [{ text: "Add telegram group" }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var csKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }, { text: cs }],
  [{ text: drive }, { text: testock }],
  [{ text: facebook },  { text: 'Panopto' }],
  [{ text: "Add telegram group" }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var tcsKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }, { text: cs }],
  [{ text: drive },  { text: testock }],
  [{ text: facebook },  { text: 'Panopto' }],
  [{ text: "Add telegram group" }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var gcsKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }, { text: cs }],
  [{ text: drive }, { text: courseGroup }, { text: testock }],
  [{ text: facebook }, { text: 'Panopto' }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var tgcsKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }, { text: cs }],
  [{ text: drive }, { text: courseGroup },   { text: testock }],
  [{ text: facebook }, { text: 'Panopto' }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var exelKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }],
  [{ text: drive }],
  [{ text: testock }, { text: "All tests - exel" }],
  [{ text: facebook },  { text: 'Panopto' },    ],
  [{ text: "Add telegram group" }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var texelKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }],
  [{ text: drive }, { text: 'Teams Group \ud83d\udc6a'}],
  [{ text: testock }, { text: "All tests - exel" }],
  [{ text: facebook }, { text: 'Panopto' }],
  [{ text: "Add telegram group" }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var gexelKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }],
  [{ text: drive }, { text: courseGroup }],
  [{ text: testock }, { text: "All tests - exel" }],
  [{ text: facebook },   { text: 'Panopto' }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var tgexelKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }],
  [{ text: drive }, { text: courseGroup }, { text: 'Teams Group \ud83d\udc6a'}],
  [{ text: testock }, { text: "All tests - exel" }],
  [{ text: facebook },   { text: 'Panopto' }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var exelCsKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }, { text: cs }],
  [{ text: drive }],
  [{ text: testock }, { text: "All tests - exel" }],
  [{ text: facebook },   { text: 'Panopto' }],
  [{ text: "Add telegram group" }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var texelCsKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }], 
  [{ text: ug }, { text: moodle }, { text: cs }],
  [{ text: drive }, { text: 'Teams Group \ud83d\udc6a'}],
  [{ text: testock }, { text: "All tests - exel" }],
  [{ text: facebook }, { text: 'Panopto' }],
  [{ text: "Add telegram group" }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var gexelCsKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }, { text: cs }],
  [{ text: drive }, { text: courseGroup }],
  [{ text: testock }, { text: "All tests - exel" }],
  [{ text: facebook },   { text: 'Panopto' }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var tgexelCsKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: "Get all" }],
  [{ text: ug }, { text: moodle }, { text: cs }],
  [{ text: drive }, { text: courseGroup }, { text: 'Teams Group \ud83d\udc6a'}],
  [{ text: testock }, { text: "All tests - exel" }],
  [{ text: facebook },  { text: 'Panopto' }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var malagKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: ug }, { text: moodle }],
  [{ text: facebook }],
  [{ text: "Add telegram group" }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var gmalagKeyBoard = [
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: ug }, { text: moodle }],
  [ { text: courseGroup }, { text: facebook }],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var tmalagKeyBoard = [
  [{ text: ug }, { text: moodle }],
  [ { text: courseGroup }, { text: facebook }],
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var tgmalagKeyBoard = [
  [{ text: ug }, { text: moodle }],
  [ { text: courseGroup },  { text: facebook }],
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var sportKeyBoard = [
  [{ text: "Course info"}],
  [{ text: "Add telegram group" }],
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
  [{ text: mainMenu }, { text: "Search For Another Course" }]
]

var gsportKeyBoard = [
  [{ text: courseGroup }],
  [{ text: "Course info"}],
  [{ text: "Add to my course list \ud83d\udccd" }, { text: "My Courses \ud83d\udccc"}],
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
