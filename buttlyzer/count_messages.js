// count messages for each user
// (re)populates user_num, user_list, and total_messages
// c: channel name, or "all channels"
buttlyzer.count_messages = function(c) {
  buttlyzer.user_num = {};
  buttlyzer.user_list = [];
  buttlyzer.total_messages = 0;
  for (var i = 0; i < buttlyzer.data.length; i++) {
    if (c !== 0 && buttlyzer.data[i].t !== c) {
      continue;
    }
    var f = buttlyzer.data[i].f;
    if ($("#show").val() === "tm" || $("#show").val() === "tk") {
      f = buttlyzer.user_array[buttlyzer.data[i].f];
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
