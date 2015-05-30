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

	$('#three').on('motion', function(){
		if( switcher2 == true ){
			console.log('Success');
			switcher2 = false;
			delay2 = true;
			setTimeout(function(){ delay2 = false; }, 1000);
		}
	});
})();
