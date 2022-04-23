const https = require("https");

// perform requested calculation
exports.compute = function(data){
	// get properties from json object
	const jsonData = JSON.parse(data);
	const dataId = jsonData.id;
	const dataOp = jsonData.operation;
	const dataLeft = jsonData.left;
	const dataRight = jsonData.right;
		
	// calculate result depending on operation and numbers
	let dataResult = 0;
	if (dataOp === "addition"){
		dataResult = dataLeft + dataRight;
	} else if (dataOp === "subtraction"){
		dataResult = dataLeft - dataRight;	
	} else if (dataOp === "multiplication"){
		dataResult = dataLeft * dataRight;
	} else if (dataOp === "division"){
		dataResult = dataLeft / dataRight;
	} else if (dataOp === "remainder"){
		dataResult = dataLeft % dataRight;
	}
	
	// return result to submit
	return {
		id: dataId,
		result: dataResult
	};
};

// get request for calculation to perform
exports.get = function(url, callback) {
	https.get(url, function (result) {
		let dataQueue = "";    
		result.on("data", (dataBuffer) => dataQueue += dataBuffer);
		result.on("end", () => callback(dataQueue));
	});
};

// post calculation result to submit
exports.post = function(url, data) {
	// options and request body
	const dataString = JSON.stringify(data)
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': dataString.length,
		}
	};

	// promise for post
	return new Promise((resolve, reject) => {
		// request POST to submit
		const req = https.request(url, options, (res) => {
			if (res.statusCode == 200){ // OK
				resolve("Success");
			} else if (res.statusCode == 400){ // bad request 
				reject(new Error("Incorrect value in result; no ID specified; value is invalid"));
			} else if (res.statusCode == 404){ // ID not found
				reject(new Error("ID cannot be found"));
			} else { // some other status code
				reject(new Error(`HTTP status code ${res.statusCode}`))
			}
		});	

		// submit data
		req.write(dataString);
		req.end();
	});
};
