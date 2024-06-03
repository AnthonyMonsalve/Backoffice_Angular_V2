/*
Template Name: Dashonic - Admin & Dashboard Template
Author: Pichforest
Website: https://Pichforest.com/
Contact: Pichforest@gmail.com
File: two step verification Init Js File
*/



// move next
function moveToNext(elem, count){
    if(elem.value.length > 0) {
        document.getElementById("digit"+count+"-input").focus();
    }
}