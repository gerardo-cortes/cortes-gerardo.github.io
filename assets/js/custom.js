/*global $*/

jQuery(function ($) {

  "use strict";

  /*==================================
  * Author        : Ideas_Factory
  * Template Name : Nassar - Creative Resume / CV / Portfolio / vCard
  ==================================== */


  /*=========== TABLE OF CONTENTS ===========

  01. Preloader
  02. Isotope Plugin
  03. Functions
  04. Menu
  05. Window Resize
  06. MagnifPopup Plugin
  07. Type Plugin
  08. fitText plugin
  09. Slick plugin
  10. Jquery.matchHeight Plugin
  11. Skills
  12. Scroll
  13. Form Validation

  ======================================*/


  var $grid = $('.grid'),
  $blogGrid = $('.blog-grid');


  $(window).on('load', function () {

    /*--------------------------------
    01. Preloader
    ----------------------------------*/
    setTimeout(function(){
      $('.startLoad').fadeOut('slow');
    }, 600);


    /*--------------------------------
    02. Isotope Plugin
    ----------------------------------*/
    if ( $grid.length ) {

      $grid.isotope({
        // options...
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
          // use element for option
          columnWidth: '.grid-item:first-of-type'
        }
      });
    }


  });//--- window(load) ---//


  //-- filter items on button click --//
  $('.ul-filter li').on('click', function () {
    var filterValue = $(this).attr('data-filter');
    $(this).addClass('active_filter').siblings().removeClass('active_filter');
    $grid.isotope({ filter: filterValue });
  });


  /*--------------------------------
  03. Functions
  ----------------------------------*/
  var intro       = '.intro',
  page_right  = '.page-right',
  body        = 'body',
  splitlayout = '#splitlayout',
  menu__a     = '#menu a',
  home__type  ='.home_type';

  function set_height(select_element) {
    if ($(select_element).length){
      $(select_element).height($(window).height());
    }
  }
  set_height(".full-height");

  function mob_menu_toggle(){
    $(".mob-menu .navbar-toggle").toggleClass("collapsed");
    $('.mob-menu-overlay').fadeToggle();
    $('.side-right').toggleClass('right-zero');
  }


  /*--------------------------------
  04. Menu
  ----------------------------------*/

  $('.mob-menu .navbar-toggle,.mob-menu-overlay').on('click', function (){
    mob_menu_toggle();
  });

  if($(".big_menu .home__menu").length){
    var menuItemInnerHtml = '<a href="#home"><svg viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><path id="arrow-right-2" d="M37.333 10.667q1.125 0 1.896 0.771l18.667 18.667q0.771 0.771 0.771 1.896t-0.771 1.896l-18.667 18.667q-0.771 0.771-1.896 0.771-1.146 0-1.906-0.76t-0.76-1.906q0-1.125 0.771-1.896l14.125-14.104h-41.563q-1.104 0-1.885-0.781t-0.781-1.885 0.781-1.885 1.885-0.781h41.563l-14.125-14.104q-0.771-0.771-0.771-1.896 0-1.146 0.76-1.906t1.906-0.76z"></path></svg></a>';
    $(body).addClass("home___menu");
    $(".menu_list").prepend('<li><span class="home-item">'+menuItemInnerHtml+'</span></li>');
    $('.menu_list span:not(.home-item) a[href="#home"]').addClass("hide");
  }

  $(".big_menu .menu_list a:not(.home-item)").each(function () {
    $(this).attr("data-hover", $(this).text());
  })


  /*--------------------------------
  05. Window Resize
  ----------------------------------*/
  $(window).on("resize", function () {
    set_height(".full-height");
  });


  /*--------------------------------
  06. MagnifPopup Plugin
  ----------------------------------*/
  var my_img = '.my_img',
  magnifPopup = function () {

    $(my_img).magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-with-zoom',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: false,
        duration: 300,
        easing: 'ease-in-out',
        opener: function (openerElement) {
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });

  };
  if( $(my_img).length ){
    magnifPopup();
  }

  $('.info .image_overlay').on("click", function () {
    $(this).parents(".project_content").find(my_img).trigger("click");
  });

  $('.video-popup').magnificPopup({
    type: 'iframe'
  });

  //Ajax Popup
  var contentDiv = '<div></div>',
  ajax_url = $("div.portfolio_sec").data("data-url"),
  singleAjaxContent = ".mfp-wrap.portfolioAjaxContent";
  contentDiv = $(contentDiv).addClass('mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready portfolioAjaxContent');

  $('.ajax_popup').on('click', function (event) {

    event.preventDefault();
    var post_url = $(this).attr("href");

    //Ajax request
    $(contentDiv).load(post_url+" #project__content", function() {

      $(contentDiv).imagesLoaded( function() {
        $(contentDiv).find('#project__content').append('<button title="Close (Esc)" type="button" class="mfp-close close_single">×</button>');
        $(contentDiv).find('#project__content').wrapInner('<div class="display-table"><div class="display-table-cell"></div></div>');
        $(contentDiv).find('#project__content').wrap('<div class="mfp-content"></div>');
        $(contentDiv).find('.mfp-content').wrap('<div class="mfp-container mfp-inline-holder"></div>');
        $(contentDiv).find('.scroll__content').wrapInner('<div class="container"></div>');
        $(body).append(contentDiv);

        /*slider*/
        $('.carousel').carousel({
          interval: 5000
        });
        // Enable Carousel Indicators
        $(".carousel-indicators li").on('click', function() {
          $(".carousel").carousel($(this).data("slide-to"));
        });

        // Enable Carousel Controls
        $(".left.carousel-control").on('click', function(){
          $(".carousel").carousel("prev");
        });
        $(".right.carousel-control").on('click', function(){
          $(".carousel").carousel("next");
        });

        $('.close_single').on('click', function (event) {
          $(singleAjaxContent).addClass('mfp-removing');
          setTimeout(
            function()
            {
              $(singleAjaxContent).removeClass('mfp-removing').remove();
            }, 400);
          });

        });

      });

    });


    /*--------------------------------
    07. Type Plugin
    ----------------------------------*/
    var type_d = "#typed";

    if ( $(type_d).length ){
      var typed = new Typed(type_d, {
        stringsElement: '#typed-strings',
        typeSpeed: 40,
        backSpeed: 0,
        backDelay: 1500,
        startDelay: 1000,
        fadeOut: false,
        loop: true
      });
    }


    /*----------------------------------------------
    08. fitText plugin
    -----------------------------------------------*/
    function fitMyText(){
      var fit__text = $(".fit__text");
      if ( fit__text.length !== 0 ){
        fit__text.each(function() {
          var myFontSize = $(this).css('fontSize');
          myFontSize = myFontSize.replace(/px/i,"");
          fit__text.fitText(1, { maxFontSize: myFontSize });
        });
      }
    }
    fitMyText();


    /*--------------------------------
    09. Slick plugin
    ----------------------------------*/
    if ( $("body").data( 'owl_slick' ) == null){

      var owl_slick = '.owl';
      $(owl_slick).slick({
        infinite: false,
        slidesToShow: 2,
        arrows: false,
        responsive:
        [{
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        }]
      });
      $('body').data( 'owl_slick', 'active' );

      $('.prev-testi').on("click", function () {
        $(owl_slick).slick('slickPrev');
      });

      $('.next-testi').on("click", function () {
        $(owl_slick).slick('slickNext');
      });

    }


    /*--------------------------------
    10. Jquery.matchHeight Plugin
    ----------------------------------*/
    $(".matchH").matchHeight();


    /*--------------------------------
    11. Skills
    ----------------------------------*/
    $(".skills .percentage").each(function() {
      var percentage = $(this).text();
      $(this).parent().find(".progress_bar").width(percentage);
    });


    /*--------------------------------
    12. Scroll
    ----------------------------------*/
    var $pt__page = $(".pt-perspective section.pt-page");
    if($pt__page.length){
      $pt__page.parents(".pt-perspective").addClass('overFlowHidden');
      $pt__page.each(function(){
        $(this).wrapInner('<div class="scroll___content"></div>');
      });
    }

    /*--------------------------------
    13. Form Validation
    ----------------------------------*/
    $('.contact form .submit').on('click', function () {

      $('.contact form .form-control').removeClass("errorForm");
      $('.msg_success,.msg_error').css("display","");

      var error = false,
      name = $('.contact form input[type="text"]');

      if (name.val() === "" || name.val() === " ") {
        error = true;
        $(name).addClass("errorForm");
      }

      var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
      email = $('.contact form input[type="email"]');

      if (email.val() === "" || email.val() === " ") {
        $(email).addClass("errorForm");
        error = true;
      } else if (!email_compare.test(email.val())) {
        $(email).addClass("errorForm");
        error = true;
      }

      var msg = $('.contact form textarea');

      if (msg.val() === "" || msg.val() === " ") {
        error = true;
        $(msg).addClass("errorForm");

      }

      if (error === true) {
        return false;
      }

      var data_string = $('.contact form').serializeJSON();

      fetch($('.contact form').attr('action'), {
        method: 'POST',
        body: data_string,
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: "error"
      })
      .then(function(response){
        return response.json();
      })
      .then(function(jsonResponse){
        if(jsonResponse.error){
          $('.msg_error').fadeIn('slow');
        } else {
          $('.msg_success').fadeIn('slow');
        }
        console.log(jsonResponse);
      })
      .catch(function(error) {
        $('.msg_error').fadeIn('slow');
      });

      return false;

    });


    /*--------------------------------
    14. Google Map
    ----------------------------------*/
    var map = null;

    function googleMap(selector, lat, lng) {
      var myLatlng = new google.maps.LatLng(lat, lng);
      if (!map) {
        var myOptions = {
          zoom: 10,
          center: myLatlng,
          scrollwheel:false,
          mapTypeControl:false,
          streetViewControl:false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
        };
        map = new google.maps.Map(document.getElementById(selector), myOptions);

        var marker = new google.maps.Marker({
          position:myLatlng,
          icon: 'assets/images/map-marker.png'
        });
        marker.setMap(map);

      } else {
        map.setCenter(myLatlng);
      }

    }

    if ($(".contact #map").length !== 0){

      $(".contact #map").show();
      googleMap("map", 9.979875, -84.199970);

    }



  });
