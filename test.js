const { compute, get, post } = require('./adpreq');

const getUrl = "https://interview.adpeai.com/api/v1/get-task";
const postUrl = "https://interview.adpeai.com/api/v1/submit-task";

function result(pass){
	return pass ? "PASS" : "FAIL";
}

get(getUrl, function(data){	
	// test GET works
	const jd = JSON.parse(data);
	let pass = (jd.id != null && jd.operation != null && jd.left != null && jd.right != null);
	console.log("Test Get (ID, Operation, Left, Right): " + result(pass));
	
	let compPlus = compute(JSON.stringify({id: "test", operation: "addition", left: 2, right: 2}));
	console.log("Test Compute Add: " + result(compPlus.result == 4));
	
	let compMinus = compute(JSON.stringify({id: "test", operation: "subtraction", left: 4, right: 1}));
	console.log("Test Compute Subtract: " + result(compMinus.result == 3));
	
	let compMult = compute(JSON.stringify({id: "test", operation: "multiplication", left: 1, right: 5}));
	console.log("Test Compute Multiply: " + result(compMult.result == 5));
	
	let compDiv = compute(JSON.stringify({id: "test", operation: "division", left: 8, right: 2}));
	console.log("Test Compute Divide: " + result(compDiv.result == 4));
	
	let compMod = compute(JSON.stringify({id: "test", operation: "remainder", left: 9, right: 7}));
	console.log("Test Compute Remainder: " + result(compMod.result == 2));
	
	let dataResult = compute(data);
	post(postUrl, dataResult)
		.then(value => { console.log("Test Post OK: " + result(value == "Success")) })
		.catch(error => { console.log("Test Post OK: FAIL") });
			
	let dataResP1 = {id:dataResult.id, result:dataResult.result+1};		
	post(postUrl, dataResP1)
		.then(value => { console.log("Test Post Wrong Result: FAIL") })
		.catch(error => { console.log("Test Post Wrong Result: " + result(error == "Error: Incorrect value in result; no ID specified; value is invalid")) });
	
	let dataIdP0 = {id:dataResult.id+"0", result:dataResult.result};
	post(postUrl, dataIdP0)
		.then(value => { console.log("Test Post Wrong ID: FAIL") })
		.catch(error => { console.log("Test Post Wrong ID: " + result(error == "Error: ID cannot be found")) });	
		
});
