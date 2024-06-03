/*
Template Name: Dashonic - Admin & Dashboard Template
Author: Pichforest
Website: https://Pichforest.com/
Contact: Pichforest@gmail.com
File: widgets Js File
*/


//
// Total Revenue Chart
//
var options5 = {
    series: [{
        data: [10, 20, 15, 40, 20, 50, 70, 60, 90, 70, 110]
    }],
    chart: {
        type: 'bar',
        height: 50,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
        },
    },
    tooltip: {
        fixed: {
            enabled: false
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        },
    },
    colors: ['#038edc'],
};

var chart5 = new ApexCharts(document.querySelector("#sparkline-chart-1"), options5);
chart5.render();



// sparkline-chart-2
var options = {
    series: [{
        name: "Series A",
        data: [10, 90, 30, 60, 50, 90, 25, 55, 30, 40]
    }],
    chart: {
        height: 50,
        type: 'area',
        sparkline: {
            enabled: true
        },
        toolbar: {
            show: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [50, 100, 100, 100]
        },
    },
    colors: ['#038edc', 'transparent'],
};
var chart = new ApexCharts(document.querySelector("#sparkline-chart-2"), options);
chart.render();



// sparkline-chart-3
var options5 = {
    series: [{
        data: [40, 20, 30, 40, 20, 60, 55, 70, 95, 65, 110]
    }],
    chart: {
        type: 'bar',
        height: 50,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
        },
    },
    tooltip: {
        fixed: {
            enabled: false
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        },
    },
    colors: ['#038edc'],
};

var chart5 = new ApexCharts(document.querySelector("#sparkline-chart-3"), options5);
chart5.render();


// sparkline-chart-4
var options = {
    series: [{
        name: "Series A",
        data: [10, 90, 30, 60, 50, 90, 25, 55, 30, 40]
    }],
    chart: {
        height: 50,
        type: 'area',
        sparkline: {
            enabled: true
        },
        toolbar: {
            show: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [50, 100, 100, 100]
        },
    },
    colors: ['#038edc', 'transparent'],
};
var chart = new ApexCharts(document.querySelector("#sparkline-chart-4"), options);
chart.render();




// sparkline area 1

var options = {
    series: [{
        name: "New Visitors", data: [21, 65, 32, 80, 42, 25]
    }
    ],
    chart: {
        height: 56,
        type: 'area',
        sparkline: {
            enabled: true
        },
        toolbar: {
            show: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth', width: 2
    },
    colors: ['#038edc'],
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100]
        },
    },

    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        },
        marker: {
            show: false
        }
    }
};

var chart = new ApexCharts(document.querySelector("#chart-sparkarea-1"), options);
chart.render();


// sparkline area 2

var options = {
    series: [{
        name: "Source A", data: [40, 30, 51, 33, 63, 50]
    }
    ],
    chart: {
        height: 56,
        type: 'area',
        sparkline: {
            enabled: true
        },
        toolbar: {
            show: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth', width: 2
    },
    colors: ['#038edc'],
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100]
        },
    },

    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        },
        marker: {
            show: false
        }
    }
};

var chart = new ApexCharts(document.querySelector("#chart-sparkarea-2"), options);
chart.render();

// sparkline area 3

var options = {
    series: [{
        name: "Source A", data: [21, 55, 32, 80, 42, 25]
    }
    ],
    chart: {
        height: 56,
        type: 'area',
        sparkline: {
            enabled: true
        },
        toolbar: {
            show: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth', width: 2
    },
    colors: ['#038edc'],
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100]
        },
    },

    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        },
        marker: {
            show: false
        }
    }
};

var chart = new ApexCharts(document.querySelector("#chart-sparkarea-3"), options);
chart.render();

// Donut chart

var options = {
    chart: {
        height: 215,
        type: 'donut',
    },
    plotOptions: {
        pie: {
            donut: {
                size: '70%',
            },
        }
    },
    dataLabels: {
        enabled: false,
    },
    series: [44, 25, 19],
    labels: ["Social", "Direct", "Others"],
    colors: ['#038edc', '#f5f6f8', '#5fd0f3'],
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0
    }
}

var chart = new ApexCharts(document.querySelector("#chart-donut"), options);
chart.render();


// Earning Reports chart

var options = {
    chart: {
        height: 130,
        type: 'donut',
    },
    dataLabels: {
        enabled: false,
    },
    series: [44, 25, 19],
    labels: ["Revenue", "Expenses", "Profit"],
    colors: ['#038edc', '#dfe2e6', '#5fd0f3'],
    legend: {
        show: false,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0
    }
}

var chart = new ApexCharts(
    document.querySelector("#chart-donut-reports"),
    options
);
chart.render();