$(() => {
  // 折叠菜单
  $('#swith_one').click(() => {
    // alert("ddd");
    if ($('#left').is(':visible')) {
      $('#left').hide();
      $('#right').css('width', '100%');
      // $("#left").stop(true,true).animate({width:"0%"});
      // $("#right").stop(true,true).animate({width:"100%"});
    } else {
      $('#left').show();
      // $("#left").stop(true,true).animate({width:"22%"});
      $('#right').css('width', '80%');
    }
  });
  // 点击用户名
  $('#head_sculpture').click((event) => {
    // $("body").append('<div class="person_msg"></div>')
    $('.person_msg').show();
    event.stopPropagation();
    // $(".person_msg").stop(true,true).animate({width:"130px"});
  });
  $('#main').click(() => {
    $('.person_msg').hide();
  });
  // //注销
  // $("#head_sculpture img").click(function(){
  //     location.href="login.html";
  // });
  $('#goManagePage').click(() => {
    $('#right_body iframe').attr('src', 'manage.html');
  });
  $('#goCollect').click(() => {
    $('#right_body iframe').attr('src', 'manage_article.html');
  });
  $('#site1').click(() => {
    $('#right_body iframe').attr('src', 'platform.html');
  });
  $('#site2').click(() => {
    $('#right_body iframe').attr('src', 'platform.html');
  });
  $('#site3').click(() => {
    $('#right_body iframe').attr('src', 'platform.html');
  });
  $('#site4').click(() => {
    $('#right_body iframe').attr('src', 'platform.html');
  });
  //   $('.collect').click(() => {
  //     $('.collect').attr('src', '/img/icon8.JPG');
  //   });
});
