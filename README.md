# ethNodeJS
A node.js node monitoring and reacting to events of an Ethereum blockchain

Specifically, this project monitors a local Ethereum (test) node. The node can be initialized using :
geth --genesis genesis_block.json --datadir ".test0" --networkid 51083 --nodiscover -maxpeers 10 --rpc  --rpccorsdomain="localhost"  --ipcpath "/home/nikos/.ethereum/geth.ipc"  console 

The flag --rpc --rpccorsdomain="localhost" is required to enable the HTTP remote protocol call, so that we can monitor the blockchain
For instructions on setting up this test node and deploying smart contracts to it, check the test_instructions.txt file

The file, testEvents.txt contains the code for depoloying DTD contracts in the block chain. It uses a "contract factory", i.e. a 
contract that is the central point of the application and is used to generate the required DTD contracts.

Once a contract is created by the DTD factory, then an Event is fired. 
These events are basicaly logs added to the blockchain that can be monitored by the web3.js library (a javascript libracy privided the Ethererum community)

So, the files server.js and server2.js contains some tests regarding this communication. Specifically, in server.js we define
a node.js server that monitors the blockchain for the creation of DTD contracts and prints the id of the contracts as well
as the number of the block it was created in 
