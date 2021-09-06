//Global variables
var token = "1294202090:AAHTprM7OhYtfdjRxijFqs4LbNvH3s3QJh4";
var url = "https://api.telegram.org/bot" + token;
// var webAppUrl = "https://script.google.com/macros/s/AKfycbwMNOS2VcpA1iYozgqDkeyu08pBZaBg9LU2ggmcEwLrIabn1SjD/exec";
var webAppUrl = "https://script.google.com/macros/s/AKfycbxu9w9PKXOg3v1g_ehVkjqPUVAcweabSV3Ja1Ly2n8tLnOLrhv7O76AbbN2J4VeyenF/exec";//ScriptApp.getService().getUrl();//"https://script.google.com/macros/s/AKfycbw4WBUHVW08yB2UvLraVGcDMUkODpjDcVFJxdzBaXLvqST7LGfzTualAWEJz3eU_qXHaA/exec";
var numberOfCourses = 2000; 
var numberOfReviews = 2*26;

//Excel
var dataBase = "https://docs.google.com/spreadsheets/d/163jIcDGTpAfskMZlsUolzjhcnB2q-s3e6iOSJt0pv_0/edit?usp=sharing";
//var helpList = "https://docs.google.com/spreadsheets/d/1Tnt-wUk7D3KwEEKJmYg7HLLIqlucveOnA87wEWMcFdg/edit?usp=sharing";
//var userExcel = "https://docs.google.com/spreadsheets/d/1-dDwwSXJZTNGSPZXEI4QVKT2hivW8TE7FXb3A9esKBc/edit?usp=sharing";
//var courseExcel = "https://docs.google.com/spreadsheets/d/1hkWNJhWBHJfsVWV-0DcMRphsJXE79JvuJAXhvlnC7OY/edit#gid=0"; //new
//var courseExcel = "https://docs.google.com/spreadsheets/d/142VV2vT6ZjthsN8QqwofKwOHmHVH8Qkm4R531hF91sk/edit?usp=sharing"; //old
//var facultyRidesExcel = "https://docs.google.com/spreadsheets/d/142VV2vT6ZjthsN8QqwofKwOHmHVH8Qkm4R531hF91sk/edit?usp=sharing";
//var businessExcel = "https://docs.google.com/spreadsheets/d/1S0_4OcTn_woYIOcORr3fmdZxcid4uwdBSMfFeLztawo/edit?usp=sharing";
//var dataBase = "https://docs.google.com/spreadsheets/d/1gAcKmpq3LvONhPOiBGm_6oCG3uT0ZvJd598GcW8pCsw/edit?usp=sharing"; //new excel - contain all previous excel