$.ajax({
  url: "/data.json",
  dataType: "json",
  xhrFields: {
    onprogress: function(e) {
      $("#loading").val(e.loaded / buttlyzer.logs_size * 100);
    }
  },
  success: function(response) {
    console.time("timer"); //temp
    // response is in the form:
    // [{"d": timestamp, "f": from, "t": to, "k": [tokens]}]
    // populate message_data (= data), token_list, and token_data
    for (var i = 0; i < response.length; i++) {
      var o = response[i];
      var k = o.k;
      var po = {"d":o.d,"f":o.f,"t":o.t};
      buttlyzer.message_data.push(po);
      for (var j = 0; j < k.length; j++) {
        var n = k[j];
        if (buttlyzer.token_data.hasOwnProperty(n)) {
          buttlyzer.token_data[n].push(po);
        }
        else {
          buttlyzer.token_data[n] = [po];
          buttlyzer.token_list.push(n);
        }
      }
    }
    buttlyzer.data = buttlyzer.message_data;

    // sort token list
    buttlyzer.token_list.sort(function(a, b) {
      return a.localeCompare(b);
    });

    // at this point everything has been generated
    // generate users
    buttlyzer.count_messages(0);
    buttlyzer.generate_users(buttlyzer.total_messages);

    // sort user list
    buttlyzer.user_list.sort(function(a, b) {
      return a.localeCompare(b);
    });
    $("#user").append(new Option("all users", "all users"));
    $("#user").append(new Option("all users over all time", "all users over all time"));
    for (var i = 0; i < buttlyzer.user_list.length; i++) {
      $("#user").append(new Option(buttlyzer.user_list[i], buttlyzer.user_list[i]));
    }

    for (var i = 0; i < buttlyzer.channel_list.length; i++) {
      $("#channel").append(new Option(buttlyzer.channel_list[i], buttlyzer.channel_list[i]));
    }

    // populate original options
    buttlyzer.init_options.type = "pie";
    buttlyzer.init_options.name = "Messages";
    buttlyzer.init_options.data = buttlyzer.user_num_array;
    $("#chart").highcharts().addSeries(buttlyzer.init_options);

    console.timeEnd("timer"); //temp

    // fade in/out
    $("#loading").fadeOut(1000);
    $("#block").fadeOut(1000);
    $("#chart").fadeTo(1000,1);
    $("#credits").fadeTo(1000,1);
    $("#options").fadeTo(1000,1);
  }
});
