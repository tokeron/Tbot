"use strict";

//Global variables
var token = "1954455054:AAE-xUGi6mks6mCOx8rmWrJoVcw3rTqEXI8";
var url = "https://api.telegram.org/bot" + token;
// var webAppUrl = "https://script.google.com/macros/s/AKfycbxV1kDinMkts7PJEFpmgHlGsJrmAEaUsQ8s0n346f4rziUAeFAu5KUeUqZpew4UlD0VzQ/exec";
var numberOfCourses = 2000; 
var numberOfReviews = 2*26; 


var dataBase = "https://docs.google.com/spreadsheets/d/1msb2Th0Kb1cu8vfCP8dnSJ1K8zJxsK0q44guoLIGzqc/edit?usp=sharing";
var dataBaseEx = SpreadsheetApp.openByUrl(dataBase);