jQuery.fn.yavssp = function(options)
{
	var options = options || []
	var pause = options['pause'] || 5000;
	var speed = options['speed'] || 500;
	var stopOver = options['stopOver'] || '#' + $(this).attr('id');
	var onStart = options['onStart'] || function() {};
	var onChange = options['onChange'] || function() {};
	var onStop = options['onStop'] || function() {};
	
	var holder = $(this);
	
	console.log(stopOver);
	
	$(this).find("> *").css({'position':'absolute'});
	$(this).find("> *:not(:first)").hide();
	
	var interval = null;
	
	// Start the interval
	function start()
	{
		onStart();
		console.log('started');
		interval = setInterval(function() {
			console.log('tick');
			atual = $(holder).find("> *:visible"); 
			next = atual.next();

            if (next.length == 0)
            {
                next = $(holder).find("> *:first");
            }
            atual.slideUp(speed);
            next.slideDown(speed);
            onChange(next.attr('id'));
		}, pause);
	}
	
	// Stop the interval
	$(stopOver).mouseover(function() {
		console.log('stopped');
        clearTimeout(interval);
        onStop();
    });

	// Restart the interval
    $(stopOver).mouseout(function() {
        start();
    });
	
	// Auto start at page load
	console.log('starting');
	start(this);
};
