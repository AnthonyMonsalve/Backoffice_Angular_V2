/*
Template Name: Dashonic - Admin & Dashboard Template
Author: Pichforest
Website: https://Pichforest.com/
Contact: Pichforest@gmail.com
File: Polar Area Chart init js
*/

// Basic Polar Area 

var options = {
    series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
    chart: {
    type: 'polarArea',
    width: 400,
  },
  labels: ['Series A', 'Series B', 'Series C', 'Series D', 'Series E', 'Series F', 'Series G', 'Series H', 'Series I'],
  stroke: {
    colors: ['#fff']
  },
  fill: {
    opacity: 0.8
  },
  
  legend: {
    position: 'bottom'
  },
  colors: ["#038edc", "#51d28c", "#f7cc53", "#f34e4e", "#564ab1", "#5fd0f3"]
  };

  var chart = new ApexCharts(document.querySelector("#basic_polar_area"), options);
  chart.render();

  // Polar-Area Monochrome Charts

  var options = {
    series: [42, 47, 52, 58, 65],
    chart: {
    width: 400,
    type: 'polarArea'
  },
  labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
  fill: {
    opacity: 1
  },
  stroke: {
    width: 1,
    colors: undefined
  },
  yaxis: {
    show: false
  },
  legend: {
    position: 'bottom'
  },
  plotOptions: {
    polarArea: {
      rings: {
        strokeWidth: 0
      },
      spokes: {
        strokeWidth: 0
      },
    }
  },
  theme: {
    mode: 'light', 
    palette: 'palette1',
    monochrome: {
      enabled: true,
      shadeTo: 'light',
      color: '#038edc',
      shadeIntensity: 0.6
    }
  }
  };

  var chart = new ApexCharts(document.querySelector("#monochrome_polar_area"), options);
  chart.render();