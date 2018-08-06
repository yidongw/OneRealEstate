
  (function () {

    if (typeof web3 === 'undefined') {
      const msg = "Couldn't detect web3. Make sure MetaMask is installed.";
      alert(msg);
      console.error(msg);
      return;
    }

    QuarkChain.injectWeb3(web3, "http://jrpc.testnet.quarkchain.io:38391");
  })();

  /** namespace */
  let quarkcall = {};
  quarkcall.abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_date",
				"type": "string"
			},
			{
				"name": "_description",
				"type": "string"
			},
			{
				"name": "_documentHash",
				"type": "string"
			}
		],
		"name": "setRecord",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "countRecords",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllRecords",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_listingid",
				"type": "uint256"
			}
		],
		"name": "getRecordByListingid",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "RecordsKeys",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
  // 29: 0x3B13FF8A04b5aA1BB1aD49AD792394309cc197633bb5491d
  // 42: 0x3B13FF8A04b5aA1BB1aD49AD792394309cc197633bb5492A

  quarkcall.contractAddress = '0x9A74b48dd5e8e4a4B9ee3A5c7e6978299883143a3bb5491d';

  const ethAddr = web3.eth.accounts[0];
  const qkcAddr = QuarkChain.getQkcAddressFromEthAddress(ethAddr);

  let sampleContract = web3.qkc.contract(quarkcall.abi);

  let contractAddress = quarkcall.contractAddress;
  let sampleContractInstance = sampleContract.at(contractAddress);

  let shardId = '0x0Aafc85D'; // shard 29.  must include correct shard.
  let readOption = {
    fromFullShardId: shardId,
  };

  let writeOption = {
    gas: 1000000,
    fromFullShardId: shardId,
    //from: web3.eth.accounts[0],
    //value: web3.toWei(0.1, 'ether')
  };

  var total = 0;

  async function countRecords() {
    await sampleContractInstance.countRecords(readOption, (err, result) => {
      if (result != null) {
        console.log("countRecords: ", result.toNumber());
        let x = result.toNumber()
        console.log(x);
        total = x;
      } else {
        console.err("countRecords errors");
      }
    });
  }

  async function getRecordByListingid(listingid) {
    await sampleContractInstance.getRecordByListingid(listingid, readOption, (err, result) => {
      if (result != null) {
        console.log("getAllRecords...: ", result[0].toNumber(), result[1], result[2], result[3]);
        console.log(result);
        return result;
      } else {
        console.err("getAllRecords errors");
      }
    });
  }

  async function getAllRecords(){
    await sampleContractInstance.getAllRecords(readOption, (err, result) => {
      if (result != null) {
        console.log(result);
        let newResult = result.map((x) => {
          // if (typeof x === "BigNumber") {
          //   return x.toNumber();
          // } else {
          //   return x;
          // }
          return x.toString();
        });
        console.log("getAllRecords: ", newResult);
      } else {
        console.err("getAllRecords errors");
      }
    });
  }

  async function setRecord() {
    let d = new Date();
    let tmp = "8/5/2018";
    console.log(tmp);

    let des = document.getElementById("des").value;
    let company = document.getElementById("company").value;

    des = des + " " + company;

    console.log(des);

    await sampleContractInstance.setRecord(tmp, des, "Hash", writeOption, console.log);
  }


  async function render() {
    await sampleContractInstance.countRecords(readOption, (err, result) => {
      if (result != null) {
        let total = result.toNumber();
        console.log(total);
        for (let i = 0; i < total; i++) {
          let home = document.getElementById("home");
          let p = document.createElement("p");
          sampleContractInstance.getRecordByListingid(i, readOption, (err, result) => {
            if (result != null) {
              p.innerHTML = result[1] + " " +  result[2];
            } else {
              console.err("getAllRecords errors");
            }
          });
          // p.innerHTML = res[i];
          console.log(p);
          home.appendChild(p);
        }

        console.log("countRecords: ", total);
      } else {
        console.err("Render error");
      }
    });
  }

  render();

  // console.log("here!!");
  // console.log(countRecords());
  // console.log("start get record id");
  // console.log(getRecordByListingid(1));
  // console.log("end get record id");
  // console.log(getAllRecords());
