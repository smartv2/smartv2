$.fn.drag = function(opts) {
	var options = {
		'opacity': null,
		'mousedownCallback': null,
		'mouseupCallback': null,
		'mousemoveCallback': null,
		'z-index': 999
	};
	if (opts) $.extend(options, opts);

	var start = {
		x: 0,
		y: 0,
		left: 0,
		top: 0,
		style: {
			"position": null,
			"top": null,
			"left": null,
			"opacity": null,
			"z-index": null
		}
	};

	var saveStyle = function(ele) {
		for (var key in start.style) {
			start.style[key] = ele.style[key];
		}
	};
	var dumpStyle = function(ele) {
		for (var key in start.style) {
			ele.style[key] = start.style[key];
		}
	};

	var in_drag = false;

	var clone = null;

	$(this).on('mousedown.drag', function(e) {
		e.preventDefault();
		e.stopPropagation();

		start.x = e.pageX;
		start.y = e.pageY;
		start.left = $(this).offset().left;
		start.top = $(this).offset().top;
		
		clone = $(this).clone();
		clone.css('position', 'absolute');
		clone.css('top', start.top + 'px');
		clone.css('left', start.left + 'px');
		if (typeof options.opacity === "number") clone.css('opacity', options.opacity);
		clone.appendTo("body");

		in_drag = true;

		if (typeof options.mousedownCallback === "function")
			options.mousedownCallback(e);
	});

	$(document).on('mousemove.drag', function(e) {
		if (in_drag) {
			e.preventDefault();
			e.stopPropagation();
			offsetX = e.pageX - start.x;
			offsetY = e.pageY - start.y;
			clone.css('z-index', options['z-index']);
			clone.css('top', (start.top + offsetY) + 'px');
			clone.css('left', (start.left + offsetX) + 'px');
			if (typeof options.mousemoveCallback === "function")
				options.mousemoveCallback(e);
		}
	});

	$(document).on('mouseup.drag', function(e) {
		if (in_drag) {
			e.preventDefault();
			e.stopPropagation();

			in_drag = false;
			clone.animate({
				top: start.top + 'px',
				left: start.left + 'px'
			}, 200, function() {
				clone.remove();
			});
	
			if (typeof options.mouseupCallback === "function")
				options.mouseupCallback(e);
		}
	})
}