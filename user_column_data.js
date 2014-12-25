// returns data for column graph
// parameter u: string denoting user name
buttlyzer.user_column_data = function(u) {
  var d = [];
  var g = 60*60*24;
  var tz = 60*60*8;
  var dv = -1;
  var t = 0;
  // group data by intervals of g
  for (var i = 0; i < buttlyzer.data.length; i++) {
    if (buttlyzer.data[i].from !== u) {
      continue;
    }
    var cv = buttlyzer.data[i].time;
    if (dv === -1) {
      t++;
      dv = cv;
    }
    else if (Math.floor((cv+tz)/g) === Math.floor((dv+tz)/g)) {
      t++;
    }
    else {
      d.push([(Math.floor(dv/g)*g+tz)*1000,t]);
      t = 0;
      dv = cv;
    }
  }
  if (t > 0) {
    d.push([(Math.floor(dv/g)*g+tz)*1000,t]);
  }
  return d;
};
