const { compute, get, post } = require('./adpreq');

const getUrl = "https://interview.adpeai.com/api/v1/get-task";
const postUrl = "https://interview.adpeai.com/api/v1/submit-task";

// GET calculation request
get(getUrl, function(data){
	// calculate result
	let dataResult = compute(data);
	
	// POST calculation result
	post(postUrl, dataResult)
		.then(value => { console.log(value) })
		.catch(error => { console.error(error) });
});


