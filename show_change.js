$("#show").change(function() {
  if ($("#show").val() === "tm") {
    $("#kmatch").hide();
    if (buttlyzer.data !== buttlyzer.message_data) {
      buttlyzer.data = buttlyzer.message_data;
      buttlyzer.reset();
    }
  }
  else if ($("#show").val() === "tk") {
    $("#kmatch").show();
  }
});
