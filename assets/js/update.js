/**
 * Use the jQuery Validate and the bootstrap-select plugin to enhance this page
 *
 * Here's what this you will need to do:
 *
 * 1. When the page is loaded all form fields should be disabled except
 *    for the dropdown to select a student
 *
 * 2. Using the bootstrap-selct plugin render dropdown on the page
 *
 * 3. Use the live search functionality to make the dropdown searchable
 *
 * 4. Add the user glyphicons next to each student in the list
 *
 * 6. Add a menu header to the dropdown
 *
 * 7. Customize further with anything you find intersting
 *
 * 8. When an student is selected the form fields should be enabled
      and populated with the data for the selected student
 *
 * 9. Use jQuery validate and add validation to the form with the following requirements
 *    First Name - required, at least 2 characters
 *    Last Name  - required, at least 2 characters
 *	  start_date - make sure date is yyyy-mm-dd
 *	  ADD any other validation that makes you happy
 *
 * 10. Make the color of the error text red
 *
 *
 *
 * Here's the documentation you need:
 * https://jqueryvalidation.org/validate/
 * https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
 * https://silviomoreto.github.io/bootstrap-select/
 * https://silviomoreto.github.io/bootstrap-select/examples/
 * http://getbootstrap.com/components/#glyphicons
 * https://api.jquery.com/jQuery.get/
 * http://stackoverflow.com/questions/9807426/use-jquery-to-re-populate-form-with-json-data
 *
 */

 (function(){

   $(function(){

    $("#updateStudentForm :input").prop("disabled", true);


let student_id = $("#student_id");

    student_id.selectpicker( {
   style: 'btn-info',
   size: 4
    });

let updateURL;


student_id.change(function () {
        let currentStudent = $(this).val();
        updateURL = "http://localhost:1337/student/"+currentStudent
        console.log(currentStudent)

          //store current student in variable for when we submit the form
          //we need this to know what student we are updating
          //variable declared on line
          $.get(updateURL, function(student){

            //loop over the student i got back from the api
            $.each(student, function(key, val){
                //find the input field that matches the name of the key
                let el = $('[name="'+key+'"]');
                //find the type of field that we selected
                let type = el.attr('type');

                //based on the type choose how we set the value
                switch(type){
                    case 'checkbox':
                        el.attr('checked', 'checked');
                        break;
                    case 'radio':
                        el.filter('[value="'+val+'"]').attr('checked', 'checked');
                        break;
                    default:
                        el.val(val);
                }
            });
          })
          //enable input fields after we fill out the form
          $("#updateStudentForm  :input").prop("disabled", false);
        })

        //when the submit button on the form is clicked lets prevent the default behavior
        //we want to stop the form from submitting and reloading the page
        $("#updateStudentSubmitButton").click(function(e){

          //prevents default behavior of form submitting
          e.preventDefault()

          //post request that serializes the data from the form and sends it to the API


          $.ajax({
            url: updateURL,
            type: 'PUT',
            data: $("#updateStudentForm").serialize(),
            success: function(result) {
                alert("Successfully updated")
            }
          });

       })

       $("#updateStudentForm").validate({
         rules: {

             first_name: {
                 required: true,
                 minlength: 2
             },
             last_name: {
                 required: true,
                 minlength: 2
             },
             start_date: {
                 date: true
             }
           },
         messages: {

               first_name: {
                   required: "Error: First name is a required field and must be filled out.",
                   minlength: "Error: The first name field must contain more then 2 characters."
               },
               last_name: {
                   required: "Error: Last name is a required field and must be filled out.",
                   minlength: "Error: The last name field must contain more then 2 characters."
               },
               start_date: {
                   required: "Error: The date field must be filled out in a YYY-MM-DD format."
               }
         },
         highlight: function (element) {
               $(element).parent().addClass('error')
           },
           unhighlight: function (element) {
               $(element).parent().removeClass('error')
           }
       });



   })

 })();
