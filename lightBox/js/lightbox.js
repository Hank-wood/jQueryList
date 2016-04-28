$(function() {
	var doc = $(document),
		W=$(document).width(),
		H=$(document).height();
	//屏幕的宽高
	$('#lightbox').find('li').click(function() {
		var item = $(this);
		var img = item.find('img');
		var title = item.find('.title').html();
		$('#lightbox li.active').removeClass('active');
		item.addClass('active');
		// the large pic;
		var largeImg = new Image();
		largeImg.src = img.attr('data-large') ? img.attr('data-large') : img.attr('src');
		//首次
		if ($('.lb_backdrop').length < 1) {
			var lb_backdrop = '<div class="lb_backdrop"></div>',
				lb_canvas = '<div class="lb_canvas"></div>',
				lb_previous = '<span class="lb_previous"><</span>',
				lb_title = '<span class="lb_title"></span>',
				lb_next = '<span class="lb_next">></span>',
				lb_controls = '<div class="lb_controls">' + lb_previous + lb_title + lb_next + '</div>',
				total_bgs = lb_backdrop + lb_canvas + lb_controls;
			$('body').append(total_bgs);
		}
		//Fade in lightbox elements if they are hidden due to a previous exit
		if ($(".lb_backdrop:visible").length == 0) {
			$(".lb_backdrop, .lb_canvas, .lb_controls").fadeIn("slow");
		}
		//大图加载完成
		if (!largeImg.complete) {
			// loading gif
			$('.lb_canvas').addClass('loading').css({
				left: (W  - $('.lb_canvas').width())/ 2 + 'px',
				top: (H - $('.lb_canvas').height()) / 2 + 'px'
			});
		}
		if ($('#lightbox li.active').prev().length == 0) {
			$('.lb_previous').addClass('inactive');
		} else {
			$('.lb_previous').removeClass('inactive');
		}
		if ($('#lightbox li.active').next().length == 0) {
			$('.lb_next').addClass('inactive');
		} else {
			$('.lb_next').removeClass('inactive');
		}
		//onload
		$(largeImg).load(function() {
			var largeImg_width = largeImg.width,
				largeImg_height = largeImg.height,
				hpadding = parseInt($('.lb_canvas').css('paddingLeft')) + parseInt($('.lb_canvas').css('paddingRight')),
				vpadding = parseInt($('.lb_canvas').css('paddingTop')) + parseInt($('.lb_canvas').css('paddingBottom')),
				CL = ($(window).width() - largeImg_width - hpadding) / 2,
				CH = ($(window).height() - largeImg_height - vpadding) / 2;
			$('.lb_canvas').html('').animate({
				width: largeImg_width,
				height: largeImg_height,
				left: CL,
				top: CH
			}, 500, function() {
				var imgTag = '<img src="' + largeImg.src + '">';
				$('.lb_canvas').html(imgTag);
				$('.lb_canvas img').fadeTo('slow', 1);
				$('.lb_title').html(title);
			})

			$('.lb_canvas').removeClass('loading');
		})

	})
	//keyCode
	doc.keyup(function(e) {
		if ($(".lb_backdrop:visible").length == 1) {
			if (e.keyCode == '37') {
				navigate(-1)
			} else if (e.keyCode == '39') {
				navigate(1)
			} else if (e.keyCode == '27') {
				navigate(0)
			}
		}
	})
	// pre,next,body click 
	doc.on('click', '.lb_previous', function() {
		navigate(-1)
	});
	doc.on('click', '.lb_next', function() {
		navigate(1)
	});
	doc.on('click', '.lb_backdrop', function() {
		navigate(0)
	})

	function navigate(direction) {
		if (direction == -1) {
			$('#lightbox li.active').prev().trigger('click');
		} else if (direction == 1) {
			$('#lightbox li.active').next().trigger('click');
		} else if (direction == 0) {
			//exit
			$('#lightbox li.active').removeClass('active');
			$('.lb_canvas').removeClass('loading');
			$('.lb_canvas,.lb_backdrop,.lb_controls').fadeOut('slow', function() {
				$('.lb_title,.lb_canvas').html('');
			})
		}
	}
})