$(".wrap").on("submit", function (event) {
  event.preventDefault();
  let amt = $(this).context.elements[0].value;
  let inv = $(this).data("inv");
  let grocery = {
    id: $(this).data("id"),
    amt: amt,
  };
  $.ajax("/api/popCart", {
    type: "POST",
    data: grocery,
  });
  grocery.amt = inv - amt;
  $.ajax("/api/updateGroceries", {
    type: "POST",
    data: grocery,
  }).then(function () {
    location.reload();
  });
});

$(".cartItem").on("submit", function (event) {
  event.preventDefault();
  let amt = parseInt($(this).context.elements[0].value);
  let id = parseInt(this.id);
  let cartInv = parseInt($(this).context.elements[0].max);
  let newInv = null;
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].id === id) {
      newInv = amt + inventory[i].inventory;
    }
  }
  let grocery = {
    id: id,
    amt: newInv,
  };
  $.ajax("/api/updateGroceries", {
    type: "POST",
    data: grocery,
  });
  grocery.amt = cartInv - amt;
  if (amt === cartInv) {
    $.ajax("/api/removeItem", {
      type: "POST",
      data: grocery,
    }).then(function () {
      location.reload();
    });
  } else {
    $.ajax("/api/updateCart", {
      type: "POST",
      data: grocery,
    }).then(function () {
      location.reload();
    });
  }
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
