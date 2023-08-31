const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('disableacc', { layout: 'layout' });
  });

router.post('/submit', (req, res) => {
  const textareaInput = req.body["textarea-input"];
  const url = req.body["text-input-url"];
  const accid = req.body["text-input-accid"];
  const conn = req.body["text-input-conn"];
  const httpmethod = req.body["httpmethod"];

  try {
    const jsonData = JSON.parse(textareaInput);
    console.log(jsonData);
    let paramsJson = {};
    for (const key in jsonData) {
      if (typeof jsonData[key] === 'object' && Object.keys(jsonData[key]).length > 0) {
          
      } else {
        if(key === "Username"){
          paramsJson[key] = "${user.systemUserName.toString().toLowerCase()}_BPFG";
        }
        else{
          paramsJson[key] = jsonData[key];
        }
      }
  }
    let params = JSON.stringify(paramsJson);
    params.replace(/"/g, '\\"');
    console.log("Params JSON:", params);
    let outputJson = {};
    outputJson.accountIdPath = accid;
    outputJson.call = [];
    outputJson.call[0] = {};
    outputJson.call[0].name = "call1";
    outputJson.call[0].callOrder = "0";
    outputJson.call[0].connection = conn;
    outputJson.call[0].showResponse = true;
    outputJson.call[0].url = url;
    outputJson.call[0].httpMethod = httpmethod;
    outputJson.call[0].httpParams = params;
    outputJson.call[0].httpHeaders = {};
    outputJson.call[0].httpHeaders.Authorization = "${access_token}";
    outputJson.call[0].httpHeaders.ContentType = "application/json";
    outputJson.call[0].httpHeaders.Accept = "application/json";
    outputJson.call[0].httpContentType = "application/json";
    outputJson.call[0].successResponses = {};
    outputJson.call[0].successResponses.statusCode = [200 ,106, 201];
    outputJson.call[0].unsuccessResponses = {};
    outputJson.call[0].unsuccessResponses.statusCode = [400, 401, 404, 405];
    let opJson = JSON.stringify(outputJson);
    res.render('disableacc', { layout: 'layout', jsondata: opJson, customjson: paramsJson });
  }
  catch (error) {
    console.log(error);
    res.render('error', { layout: 'layout', message: 'Invalid JSON input' });
}
});
router.post('/submitchanges', (req, res) => {
    const updatedKeys = req.body["keys"];
    const updatedValues = req.body["values"];
    const scVal = JSON.parse(req.body["sc"]);
   console.log(scVal);
   
   const colsToPropMap = JSON.parse(scVal.call[0].httpParams);
  
   for (const key in colsToPropMap) {
    delete colsToPropMap[key];
  }
  
  console.log(updatedKeys);
  console.log(updatedValues);
   for (let i = 0; i < updatedKeys.length; i++) {
       const key = updatedKeys[i];
       const value = updatedValues[i];
       console.log(colsToPropMap);
       colsToPropMap[key] = value;
   }
   console.log(colsToPropMap);
   scVal.call[0].httpParams = JSON.stringify(colsToPropMap);
    var sccVal = JSON.stringify(scVal);
    res.render('disableacc', { layout: 'layout', jsondata: sccVal, customjson: scVal.call[0].httpParams });
  });
module.exports = router;  