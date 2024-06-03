/*
Template Name: Dashonic - Admin & Dashboard Template
Author: Pichforest
Website: https://Pichforest.com/
Contact: Pichforest@gmail.com
File: file manager Init Js File
*/

var options = {
    series: [76],
    chart: {
        height: 150,
        type: 'radialBar',
        sparkline: {
            enabled: true
        }
    },
    colors: ['#038edc'],
    plotOptions: {
        radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
                background: "#e7e7e7",
                strokeWidth: '97%',
                margin: 5, // margin is in pixels

            },

            hollow: {
                size: '60%',
            },

            dataLabels: {
                name: {
                    show: false
                },
                value: {
                    offsetY: -2,
                    fontSize: '16px'
                }
            }
        }
    },
    grid: {
        padding: {
            top: -10
        }
    },

    labels: ['Storage'],
};
var chart = new ApexCharts(document.querySelector("#radial-chart"), options);
chart.render();