var $plus = document.getElementsByClassName('circle-btn')[0];
var $minus = document.getElementsByClassName('circle-btn')[1];

var chart = document.getElementById('chart');
var ctx = chart.getContext('2d');
var data = [
{
  value: 1,
  color:"#D3D3D3",
  highlight: "#FF5A5E",
  label: "Red"
}
];

// Ajax
function sendAjax(action, data) {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data: data,
    dataType: 'json',
    success: function(result, status, xhr) {
      enterPage(result.redirect);
    },
    error: function(xhr, status, error) {
      var msg = JSON.parse(xhr.responseText).error;
      console.log(msg);
    }
  });
  return false;
}

// Functions
function loadChart() {
  new Chart(ctx).Doughnut(data, {
    animationEasing: "easeInOutCubic"
  });
}

// Animation
var $home_bg = document.getElementById('home-bg');
var $navbar = document.getElementById('navbar');
var $nav_toggle = document.getElementById('nav-toggle');
var $nav_side = document.getElementById('nav-side');
var $main = document.getElementById('main');

$(document).ready(function() {
  var tl = new TimelineLite();
  tl.fromTo($home_bg, 1, {opacity: 0}, {opacity: 1, ease: Sine.easeInOut})
    .fromTo($navbar, 0.5, {opacity: 0, y: -60}, {opacity: 1, y: 0, ease:Sine.easeInOut}, "-=0.5")
    .fromTo($main, 0.25, {opacity: 0}, {opacity: 0.25, ease: Sine.easeInOut, onComplete:loadChart}, "-=0.5")
    .to($main, 0.75, {opacity: 1, ease: Sine.easeInOut})
    .fromTo($plus, 0.75, {x: 100, y: -100, opacity: 0}, {x: 0, y: 0, opacity: 1, ease: Sine.easeInOut}, "+=0.5")
    .fromTo($minus, 0.75, {x: -100, y: -100, opacity: 0}, {x: 0, y: 0, opacity: 1, ease: Sine.easeInOut}, "-=1");
});

$nav_toggle.addEventListener('click', function() {
  if (!$nav_toggle.classList.contains('active')) {
    TweenMax.to($nav_side, 0.5, {x: 100, ease: Sine.easeInOut});
    //TweenMax.to($main, 0.25, {x: 100, ease: Sine.easeInOut});
    this.classList.toggle('active');
  } else {
    TweenMax.to($nav_side, 0.5, {x: 0, ease: Sine.easeInOut});
    //TweenMax.to($main, 0.25, {x: 0, ease: Sine.easeInOut});
    this.classList.remove('active');
  }
});
