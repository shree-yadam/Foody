const pastOrderClickHandler = () => {
  $('#pastOrder').on('click', () => {
    console.log('clicked');
    const orderLists = $('.pastOrdersContainer');
    if (orderLists[0].style.display !== "block") {
      orderLists.slideDown("slow");
    } else {
      orderLists.slideUp("slow");
    }
  });
}

$(document).ready(() => {
  pastOrderClickHandler();
});
