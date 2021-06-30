//Function to validate login using ajax
const handleLoginError = function(event) {
  event.preventDefault();
  $('#login-error').hide();
  const loginCredentials = $(this).serialize();
  const params = {
    url: '/api/customers/login',
    method: 'POST',
    data: loginCredentials
  };
  $.ajax(params)
    .then((response) => {
      $("html").html(response);
    })
    .catch((error) => {
      console.log(error);
      $('#login-error').show();
    });
}
//Function to validate register using ajax
const handleRegisterError = function(event) {
  event.preventDefault();
  $('#register-error').hide();
  const registerCredentials = $(this).serialize();
  const params = {
    url: '/api/customers/register',
    method: 'POST',
    data: registerCredentials
  };
  $.ajax(params)
    .then((response) => {
      $("html").html(response);
    })
    .catch((error) => {
      console.log(error);
      $('#register-error').show();
    });
}

$(document).ready(function() {
  $('#login-error').hide();
  $('#register-error').hide();
  //register even handlers
  $('#formLogIn').submit(handleLoginError);
  $('#fromSignUp').submit(handleRegisterError);
});
