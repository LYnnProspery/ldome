define(['jquery'], function($) {
	var searchControl = function() {
		$('.glyphicon-search').on('click', function() {
			var target = $('#search').val();
			window.open('/movie/search/result?keyword=' + target + '&page=1');
		});

		$('#search').on('keypress', function(event) {
			if(event.which === 13) {
				var target = $('#search').val();
				window.open('/movie/search/result?keyword=' + target + '&page=1');
			}
		});
	};
	return {
		searchControl: searchControl
	};
});