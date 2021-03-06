var  Web3 = require('web3');
var  http = require('http');


function start(){

	function onRequest(request,response){
	}//end of onRequest

	//the stuff here has to to with monitoring the ethereum block chain

	console.log("onRequest running");
	var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
	var coinbase = web3.eth.coinbase;
	var accounts = web3.eth.accounts;
	//console.log(coinbase);

	//an ethereum contract ABI
	var factoryABI = [{
		    constant: false,
		    inputs: [],
		    name: "makeContract",
		    outputs: [],
		    type: "function"
		}, {
		    constant: false,
		    inputs: [{
			name: "id",
			type: "uint256"
		    }, {
			name: "key",
			type: "string"
		    }, {
			name: "value",
			type: "string"
		    }],
		    name: "updateContract",
		    outputs: [],
		    type: "function"
		}, {
		    constant: false,
		    inputs: [{
			name: "id",
			type: "uint256"
		    }],
		    name: "getUpdates",
		    outputs: [{
			name: "info",
			type: "string"
		    }],
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



	console.log("Ethereum monitoring 2 started!!");


	//next we create an instance of that contract
        //where here we have to give as input the address of the contract
        //as that was mined
	var factory = web3.eth.contract(factoryABI).at('0x24842227e502b892ad09e17dd4a6d07454d9141b');

	//this works fineto send a transaction to the blockchain!!
	//factory.makeContract.sendTransaction({from:accounts[0],gas:30000});

	console.log("the address of the factory contract is  " + factory.address);
	console.log("Sending a transaction  ");
	factory.makeContract.sendTransaction({from:accounts[0],gas:3000000});

	/*factory.dtdCreated({},function(error,result){
				console.log("hmmmm2");
			if(!error){
				var msg = "dtd created! " + result.blockNumber 
						+ " the id of the dtd is "+ result.args.id;
				console.log(msg);
			}else console.log("error in factoryinst");
		});

	var event = factory.allEvents().watch({}, '');
	// or use conference.Deposit() or .Refund()
    	event.watch(function (error, result) { 
      		if (error) {
        		console.log("Error: " + error);
      		} else {
        		console.log("Event: " + result.event);
    		}
	}); */
	


}
start();
