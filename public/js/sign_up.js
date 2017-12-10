$(function(){
    $("#signup").click(function(){
        //alert("ddd");
    //   if($("#Email").val()==null||$("#Email").val()==""){
    //       alert("请输入邮箱");
    //       return false;
    //   }
    //   if(!ismail($("#Email").val())){
    //       alert("请输入正确的邮箱格式");
    //       return false;
    //   }
      if($("#name").val()==null||$("#name").val()==""){
          alert("请输入用户名");
          return false;
      }
      if($("#password").val()==null||$("#password").val()==""){
          alert("请输入密码");
          return false;
      }
      if($("#repassword").val()==null||$("#repassword").val()==""||$("#repassword").val()!=$("#password").val()){
          alert("两次密码不相同");
          return false;
      }
      $("#signupForm").submit();
    });  
  //邮箱正则式
//   function ismail(mail){
//       return(new RegExp(/^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/).test(mail));
//   }
  });