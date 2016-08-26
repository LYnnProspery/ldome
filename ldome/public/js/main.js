requirejs.config({
	shim: {
		'bootstrap': {
	        deps: ['jquery']
	    },
	    'scrollTo': {
	    	deps: ['jquery']
	    }
	},
	paths: {
		jquery: '/frames/jquery-1.12.3.min',
		bootstrap: '/frames/bootstrap/js/bootstrap.min',
		scrollTo: '/frames/jquery.scrollTo.min'
	}
});

requirejs(['jquery', 'bootstrap', 'adminList', 'categoryController', 'commentController', 'footerController', 'index-scroll', 'searchController', 'userAction', 'scrollTo'], 
	function($, bootstrap, adminList, categoryController, commentController, footerController, indexScroll, searchController, userAction) {
		adminList.adminListAction();
		categoryController.categoryControl();
		commentController.commentControl();
		footerController.footerControl();
		indexScroll.indexScroll();
		searchController.searchControl();
		userAction.userActionControl();
});