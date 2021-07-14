$("#add_user").submit(function(event){
    alert("User Added Successfully")
})

$("#update_user").submit(function(event){
    event.preventDefault()

      var unindexed_array = $(this).serializeArray()
      var data = {}

      $.map(unindexed_array,function(n,i){
          data[n['name']] = n['value']
      })

      console.log(data)

      var request = {
          "url":`http://localhost:8000/api/users/${data.id}`,
          "method" :"PUT",
          "data":data
      }

      $.ajax(request).done(response=>{
          alert("Updated Succesfully")
      })
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete")
    $ondelete.click(()=>{
        var id = $(this).attr("data-id")


        var request = {
            "url":`http://localhost:8000/api/users/${id}`,
            "method" :"DELETE"
        }

        if(confirm("Are you Sure?")){
            $.ajax(request).done(response=>{
                alert("Deleted Succesfully")
                location.reload()
            })
        }
    })
}