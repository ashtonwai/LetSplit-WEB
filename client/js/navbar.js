var $nav_toggle = document.getElementById('nav-toggle');
var $nav_side = document.getElementById('nav-side');

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

var $nav_home = document.getElementById('nav-home');
$nav_home.addEventListener('click', function() {
  window.location.href = '/home';
});

var $create_btn = document.getElementById('create-btn');
$create_btn.addEventListener('click', function(e) {
  e.preventDefault();
  sendAjax($('#newCircleForm').attr('action'), $('#newCircleForm').serialize());
});
