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
