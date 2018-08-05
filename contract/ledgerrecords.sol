pragma solidity ^0.4.18;

contract LedgerRecords {
    
    struct Record {
        uint id;
        string documentHash;
    }
    
    mapping (address => Record) Records;
    address[] public RecordsKeys;
    
    function setRecordByAddress(address _address, uint _id, string _documentHash) public {
        Record storage myRecord = Records[_address];
        
        myRecord.id = _id;
        myRecord.documentHash = _documentHash;        

        RecordsKeys.push(_address) -1;
    }
    
    function getRecordByAddress(address _address) view public returns (uint, string) {
        return (Records[_address].id, Records[_address].documentHash);
    }

    function getAllRecords() view public returns(address[]) {
        return RecordsKeys;
    }
        
    function countRecords() view public returns (uint) {
        return RecordsKeys.length;
    }
    
}