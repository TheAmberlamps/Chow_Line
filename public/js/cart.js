$(".wrap").on("submit", function (event) {
  event.preventDefault();
  let amt = $(this).context.elements[0].value;
  let inv = $(this).data("inv");
  var grocery = {
    id: $(this).data("id"),
    amt: amt,
  };
  $.ajax("/api/cart", {
    type: "POST",
    data: grocery,
  });
  grocery.amt = inv - amt;
  $.ajax("/api/groceries", {
    type: "POST",
    data: grocery,
  }).then(function () {
    location.reload();
  });
});

$(".cartItem").on("submit", function (event) {
  event.preventDefault();
  let amt = $(this).context.elements[0].value;
  console.log(amt);
});
