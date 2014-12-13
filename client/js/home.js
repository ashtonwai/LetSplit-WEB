// Animation
var $home_bg = document.getElementById('home-bg');
var $navbar = document.getElementById('navbar');
var $main = document.getElementById('main');

$(document).ready(function() {
  var tl = new TimelineLite();
  tl.fromTo($home_bg, 1, {opacity: 0}, {opacity: 1, ease: Sine.easeInOut})
    .fromTo($navbar, 0.5, {opacity: 0, y: -60}, {opacity: 1, y: 0, ease:Sine.easeInOut}, "-=0.5")
    .fromTo($main, 0.25, {opacity: 0}, {opacity: 0.25, ease: Sine.easeInOut})
    .to($main, 0.75, {opacity: 1, ease: Sine.easeInOut})
});
