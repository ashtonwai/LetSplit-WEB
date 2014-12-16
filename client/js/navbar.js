var $nav_home = document.getElementById('nav-home');
$nav_home.addEventListener('click', function() {
  window.location.href = '/home';
});

var $create_btn = document.getElementById('create-btn');
$create_btn.addEventListener('click', function(e) {
  e.preventDefault();
  sendAjax($('#newCircleForm').attr('action'), $('#newCircleForm').serialize(), enterPage);
});
