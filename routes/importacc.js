const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('importacc', { layout: 'layout' });
  });

router.post('/submit', (req, res) => {
    const textareaInput = req.body["textarea-input"];
    const urlone = req.body["text-input-urlone"];
    const inanif = req.body["text-input-inanif"];
    const conn = req.body["text-input-conn"];
    const atv = req.body["text-input-atv"];
    const kf = req.body["text-input-kf-one"];
    const urltwo = req.body["text-input-urltwo"];
    const kftwo = req.body["text-input-kf-two"];
    const idpath = req.body["text-input-idpath"];
    const textareaInputone = req.body["textarea-input-one"];
    const dDE = req.body["text-input-dde"];

    try {
      const jsonData = JSON.parse(textareaInput);
        console.log(jsonData);
        // Handling the parsed JSON data
        console.log(jsonData.Data[0]);
        const jsonDataa = JSON.parse(textareaInputone);
        console.log(jsonDataa);
        // Handling the parsed JSON data
        console.log(jsonDataa.data[0]);
        let paramsJson = {};
        paramsJson.accountParams = {};
        paramsJson.accountParams.connection = conn;
        paramsJson.accountParams.processingType = "SequentialAndIterative";
        paramsJson.accountParams.statusAndThresholdConfig = {};
        paramsJson.accountParams.statusAndThresholdConfig.inactivateAccountsNotInFile = inanif;
        paramsJson.accountParams.statusAndThresholdConfig.accountThresholdValue = atv;
        paramsJson.accountParams.doNotChangeIfFailed = true;
        paramsJson.accountParams.call = {};
        paramsJson.accountParams.call.call1 = {};
        paramsJson.accountParams.call.call1.callOrder = 0;
        paramsJson.accountParams.call.call1.stageNumber = 0;
        paramsJson.accountParams.call.call1.http = {};
        paramsJson.accountParams.call.call1.http.url = urlone;
        paramsJson.accountParams.call.call1.http.httpHeaders = {};
        paramsJson.accountParams.call.call1.http.httpHeaders.Accept = "application/json";
        paramsJson.accountParams.call.call1.http.httpHeaders.Authorization = "${access_token}";
        paramsJson.accountParams.call.call1.http.httpMethod = "GET";
        paramsJson.accountParams.call.call1.http.httpContentType = "application/json";
        function isValueArray(value) {
          return Array.isArray(value);
        }
      
        // Find the key with the value that is a list
        function findKeyWithValueArray(obj) {
            for (const key in obj) {
                if (obj.hasOwnProperty(key) && isValueArray(obj[key])) {
                    return key;
                }
            }
            return null; // Return null if no such key is found
        }
      
        const keyWithValueArray = findKeyWithValueArray(jsonData);
        paramsJson.accountParams.call.call1.listField = keyWithValueArray;
        paramsJson.accountParams.call.call1.keyField = "accountID";
        paramsJson.accountParams.call.call1.statusConfig = {};
        paramsJson.accountParams.call.call1.statusConfig.active = "Y";
        paramsJson.accountParams.call.call1.statusConfig.inactive = "N";
        paramsJson.accountParams.call.call1.colsToPropMap = {};
        if(Object.keys(jsonData.Data[0]).includes("Employee ID")){
        paramsJson.accountParams.call.call1.colsToPropMap.accountID = "Employee ID~#~char";
        }
        if(Object.keys(jsonData.Data[0]).includes("Username")){
          paramsJson.accountParams.call.call1.colsToPropMap.name = "Username~#~char";
        }
        if(Object.keys(jsonData.Data[0]).includes("Employee ID")){
          paramsJson.accountParams.call.call1.colsToPropMap.displayName = "Employee ID~#~char";
        }
        if(Object.keys(jsonData.Data[0]).includes("UserStatus")){
          paramsJson.accountParams.call.call1.colsToPropMap.status = "UserStatus~#~char";
        }
        paramsJson.accountParams.call.call1.colsToPropMap.customproperty31 = "STORE#ACC#ENT#MAPPINGINFO~#~char";
        paramsJson.entitlementParams = {};
        paramsJson.entitlementParams.connection = conn;
        paramsJson.entitlementParams.processingType = "SequentialAndIterative";
        paramsJson.entitlementParams.doNotChangeIfFailed = true;
        paramsJson.entitlementParams.entTypes = {};
        paramsJson.entitlementParams.entTypes.Role = {};
        paramsJson.entitlementParams.entTypes.Role.entTypeOrder = 0;
        paramsJson.entitlementParams.entTypes.Role.call = {};
        paramsJson.entitlementParams.entTypes.Role.call.call1 = {};
        paramsJson.entitlementParams.entTypes.Role.call.call1.callOrder = 0;
        paramsJson.entitlementParams.entTypes.Role.call.call1.stageNumber = 0;
        paramsJson.entitlementParams.entTypes.Role.call.call1.http = {};
        paramsJson.entitlementParams.entTypes.Role.call.call1.http.url= urltwo;
        paramsJson.entitlementParams.entTypes.Role.call.call1.http.httpMethod = "GET";
        paramsJson.entitlementParams.entTypes.Role.call.call1.http.httpContentType = "application/json";
        paramsJson.entitlementParams.entTypes.Role.call.call1.http.httpHeaders = {};
        paramsJson.entitlementParams.entTypes.Role.call.call1.http.httpHeaders.Authorization = "${access_token}";
        paramsJson.entitlementParams.entTypes.Role.call.call1.http.httpHeaders.Accept = "application/json";
        const keyWithValueArrayone = findKeyWithValueArray(jsonDataa);
        paramsJson.entitlementParams.entTypes.Role.call.call1.listField = keyWithValueArrayone;
        paramsJson.entitlementParams.entTypes.Role.call.call1.idPath = idpath;
        paramsJson.entitlementParams.entTypes.Role.call.call1.keyField = "entitlementID";
        paramsJson.entitlementParams.entTypes.Role.call.call1.colsToPropMap = {};
        if(Object.keys(jsonDataa.data[0]).includes("Name")){
          paramsJson.entitlementParams.entTypes.Role.call.call1.colsToPropMap.entitlementID = "Name~#~char";
          paramsJson.entitlementParams.entTypes.Role.call.call1.colsToPropMap.entitlement_value = "Name~#~char";
        }
        paramsJson.entitlementParams.entTypes.Role.call.call1.disableDeletedEntitlements = dDE;
        paramsJson.acctEntParams = {};
        paramsJson.acctEntParams.entTypes = {};
        paramsJson.acctEntParams.entTypes.Role = {};
        paramsJson.acctEntParams.entTypes.Role.call = {};
        paramsJson.acctEntParams.entTypes.Role.call.call1 = {};
        paramsJson.acctEntParams.entTypes.Role.call.call1.processingType = "http";
        paramsJson.acctEntParams.entTypes.Role.call.call1.connection = conn;
        paramsJson.acctEntParams.entTypes.Role.call.call1.listField = "Data";
        paramsJson.acctEntParams.entTypes.Role.call.call1.acctKeyField = "accountID";
        paramsJson.acctEntParams.entTypes.Role.call.call1.entKeyField = "entitlementID";
        paramsJson.acctEntParams.entTypes.Role.call.call1.acctIdPath = "Employee ID";
        paramsJson.acctEntParams.entTypes.Role.call.call1.entIdPath = "Role";
        paramsJson.acctEntParams.entTypes.Role.call.call1.http = {};
        paramsJson.acctEntParams.entTypes.Role.call.call1.http.url = urlone;
        paramsJson.acctEntParams.entTypes.Role.call.call1.http.httpMethod = "GET";
        paramsJson.acctEntParams.entTypes.Role.call.call1.http.httpContentType = "application/json";
        paramsJson.acctEntParams.entTypes.Role.call.call1.http.httpHeaders = {};
        paramsJson.acctEntParams.entTypes.Role.call.call1.http.httpHeaders.Accept = "application/json";
        let params = JSON.stringify(paramsJson);
        res.render('importacc', { layout: 'layout', jsondata: params });
    }
    catch(err){
      console.log(err);
      res.render('error', { layout: 'layout', message: 'Invalid JSON input' });
    }    
}
);  
module.exports = router;