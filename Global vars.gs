"use strict";

//Global variables
var token = "1988964465:AAE1seNy9ss0-YBgOdQkeC3wejLRgZ1jeJY";
var url = "https://api.telegram.org/bot" + token;
var webAppUrl = "https://script.google.com/macros/s/AKfycbxXkR1djAaK9JezQts-t1W-VGYjkPWu2Ixd8elOWomQVz-xF8zov7IJHjMIup6dk_E8/exec";
var numberOfCourses = 2000; 
var numberOfReviews = 2*26; 


var dataBase = "https://docs.google.com/spreadsheets/d/1qIOTboK1eYoyvDGkxxNeNTPGSjuxp_G68lddomDDfcw/edit?usp=sharing";
var dataBaseEx = SpreadsheetApp.openByUrl(dataBase);