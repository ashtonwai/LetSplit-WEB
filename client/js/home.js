var $home_bg = document.getElementById('home-bg');
var $navbar = document.getElementById('navbar');
var $nav_toggle = document.getElementById('nav-toggle');
var $nav_side = document.getElementById('nav-side');

// Animation
$(document).ready(function() {
  TweenMax.fromTo($home_bg, 1, {opacity: 0}, {opacity: 1, ease: Sine.easeInOut});
  TweenMax.fromTo($navbar, 1.5, {opacity: 0, y: -60}, {opacity: 1, y: 0, ease:Sine.easeInOut});
});

$nav_toggle.addEventListener('click', function() {
  if (!$nav_toggle.classList.contains('active')) {
    TweenMax.to($nav_side, 0.5, {x: 100, ease: Sine.easeInOut});
    this.classList.toggle('active');
  } else {
    TweenMax.to($nav_side, 0.5, {x: 0, ease: Sine.easeInOut});
    this.classList.remove('active');
  }
});
