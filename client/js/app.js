var $add_btn = document.getElementById('add-btn');
$add_btn.addEventListener('click', function(e) {
  e.preventDefault();
  sendAjax($('#addForm').attr('action'), $('#addForm').serialize(), enterPage);
});

var $sub_btn = document.getElementById('sub-btn');
$sub_btn.addEventListener('click', function(e) {
  e.preventDefault();
  sendAjax($('#subForm').attr('action'), $('#subForm').serialize(), enterPage);
});

// Animation
var $app_bg = document.getElementById('app-bg');
var $navbar = document.getElementById('navbar');
var $main = document.getElementById('main');
var $nav_toggle = document.getElementById('nav-toggle');
var $nav_side = document.getElementById('nav-side');
var $plus = document.getElementsByClassName('circle-btn')[0];
var $minus = document.getElementsByClassName('circle-btn')[1];
var chart = document.getElementById('chart');
var ctx = chart.getContext('2d');

$(document).ready(function() {
  sendAjax('/findCircle', null, function(data) {
    var tl = new TimelineLite();
    tl.fromTo($app_bg, 1, {opacity: 0}, {opacity: 1, ease: Sine.easeInOut})
      .fromTo($navbar, 0.5, {opacity: 0, y: -60}, {opacity: 1, y: 0, ease:Sine.easeInOut}, "-=0.5")
      .fromTo($main, 0.25, {opacity: 0}, {opacity: 0.25, ease: Sine.easeInOut, onComplete:loadCircle(data.circleData)}, "-=0.5")
      .to($main, 0.75, {opacity: 1, ease: Sine.easeInOut})
      .fromTo($plus, 0.75, {x: 100, y: -100, opacity: 0}, {x: 0, y: 0, opacity: 1, ease: Sine.easeInOut}, "-=0.5")
      .fromTo($minus, 0.75, {x: -100, y: -100, opacity: 0}, {x: 0, y: 0, opacity: 1, ease: Sine.easeInOut}, "-=0.5");
  });
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

function enterPage(result) {
  window.location.href = result.redirect;
}

function loadCircle(data) {
  new Chart(ctx).Doughnut(data, {
    animationEasing: "easeInOutCubic"
  });
}
