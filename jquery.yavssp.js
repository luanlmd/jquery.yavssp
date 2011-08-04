jQuery.fn.yavssp = function(options)
{
	var options = options || []
	var debug = options['debug'] || false;
	var pause = options['pause'] || 5000;
	var speed = options['speed'] || 500;
	var stopOver = options['stopOver'] || '#' + $(this).attr('id');
	var onStart = options['onStart'] || function() {};
	var onChange = options['onChange'] || function() {};
	var onStop = options['onStop'] || function() {};
	
	var holder = $(this);
	
	debug && console.log('stop over:' + stopOver);
	
	$(this).find("> *").css({'position':'absolute'});
	$(this).find("> *:not(:first)").hide();
	
	var interval = null;
	
	// Start the interval
	function start()
	{
		onStart();
		debug && console.log('started');
		interval = setInterval(function() {
			change();			
		}, pause);
	}
	
	function change(next)
	{
		atual = $(holder).find("> *:visible");
		if (next == undefined) { next = atual.next(); }
		if (next.length == 0) { next = $(holder).find("> *:first"); }
		
		atual.slideUp(speed);
		next.slideDown(speed);
		
		onChange(next.attr('id'));
	}
	
	// Stop the interval
	$(stopOver).mouseover(function(){
		debug && console.log('stopped');
        clearTimeout(interval);
        onStop();
    });

	// Restart the interval
    $(stopOver).mouseout(function() {
        start();
    });
    
	goTo = function(href)
	{
		change($(href));
	}
	
	// Auto start at page load
	start(this);
	
	return {'goTo':goTo};
};
