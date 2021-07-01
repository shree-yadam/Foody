$(window).on("load", () => {
  $('.restaurant').click((event) => {
    let action = '/api/menu/';
    action += $(event.currentTarget.children[0].childNodes[3]).val();
    $('#restaurant-List').attr('action', action);
    $('#restaurant-List').submit();
  });
});
