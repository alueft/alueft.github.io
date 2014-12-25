// return to all users if we're not already at it and Esc is pressed
$(document).keydown(function(e) {
  if (e.which === 27) {
    if ($("#user").val() === "all users") {
      if (buttlyzer.user_num_array_ind > 1) {
        buttlyzer.hchart.drillUp();
      }
    }
    else {
      buttlyzer.hchart.destroy();
      buttlyzer.hchart = new Highcharts.Chart(buttlyzer.pie_options);
      $("#chart").highcharts().addSeries(buttlyzer.orig_options);
      buttlyzer.user_num_array_ind = 1;
      buttlyzer.other_msg_ind = 1;
      buttlyzer.graphed_users_ind = 1;
      $("#user").val("all users");
      $("#esc").html("");
    }
  }
});
