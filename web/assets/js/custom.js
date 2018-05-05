(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.7";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(function(){
    $('.btn-anchor').click(function(){
		$('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top}, 750);
		return false;
	});
});

autoPlayYouTubeModal();

  //FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
  function autoPlayYouTubeModal() {
      var trigger = $("body").find('[data-toggle="modal"]');
      trigger.click(function () {
          var theModal = $(this).data("target"),
              videoSRC = $(this).attr("data-theVideo"),
              videoSRCauto = videoSRC + "?autoplay=1";
          $(theModal + ' iframe').attr('src', videoSRCauto);
          $(theModal + ' button.close').click(function () {
              $(theModal + ' iframe').attr('src', videoSRC);
          });
      });
  }

$(document).ready(function(){
    $('.modal').each(function(){
        var src = $(this).find('iframe').attr('src');
        $(this).on('click', function(){
            $(this).find('iframe').attr('src', '');
            $(this).find('iframe').attr('src', src);
        });
    });
});

$('.slider-center').slick({
    centerMode: true,
    centerPadding: '220px',
    slidesToShow: 1,
    focusOnSelect: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                centerMode: false,
                centerPadding: '0',
                slidesToShow: 1
            }
        }
    ]
});

$('.slider-single').slick();

var item_length = $('#hero-slider > div').length - 1;
var now = 0;
$(document).ready(function() {
    $('#hero-slider').on('init', function(e, slick) {
        var $firstAnimatingElements = $('div.hero-slide:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);
    });
    $('#hero-slider').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
              var $animatingElements = $('div.hero-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
              doAnimations($animatingElements);
    });
    var slider = $('#hero-slider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        fade: true,
        infinite: false,
        pauseOnFocus: false,
        pauseOnHover: false,
    });
    $('#hero-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        now++;
        if (now == item_length) {
          init();
        }
        if( item_length === slider.slick('slickCurrentSlide') ){
            slider.slickSetOption("autoplay",false,false)
        };
    });
    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
        });
    }
});

$('a[data-slide]').click(function(e) {
   e.preventDefault();
   var slideno = $(this).data('slide');
   $('#hero-slider').slick('slickGoTo', slideno - 1);
 });


/** index animetion **/
$('.btn-skip').click(function(){
  init();
})

var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
function init() {
  canvas = document.getElementById("canvas");
  anim_container = document.getElementById("animation_container");
  dom_overlay_container = document.getElementById("dom_overlay_container");
  var comp=AdobeAn.getComposition("84BDD7F1DBB41B42A1EE24C5335C76E8");
  var lib=comp.getLibrary();
  handleComplete({},comp);
}
function handleComplete(evt,comp) {
  //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
  var lib=comp.getLibrary();
  var ss=comp.getSpriteSheet();
  exportRoot = new lib.anititle();
  stage = new lib.Stage(canvas);
  stage.enableMouseOver();
  //Registers the "tick" event listener.
  fnStartAnimation = function() {
    stage.addChild(exportRoot);
    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener("tick", stage);
  }
  //Code to support hidpi screens and responsive scaling.
  function makeResponsive(isResp, respDim, isScale, scaleType) {
    var lastW, lastH, lastS=1;
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    function resizeCanvas() {
      var w = lib.properties.width, h = lib.properties.height;
      var iw = $('#animation_container').width(), ih=window.innerHeight;
      var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;
      if(isResp) {
        if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {
          sRatio = lastS;
        }
        else if(!isScale) {
          if(iw<w || ih<h)
            sRatio = Math.min(xRatio, yRatio);
        }
        else if(scaleType==1) {
          sRatio = Math.min(xRatio, yRatio);
        }
        else if(scaleType==2) {
          sRatio = Math.max(xRatio, yRatio);
        }
      }
      canvas.width = w*pRatio*sRatio;
      canvas.height = h*pRatio*sRatio;
      canvas.style.width = dom_overlay_container.style.width =  w*sRatio+'px';
      canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h*sRatio+'px';
      stage.scaleX = pRatio*sRatio;
      stage.scaleY = pRatio*sRatio;
      lastW = iw; lastH = ih; lastS = sRatio;
      stage.tickOnUpdate = false;
      stage.update();
      stage.tickOnUpdate = true;
    }
  }
  makeResponsive(true,'both',true,1);
  AdobeAn.compositionLoaded(lib.properties.id);
  fnStartAnimation();
}
