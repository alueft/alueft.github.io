$("#kinput").autocomplete({
  source: function(request, response) {
    var matches = [];
    var s = request.term;
    for (var i = 0; i < buttlyzer.token_list.length; i++) {
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
