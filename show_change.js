$("#show").change(function() {
  if ($("#show").val() === "tm") {
    $("#kmatch").hide();
    buttlyzer.data = buttlyzer.message_data;
    buttlyzer.reset();
  }
  else {
    $("#kmatch").show();
  }
});
