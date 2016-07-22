$(function() {
	$('.del').on('click', function() {
		if(!confirm('确定要抛弃我了嘛(┙>∧<)┙へ┻┻')) {
			return false;
		}

		var id = $(this).attr('data-id');
		console.log(id);
		$.ajax({
			type: 'DELETE',
			url: '/adminList?id=' + id,
			success: function(res) {
				console.log('res: ' + res);
				if(res.state === 1) {
					$('.item-id-' + id).remove();
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
	});
});