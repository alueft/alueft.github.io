// count messages for each user
// (re)populates user_num, user_list, and total_messages
// c: channel name, or "all channels"
buttlyzer.count_messages = function(c) {
  buttlyzer.user_num = {};
  buttlyzer.total_messages = 0;
  buttlyzer.user_list = [];
  for (var i = 0; i < buttlyzer.data.length; i++) {
    var f = buttlyzer.user_array[buttlyzer.data[i].f];
    if (c !== 0 && buttlyzer.data[i].t !== c) {
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
};
