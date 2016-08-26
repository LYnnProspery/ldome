define(['jquery'], function($) {
	var categoryControl = function() {
		if ($('#hasCategory').length > 0) {
			$('input[type="radio"]').each(function(index, item) {
				if ($(item).val() === $('#hasCategory').attr('data-category')) {
					$(item).prop('checked', true);
				}
			});
			$('input[type="radio"]').attr('disabled', true);
		}
	};

	return {
		categoryControl: categoryControl
	};
});