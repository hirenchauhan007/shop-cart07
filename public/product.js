function refreshList() {
  
    $.get('/products', (data) => {
      $('#productList').empty()
      
      for (let product of data) {
          if(product.name)
            {
             $('#productList').append( 
              `<tr>
               <td>${product.name}</td>  <td>${product.price}</td> <td>${product.quantity}</td> <td>${product.vendor}</td> <td><input type='submit' value='X' onclick='deleteIt(${product.id})'></td>
               </tr>`
              )
            }
      }
    }),
    $.get('/vendors',(data)=>{
      $('#mySelect').empty()
      for(let vendor of data)
      {
        $('#mySelect').append(
         `<option> ${vendor.name} </option>`
        )
      }

    })
  }

refreshList()


$('#addProduct').click(() => {
  
  // console.log($('#mySelect').val() +"   "+$('#productPrice').val() + " aff " +$('#productName').val()+ " aff " +$('#productQuantity').val())
   // if(($('#productName').val()&&$('#productPrice').val()&&$('productQuantity').val())){
    $.post(
      '/products',
      {
        name: $('#productName').val(),
        price:$('#productPrice').val(),
        quantity:$('#productQuantity').val(),
        vendor:$('#mySelect').val()
      },
      (data) => {
        if (data.success) {
            console.log("adddd product to db")
            refreshList()
          
        }else {
          alert('Some error occurred')
        }
      }
    )
    //}
    // else
    //     {
    //         alert("ALL FIELDS REQUIRED")
    //     }
  })
   
function deleteIt(id)
{
  $.post('/products/:id',
  {
    id:id
  },
      (data) => {
        if (data.success) {
          refreshList()
        }else {
          alert('Some error occurred')
        }
      }
     )
  // console.log('trying to delete vendor '+id);
}






  