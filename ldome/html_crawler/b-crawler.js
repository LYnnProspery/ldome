//url 为 排行榜url

var superAgent = require('superagent');
var eventProxy = require('eventproxy');
var cheerio = require('cheerio');
var express = require('express');
var url = require('url');
var fs = require('fs');
var app = express();


// superAgent
// 	.get('http://www.bilibili.com/video/av5151421/')
// 	.end(function(err, res) {
// 		var $ = cheerio.load(res.text);
// 		// console.log(res.text);
// 		// console.log($('.player').length);
// 		// console.log($('object').length);
// 		// var flashSrc = $('#player_placeholder').falshvars;
// 		// console.log($('param').length)
// 		// var detail = $('#v_desc').text().trim();
// 		// console.log(flashSrc);
// 		// console.log(detail);
// 		console.log($('meta[itemprop="embedURL"]').attr('content'));
// 	});





var resource = process.env.SRC;

var stream = fs.createReadStream(resource);
var html = '';
var bUrl = 'http://www.bilibili.com/';
stream.on('data', function(chunk) {
	html += chunk;
});	

stream.on('end', function() {
	getBili(html);
});
function getBili(html) {
		var number = 0;
		var aVideos = [];
		var $ = cheerio.load(html);
		//console.log($('.rank-item').length);
		$('#rank_list li .rank-item').each(function(index, item) {
			//var href = item.find('a').eq(0).attr('href');
			//console.log(item);
			var href = url.resolve(bUrl, $(item).find('a').eq(0).attr('href'));
			var title = $(item).find('.title').text().trim();
			var author = $(item).find('.author').text().trim();


			//判读是否有data-img 如果无则 src
			//var imgSrc = $(item).find('.preview img').attr('data-img');
			var imgInfo = $(item).find('.preview img');
			var imgSrc = '';
			if (imgInfo.attr('data-img') === '') {
				imgSrc = imgInfo.attr('src');
			} else {
				imgSrc = imgInfo.attr('data-img');
			}

			aVideos.push({
				author: author,
				title: title,
				href: href,
				imgSrc: imgSrc
			});
		});
		//console.log(aVideos);
		var ep = new eventProxy();
		aVideos.forEach(function(item, index) {
			var innerHref = item.href;
			superAgent
				.get(innerHref)
				.end(function(err, res) {
					if(err) {
						console.log('fetch inner err: ' + err);
						item.flashSrc = '503';
						item.detail = '503';
						ep.emit('done');
					}
					var $ = cheerio.load(res.text);
					//var flashSrc = $('.player').attr('data');
					var flashSrc = $('meta[itemprop="embedURL"]').attr('content');
					var detail = $('#v_desc').text().trim();

					item.flashSrc = flashSrc;
					item.detail = detail;
					ep.emit('done');
				});
		});

		ep.after('done', aVideos.length, function() {
			console.log(aVideos);
		});
}




