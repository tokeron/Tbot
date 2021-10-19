/**
 * Object that saves the fields in the users spreadsheet
 */
const fieldUsers = {
  id: 1,
  name: 2,
  lastSeen: 3,
  reg1: 4,
  reg2: 5,
  reg3: 6,
  reg4: 7,
  reg5: 8,
  authorized: 10,
  nextFreeRow: {
    row: 1,
    col: 4
  }
}

/**
 * Object that saves the fields in the general part in the json from cheese&fork
 */
const fieldNamesGeneral = {
  faculty: "פקולטה",
  courseName: "שם מקצוע",
  courseNumber: "מספר מקצוע",
  nakaz: "נקודות",
  lecture: "הרצאה",
  tutorial: "תרגיל",
  lab: "מעבדה",
  seminar: "סמינר\/פרויקט",
  kdam: "מקצועות קדם",
  silabus: "סילבוס",
  lead: "אחראים",
  examA: "מועד א",
  examB: "מועד ב"
}

/**
 * Object that saves the fields in schedule part in the json from cheese&fork
 */
const fieldNamesSchedule = {
  group: "קבוצה",
  num: "מס.",
  type: "סוג",
  lead: "מרצה\/מתרגל",
  day: "יום",
  time: "שעה",
  place: "בניין",
  room: "חדר"
}

/**
 * object that saves the fields in the cources spreadsheets
 */
const fieldCourses = {
  faculty: 1,
  courseName: 2,
  courseNumber: 3,
  silabus : 4,
  kdam: 5,
  lead: 6,
  examA: 7,
  examB: 8,
  nakaz: 9,
  lecture: 10,
  tutorial: 11,
  lab: 12,
  seminar: 13,
  zoom: 14,
  telegram: 15,
  teams: 16,
  whatsApp: 17,
  spreadsheet: 18
}

/**
 * object that saves stats constants
 */

const stats = {
  users: {
    allTime: {
      row: 2,
      col: 2
    },
    month: {
      row: 3,
      col: 2
    },
    week: {
      row: 4,
      col: 2
    },
    day: {
      row: 5,
      col: 2
    }
  },
  todaysRow: {
    row: 2,
    col: 3
  },
  numOfUsersCol: 5,
  clicksCol: 6,
  clicksOnLinksCol: 7,
  rideClicksCol: 8,
  rideIdsListStart: {
    row: 8,
    col: 1
  },
  rideIdsNextRow: {
    row: 4,
    col: 3
  },
  talkClicksCol: 9,
  talkIdsListStart: {
    row: 8,
    col: 2
  },
  talkIdsNextRow: {
    row: 6,
    col: 3
  },
  test: {
    row: 6,
    col: 2
  }
}

/**
 * Const values for print service.
 */
const PRINT_SERVICE = {
  counter: "printerCounter",
  responseFunc: "readPrinterEmailResponse",
  mailQuery: "is:unread ",
  symbol: "print 🖨",
  types:["bws", "bwd", "A3bws", "A3bwd", "color", "A3color", "2pbws", "2pbwd", "4pbws", "4pbwd"],
  typeNames:["שחור-לבן צד אחד", 'שחור-לבן דו"צ', 'A3 שחור-לבן צד אחד', 'A3 שחור-לבן דו"צ', 'צבעוני', 'A3 צבעוני',"2pbws", "2pbwd", "4pbws", "4pbwd"],
  messageBase:"*הדפסת מסמכים בטכניון.*\nאלה המסמכים שהתקבלו:",
  cb:{send:"send", chengeType:"chengeType", chengeID:"chengeID", cancel:"cancel", editFiles: "editFiles"},
  defaultKeyboard:null
}
/** @type TelegramInlineKeyboard */
PRINT_SERVICE.defaultKeyboard = [
  [{text:"שלח להדפסה", callback_data:PRINT_SERVICE.cb.send}],
  [{text:PRINT_SERVICE.typeNames[0], callback_data:PRINT_SERVICE.cb.chengeType}, {text:"הגדר מספר זהות", callback_data:PRINT_SERVICE.cb.chengeID}],
  [{text:"ערוך קבצים", callback_data:PRINT_SERVICE.cb.editFiles}],
  [{text:"ביטול", callback_data:PRINT_SERVICE.cb.cancel}]
]
PRINT_SERVICE.mailQuery += PRINT_SERVICE.types.reduce((s,t)=>{s+=`from:print.${t}@campus.technion.ac.il `;return s;},"{")+"}";
/**global vars */
var user,reg1,reg2,reg3,reg4,reg5;