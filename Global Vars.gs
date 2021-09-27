//Global variables
var token = "1812278033:AAEbyRuuvK9CW2trlMXe17bdXwszD-uWHvo";
var url = "https://api.telegram.org/bot" + token;
// var webAppUrl = "https://script.google.com/macros/s/AKfycbwMNOS2VcpA1iYozgqDkeyu08pBZaBg9LU2ggmcEwLrIabn1SjD/exec";
var webAppUrl = "https://script.google.com/macros/s/AKfycbwm9yslOQy3T78PZ8bzWaZIIG1XaDA5kduvHACluTyPTCuJPPEHRchNiLz3wlJd0HS_/exec";
var numberOfCourses = 2000; 
var numberOfReviews = 2*26;

var dataBase = "https://docs.google.com/spreadsheets/d/1mAXnTyH3X9Bbs_PcTqWUy9C61CO7zUXEWDrkKMXk-6k/edit?usp=sharing";

//Exels
//var helpList = "https://docs.google.com/spreadsheets/d/1Emd-ShOGf6im-8OARmfeUOJnR-trM8joKtv8IOpCABQ/edit?usp=sharing";
//var userExel = "https://docs.google.com/spreadsheets/d/1L_nUrc2kfXmuQSxCwreMSQVp6qfX_DCnrc58nkqpoTM/edit?usp=sharing";
//var courseExel = "https://docs.google.com/spreadsheets/d/1hkWNJhWBHJfsVWV-0DcMRphsJXE79JvuJAXhvlnC7OY/edit#gid=0"; //new
//var courseExel = "https://docs.google.com/spreadsheets/d/12YrewEkVgDYiD23fGQycvpO5r36lUMGIx1w6v2vrBA8/edit?usp=sharing"; //old
//var facultyRidesExel = "https://docs.google.com/spreadsheets/d/1qVFz7miBg5TmJnshG1ciQMlbxjw5rNzNrfcfv0MDhgo/edit?usp=sharing";
//var businessExel = "https://docs.google.com/spreadsheets/d/1gSXFsiPc2cGlhXBEu5pVmxb3xe8drPePDGryQ_7owAo/edit?usp=sharing";

//Test
//var helpList = "https://docs.google.com/spreadsheets/d/12aN1zbXKH6dfqBQwkJQdHldwc-n5VXos/edit?usp=sharing";
//var userExel = "https://docs.google.com/spreadsheets/d/13s5Yyp2YhJSQMhhbkSYJYd4r8G89TGcA/edit?usp=sharing";
//var courseExel = "https://docs.google.com/spreadsheets/d/1hkWNJhWBHJfsVWV-0DcMRphsJXE79JvuJAXhvlnC7OY/edit#gid=0"; //new
//var courseExel = "https://docs.google.com/spreadsheets/d/1kM93byU0sF8a9gc7se_r64a29QLThjag/edit?usp=sharing"; //old
//var facultyRidesExel = "https://docs.google.com/spreadsheets/d/1Yb6qjrUBvtal32WrH9M2zhTm0hYQp38x/edit?usp=sharing";
//var businessExel = "https://docs.google.com/spreadsheets/d/1HouOoOe5KFpccxvqDYOES1iks1K2xRlA/edit?usp=sharing";


//original
//var helpList = "https://docs.google.com/spreadsheets/d/1Tnt-wUk7D3KwEEKJmYg7HLLIqlucveOnA87wEWMcFdg/edit?usp=sharing";
//var userExel = "https://docs.google.com/spreadsheets/d/1-dDwwSXJZTNGSPZXEI4QVKT2hivW8TE7FXb3A9esKBc/edit?usp=sharing";
//var courseExel = "https://docs.google.com/spreadsheets/d/1hkWNJhWBHJfsVWV-0DcMRphsJXE79JvuJAXhvlnC7OY/edit#gid=0"; //new
//var courseExel = "https://docs.google.com/spreadsheets/d/142VV2vT6ZjthsN8QqwofKwOHmHVH8Qkm4R531hF91sk/edit?usp=sharing"; //old
//var facultyRidesExel = "https://docs.google.com/spreadsheets/d/142VV2vT6ZjthsN8QqwofKwOHmHVH8Qkm4R531hF91sk/edit?usp=sharing";
//var businessExel = "https://docs.google.com/spreadsheets/d/1S0_4OcTn_woYIOcORr3fmdZxcid4uwdBSMfFeLztawo/edit?usp=sharing";