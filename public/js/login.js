$(() => {
  $('#login').click(() => {
    // alert("dd");
    if ($('#account').val() == null || $('#account').val() == '') {
      alert('请输入账号');
      return false;
    }
    if ($('#password').val() == null || $('#password').val() == '') {
      alert('请输入密码');
      return false;
    }

    $('#loginFrom').submit();
  });
  $('#goSign').click(() => {
    location.href = '/signup';
  });
});
