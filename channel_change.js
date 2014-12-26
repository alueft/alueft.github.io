// reset pie chart data, then regraph
$("#channel").change(function() {
  buttlyzer.user_num = {};
  buttlyzer.user_list = [];
  buttlyzer.user_num_array = [];
  buttlyzer.user_num_array_list = [];
  buttlyzer.user_num_array_ind = 0;
  buttlyzer.other_msg = 0;
  buttlyzer.other_msg_list = [];
  buttlyzer.other_msg_ind = 0;
  buttlyzer.graphed_users = {};
  buttlyzer.graphed_users_list = [];
  buttlyzer.graphed_users_ind = 0;
  var tm = 0;
  var v = $("#channel").val();
  for (var i = 0; i < buttlyzer.data.length; i++) {
    var f = buttlyzer.data[i].f;
    var t = buttlyzer.data[i].t;
    if (v !== "all channels" && buttlyzer.data[i].t !== v) {
      continue;
    }
    if (buttlyzer.user_num.hasOwnProperty(f)) {
      buttlyzer.user_num[f]++;
    }
    else {
      buttlyzer.user_list.push(f);
      buttlyzer.user_num[f] = 1;
    }
    tm++;
  }
  buttlyzer.generate_users(tm);
  buttlyzer.init_options.data = buttlyzer.user_num_array;

  buttlyzer.redraw();
});
