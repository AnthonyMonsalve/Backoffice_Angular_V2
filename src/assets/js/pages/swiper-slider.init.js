

/*
Template Name: Dashonic - Admin & Dashboard Template
Author: Pichforest
Website: https://Pichforest.com/
Contact: Pichforest@gmail.com
File: Swiper slide init js
*/


// Default Swiper-Slider

var swiper = new Swiper('.default-swiper', {
  slidesPerView: 1,
  centeredSlides: false,
  loop:true,
  autoplay: {
      delay: 3000,
      disableOnInteraction: false,
  },
});

// Navigation Swiper-Slider

var swiper = new Swiper('.navigation-swiper', {
    slidesPerView: 1,
    spaceBetween: 40,
    centeredSlides: false,
    loop:true,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// Pagination Swiper-Slider

var swiper = new Swiper('.pagination-swiper', {
  slidesPerView: 1,
  spaceBetween: 40,
  centeredSlides: false,
  loop:true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
      delay: 3000,
      disableOnInteraction: false,
  },
});

// keyboard-control Swiper-Slider

var swiper = new Swiper('.keyboard-control', {
  loop: true,
  keyboard: {
    enabled: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Pagination Progress Swiper-Slider

var swiper = new Swiper('.progress-swiper', {
  slidesPerView: 1,
  spaceBetween: 40,
  centeredSlides: false,
  loop:false,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Effect Filp Swiper-Slider

var swiper = new Swiper('.effectfade-swiper', {
  slidesPerView: 1,
  effect: "flip",
  grabCursor: true,
  centeredSlides: false,
  loop:true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
      delay: 3000,
      disableOnInteraction: false,
  },
});

// Responsive Swiper-Slider

var swiper = new Swiper('.responsive-swiper', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop:true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});




