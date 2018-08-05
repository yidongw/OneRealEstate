
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
      "constant": false,
      "inputs": [
        {
          "name": "_listingid",
          "type": "uint256"
        },
        {
          "name": "_id",
          "type": "uint256"
        },
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
    }
  ];

  quarkcall.listingid = 6;
  quarkcall.contractAddress = '0xfD1d2734fB822524533BDA2C2Ff5C89A69c6E9070Aafc85D';

  async function sendTx() {

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

    sampleContractInstance.countRecords(readOption, (err, result) => {
      if (result != null) {
        console.log("countRecords: ", result.toNumber());
      } else {
        console.err("countRecords errors");
      }
    });

    sampleContractInstance.getRecordByListingid(6, readOption, (err, result) => {
      if (result != null) {
        console.log("getAllRecords: ", result[0].toNumber(), result[1], result[2], result[3]);
      } else {
        console.err("getAllRecords errors");
      }
    });

    sampleContractInstance.getAllRecords(readOption, (err, result) => {
      if (result != null) {
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

    quarkcall.listingid++;
    sampleContractInstance.setRecord(quarkcall.listingid, quarkcall.listingid, "07052018", "description2", "ipfs2", writeOption, console.log);

    // Should be able to find tx ID in console.
    //await web3.qkc.sendTransaction(rawTx, console.log);
  }

  async function countRecords() {

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

    sampleContractInstance.countRecords(readOption, (err, result) => {
      if (result != null) {
        console.log("countRecords: ", result.toNumber());
      } else {
        console.err("countRecords errors");
      }
    });
  }

  async function getRecordByListingid(listingid) {

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

    sampleContractInstance.getRecordByListingid(6, readOption, (err, result) => {
      if (result != null) {
        console.log("getAllRecords: ", result[0].toNumber(), result[1], result[2], result[3]);
      } else {
        console.err("getAllRecords errors");
      }
    });
  }
