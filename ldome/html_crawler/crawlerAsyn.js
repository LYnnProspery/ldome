var eventProxy = require('eventproxy');
var superAgent = require('superagent');
var cheerio = require('cheerio');
var app = require('express')();
var url = require('url');


var cnodeUrl = 'https://cnodejs.org/';
superAgent
.get(cnodeUrl)
.end(function(err, res) {
	if(err) {
		return console.error(err);
	}

	var urls = [];
	var $ = cheerio.load(res.text);
	$('#topic_list .topic_title').each(function(index, ele) {
		urls.push({url: url.resolve(cnodeUrl, $(ele).attr('href'))});
	});
	//console.log(urls)


	urls.forEach(function(item, index) {
		//console.log(topicUrl);
		var topicUrl = item.url;
		superAgent
		.get(topicUrl)
		.end(function(err, res) {
			if(err) {
				//return console.error(err);
				return ep.emit('reply_content', '503');
			}
			var $ = cheerio.load(res.text);
			var reply = $('.reply_content').eq(0).text().trim();
			var title = $('.topic_full_title').text().trim();
			//console.log(index + ' : success : ' + reply);
			//ep.emit('reply_content', [topicUrl, reply, title]);
			item.reply = reply;
			item.title = title; 
			ep.emit('reply_content');
		});
	});

	var ep = new eventProxy();
	ep.after('reply_content', urls.length, function(topicsContent) {

		//console.log(topicsContent.length);
		// topicsContent = topicsContent.map(function(topic) {
		// 	return typeof topic == 'string' ? '503 failed' : {
		// 		title: topic[2],
		// 		href: topic[0],
		// 		reply: topic[1]
		// 	};
		// });
		console.log(urls);
		

		// app.get('/', function(req, res) {
		// 	var content = '';
		// 	topicsContent.forEach(function(ele, index) {
		// 		content += typeof ele == 'string' ? '<h3>[' + index + '] : 503 failed</h3>'  : '<h3>[' + index + '] : ' 
		// 		+ ele.title + '</h3>' + '<h4>[href] : ' + ele.href + '</h4>' + '<h4>[reply] : ' + ele.reply + '</h4>';
		// 	});
		// 	res.send(content);
		// })
		//.listen(2000);
		//.listen(process.env.PORT || 2000);
	});

	
});



