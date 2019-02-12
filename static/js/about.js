$(document).ready(function() {
  $('#email').on('click', function() {
    copyEmail();
  });

  $('#copy_btn').on('click', function() {
    copyEmail();
  })

  function copyEmail() {
    var selected = $('#email').select();
    document.execCommand('copy');
    $('#copy_btn').text('copied');
    setTimeout(function() {
      $('#copy_btn').text('copy');
      // document.getSelection().removeAllRanges();
    }, 3000);
  }
});
