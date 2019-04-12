function refreshList() {
  console.log('running refreshList products fetching')
    $.get('/products', (data) => {
      $('#productList').empty()
      console.log(data);
      for (let product of data) {
        $('#productList').append(
          `<table>
          <tr>
          <td>${product.name}</td>
          <td><input type='submit' value='Add' onclick='addToCart(${product.id})'></td>
          </tr>
          </table>
          `  
        )
      }
    })
  } 
  refreshList() 
  function addToCart(productId)
  { 
    console.log("runing js of addt cart func" + productId)
    let useremail=window.localStorage.getItem('username')
    $.post('/carts',
      {
      productId:productId,
      userEmail:useremail  
    }),
    (data)=>
    {
      if (data.success) {
          refreshList()
        }else {
          alert('Some error occurred')
        }
    }
  }