console.log('running vendor')
function refreshList() {
  console.log('running refreshList')
    $.get('/vendors', (data) => {
      $('#vendorList').empty()
      console.log(data);
      for (let vendor of data) {
        $('#vendorList').append(
          `<li> ${vendor.name} <input type='submit' value='X' onclick='deleteIt(${vendor.id})'></li>`  
        )
      }
    })
  }
 
   refreshList()

function deleteIt(id)
{
  $.post('/vendors/:id',
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

$('#addVendor').click(() => {
  if( $('#vendorName').val())
    {
    $.post(
      '/vendors',
      {
        name: $('#vendorName').val()
      },
      (data) => {
        if (data.success) {
          refreshList()
        }else {
          alert('Some error occurred')
        }
      }
    )
    }
  else
    {
      alert("FIELDS CANNOT BE EMPTY")
    }
  })
