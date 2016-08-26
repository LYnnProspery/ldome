define(['jquery'], function($) {
	var footerControl = function() {
		$('.contact-link').on('click', function() {
			$('#aboutModal').modal();
		});
	};
	return {
		footerControl: footerControl
	};
});