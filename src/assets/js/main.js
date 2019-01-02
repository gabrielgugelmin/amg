$(function(){
	clickOutsideMenu();

  // MENU
  $('.js-open-menu').on('click', function(e) {
    e.preventDefault();
    openMenu();
  });

  $('.js-close-menu').on('click', function(e) {
    e.preventDefault();
    closeMenu();
  });

	// menu fixo ao scollar
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 30) {
      $('.nav').addClass('nav--scrolling');
      $('.nav__logo .logo').removeClass('logo--white');
    } else{
    	$('.nav').removeClass('nav--scrolling');
    	$('.nav__logo .logo').addClass('logo--white');
    }
  });

  // MAPS

  /* function initialize() {

      var chicago = new google.maps.LatLng(-19.890709, -43.920771);
      var myOptions = {
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: chicago,
          mapTypeControl: false,
          scrollwheel: false
      };
      map = new google.maps.Map(document.getElementById("map"), myOptions);

      markerMuseu = new google.maps.Marker({
        position: new google.maps.LatLng(-19.890709, -43.920771),
        map: map,
        title: 'Museu do Automóvel'
      });

      markerMuseu.addListener('click', function() {
        infowindow.open(map, markerMuseu);
      });
  }

  initialize(); */


  // SCROLLBAR
  //$('.js-scrollbar').perfectScrollbar();

  // SMOOTH SCROLL
  $('.js-scroll').on('click', function(event) {
    smoothScroll();
  });

});

function closeMenu() {
  $('.menu').removeClass('menu--open');
  $('.js-trigger-menu').removeClass('menu-icon--open');
  $('.menu__item').removeClass('menu__item--is-selected');
  $('body').removeClass('overflow-hidden');
}

function openMenu() {
  $('.js-trigger-menu').addClass('menu-icon--open');
  $('.menu').addClass('menu--open');
  $('body').addClass('overflow-hidden');
}

function viewport() {
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
      a = 'client';
      e = document.documentElement || document.body;
  }
  return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function checkWindowWidth() {
  var w = viewport().width;
  var size = '';
  if(w > 991){
    size = 'desktop';
  } else{
    size = 'mobile';
  }

  return size;
}

function clickOutsideMenu() {
  $(document).on('mouseup', function(e) {
    var elem = $('.menu');

    if (!elem.is(e.target) && elem.has(e.target).length === 0) {
      closeMenu();
    }
  });
}

function smoothScroll() {
	if (this.hash !== '') {
		event.preventDefault();
		var hash = this.hash;

		$('html, body').animate({
			scrollTop: $(hash).offset().top - 100
		}, 800, function(){

			// Add hash (#) to URL when done scrolling (default click behavior)
			//window.location.hash = hash;
		});
	}
}