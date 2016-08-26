define(['jquery'], function($) {
	var commentControl = function() {
		$('.submit-comment').on('click', function() {
			var content = $('.comment-box textarea').val();
			var userId = $('#hiddenUserId').val();
			var movieInfo = $('#hiddenMovieInfo').val();
			var replyTo = $('#replyTo').val();
			var replyBase = $('#replyBase').val();

			$.ajax({
				type: 'POST',
				url: '/movie/comment',
				data: {
					theMovie: movieInfo,
					theUser: userId,
					comment: content,
					replyTo: replyTo,
					replyBase: replyBase
				}
			})
			.done(function(res) {
				if(res.state === 1) {
					location.reload();
				}
			});
		});


		//如何取消回复
		$('.reply').on('click', function() {
			var oUser = $('#username');
			if(oUser.length <= 0) {
				return alert('Please login before submit comment~');
			}
			$(window).scrollTo('#commentArea', 800, 'swing');
			$('.comment-box textarea').attr('placeholder', '回复: ');

			var replyTo = $(this).attr('reply-to');
			var replyBase = $(this).attr('reply-base');

			if ($('#replyTo').length > 0) {
				$('#replyTo').val(replyTo);
			}

			if ($('#replyBase').length > 0) {
				$('#replyTo').val(replyBase);
			}

			$('<input>').attr({
				type: 'hidden',
				name: 'replyBase',
				id: 'replyBase',
				value: replyBase
			}).appendTo('#commentArea form');

			$('<input>').attr({
				type: 'hidden',
				name: 'replyTo',
				id: 'replyTo',
				value: replyTo
			}).appendTo('#commentArea form');
		});
	};
	return {
		commentControl: commentControl
	};
});