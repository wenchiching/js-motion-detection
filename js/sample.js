(function(){
	// consider using a debounce utility if you get too many consecutive events
	$(window).on('motion', function(ev, data){
		//console.log('detected motion at', new Date(), 'with data:', data);
		var spot = $(data.spot.el);
		spot.addClass('active');
		setTimeout(function(){
			spot.removeClass('active');
		}, 230);
	});

	$("#slider").on("scroll", function() {
		$(".slides").css({
		"background-position": $(this).scrollLeft()/6-100+ "px 0"
		});
	});

var slider = {
  
  el: {
    slider: $("#slider"),
    allSlides: $(".slide"),
    sliderNav: $(".slider-nav"),
    allNavButtons: $(".slider-nav > a")
  },
  
  timing: 800,
  slideWidth: 680, // could measure this
  
  init: function() {
    // You can either manually scroll...
    this.el.slider.on("scroll", function(event) {
      slider.moveSlidePosition(event);
    });
    // ... or click a thing
    this.el.sliderNav.on("click", "a", function(event) {
      slider.handleNavClick(event, this);
    });
  },
  
  moveSlidePosition: function(event) {
    // Magic Numbers
    this.el.allSlides.css({
      //"background-position": $(event.target).scrollLeft()/6-100+ "px 0"
    });  
  },
  
  handleNavClick: function(event, el) {
    // Don't change URL to a hash, remove if you want that
    event.preventDefault();

    // Get "1" from "#slide-1", for example
    var position = $(el).attr("href").split("-").pop();
    
    this.el.slider.animate({
      scrollLeft: position * this.slideWidth
    }, this.timing);
    
    this.changeActiveNav(el);
  },
  
  changeActiveNav: function(el) {
    // Remove active from all links
    this.el.allNavButtons.removeClass("active");
    // Add back to the one that was pressed
    $(el).addClass("active");
  }
  
};

slider.init();

	// example using a class
	$('.link').on('motion', function(ev, data){
		console.log('motion detected on a link to', data.spot.el.href);
	});
	var switcher1 = false;
	var switcher2 = false;
	var delay1 = false;
	var delay2 = false;
	// examples for id usage
	$('#one').on('motion', function(){
		if(delay1 == true || delay2 == true){
			return;
		}
		if(switcher1 == true){
			return;
		}
		switcher1 = true;
		setTimeout(function(){ switcher1 = false; }, 1000);
	});

	$('#two').on('motion', function(){
		if( switcher1 == true ){
			switcher1 = false;
			delay1 = true;
			switcher2 = true;
			setTimeout(function(){ delay1 = false; }, 1000);
		}
	});

	var success=0;
	$('#three').on('motion', function(){
		if( switcher2 == true ){
			console.log('Success'+success);
			success++;
			var slider = $('#slider');
			var content = $('#content');
			slider.animate({scrollLeft: content.width()*success}, 800)
			switcher2 = false;
			delay2 = true;
			setTimeout(function(){ delay2 = false; }, 1000);
		}
	});
})();
