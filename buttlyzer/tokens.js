$("#kinput").autocomplete({
  source: function(request, response) {
    var matches = [];
    var s = request.term;
    // binary search to find the first token that compares >= s
    var lo = 0, hi = buttlyzer.token_list.length-1;
    while (lo < hi-1) {
      var mid = Math.floor(lo+(hi-lo)/2);
      var ms = buttlyzer.token_list[mid];
      if (ms === s) {
        lo = hi = mid;
      }
      else if (ms > s) {
        hi = mid;
      }
      else {
        lo = mid;
      }
    }
    for (var i = lo; i < buttlyzer.token_list.length; i++) {
      var match = true;
      var t = buttlyzer.token_list[i];
      for (var j = 0; j < Math.min(s.length, t.length); j++) {
        if (s.charAt(j) !== t.charAt(j)) {
          match = false;
          break;
        }
      }
      if (match) {
        matches.push(t);
      }
      // break if first character no longer matches
      else if (matches.length > 0 && s.charAt(0) !== t.charAt(0)) {
        break;
      }
    }
    response(matches);
  },
  minLength: 1
});

$("#kinput").on("autocompleteselect", function(e, ui) {
  var k = ui.item.value;
  buttlyzer.data = buttlyzer.token_data[k];
  buttlyzer.reset();
});
