$(function() {
	$('#brand').on('click', function() {
		window.open('/', '_self');
	});


	$('#signUpBtn').on('click', function() {
		var username = $('#signUpName').val();
		var password = $('#signUpPassword').val();

		$.ajax({
			type: 'POST',
			url: '/user/signup',
			data: {
				username: username,
				password: password
			}
		})
		.done(function(res) {
			if (res.state === 1) {
				//alert('hello' + res.user);
				$('#signupModal').modal('hide');
				location.reload();
			} else if (res.state === 0) {
				alert('the username' + res.user + ' is already in use');
			}
		});
	});

	$('#loginBtn').on('click', function() {
		var username = $('#loginName').val();
		var password = $('#loginPassword').val();

		$.ajax({
			type: 'POST',
			url: '/user/login',
			data: {
				username: username,
				password: password
			}
		})
		.done(function(res) {
			console.log('resived res: ' + res.state);
			if(res.state === 1) {
				//alert('hello' + res.user);
				$('#loginModal').modal('hide');
				location.reload();
			} else if(res.state === 0) {
				alert('username or password existed error');
			}
		});
	});

	$('.videos-wrap').on('mouseenter', function() {
		$(this).find('.video-content').stop().fadeIn(400);
	});
	$('.videos-wrap').on('mouseleave', function() {
		$(this).find('.video-content').stop().fadeOut(400);
	});

	$(window).on('scroll', function() {
		//console.log('11');
		//console.log($(window).scrollTop())
		var top = $(window).scrollTop();
		var boxHeight = $('.search-wrap img').height() - 50;
		if(top >= boxHeight) {
			$('nav').addClass('scroll');
			$('.brand').addClass('brand-scroll');
		} else {
			$('nav').removeClass('scroll');
			$('.brand').removeClass('brand-scroll');
		}
	});

	$('.about').on('click', function() {
		$('#aboutModal').modal();
	});

	$('.brand').on('click', function() {
		window.open('/');
	});
});