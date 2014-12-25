// show line chart of messages by day (or the original pie chart)
$("#user").change(function() {
  var us = $("#user").val();
  buttlyzer.hchart.destroy();
  if (us === "all users") {
    buttlyzer.hchart = new Highcharts.Chart(buttlyzer.pie_options);
    $("#chart").highcharts().addSeries(buttlyzer.orig_options);
    buttlyzer.user_num_array_ind = 1;
    buttlyzer.other_msg_ind = 1;
    buttlyzer.graphed_users_ind = 1;
    $("#esc").html("");
  }
  else {
    var d = buttlyzer.user_column_data(us, "all channels");
    buttlyzer.hchart = new Highcharts.Chart(buttlyzer.column_options);
    $("#chart").highcharts().addSeries({type: "column", name: "Messages", data: d, showInLegend: false});
    $("#esc").html(" (Esc to return to all users)");
  }
});
