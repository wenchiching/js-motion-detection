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
	var switcher = [];
	var delay1 = false;
	var delay2 = false;
	var actions = [];
	var order = 0;
	var success=-1;
	// examples for id usage
	$('#zero').on('motion', function(){
		// prevent from trigger too many times
		if(switcher[0] == true){
			return;
		}
		switcher[0] = true;
		actions[order++] = "0";
		setTimeout(function(){ switcher[0] = false; }, 2000);
		checkActions();
	});

	$('#one').on('motion', function(){
		// prevent from trigger too many times
		if(switcher[1] == true){
			return;
		}
		switcher[1] = true;
		actions[order++] = "1";
		setTimeout(function(){ switcher[1] = false; }, 2000);
		checkActions();
	});

	$('#two').on('motion', function(){
		// prevent from trigger too many times
		if(switcher[2] == true){
			return;
		}
		switcher[2] = true;
		actions[order++] = "2";
		setTimeout(function(){ switcher[2] = false; }, 2000);
		checkActions();
	});

	function checkActions() {
		if (actions.length == 3){
			var slider = $('#slider');
			var content = $('#content');
			if ( actions[0] == '0' && actions[1] == '1' && actions[2] == '2' ){
				success++;
				console.log('Success:'+success);
				success = checkBoundry(success);
				slider.animate({scrollLeft: content.width()*success}, 800);
			}
			if ( actions[0] == '2' && actions[1] == '1' && actions[2] == '0' ){
				success--;
				console.log('Success:'+success);
				success = checkBoundry(success);
				slider.animate({scrollLeft: content.width()*success}, 800);
			}
			clearActions();
		}
	}

	function checkBoundry(success) {
		return success;
	}

	function clearActions() {
		actions.length = 0;
		switcher = [];
		order = 0;
	}

})();
