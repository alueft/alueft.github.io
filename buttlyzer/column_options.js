buttlyzer.column_options = {
  chart: {
    renderTo: "chart"
  },
  credits: {
    enabled: false
  },
  title: {
    text: ""
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.y}</b>"
  },
  xAxis: {
    type: "datetime",
    dateTimeLabelFormats: {
      day: "%b. %e",
      week: "%b. %e"
    },
    min: Date.UTC(2014,9,22),
    max: Date.UTC(2014,11,20)
  },
  yAxis: {
    title: {
      text: "Messages"
    },
    min: 0
  }
};
