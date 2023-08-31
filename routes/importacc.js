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
        //console.log(jsonData.Data[0]);
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
        

        function findKeyHierarchyWithValueArray(obj, currentKey = "") {
          for (const key in obj) {
              if (obj.hasOwnProperty(key)) {
                  const newKey = currentKey ? `${currentKey}.${key}` : key;
                  
                  if (isValueArray(obj[key])) {
                      return newKey;
                  } else if (typeof obj[key] === 'object') {
                      const result = findKeyHierarchyWithValueArray(obj[key], newKey);
                      if (result) {
                          return result;
                      }
                  }
              }
          }
          return null; // Return null if no such key is found
      }
      
      // Function to traverse the JSON object using the key hierarchy
        function traverseByHierarchy(obj, hierarchy) {
          const keys = hierarchy.split('.');
          let currentObj = obj;
          
          for (const key of keys) {
              if (currentObj.hasOwnProperty(key)) {
                  currentObj = currentObj[key];
              } else {
                  return null; // Key not found in hierarchy
              }
          }
          
          return currentObj;
        }

        const keyWithValueArray = findKeyHierarchyWithValueArray(jsonData);
        paramsJson.accountParams.call.call1.listField = keyWithValueArray;
        paramsJson.accountParams.call.call1.keyField = "accountID";
        paramsJson.accountParams.call.call1.statusConfig = {};
        paramsJson.accountParams.call.call1.statusConfig.active = "Y";
        paramsJson.accountParams.call.call1.statusConfig.inactive = "N";
        paramsJson.accountParams.call.call1.colsToPropMap = {};
        console.log("Traverse",traverseByHierarchy(jsonData, keyWithValueArray));
        const pattern = /(user|employee|login)\s*id/i;
        const pattern1 = /(user)\s*name/i;
        const pattern2 = /(first)\s*name/i;
        const pattern3 = /(last)\s*name/i;

        //console.log(Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => item.toLowerCase() === "id"));
        //console.log(Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => pattern.test(item)));
        if(Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => item.toLowerCase().includes("id")) && Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => pattern.test(item))){
        paramsJson.accountParams.call.call1.colsToPropMap.accountID = Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => pattern.test(item)) +"~#~char";
        }
        if(Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => pattern1.test(item)) || Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => item.toLowerCase().includes("id")) && Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => pattern.test(item))){
          
          paramsJson.accountParams.call.call1.colsToPropMap.name = Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => pattern1.test(item));
          if(!Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => pattern1.test(item))){paramsJson.accountParams.call.call1.colsToPropMap.name = Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => pattern.test(item));}
          paramsJson.accountParams.call.call1.colsToPropMap.name += "~#~char";
        }
        if(Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => item.toLowerCase().includes("id")) && Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => pattern.test(item)) || Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => pattern1.test(item))){
          paramsJson.accountParams.call.call1.colsToPropMap.displayName = Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => pattern.test(item));
          if(!Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => pattern.test(item))){paramsJson.accountParams.call.call1.colsToPropMap.displayName =Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => pattern1.test(item));}
          paramsJson.accountParams.call.call1.colsToPropMap.displayName += "~#~char";
        }
        if(Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => pattern2.test(item))){
          paramsJson.accountParams.call.call1.colsToPropMap.customproperty1 = Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => pattern2.test(item));
        }
        if(Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => pattern3.test(item))){
          paramsJson.accountParams.call.call1.colsToPropMap.customproperty2 = Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => pattern3.test(item));
        }
        if(Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => item.toLowerCase().includes("active")) || Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => item.toLowerCase().includes("status"))){
          paramsJson.accountParams.call.call1.colsToPropMap.customproperty3 = Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => item.toLowerCase().includes("active")) || Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => item.toLowerCase().includes("status"));
          if(!Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => item.toLowerCase().includes("active"))){
            paramsJson.accountParams.call.call1.colsToPropMap.customproperty3 = Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => item.toLowerCase().includes("status"));
          }
          paramsJson.accountParams.call.call1.colsToPropMap.customproperty3 += "~#~char";
        }
        //console.log(Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => item.toLowerCase().includes("active")));
        //console.log(Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => item.toLowerCase().includes("status")));
        if(Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => item.toLowerCase().includes("active")) || Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => item.toLowerCase().includes("status"))){
          paramsJson.accountParams.call.call1.colsToPropMap.status = Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => item.toLowerCase().includes("active")) || Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => item.toLowerCase().includes("status"));
          if(!Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => item.toLowerCase().includes("active"))){
            paramsJson.accountParams.call.call1.colsToPropMap.status = Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => item.toLowerCase().includes("status"));
          }
          paramsJson.accountParams.call.call1.colsToPropMap.status += "~#~char";
        }
        if(Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => item.toLowerCase().includes("id")) && Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => pattern.test(item))){
          paramsJson.accountParams.call.call1.colsToPropMap.customproperty4 = Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => pattern.test(item)) +"~#~char";
        }
        if(Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).some(item => item.toLowerCase().includes("email"))){
          paramsJson.accountParams.call.call1.colsToPropMap.customproperty5 = Object.keys(traverseByHierarchy(jsonData, keyWithValueArray)[0]).find(item => item.toLowerCase().includes("email")) + "~#~char";
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
        res.render('importacc', { layout: 'layout', jsondata: params, customjson: paramsJson.accountParams.call.call1.colsToPropMap });
    }
    catch(err){
      console.log(err);
      res.render('error', { layout: 'layout', message: 'Invalid JSON input' });
    }    
}
);  

router.post('/submitchanges', (req, res) => {
  const updatedKeys = req.body["keys"];
  const updatedValues = req.body["values"];
  const scVal = JSON.parse(req.body["sc"]);
 console.log(scVal);
 console.log(updatedKeys);
 const colsToPropMap = scVal.accountParams.call.call1.colsToPropMap;
 for (const key in colsToPropMap) {
  delete colsToPropMap[key];
}
console.log(colsToPropMap);
 for (let i = 0; i < updatedKeys.length; i++) {
     const key = updatedKeys[i];
     const value = updatedValues[i];
     
     colsToPropMap[key] = value;
 }
  var sccVal = JSON.stringify(scVal);
  res.render('importacc', { layout: 'layout', jsondata: sccVal, customjson: scVal.accountParams.call.call1.colsToPropMap });
});  
module.exports = router;