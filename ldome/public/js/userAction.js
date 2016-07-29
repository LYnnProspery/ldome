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
		var boxHeight = 170;
		if(top >= boxHeight) {
			$('nav').addClass('scroll');
			$('.brand').addClass('brand-scroll');
			$('.nav-login-box').addClass('brand-scroll');
		} else {
			$('nav').removeClass('scroll');
			$('.brand').removeClass('brand-scroll');
			$('.nav-login-box').removeClass('brand-scroll');
		}
	});

	$('.about').on('click', function() {
		$('#aboutModal').modal();
	});

	$('.brand').on('click', function() {
		window.open('/');
	});

	var timer = null;
	var oUserBox = $('.user-info');
	$('#username').on('mouseenter', function() {
		clearTimeout(timer);
		//oUserBox.css('display', 'block');

		oUserBox.addClass('user-active');
		//$('.user-info').addClass('user-active');
	});

	$('#username').on('mouseleave', function() {
		timer = setTimeout(function() {
			oUserBox.removeClass('user-active');
			// setTimeout(function() {
			// 	oUserBox.css('display', 'none');
			// });
		}, 300);
	});

	$('.user-info-box').on('mouseenter', function() {
		clearTimeout(timer);
		//$('.user-info').addClass('user-active');
		oUserBox.addClass('user-active');
	});

	$('.user-info-box').on('mouseleave', function() {
			oUserBox.removeClass('user-active');
	});

	$('#userBoxLogout').on('click', function() {
		window.open('/user/logout', '_self');
	});

	$('#userSelf').on('click', function(event) {
		var id = $(this).attr('user-id');
		window.open('/userinfo/' + id);
	});

	$('#backToIndex').on('click', function() {
		window.open('/', '_self');
	});

	$('#hideInput').on('change', function() {
		var files = this.files[0];
		var fr = new FileReader();
		fr.onload = function(event) {
			var src = event.target.result;
			console.log(src);
			$.ajax({
				type: 'POST',
				data: {
					imgdata: src
				},
				url: '/user/upload',
				success: function(res) {
					if(res.state === 1) {
						alert('更换头像成功！');
						location.reload();
					} else {
						alert('上传失败，请稍后再试');
					}
				},
				error: function(err) {
					console.log(err);
				}
			});
			
		};
		fr.readAsDataURL(files);
	});

	$('#setUserIcon').on('click', function() {
		$('#hideInput').click();
	});

});
