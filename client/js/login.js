var $login = document.getElementById('login');
var $login_bg = document.getElementById('login-bg');
var $signup_return = document.getElementById('signup-return');

$(document).ready(function() {
  TweenMax.fromTo($login, 1.5, {y: -150, opacity: 0}, {y: 0, opacity: 1, ease: Sine.easeInOut});
  TweenMax.fromTo($login_bg, 1, {opacity: 0}, {opacity: 1, ease: Sine.easeInOut});
});

$signup_return.addEventListener('click', function() {
  TweenMax.to($login, 1.5, {y: -150, opacity: 0, ease: Sine.easeInOut});
  TweenMax.to($login_bg, 1, {opacity: 0, ease: Sine.easeInOut});
  setInterval(function() {
    window.location.href = "/signup";
  }, 1500);
});

function enterPage(direct) {
  TweenMax.to($login, 1.5, {y: -150, opacity: 0, ease: Sine.easeInOut});
  TweenMax.to($login_bg, 1, {opacity: 0, ease: Sine.easeInOut});
  setInterval(function() {
    window.location.href = direct;
  }, 1500);
}
