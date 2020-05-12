$(document).ready();
// places items in the cart, then removes them from main db
$(".wrap").on("submit", function (event) {
  event.preventDefault();
  // get the data needed and make an object to hold it
  let amt = $(this).context.elements[0].value;
  let inv = $(this).data("inv");
  let grocery = {
    id: $(this).data("id"),
    amt: amt,
  };

  console.log(grocery);

  // what a fuckin mess... OK, so here's the problem as it stands: when the cartCheck is successful, a for loop checks if it's the first entry in the db and creates a new row if it is. if the entry shares the id of a previous one, that one gets updated instead. HOWEVER, /popCart/ ALWAYS runs after the for loop, which fucks up update by adding the item again. ALSO, because of the async nature of ajax the arithmetic that supplies the new inventory value for the main db is executed BEFORE cart population, resulting in the new inventory value being passed as the amount being purchased.

  // I suppose I can sidestep that problem by creating different objects to be passed to different ajax functions instead of modifying a single value multiple times...

  //check if the item already exists in the cart
  $.ajax("/api/cartCheck", {
    type: "GET",
    success: function (response) {
      console.log(response.groceries.groceries);

      let manifest = response.groceries.groceries;

      console.log(manifest);

      for (let i = 0; i < manifest.length; i++) {
        if (manifest.length === 0) {
          console.log("populating empty cart");
          $.ajax("/api/popCart", {
            type: "POST",
            data: grocery,
          });
        } else if (grocery.id === manifest[i].grocery_id) {
          // if not, insert a new one
          console.log("updating cart");
          $.ajax("/api/updateCart", {
            type: "POST",
            data: grocery,
          });
        }
      }
      console.log("populating cart");
      $.ajax("/api/popCart", {
        type: "POST",
        data: grocery,
      });
    },
  });

  // remove that amount of items from main db
  grocery.amt = inv - amt;
  $.ajax("/api/updateGroceries", {
    type: "POST",
    data: grocery,
    // and then reload page
  }).then(function () {
    // location.reload();
  });
});

// removes items from cart and inserts them back into main db
$(".cartItem").on("submit", function (event) {
  event.preventDefault();
  // get the data needed
  let amt = parseInt($(this).context.elements[0].value);
  let id = parseInt(this.id);
  let cartInv = parseInt($(this).context.elements[0].max);
  let newInv = null;

  // find the item that corresponds with the one you're removing, adjust the value as needed and store it
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].id === id) {
      newInv = amt + inventory[i].inventory;
    }
  }
  let grocery = {
    id: id,
    amt: newInv,
  };
  // repopulate main db
  $.ajax("/api/updateGroceries", {
    type: "POST",
    data: grocery,
  });
  grocery.amt = cartInv - amt;
  // checks to see if the number of items being removed from the cart is the total number of that item in the cart, and if so removes that row from the cart db
  if (amt === cartInv) {
    $.ajax("/api/removeItem", {
      type: "POST",
      data: grocery,
    }).then(function () {
      location.reload();
    });
  }
  // otherwise adjust the amt and update the db
  else {
    $.ajax("/api/updateCart", {
      type: "POST",
      data: grocery,
      // and then reload page
    }).then(function () {
      location.reload();
    });
  }
});

// purges cart db entirely
// need to add main db repopulation to this function
$("#purge").on("click", function (event) {
  event.preventDefault();
  console.log("Purge running");
  // insert repop code here, thinking of a for loop that will iterate through all cart items and run /api/updateCart for each of them before purging cart.
  $.ajax("/api/purge", {
    type: "POST",
  }).then(function () {
    location.reload();
  });
});
