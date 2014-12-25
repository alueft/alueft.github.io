$.ajax({
  url: "/log.json",
  dataType: "json",
  xhrFields: {
    onprogress: function(e) {
      // log file size is hardcoded here
      $("#loading").val(e.loaded / 12921488 * 100);
    }
  },
  success: function(response) {
    buttlyzer.data = response;
    for (var i = 0; i < buttlyzer.data.length; i++) {
      var f = buttlyzer.data[i].f;
      if (buttlyzer.user_num.hasOwnProperty(f)) {
        buttlyzer.user_num[f]++;
      }
      else {
        buttlyzer.user_list.push(f);
        buttlyzer.user_num[f] = 1;
      }
    }
    buttlyzer.user_list.sort(function(a, b) {
      return a.localeCompare(b);
    });
    $("#user").append(new Option("all users", "all users"));
    for (var i = 0; i < buttlyzer.user_list.length; i++) {
      $("#user").append(new Option(buttlyzer.user_list[i], buttlyzer.user_list[i]));
    }

    buttlyzer.generate_users(buttlyzer.data.length);

    // populate original options
    buttlyzer.orig_options.type = "pie";
    buttlyzer.orig_options.name = "Messages";
    buttlyzer.orig_options.data = buttlyzer.user_num_array;
    $("#chart").highcharts().addSeries(buttlyzer.orig_options);

    // fade in/out
    $("#loading").fadeTo(1000,0);
    $("#block").fadeTo(1000,0);
    $("#chart").fadeTo(1000,1);
    $("#credits").fadeTo(1000,1);
    $("#options").fadeTo(1000,1);
    $("#block").remove();
  }
});
