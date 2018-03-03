$(document).ready(function () {

  var ctx = $("#bar-chartcanvas");

  var colorArray = [
    "red",
    "green",
    "blue",
    "purple",
    "magenta",
    "aqua",
    "salmon",
    "darkgray",
    "pink",
    "coral"
  ]
  var data = {
    labels: ["match1", "match2", "match3", "match4", "match5"],
    datasets: [
      {
        label: "TeamA score",
        data: [10, 50, 25, 70, 40],
        backgroundColor: [
          colorArray[Math.floor(Math.random() * colorArray.length)],
          colorArray[Math.floor(Math.random() * colorArray.length)],
          colorArray[Math.floor(Math.random() * colorArray.length)],
          colorArray[Math.floor(Math.random() * colorArray.length)],
          colorArray[Math.floor(Math.random() * colorArray.length)]
        ],
        borderColor: [
          "#111", "#111", "#111", "#111", "#111"
        ],
        borderWidth: 1
      }
    ]
  };

  var options = {
    title: {
      display: true,
      position: "top",
      text: "Bar Graph",
      fontSize: 18,
      fontColor: "#111"
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0
        }
      }]
    }
  };

  var chart1 = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options
  });

  var chart2 = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options
  });
});