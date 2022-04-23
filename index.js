const { compute, get, post } = require('./adpreq');

const getUrl = "https://interview.adpeai.com/api/v1/get-task";
const postUrl = "https://interview.adpeai.com/api/v1/submit-task";

get(getUrl, function(data){
	let dataResult = compute(data);
	
	post(postUrl, dataResult)
		.then(value => { console.log(value) })
		.catch(error => { console.error(error) });
});


