
$(document).ready(function() {
  const loginAlert = function(event) {
    alert("Login to place order");
  };
  if ($('.item-quantity').length === 0) {
    console.log("not logged in");
    $('div.menu-item').on("click", loginAlert);
  } else {
    console.log("logged in");
    $('div.menu-item').off("click", loginAlert);
  }
});
