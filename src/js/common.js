
(function ($) {
    $(document).ready(function () {

        $(document).on("click", "#sidebarCollapse", function (e) {
          $('#sidebar, #content').toggleClass('active');
          $('.collapse.in').toggleClass('in');
          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });

        $(document).on('click','.passwordShowHide', function(e){
          let closeInput = $(this).closest('.input-group').find('input')
          if($(this).hasClass("active")){
            closeInput.attr("type", "password");
            $(this).removeClass("active").find("i").toggleClass("fa-eye-slash fa-eye");
          }else{
            closeInput.attr("type", "text")
            $(this).addClass("active").find("i").toggleClass("fa-eye-slash fa-eye");
          }
        })

    


      
      

       

    });
  })(jQuery); // End of use strict
  