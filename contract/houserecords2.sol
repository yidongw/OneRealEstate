pragma solidity ^0.4.18;

contract HouseRecords2 {

    struct Record {
        uint id;
        string date;
        string description;
        string documentHash;
    }

    mapping (uint => Record) Records;
    uint[] public RecordsKeys;

    function setRecord(string _date, string _description, string _documentHash) public {
        Record storage myRecord = Records[RecordsKeys.length];

        myRecord.id = RecordsKeys.length;
        myRecord.date = _date;
        myRecord.description = _description;
        myRecord.documentHash = _documentHash;

        RecordsKeys.push(RecordsKeys.length);
    }

    function getRecordByListingid(uint _listingid) view public returns (uint, string, string, string) {
        return (Records[_listingid].id, Records[_listingid].date, Records[_listingid].description, Records[_listingid].documentHash);
    }

    function getAllRecords() view public returns(uint[]) {
        return RecordsKeys;
    }

    function countRecords() view public returns (uint) {
        return RecordsKeys.length;
    }
}
