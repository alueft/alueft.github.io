// aggregate <2% users, based on threshold, into a single "Other" group
// (re)populates user_num_array, graphed_users, and other_msg
buttlyzer.generate_users = function(threshold) {
  if (buttlyzer.user_num_array_list.length === buttlyzer.user_num_array_ind) {
    // generate new values and add to lists
    buttlyzer.other_msg = 0;
    buttlyzer.user_num_array = [];
    for (var user in buttlyzer.user_num) {
      if (buttlyzer.user_num.hasOwnProperty(user) && !buttlyzer.graphed_users.hasOwnProperty(user)) {
        if (buttlyzer.user_num[user] / threshold > 0.02) {
          buttlyzer.user_num_array.push({name: user, y: buttlyzer.user_num[user], drilldown: true});
          buttlyzer.graphed_users[user] = buttlyzer.user_num[user];
        }
        else {
          buttlyzer.other_msg += buttlyzer.user_num[user];
        }
      }
    }

    // sort by decreasing number of messages and add "Other" at the end
    buttlyzer.user_num_array.sort(function(a, b) {
      if (a.y > b.y) {
        return -1;
      }
      if (a.y < b.y) {
        return 1;
      }
      return 0;
    });
    if (buttlyzer.other_msg > 0) {
      buttlyzer.user_num_array.push({name: "Other", y: buttlyzer.other_msg, drilldown: true});
    }

    buttlyzer.user_num_array_list.push(buttlyzer.user_num_array);
    buttlyzer.other_msg_list.push(buttlyzer.other_msg);
    buttlyzer.graphed_users_list.push(buttlyzer.graphed_users);
  }
  else {
    // retrieve existing values
    buttlyzer.user_num_array = buttlyzer.user_num_array_list[buttlyzer.user_num_array_ind];
    buttlyzer.other_msg = buttlyzer.other_msg_list[buttlyzer.other_msg_ind];
    buttlyzer.graphed_users = buttlyzer.graphed_users_list[buttlyzer.graphed_users_ind];
  }
  buttlyzer.user_num_array_ind++;
  buttlyzer.other_msg_ind++;
  buttlyzer.graphed_users_ind++;
};
