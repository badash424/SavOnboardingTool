const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const options = [];
    for (let i = 1; i <= 50; i++) {
        options.push(`customproperty${i}`);
    }
    const optionss = [];
    for (let i = 1; i <= 50; i++) {
        optionss.push(`customproperty${i}`);
    }
    const opt = ["systemUsername", "firstname", "lastname", "username"];
    const opts = ["systemUsername", "firstname", "lastname", "username"];
    res.render('createacc', { layout: 'layout', options: options, opt: opt, opts: opts, optionss: optionss });
});

router.post('/submit', (req, res) => {
    console.log(req.body);
    const textareaInput = req.body["textarea-input"];
    const url = req.body["text-input-url"];
    const accid = req.body["text-input-accid"];
    const conn = req.body["text-input-conn"];
    const country = req.body["country-dropdown"];
    const deflegalentity = req.body["deflegalentity-dropdown"];
    const empid = req.body["empid-dropdown"];
    const un = req.body["un-dropdown"];
    const sup = req.body["sup-dropdown"];
    const msp = req.body["msp-dropdown"];
    const ifCondition = req.body.condition;
    const elseIfCondition = req.body['else-if'];
    const elseCondition = req.body.else;
    const ifCondition1 = req.body.condition1;
    const elseCondition1 = req.body.else1;
    const thenifCondition1 = req.body.thenif1;
    const thenifCondition = req.body.thenif;
    const thenelseIfCondition = req.body.thenelseif;
    const ent1 = req.body["ent-dropdown"];
    const ent2 = req.body["ent-dropdown-one"];
    const subent1 = req.body["subent-dropdown"];
    const subent2 = req.body["subent-dropdown-one"];
    const entr1 = req.body["entr-dropdown"];
    const entr2 = req.body["entr-dropdown-one"];
    const asrs1 = req.body["asrs-dropdown"];
    const asrs2 = req.body["asrs-dropdown-one"];
    const asrc1 = req.body["asrc-dropdown"];
    const asrc2 = req.body["asrc-dropdown-one"];
    const assrc1 = req.body["assrc-dropdown"];
    const assrc2 = req.body["assrc-dropdown-one"];
    const andConditions = req.body['and-conditions'] || [];
    const orConditions = req.body['or-conditions[]'] || [];


    console.log("Output of If:", ifCondition, "::::", elseCondition, ":::::", elseIfCondition, "::::", andConditions, "::::", orConditions);
    console.log(textareaInput);
    try {
        const jsonData = JSON.parse(textareaInput);
        console.log(jsonData);
        // Handling the parsed JSON data
        console.log(jsonData.data);
        console.log(Object.keys(jsonData.data[0])[7]);
        let role = Object.values(jsonData.data[0])[7];
        console.log(role);
        let paramsJson = {};
        paramsJson.headers = {};
        paramsJson.headers.Type = jsonData.headers.Type;
        paramsJson.data = [];
        paramsJson.data[0] = {};
        const customKeys = ['[C] Entity', '[C] Sub Entity', '[C] Enterprise', '[C] Asset Region Structure', '[C] Asset Region Code', '[C] Asset Sub Region Code'];
        const targetObject = {
            ...jsonData.data[0],
            ...customKeys.reduce((obj, key) => ({ ...obj, [key]: 'customValue' }), {})
        };

        console.log("Employee id:", empid);
        paramsJson.data[0] = targetObject;
        paramsJson.data[0].Username = "${user." + un + ".toString().toLowerCase()}_BPLC";
        paramsJson.data[0]['First Name'] = "${user.firstname}";
        paramsJson.data[0]['Last Name'] = "${user.lastname}";
        paramsJson.data[0].Email = "${user.email}";
        paramsJson.data[0]['Phone Number'] = "${user.phonenumber}";
        paramsJson.data[0].Country = "${user." + country + "}";
        paramsJson.data[0]['Role Name'] = role;
        if ((ifCondition || ifCondition.length !== 0) && (elseCondition || elseCondition.length !== 0) && !thenifCondition.includes('.') && (!elseIfCondition || elseIfCondition.length === 0)) {
            if (!andConditions && !orConditions) {
                paramsJson.data[0]['Default Legal Entity'] = "${if(" + ifCondition + ") {'" + thenifCondition + "'} ";
                paramsJson.data[0]['Default Legal Entity'] += "else {" + elseCondition + "}}";
                console.log(paramsJson.data[0]['Default Legal Entity']);
            }
            else if (andConditions.length !== 0 && orConditions.length === 0) {
                if (andConditions.length === 1) {
                    paramsJson.data[0]['Default Legal Entity'] = "${if(" + ifCondition + " && " + andConditions[0] + ") {'" + thenifCondition + "'} ";
                    paramsJson.data[0]['Default Legal Entity'] += "else {" + elseCondition + "}}";
                }
                else if ((andConditions.length > 1)) {
                    paramsJson.data[0]['Default Legal Entity'] = "${if(" + ifCondition;
                    for (var i = 0; i < andConditions.length; i++) {
                        paramsJson.data[0]['Default Legal Entity'] += " && " + andConditions[i];
                    }
                    paramsJson.data[0]['Default Legal Entity'] += ") {'" + thenifCondition + "'} ";
                    paramsJson.data[0]['Default Legal Entity'] += "else {" + elseCondition + "}}";
                }
            }
        }
        else if ((ifCondition || ifCondition.length !== 0) && (elseCondition || elseCondition.length !== 0) && thenifCondition.includes('.') && elseIfCondition.length === 0) {
            if (!andConditions && !orConditions) {
                paramsJson.data[0]['Default Legal Entity'] = "${if(" + ifCondition + ") {" + thenifCondition + "}";
                paramsJson.data[0]['Default Legal Entity'] += "else {" + elseCondition + "}}";
            }
            else if (andConditions.length !== 0 && orConditions.length === 0) {
                if (andConditions.length === 1) {
                    paramsJson.data[0]['Default Legal Entity'] = "${if(" + ifCondition + " && " + andConditions[0] + ") {" + thenifCondition + "}";
                    paramsJson.data[0]['Default Legal Entity'] += "else {" + elseCondition + "}}";
                }
                else if ((andConditions.length > 1)) {
                    paramsJson.data[0]['Default Legal Entity'] = "${if(" + ifCondition;
                    for (var i = 0; i < andConditions.length; i++) {
                        paramsJson.data[0]['Default Legal Entity'] += " && " + andConditions[i];
                    }
                    paramsJson.data[0]['Default Legal Entity'] += ") {" + thenifCondition + "}";
                    paramsJson.data[0]['Default Legal Entity'] += "else {" + elseCondition + "}}";
                }
            }
        }
        else if ((ifCondition || ifCondition.length !== 0) && (elseCondition || elseCondition.length !== 0) && thenifCondition.includes('.') && elseIfCondition.length !== 0) {
            if (!andConditions && !orConditions) {
                paramsJson.data[0]['Default Legal Entity'] = "${if(" + ifCondition + ") {" + thenifCondition + "}";
                paramsJson.data[0]['Default Legal Entity'] += "else if " + elseIfCondition + "{" + thenelseIfCondition + "} ";
                paramsJson.data[0]['Default Legal Entity'] += "else {" + elseCondition + "}}";
            }
            else if (andConditions.length !== 0 && orConditions.length === 0) {
                paramsJson.data[0]['Default Legal Entity'] = "${if(" + ifCondition + " && " + andConditions + ") {" + thenifCondition + "}";
                paramsJson.data[0]['Default Legal Entity'] += "else if " + elseIfCondition + "{" + thenelseIfCondition + "} ";
                paramsJson.data[0]['Default Legal Entity'] += "else {" + elseCondition + "}}";

                if (andConditions.length === 1) {
                    paramsJson.data[0]['Default Legal Entity'] = "${if(" + ifCondition + " && " + andConditions[0] + ") {" + thenifCondition + "}";
                    paramsJson.data[0]['Default Legal Entity'] += "else if " + elseIfCondition + "{" + thenelseIfCondition + "} ";
                    paramsJson.data[0]['Default Legal Entity'] += "else {" + elseCondition + "}}";
                }
                else if ((andConditions.length > 1)) {
                    paramsJson.data[0]['Default Legal Entity'] = "${if(" + ifCondition;
                    for (var i = 0; i < andConditions.length; i++) {
                        paramsJson.data[0]['Default Legal Entity'] += " && " + andConditions[i];
                    }
                    paramsJson.data[0]['Default Legal Entity'] += ") {" + thenifCondition + "}";
                    paramsJson.data[0]['Default Legal Entity'] += "else if " + elseIfCondition + "{" + thenelseIfCondition + "} ";
                    paramsJson.data[0]['Default Legal Entity'] += "else {" + elseCondition + "}}";
                }
            }
        }
        else if ((ifCondition || ifCondition.length !== 0) && (elseCondition || elseCondition.length !== 0) && !thenifCondition.includes('.') && elseIfCondition.length !== 0) {
            console.log("Entered this condition");
            if (!andConditions && !orConditions) {
                paramsJson.data[0]['Default Legal Entity'] = "${if(" + ifCondition + ") {'" + thenifCondition + "'} ";
                paramsJson.data[0]['Default Legal Entity'] += "else if " + elseIfCondition + "{" + thenelseIfCondition + "} ";
                paramsJson.data[0]['Default Legal Entity'] += "else {" + elseCondition + "}}";
            }
            else if (andConditions.length !== 0 && orConditions.length === 0) {
                console.log("Inside here");
                if (andConditions.length === 1) {
                    paramsJson.data[0]['Default Legal Entity'] = "${if(" + ifCondition + " && " + andConditions[0] + ") {'" + thenifCondition + "'} ";
                    paramsJson.data[0]['Default Legal Entity'] += "else if " + elseIfCondition + "{" + thenelseIfCondition + "} ";
                    paramsJson.data[0]['Default Legal Entity'] += "else {" + elseCondition + "}}";
                }
                else if ((andConditions.length > 1)) {
                    paramsJson.data[0]['Default Legal Entity'] = "${if(" + ifCondition;
                    for (var i = 0; i < andConditions.length; i++) {
                        paramsJson.data[0]['Default Legal Entity'] += " && " + andConditions[i];
                    }
                    paramsJson.data[0]['Default Legal Entity'] += ") {'" + thenifCondition + "'} ";
                    paramsJson.data[0]['Default Legal Entity'] += "else if " + elseIfCondition + "{" + thenelseIfCondition + "} ";
                    paramsJson.data[0]['Default Legal Entity'] += "else {" + elseCondition + "}}";
                }
            }
        }
        else {
            paramsJson.data[0]['Default Legal Entity'] = "${user." + deflegalentity + "}";
        }
        console.log("def:", paramsJson.data[0]['Default Legal Entity']);
        paramsJson.data[0]['Employee ID'] = "${user." + empid + "}";
        paramsJson.data[0]['Primary Supervisor Username'] = "${" + sup + "}_BPLC";
        if ((ifCondition1 || ifCondition1.length !== 0) && (elseCondition1 || elseCondition1.length !== 0)) {
            paramsJson.data[0]['MSP User'] = "${if(" + ifCondition1 + ") {'" + thenifCondition1 + "'} ";
            paramsJson.data[0]['MSP User'] += "else {'" + elseCondition1 + "'}";
        }
        else {
            paramsJson.data[0]['MSP User'] = msp;
        }
        paramsJson.data[0]['[C] Entity'] = "${user." + ent1 + "==null?'':user." + ent1 + "} - ${user." + ent2 + "==null?'':user." + ent2 + "}";
        paramsJson.data[0]['[C] Sub Entity'] = "${user." + subent1 + "==null?'':user." + subent1 + "} - ${user." + subent2 + "==null?'':user." + subent2 + "}";
        paramsJson.data[0]['[C] Enterprise'] = "${user." + entr1 + "==null?'':user." + entr1 + "} - ${user." + entr2 + "==null?'':user." + entr2 + "}";
        paramsJson.data[0]['[C] Asset Region Structure'] = "${user." + asrs1 + "==null?'':user." + asrs1 + "} - ${user." + asrs2 + "==null?'':user." + asrs2 + "}";
        paramsJson.data[0]['[C] Asset Region Code'] = "${user." + asrc1 + "==null?'':user." + asrc1 + "} - ${user." + asrc2 + "==null?'':user." + asrc2 + "}";
        paramsJson.data[0]['[C] Asset Sub Region Code'] = "${user." + assrc1 + "==null?'':user." + assrc1 + "} - ${user." + assrc2 + "==null?'':user." + assrc2 + "}";
        delete paramsJson.data[0]['View and Report on Sensitive Data'];
        delete paramsJson.data[0]['Master Worker Record Access - View'];
        delete paramsJson.data[0]['Master Worker Record Access - Manage'];
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
        outputJson.call[0].httpMethod = "POST";
        outputJson.call[0].httpParams = params;
        outputJson.call[0].httpHeaders = {};
        outputJson.call[0].httpHeaders.Authorization = "${access_token}";
        outputJson.call[0].httpHeaders.ContentType = "application/json/;charset=utf-8";
        outputJson.call[0].httpHeaders.Accept = "application/json";
        outputJson.call[0].httpContentType = "application/json";
        outputJson.call[0].successResponses = {};
        outputJson.call[0].successResponses.statusCode = [200, 201];
        outputJson.call[0].unsuccessResponses = {};
        outputJson.call[0].unsuccessResponses.statusCode = [400, 401, 404, 405];
        let opJson = JSON.stringify(outputJson);

        res.render('createacc', { layout: 'layout', jsondata: opJson });
    } catch (error) {
        console.log(error);
        res.render('error', { layout: 'layout', message: 'Invalid JSON input' });
    }
});

module.exports = router;