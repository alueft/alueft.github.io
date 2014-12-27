// returns data for column graph
// u: string denoting user name
buttlyzer.user_column_data = function(u) {
  var d = [];
  var g = 60*60*24;
  var tz = 60*60*8;
  var dv = -1;
  var t = 0;
  var c = buttlyzer.channel_map[$("#channel").val()];
  // group data by intervals of g
  for (var i = 0; i < buttlyzer.data.length; i++) {
    if (buttlyzer.data[i].f !== u) {
      continue;
    }
    if (c !== 0 && buttlyzer.data[i].t !== c) {
      continue;
    }
    var cv = buttlyzer.data[i].d+1413999466;
    if (dv === -1) {
      t++;
      dv = cv;
    }
    else if (Math.floor((cv+tz)/g) === Math.floor((dv+tz)/g)) {
      t++;
    }
    else {
      d.push([(Math.floor((dv+tz)/g)*g-2*tz)*1000,t]);
      t = 1;
      dv = cv;
    }
  }
  if (t > 0) {
    d.push([(Math.floor((dv+tz)/g)*g-2*tz)*1000,t]);
  }
  return d;
};
