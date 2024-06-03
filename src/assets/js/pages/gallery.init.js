/*
Template Name: Dashonic - Admin & Dashboard Template
Author: Pichforest
Website: https://Pichforest.com/
Contact: Pichforest@gmail.com
File: Gallery init
*/

// Portfolio Filter
document.addEventListener("DOMContentLoaded", function (event) {

    // init Isotope
    setTimeout(function() {
        var iso = new Isotope('.gallery-wrapper', {
            itemSelector: '.element-item',
            layoutMode: 'fitRows'
        });
    
     // bind filter button click
     var filtersElem = document.querySelector('.categories-filter');
     filtersElem.addEventListener('click', function (event) {
         // only work with buttons
         if (!matchesSelector(event.target, 'li a')) {
             return;
         }
         var filterValue = event.target.getAttribute('data-filter');
         // use matching filter function
         iso.arrange({ filter: filterValue });
     });
 
     // change is-checked class on buttons
     var buttonGroups = document.querySelectorAll('.categories-filter');
     for (var i = 0, len = buttonGroups.length; i < len; i++) {
         var buttonGroup = buttonGroups[i];
         radioButtonGroup(buttonGroup);
     }
 
     function radioButtonGroup(buttonGroup) {
         buttonGroup.addEventListener('click', function (event) {
             // only work with buttons
             if (!matchesSelector(event.target, 'li a')) {
                 return;
             }
             buttonGroup.querySelector('.active').classList.remove('active');
             event.target.classList.add('active');
         });
     }
    },0)
    
});


// GLightbox Popup

var lightbox = GLightbox({
    selector: '.image-popup',
    title: false,
});