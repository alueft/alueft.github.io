// reset pie chart data, then regraph
buttlyzer.reset = function() {
  buttlyzer.user_num_array = [];
  buttlyzer.user_num_array_list = [];
  buttlyzer.user_num_array_ind = 0;
  buttlyzer.other_msg = 0;
  buttlyzer.other_msg_list = [];
  buttlyzer.other_msg_ind = 0;
  buttlyzer.graphed_users = {};
  buttlyzer.graphed_users_list = [];
  buttlyzer.graphed_users_ind = 0;
  buttlyzer.count_messages(buttlyzer.channel_map[$("#channel").val()]);
  buttlyzer.generate_users(buttlyzer.total_messages);
  buttlyzer.init_options.data = buttlyzer.user_num_array;

  buttlyzer.redraw();
};

$("#channel").change(buttlyzer.reset);
