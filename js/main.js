$(document).ready(function(){

  //Preloader
  $(window).load(function() {
    $("#loader").delay(500).fadeOut();
    $("#mask").delay(1000).fadeOut("slow");
  });

  //Navigation Scrolling
  $('a[href*=#]').not('[data-toggle="tab"]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  //Header Animation
  $(document).scroll(function() {
    if ($(document).scrollTop() >= 50) {
      $('#topnav').addClass('scrolled');
    } else {
      $('#topnav').removeClass('scrolled');
    }
  });

  //Close navbar on click
  $('#topnav a').on('click', function(){
    if ($(window).width() < 768) {
      $(".navbar-toggle").click();
    }
  });

  //Home text slider
  $('#home-slider').flexslider({
    controlNav: false,
    directionNav: false,
    animation: "slide",
    useCSS: false,
    slideshowSpeed: 5000,
  });

  //Background Slideshow
  $('#backgrounds').flexslider({
    controlNav: false,
    directionNav: false,
    slideshowSpeed: 5000
  });

  //Video Background
  if ($('.player').length) {
    $(".player").mb_YTPlayer();
  };
  
  //Nav Selection
  $('#nav').onePageNav({
    currentClass: 'active',
    scrollOffset: 50
  });

  //Elements Animation
  $('.animated').appear(function(){
    var element = $(this);
    var animation = element.data('animation');
    var animationDelay = element.data('delay');
    if (animationDelay) {
      setTimeout(function(){
        element.addClass( animation + " visible" );
        element.removeClass('hiding');        
      }, animationDelay);
    }else {
      element.addClass( animation + " visible" );
      element.removeClass('hiding');      
    }    
  },{accY: -150});

  //Services Tabs
  $('.services li a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  //Portfolio Filters
  $('#projects').mixitup({
    effects: ['fade','scale', 'rotateX'],
    easing: 'windup'
  });

  //Portfolio Modal
  $('.single-project').click(function(){    
    var image = $(this).attr('href'),
        title = $(this).find('h2').text(),    
        project = '<div class="modal fade" id="project-modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button><h4 class="modal-title">' + title + '</h4></div><div class="modal-body"><img src="' + image + '" alt=""></div></div></div></div>';
    $(project).modal()
    .on('hidden.bs.modal', function () {
      $(this).remove();      
    })
    .on('shown.bs.modal', function (e) {
      $('.modal-body').append('<div class="control" id="prev"><a href="#"></a></div>')
      .on('click', '#prev', function(){      
        var modalImage = $(this).parent().find('img'),
            currentImage = modalImage.attr('src'),
            project = $('.single-project[href*="'+ currentImage +'"]').closest('li'),
            prevProject = project.prev(),            
            prevImage = prevProject.find('a').attr('href'),
            prevTitle = prevProject.find('h2').text();
        if (!project.is(':first-child')) {
          modalImage.fadeOut(300, function() {
            modalImage.attr('src', prevImage);
          }).fadeIn(300);
          $('.modal-title').fadeOut(300, function() {
            $('.modal-title').text(prevTitle);
          }).fadeIn(300);
        }
        return false;
      });
      $('.modal-body').append('<div class="control" id="next"><a href="#"></a></div>')
      .on('click', '#next', function(){
        var modalImage = $(this).parent().find('img'),
            currentImage = modalImage.attr('src'),
            project = $('.single-project[href*="'+ currentImage +'"]').closest('li'),
            nextProject = project.next(),            
            nextImage = nextProject.find('a').attr('href'),
            nextTitle = nextProject.find('h2').text();
        if (!project.is(':last-child')) {
          modalImage.fadeOut(300, function() {
            modalImage.attr('src', nextImage);
          }).fadeIn(300);
          $('.modal-title').fadeOut(300, function() {
            $('.modal-title').text(nextTitle);
          }).fadeIn(300);
        }
        return false;
      });
    });
    $('body').addClass('modal-open');
    return false;  
  });

  //Modal Close/Prev/Next
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('#project-modal').modal('hide');
    }
    if (e.keyCode == 37) {
      $('#prev').trigger('click');
    }
    if (e.keyCode == 39) {
      $('#next').trigger('click');
    }
  });


  //Contact form validation and submit with ajax
  $('#contact-form').validate({
    errorPlacement: function(error, element) {},
    highlight: function(element, errorClass) {        
        $(element).parent().removeClass('success').addClass('error');
    },
    unhighlight: function(element, errorClass) {
        $(element).parent().removeClass('error').addClass('success');
    },
    rules: {
      fullname:{
        required: true
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true
      },
      message: {
        required: true
      }
    },
    submitHandler: function(form) {
      var url = $(form).attr('action');
      $.ajax({
        type: "POST",
        url: url,
        data: $(form).serialize(), // serializes the form's elements.
        success: function(data)
        {
            $('.sent').slideDown(600);
            $('html,body').animate({
              scrollTop: $('.sent').offset().top
            }, 1000);
        }
      });
    }
  });
  
});