
$(document).ready(function() {
  const loginAlert = function(event) {
    alert("Login to place order");
  };
  if ($('.item-quantity').length === 0) {
    $('div.menu-item').on("click", loginAlert);
  } else {
    $('div.menu-item').off("click", loginAlert);
  }
});
