$('#loginUser').click(() => {
  let userLoggedIn=$('#userEmail').val()
  window.localStorage.setItem('username',userLoggedIn)
  userLoggedIn=window.localStorage.getItem('username')
  console.log(" user logged in is " + userLoggedIn)
  console.log("loginuserbutton clicked");
    $.post(
      '/users/login',
      {
        email:$('#userEmail').val(),
        password:$('#userPassword').val()
      },
      (data) => {
               if (data.success) {
                          alert("user Exists")
                          window.location="http://localhost:1111/productList.html"
                    }else {
                           alert('Some error occurred')
                          }
                }
    )
            
    })
   