var  Web3 = require('web3');
var  http = require('http');



function start(){

	function onRequest(request,response){
		//this should be implemented to manage http requests
		console.log("onRequest running");
	}//end of onRequest

	http.createServer(onRequest).listen(8888);

	//the stuff here has to to do with monitoring the ethereum block chain

	
	var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
	var coinbase = web3.eth.coinbase;
	var accounts = web3.eth.accounts;
	console.log(coinbase);

		//an ethereum contract ABI
	var factoryABI = [{
			    constant: false,
			    inputs: [],
			    name: "makeContract",
			    outputs: [],
			    type: "function"
        	       }, {
			    constant: false,
			    inputs: [{ name: "id",type: "uint256"}, 
				     {name: "key",type: "string"}, {name: "value",type: "string"
				     }],
			    name: "updateContract",
			    outputs: [],
			    type: "function"
		       }, {
			    constant: false,
			    inputs: [{name: "id",type: "uint256"}],
			    name: "getUpdates",
			    outputs: [{name: "info",type: "string"}],
			    type: "function"
		       }, {
			    inputs: [],
			    type: "constructor"
                       }, {
			    anonymous: false,
			    inputs: [{
				indexed: false,
				name: "id",
				type: "uint256"
		       }, {
				indexed: false,
				name: "addr",
				type: "address"
			    }],
			    name: "dtdCreated",
			    type: "event"
		        }, {
			    anonymous: false,
			    inputs: [{
				indexed: false,
				name: "id",
				type: "uint256"
			    }],
			    name: "dtdUpdated",
			    type: "event"
			}];



	console.log(accounts);
	console.log("Ethereum monitoring node.js server started!!");


	//next we create an instance of that contract
        //where here we have to give as input the address of the contract
        //as that was mined
	var factory = web3.eth.contract(factoryABI).at('0x24842227e502b892ad09e17dd4a6d07454d9141b');
	console.log("The address of the contract is "  + factory.address);

	//this works fineto send a transaction to the blockchain!!
	// you need to supply enought gas when making the call in geth!!!!!!!!!!!!!!!
	factory.makeContract.sendTransaction({from:accounts[0],gas:3000000});

	console.log("the address of the factory contract is  " + factory.address);

	/**
		using this callback whenever the event is fired in the block chain the code 
		in the contract is executed!
	**/
	factory.dtdCreated({},function(error,result){
					console.log("Will look for new dtd contracts created!");
					if(!error){
						var msg = "dtd created! " + result.blockNumber 
						+ " the id of the dtd is "+ result.args.id;
						console.log(msg);
					}else console.log("error in factoryinst");
				});



}

exports.start = start;
