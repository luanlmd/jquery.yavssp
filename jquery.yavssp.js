jQuery.fn.yavssp = function(options)
{
	if(options == undefined) { options = []; }
	$(this).find("> *:not(:first)").hide();
	
	var interval = null;
	
	// Start the interval
	function start(that)
	{
		console.log('started');
		interval = setInterval(function() {
			console.log('tick');
			atual = $(that).find("> *:visible"); 
			next = atual.next();

            if (next.length == 0)
            {
                next = $(that).find("> *:first");
            }
            atual.hide();
            next.show();
		}, 1000);
	}
	
	// Stop the interval
	$(this).mouseover(function() {
		console.log('stopped');
        clearTimeout(interval);
    });

	// Restart the interval
    $(this).mouseout(function() {
        start(this);
    });
	
	// Auto start at page load
	console.log('starting');
	start(this);
};
