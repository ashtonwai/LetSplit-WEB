// Ajax
function sendAjax(action, data) {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data: data,
    dataType: 'json',
    success: function(result, status, xhr) {
      window.location.href = result.redirect;
    },
    error: function(xhr, status, error) {
      var msg = JSON.parse(xhr.responseText).error;
      console.log(msg);
    }
  });
  return false;
}
