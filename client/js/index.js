// Ajax
function sendAjax(action, data, callback) {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data: data,
    dataType: 'json',
    success: function(result, status, xhr) {
      callback(result);
    },
    error: function(xhr, status, error) {
      var msg = JSON.parse(xhr.responseText).error;
      console.log(msg);
    }
  });
  return false;
}
