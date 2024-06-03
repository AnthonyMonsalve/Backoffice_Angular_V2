/*
Template Name: Dashonic - Admin & Dashboard Template
Author: Pichforest
Website: https://Pichforest.com/
Contact: Pichforest@gmail.com
File: setting init js
*/


flatpickr('#datepicker-range', {
    mode: "range",
    altInput: true,
    altFormat: 'Y'
});

new Choices('#choices-multiple-skill-input',{
        removeItemButton: true,
    }
);