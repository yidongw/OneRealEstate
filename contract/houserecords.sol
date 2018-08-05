pragma solidity ^0.4.18;

contract HouseRecords {
    
    struct Record {
        uint id;
        string documentHash;
    }
    
    mapping (uint => Record) Records;
    uint[] public RecordsKeys;
    
    function setRecord(uint _listingid, uint _id, string _documentHash) public {
        Record storage myRecord = Records[_listingid];
        
        myRecord.id = _id;
        myRecord.documentHash = _documentHash;        

        RecordsKeys.push(_listingid) -1;
    }
    
    function getRecordByListingid(uint _listingid) view public returns (uint, string) {
        return (Records[_listingid].id, Records[_listingid].documentHash);
    }

    function getAllRecords() view public returns(uint[]) {
        return RecordsKeys;
    }
        
    function countRecords() view public returns (uint) {
        return RecordsKeys.length;
    }
    
}