$(".wrap").on("submit", function (event) {
  event.preventDefault();
  let amt = $(this).context.elements[0].value;
  let inv = $(this).data("inv");
  let grocery = {
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
  let id = parseInt(this.id);
  console.log(amt);
  console.log(id);
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].id === id) {
      console.log("id: " + id);
      console.log("inventory.id: " + inventory[i].id);
      console.log("inventory.amt: " + inventory[i].inventory);
    }
  }
  // let grocery = {
  //   id: id,
  //   amt: amt,
  // };
  // $.ajax("/api/groceries", {
  //   type: "POST",
  //   data: grocery,
  // });
});

$("#purge").on("click", function (event) {
  event.preventDefault();
  console.log("Purge running");
  $.ajax("/api/purge", {
    type: "POST",
  }).then(function () {
    location.reload();
  });
});
