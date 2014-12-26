// reset pie chart data, then regraph
$("#channel").change(function() {
  buttlyzer.user_num = {};
  buttlyzer.total_messages = 0;
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
  var v = $("#channel").val();
  // filter all messages by channel (if "all channels" isn't selected)
  for (var i = 0; i < buttlyzer.data.length; i++) {
    var f = buttlyzer.data[i].f;
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
    buttlyzer.total_messages++;
  }
  buttlyzer.generate_users(buttlyzer.total_messages);
  buttlyzer.init_options.data = buttlyzer.user_num_array;

  buttlyzer.redraw();
});
