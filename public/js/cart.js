$(".wrap").on("submit", function (event) {
  event.preventDefault();
  let amt = $(this).context.elements[0].value;
  let inv = $(this).data("inv");
  console.log(inv);
  var grocery = {
    id: $(this).data("id"),
    amt: amt,
  };
  console.log("grocery id: " + grocery.id);
  console.log("AJAX begins");
  $.ajax("/api/cart", {
    type: "POST",
    data: grocery,
  });
  grocery.amt = inv - amt;
  $.ajax("/api/groceries", {
    type: "POST",
    data: grocery,
  }).then(function () {
    console.log("hopefully pushed some groceries to cart");
    location.reload();
  });
});
