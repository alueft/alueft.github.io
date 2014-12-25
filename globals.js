var buttlyzer = buttlyzer = buttlyzer || {};
buttlyzer.data = null;
buttlyzer.user_num = {};
buttlyzer.user_list = [];
buttlyzer.orig_options = {};

// store indices of user_num_array, other_msg, graphed_users
// increment indices when drilling down
// decrement indices when drilling up
// add to lists if the end of the list is hit
buttlyzer.user_num_array = [];
buttlyzer.user_num_array_list = [];
buttlyzer.user_num_array_ind = 0;
buttlyzer.other_msg = 0;
buttlyzer.other_msg_list = [];
buttlyzer.other_msg_ind = 0;
buttlyzer.graphed_users = {};
buttlyzer.graphed_users_list = [];
buttlyzer.graphed_users_ind = 0;

Highcharts.setOptions({
  global: {
    timezoneOffset: 8*60 // PST
  },
  lang: {
    drillUpText: ""
  }
});
