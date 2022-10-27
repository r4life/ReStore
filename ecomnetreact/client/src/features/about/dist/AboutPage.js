"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var agent_1 = require("../../app/api/agent");
function AboutPage() {
    return (React.createElement(material_1.Container, null,
        React.createElement(material_1.Typography, { gutterBottom: true, variant: 'h2' }, "Errors for testing purposes"),
        React.createElement(material_1.ButtonGroup, { fullWidth: true },
            React.createElement(material_1.Button, { variant: 'contained', onClick: function () { return agent_1["default"].TestErrors.get400Error()["catch"](function (error) { return console.log(error); }); } }, "Test 400 Error"),
            React.createElement(material_1.Button, { variant: 'contained', onClick: function () { return agent_1["default"].TestErrors.get401Error()["catch"](function (error) { return console.log(error); }); } }, "Test 401 Error"),
            React.createElement(material_1.Button, { variant: 'contained', onClick: function () { return agent_1["default"].TestErrors.get404Error()["catch"](function (error) { return console.log(error); }); } }, "Test 404 Error"),
            React.createElement(material_1.Button, { variant: 'contained', onClick: function () { return agent_1["default"].TestErrors.get500Error()["catch"](function (error) { return console.log(error); }); } }, "Test 500 Error"),
            React.createElement(material_1.Button, { variant: 'contained', onClick: function () { return agent_1["default"].TestErrors.getValidationError()["catch"](function (error) { return console.log(error); }); } }, "Test Validation Error"))));
}
exports["default"] = AboutPage;
