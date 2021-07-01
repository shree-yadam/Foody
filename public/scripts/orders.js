const pastOrderClickHandler = () => {
  $('#pastOrder').on('click', () => {
    const orderLists = $('.pastOrdersContainer');
    if (orderLists[0].style.display !== "block") {
      orderLists.slideDown("slow");
    } else {
      orderLists.slideUp("slow");
    }
  });
}
const currentOrderClickHandler = () => {
  $('#currentOrder').on('click', () => {
    const orderLists = $('.currentOrdersContainer');
    if (orderLists[0].style.display !== "block") {
      orderLists.slideDown("slow");
    } else {
      orderLists.slideUp("slow");
    }
  });
}

$(document).ready(() => {
  pastOrderClickHandler();
  currentOrderClickHandler();
});
