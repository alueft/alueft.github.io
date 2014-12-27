// make simultaneous requests to get tokens and messages
$.when(
  // get tokens
  $.ajax({
    url: "/tokens.json",
    dataType: "json",
    xhrFields: {
      onprogress: function(e) {
        buttlyzer.loaded_tokens = e.loaded;
        $("#loading").val((e.loaded + buttlyzer.loaded_messages) / buttlyzer.logs_size * 100);
      }
    },
    success: function(response) {
      buttlyzer.token_data = response;
    }
  }),

  // get messages
  $.ajax({
    url: "/messages.json",
    dataType: "json",
    xhrFields: {
      onprogress: function(e) {
        buttlyzer.loaded_messages = e.loaded;
        $("#loading").val((e.loaded + buttlyzer.loaded_tokens) / buttlyzer.logs_size * 100);
      }
    },
    success: function(response) {
      buttlyzer.data = buttlyzer.message_data = response;
    }
  })
).then(function() {
  // at this point both tokens and messages have been loaded
  // generate users
  buttlyzer.count_messages("all channels");
  buttlyzer.generate_users(buttlyzer.total_messages);
  
  // sort user list
  buttlyzer.user_list.sort(function(a, b) {
    return a.localeCompare(b);
  });
  $("#user").append(new Option("all users", "all users"));
  for (var i = 0; i < buttlyzer.user_list.length; i++) {
    $("#user").append(new Option(buttlyzer.user_list[i], buttlyzer.user_list[i]));
  }
  
  // generate and sort channel list
  for (var i = 0; i < buttlyzer.data.length; i++) {
    var t = buttlyzer.data[i].t;
    if (buttlyzer.channel_list.indexOf(t) < 0) {
      buttlyzer.channel_list.push(t);
    }
  }
  buttlyzer.channel_list.sort(function(a, b) {
    return a.localeCompare(b);
  });
  $("#channel").append(new Option("all channels", "all channels"));
  for (var i = 0; i < buttlyzer.channel_list.length; i++) {
    $("#channel").append(new Option(buttlyzer.channel_list[i], buttlyzer.channel_list[i]));
  }
  
  // populate original options
  buttlyzer.init_options.type = "pie";
  buttlyzer.init_options.name = "Messages";
  buttlyzer.init_options.data = buttlyzer.user_num_array;
  $("#chart").highcharts().addSeries(buttlyzer.init_options);
  
  // fade in/out
  $("#loading").fadeTo(1000,0);
  $("#block").fadeTo(1000,0);
  $("#chart").fadeTo(1000,1);
  $("#credits").fadeTo(1000,1);
  $("#options").fadeTo(1000,1);
  $("#block").hide(1000);
});
