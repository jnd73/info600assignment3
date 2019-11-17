
document.addEventListener('DOMContentLoaded', assignClickHandler)

function assignClickHandler () {
    
  $(document).ready(function(){
    //calling of functions for adding, deleting and loading data
    $(document).on("click","#deleteRec", delRec);
    $(document).on("click","#addRec", addingRec);
    $(document).on("click","#loadData", loadingData);
   
  });


  //functions for loading the data
  function loadingData(){
    //empty first the display then proceed to displaying data
    $("#enteredRecords").empty();
      $.ajax({
        method: 'GET',
        url: '/users',
        datatype: 'json',
        success: function(data){
          $(data.records).each(function(index,fieldName){
              const date = new Date()
              const time = date.getHours() + ':' + date.getMinutes()
              $('#enteredRecords').append(time +' - '+ fieldName.fullName+', '+' '+fieldName.major+', '+fieldName.startYear+
                '<button value="'+fieldName.id+'" id="deleteRec">Delete</button><br>');
          });
        }

      });
  }

  //functions for adding records
  function addingRec(){
      const startYear = $('#startYear').val();
      if (startYear < 2000) {
        window.alert('Incorrect year: ' + startYear)
        return
      }
      $.ajax({
        url: '/users/',
        method: 'POST',
        data: {
          fullName: $('#fullName').val(),
          major: $('#major').val(),
          startYear: $('#startYear').val()
        }
      })
      alert("Adding Record Complete");
      //reseting the input fields
      document.getElementById('inputs').reset()
  }
  //functions for deleting records
  function delRec(){
      const id = $(this).val();
      $.ajax({
        url: '/user/'+id,
        method: 'DELETE',
        success: function(){
          alert('Record with an id of '+ id+' has been deleted' );
          //codes underneath is for refreshing the display
          $("#enteredRecords").empty();
          loadingData();
        },
        error: function(error){
          alert(error);
        }
      });            
  }


 
}