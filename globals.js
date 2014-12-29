// size of log files
buttlyzer.logs_size = 9490609;

// total bytes loaded for each log file
buttlyzer.loaded_messages = 0;
buttlyzer.loaded_tokens = 0;
buttlyzer.loaded_token_list = 0;

// the current data set, including [{d: timestamp, f: from, t: to}]
buttlyzer.data = null;

// message data: [{d: timestamp, f: from, t: to}]
buttlyzer.message_data = [];

// token data: {token name: [{d: timestamp, f: from, t: to}]}
buttlyzer.token_data = {};

// user => # messages sent
buttlyzer.user_num = {};

// total messages sent (filtered by channel selection)
buttlyzer.total_messages = 0;

// user list to sort and display
buttlyzer.user_list = [];

// token list to display when searching for tokens
buttlyzer.token_list = [];

// options for initial pie chart:
// {type: "pie", name: "Messages", data: initial pie chart data}
buttlyzer.init_options = {};

// store indices of user_num_array, other_msg, graphed_users
// increment indices when drilling down
// decrement indices when drilling up
// add to lists if the end of the list is hit
// {name: user, y: # messages sent, drilldown: true}
buttlyzer.user_num_array = [];
buttlyzer.user_num_array_list = [];
buttlyzer.user_num_array_ind = 0;

// number of messages sent by aggregated "Other" group
buttlyzer.other_msg = 0;
buttlyzer.other_msg_list = [];
buttlyzer.other_msg_ind = 0;

// user that has been in a pie chart that's been drilled down from => # messages sent
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
