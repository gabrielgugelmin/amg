$(function () {
	clickOutsideMenu();

  // menu
  $('.js-open-menu').on('click', function(e) {
    e.preventDefault();
    openMenu();
  });

  $('.js-close-menu').on('click', function(e) {
    e.preventDefault();
    closeMenu();
  });

	// menu fixo ao scrollar
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 30) {
      $('.nav').addClass('nav--scrolling');
      $('.nav__logo .logo').removeClass('logo--white');
    } else{
    	$('.nav').removeClass('nav--scrolling');
    	$('.nav__logo .logo').addClass('logo--white');
    }
  });

  // slider de depoimentos
  $('.js-depo-slider').slick({
    arrows: true,
    prevArrow: '<button type="button" class="depo__arrow depo__arrow--prev"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 54.5 95" style="enable-background:new 0 0 54.5 95;" xml:space="preserve"><g><path fill="#145f93" d="M8.7,1.5C7.7,0.5,6.5,0,5.1,0S2.5,0.6,1.5,1.5C0.5,2.5,0,3.7,0,5.1s0.5,2.6,1.5,3.6l38.9,38.8L1.5,86.3 c-1,1-1.5,2.2-1.5,3.6s0.5,2.6,1.5,3.6S3.7,95,5,95c1.2,0,2.5-0.5,3.5-1.4l46-46L8.7,1.5z"/></g></svg></button>',
    nextArrow: '<button type="button" class="depo__arrow depo__arrow--next"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 54.5 95" style="enable-background:new 0 0 54.5 95;" xml:space="preserve"><g><path fill="#145f93" d="M8.7,1.5C7.7,0.5,6.5,0,5.1,0S2.5,0.6,1.5,1.5C0.5,2.5,0,3.7,0,5.1s0.5,2.6,1.5,3.6l38.9,38.8L1.5,86.3 c-1,1-1.5,2.2-1.5,3.6s0.5,2.6,1.5,3.6S3.7,95,5,95c1.2,0,2.5-0.5,3.5-1.4l46-46L8.7,1.5z"/></g></svg></button>',
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

  if ($('.js-grid').length) {
    getProducts();
  }

  function initIsotope() {
    var qsRegex;
    var estadosFilter;
    var cidadesFilter;
    var regioesFilter;
    var bairrosFilter;

  // init Isotope
  var $container = $('.js-grid').isotope({
    itemSelector: '.autobroker__item',
    layoutMode: 'fitRows',
    filter: function () {
      var $this = $(this);
      var searchResult = qsRegex ? $this.text().match(qsRegex) : true;
      estadosResult = estadosFilter ? $this.is(estadosFilter) : true;
      cidadesResult = cidadesFilter ? $this.is(cidadesFilter) : true;
      regioesResult = regioesFilter ? $this.is(regioesFilter) : true;
      bairrosResult = bairrosFilter ? $this.is(bairrosFilter) : true;
      return searchResult && estadosResult && cidadesResult && regioesResult && bairrosResult;
    }
  });

  var initShow = 6; // Número de itens exibidos ao carregar
  var counter = initShow; // Número de itens a serem carregados quando clicar no botão Carregar Mais
  var iso = $container.data('isotope'); // Instância do Isotope
  var footer = $('.grid__footer');

  if ($container.is('#grid-autobrokers')) {
    // Inclui o botão para carregar mais itens
    footer.append('<div class="button-group"><button class="button js-load-more">carregar</button><a class="button button--gray">entrar em contato</a></div>');
  }

  // Carrega os itens iniciais
  loadMore(initShow);

  function loadMore(toShow) {
    // Oculta os itens que ultrapassaram o limite do initShow ou counter
    var elems = $container.isotope('getFilteredItemElements');
    $container.find(".hidden").removeClass("hidden");
    var hiddenElems = iso.filteredItems.slice(toShow, elems.length).map(function (item) {
      return item.element;
    });

    $(hiddenElems).addClass('hidden');
    $container.isotope('layout');

    // Se não tiver mais itens a serem carregados, oculta o botão Carregar Mais
    if (hiddenElems.length == 0 && $container.is('#grid-autobrokers')) {
	  	$('.js-load-more').attr("disabled", "disabled");
    } else {
      $('.js-load-more').removeAttr("disabled");
    };

    $('.js-load-more').removeClass('is-loading');
  }

  // Carrega mais itens
  $(".js-load-more").click(function () {
    $(this).addClass('is-loading');
    counter = counter + initShow;

    loadMore(counter);
  });

  // Filtra os itens pelo Estado
  $('#estados').on('change', function () {
    estadosFilter = this.value;
	  loadMore(1000);
    $container.isotope();
  });

  // Filtra os itens pela Cidade
  $('#cidades').on('change', function () {
    cidadesFilter = this.value;
	  loadMore(1000);
    $container.isotope();
  });

  // Filtra os itens pela Região
  $('#regioes').on('change', function () {
    regioesFilter = this.value;
	  loadMore(1000);
    $container.isotope();
  });

  // Filtra os itens pela Cidade
  $('#bairros').on('change', function () {
    bairrosFilter = this.value;
	  loadMore(1000);
    $container.isotope();
  });

  // Filtra os itens de acordo com o digitado na busca
  var $quicksearch = $('.quicksearch').keyup( debounce( function() {
    qsRegex = new RegExp($quicksearch.val(), 'gi');
    $container.isotope();
    loadMore(1000);
  }, 200));

  function debounce(fn, threshold) {
    var timeout;
    return function debounced() {
      if (timeout) {
        clearTimeout(timeout);
      }
      function delayed() {
        fn();
        timeout = null;
      }
      timeout = setTimeout(delayed, threshold || 100);
    }
  }
}

  function getProducts() {
    $.getJSON("/assets/json/autobrokers.json", function (data) {})
    .fail(function (data) {
      console.log("error");
    }).done(function (data) {
      var x = false;
      $.each(data, function (index, item) {
        if(item.id) {
          var $box = '<a class="autobroker__item ' + item.estado + ' ' + slugify(item.cidade) + ' ' + slugify(item.regiao) + ' ' + slugify(item.bairro) + '" href=\'/autobroker/'+ slugify(item.nome) +'/'+ item.id +'\'>' +
              '<div class="autobroker__img" style="background-image: url(' + item.img + ')"></div>' +
              '<div class="autobroker__content">' +
                '<small class="autobroker__cat">' + item.categoria + '</small>' +
                '<h5 class="autobroker__title">' + item.nome + '</h5>' +
                '<p class="autobroker__city">' + item.cidade + ' - ' + item.estado + '</p>' +
              '</div>' +
            '</a>';
        }
        $(".js-grid").append($box);
      });

      initIsotope();
    });
  }
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
function slugify(text) {
  text = text.replace(/^\s+|\s+$/g, ''); // trim
  text = text.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to   = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    text = text.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  text = text.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return text;
}