// aggregate small frequency users, based on threshold, into a single "Other" group
// (re)populates user_num_array, graphed_users, and other_msg
buttlyzer.generate_users = function(threshold) {
  if (buttlyzer.user_num_array_list.length === buttlyzer.user_num_array_ind) {
    // generate new values and add to lists
    buttlyzer.other_msg = 0;
    buttlyzer.user_num_array = [];
    var other_size = 0;
    var other_last = "";
    var cur_users = [];
    for (var user in buttlyzer.user_num) {
      if (buttlyzer.user_num.hasOwnProperty(user) && !buttlyzer.graphed_users.hasOwnProperty(user)) {
        cur_users.push([buttlyzer.user_num[user], user]);
      }
    }
    // sort current users by decreasing frequency
    cur_users.sort(function(a, b) {
      if (a[0] > b[0]) {
        return -1;
      }
      if (a[0] < b[0]) {
        return 1;
      }
      return 0;
    });

    var other_users = [];
    var other_total = 0;
    var other_ind = cur_users.length;

    // add to users until 10% exceeded
    for (var i = other_ind-1; i >= 0; i--) {
      if ((other_total + cur_users[i][0]) / threshold <= 0.1) {
        other_total += cur_users[i][0];
        other_ind--;
      }
      else {
        break;
      }
    }

    // ensure there will be at most 21 users graphed, not including other
    while (other_ind > 21) {
      other_total += cur_users[other_ind-1][0];
      other_ind--;
    }

    // if other group contains one user, don't bother with it
    if (other_ind === cur_users.length-1) {
      other_total = 0;
      other_ind++;
    }

    buttlyzer.other_msg = other_total;
    for (var i = 0; i < other_ind; i++) {
      var user = cur_users[i];
      buttlyzer.user_num_array.push({name: user[1], y: user[0], drilldown: true});
      buttlyzer.graphed_users[user[1]] = user[0];
    }
    if (other_ind < cur_users.length) {
      buttlyzer.user_num_array.push({name: "Other", y: other_total, drilldown: true});
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
