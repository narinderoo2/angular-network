(function ($) {
    $(document).ready(function () {

        $(document).on("click", "#sidebarCollapse", function (e) {
            console.log('==');
            // $('#sidebar').toggleClass('active');
            $('#sidebar, #content').toggleClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');

         
          });

        //   $("#sidebar").mCustomScrollbar({
        //     theme: "minimal"
        // });

       

    });
  })(jQuery); // End of use strict
  