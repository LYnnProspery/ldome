define(['jquery'], function($) {
	var indexScroll = function() {
		if ($('#list1').length !== 0) {
			var arrLi = $('.side-nav li');
			arrLi.each(function(index, item) {
				$(item).on('click', function() {
					console.log(index);
					if(index === 7) {
						$(window).scrollTo('#backToTop', 800, 'swing');
					} else {
						$(window).scrollTo('#list' + index, 800, 'swing');
					}
				});
			});
			var arrTop = [];
			for(var i = 0; i < 7; i++) {
				arrTop[i] =  $('#list' + i).offset().top;
			}
			$(window).on('scroll', function() {
				for(var i = 0; i < 7; i++) {
					if($(window).scrollTop() >= arrTop[i] - 200) {
						arrLi.removeClass('side-active');
						arrLi.eq(i).addClass('side-active');
					}
				}
			});
		}	
	};
	return {
		indexScroll: indexScroll
	};
});