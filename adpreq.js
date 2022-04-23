const https = require("https");

exports.compute = function(data){
	const jsonData = JSON.parse(data);
	const dataId = jsonData.id;
	const dataOp = jsonData.operation;
	const dataLeft = jsonData.left;
	const dataRight = jsonData.right;
		
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
	
	return {
		id: dataId,
		result: dataResult
	};
};

exports.get = function(url, callback) {
	https.get(url, function (result) {
		let dataQueue = "";    
		result.on("data", (dataBuffer) => dataQueue += dataBuffer);
		result.on("end", () => callback(dataQueue));
	});
};

exports.post = function(url, data) {
	const dataString = JSON.stringify(data)

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': dataString.length,
		}
	};

	return new Promise((resolve, reject) => {
		const req = https.request(url, options, (res) => {
			if (res.statusCode == 200){
				resolve("Success");
			} else if (res.statusCode == 400){
				reject(new Error("Incorrect value in result; no ID specified; value is invalid"));
			} else if (res.statusCode == 404){
				reject(new Error("ID cannot be found"));
			} else {
				reject(new Error(`HTTP status code ${res.statusCode}`))
			}
		});	

		req.write(dataString);
		req.end();
	});
};
