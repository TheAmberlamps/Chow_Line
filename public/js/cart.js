$(document).ready();
// places items in the cart, then removes them from main db
$(".wrap").on("submit", function (event) {
  event.preventDefault();
  // get the data needed and make objects to hold it
  let amt = $(this).context.elements[0].value;
  let inv = $(this).data("inv");

  let newCartItem = {
    id: $(this).data("id"),
    amt: amt,
  };

  let updateCartItem = {
    id: $(this).data("id"),
    amt: null,
  };

  let groceryItem = {
    id: $(this).data("id"),
    amt: inv - amt,
  };

  console.log(newCartItem);

  // what a mess... OK, so here's the problem as it stands: when the cartCheck is successful, a for loop checks if it's the first entry in the db and creates a new row if it is. if the entry shares the id of a previous one, that one gets updated instead. HOWEVER, /popCart/ ALWAYS runs after the for loop, which screws up update by adding the item again. ALSO, because of the async nature of ajax the arithmetic that supplies the new inventory value for the main db is executed BEFORE cart population, resulting in the new inventory value being passed as the amount being purchased.

  // I suppose I can sidestep that problem by creating different objects to be passed to different ajax functions instead of modifying a single value multiple times...

  // Good, so that worked. I still need to work out how to only run population if update doesn't run... maybe a boolean switch?

  let updateCheck = 0;

  // Yep, that did it!

  //check if the item already exists in the cart
  $.ajax("/api/cartCheck", {
    type: "GET",
    success: function (response) {
      console.log(response.groceries.groceries);

      let manifest = response.groceries.groceries;

      console.log(manifest);

      for (let i = 0; i < manifest.length; i++) {
        if (updateCartItem.id === manifest[i].grocery_id) {
          // if not, insert a new one
          updateCartItem.amt = parseInt(amt) + parseInt(manifest[i].amt);
          updateCheck = 1;
          console.log("updating cart");
          $.ajax("/api/updateCart", {
            type: "POST",
            data: updateCartItem,
          });
        }
      }
      if (updateCheck === 0) {
        console.log("populating cart");
        $.ajax("/api/popCart", {
          type: "POST",
          data: newCartItem,
        });
      }
    },
  });

  // remove that amount of items from main db
  $.ajax("/api/updateGroceries", {
    type: "POST",
    data: groceryItem,
    // and then reload page
  }).then(function () {
    updateCheck = 0;
    manifest = [];
    location.reload();
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

  let cartItem = {
    id: null,
    amt: null,
  };

  $.ajax("/api/cartCheck", {
    type: "GET",
    success: function (response) {
      let cart = response.groceries.groceries;

      $.ajax("/api/grocCheck", {
        type: "GET",
        success: function (response) {
          let inventory = response.inventory.inventory;
        },
      });

      for (let i = 0; i < cart.length; i++) {
        cartItem.id = cart[i].grocery_id;
        invId = cart[i].grocery_id;
        console.log("invId: " + invId);
        console.log("cart amt: " + cart[i].amt);
        console.log("inventory amt: " + inventory[invId - 1].inventory);
        cartItem.amt =
          parseInt(cart[i].amt) + parseInt(inventory[invId - 1].inventory);
        console.log("cartItem.id: " + cartItem.id);
        console.log("cartItem.amt " + cartItem.amt);
        $.ajax("/api/updateGroceries", {
          type: "POST",
          data: cartItem,
        });
      }
      $.ajax("/api/purge", {
        type: "POST",
      }).then(function () {
        location.reload();
      });
    },
  });
});
