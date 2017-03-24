function handleConsole(label, value) {
    console.log("");
    console.log("");
    console.log("<---------THIS IS CONSOLE - BEGIN: " + label + "---------->");
    console.log(value);
    console.log("<---------THIS IS CONSOLE - END: " + label + "---------->");
    console.log("");
    console.log("");
}

/* var argumentsCollection = {
	  "result" : ""
	, "data"   : {}
	, "error"  : ""
}*/
function renderData(argumentsCollection, res) {
    var result = argumentsCollection.result !== undefined ? argumentsCollection.result : false;
    var data = argumentsCollection.data !== undefined ? argumentsCollection.data : [];
    var error = argumentsCollection.error !== undefined ? argumentsCollection.error : null;

    res.send({ result: result, responsemsg: data, error: error });
}

module.exports.handleConsole = handleConsole;
module.exports.renderData = renderData;