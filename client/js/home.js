var chart = document.getElementsByClassName('chart')[0];
var ctx = chart.getContext('2d');

// Functions
function loadChart() {
  new Chart(ctx).Doughnut(data, {
    animationEasing: "easeInOutCubic"
  });
}

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

var $nav_toggle = document.getElementById('nav-toggle');
var $nav_side = document.getElementById('nav-side');
$nav_toggle.addEventListener('click', function() {
  if (!$nav_toggle.classList.contains('active')) {
    TweenMax.to($nav_side, 0.5, {x: 100, ease: Sine.easeInOut});
    TweenMax.to($main, 0.5, {x: 100, ease: Sine.easeInOut});
    this.classList.toggle('active');
  } else {
    TweenMax.to($nav_side, 0.5, {x: 0, ease: Sine.easeInOut});
    TweenMax.to($main, 0.5, {x: 0, ease: Sine.easeInOut});
    this.classList.remove('active');
  }
});

function enterPage(result) {
  window.location.href = result.redirect;
}
