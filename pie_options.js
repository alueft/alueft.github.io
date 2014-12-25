buttlyzer.pie_options = {
  chart: {
    renderTo: "chart",
    events: {
      drilldown: function(e) {
        var name = e.point.name;
        if (name === "Other") {
          // drilldown to another pie chart
          buttlyzer.generate_users(buttlyzer.other_msg);
          this.addSeriesAsDrilldown(e.point, {type: "pie", name: "Messages", data: buttlyzer.user_num_array, showInLegend: false});
          $("#esc").html(" (Esc to go back one level)");
        }
        else {
          // create new column chart
          var d = buttlyzer.user_column_data(name, "all channels");
          buttlyzer.hchart.destroy();
          buttlyzer.hchart = new Highcharts.Chart(buttlyzer.column_options);
          $("#chart").highcharts().addSeries({type: "column", name: "Messages", data: d, showInLegend: false});
          $("#user").val(name);
          $("#esc").html(" (Esc to return to all users)");
        }
      },
      drillup: function(e) {
        if (e.seriesOptions.type == "pie") {
          // revert to previously generated values
          buttlyzer.user_num_array_ind--;
          buttlyzer.other_msg_ind--;
          buttlyzer.graphed_users_ind--;
          buttlyzer.user_num_array = buttlyzer.user_num_array_list[buttlyzer.user_num_array_ind];
          buttlyzer.other_msg = buttlyzer.other_msg_list[buttlyzer.other_msg_ind];
          buttlyzer.graphed_users = buttlyzer.graphed_users_list[buttlyzer.graphed_users_ind];
          if (buttlyzer.user_num_array_ind === 1) {
            $("#esc").html("");
          }
        }
      }
    }
  },
  credits: {
    enabled: false
  },
  title: {
    text: ""
  },
  tooltip: {
    formatter: function() {
      var p = this.y*100/buttlyzer.data.length;
      return this.point.name+"<br>"+this.series.name+": <b>"+this.y+"</b> ("+p.toFixed(2)+"%)";
    }
  },
  plotOptions: {
    series: {
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.y}",
      },
      data: [],
      size: "90%"
    }
  },
  drilldown: {
    activeDataLabelStyle: {
      textDecoration: "none",
      fontWeight: "normal",
    },
    series: []
  }
};

// create initial pie chart
buttlyzer.hchart = new Highcharts.Chart(buttlyzer.pie_options);
