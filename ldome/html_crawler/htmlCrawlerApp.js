var express = require('express');
var superAgent = require('superagent');
var cheerio = require('cheerio');
var app = express();

app.get('/', function(req, res, next) {
	superAgent.get('https://cnodejs.org/')
	.end(function(err, data) {
		if(err) {
			return next(err);
		}
		// console.log('success')
		// console.log(data);

		var $ = cheerio.load(data.text);
		var result = [];
		$('#topic_list .topic_title').each(function(index, ele) {
			var $ele = $(ele);
			//console.log($ele.attr('title'));
			result.push({
				title: $ele.attr('title'),
				href: $ele.attr('href')
			});
		});
		var content = '';
		result.forEach(function(ele, index) {
			content += '<h3>[' + index + '] : ' + ele.title + '</h3>' + '<h4>[href] : ' + ele.href + '</h4>';
		})
		console.log(content);
		res.send(content);
	});
})
.set('port', 2000);

function formatHtml() {

}
