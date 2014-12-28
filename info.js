$("#infolink").mousemove(function(e) {
  $("#info").show();
  console.log(e.pageX + " " + e.pageY);
  $("#info").css({
    left: e.pageX,
    top: e.pageY-$("#info").height()-1
  });
});

$("#infolink").mouseleave(function() {
  $("#info").hide();
});
