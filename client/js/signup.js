var $signup = $("#signup");
var $bg_cover = $("#bg-cover");

$(document).ready(function() {
  TweenMax.fromTo($signup, 1.5, {y: -150, opacity: 0}, {y: 0, opacity: 1, ease: Sine.easeInOut});
  TweenMax.fromTo($bg_cover, 1, {opacity: 0}, {opacity: 1, ease: Sine.easeInOut});
});
