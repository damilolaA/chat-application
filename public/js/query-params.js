function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
		param = query.split('&');

	for(var i = 0; i < param.length; i++) {
		var pair = param[i].split('=');

		if(decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]).replace(/\+/g, " ");
		}
	}

	return undefined;
}

