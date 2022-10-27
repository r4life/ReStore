"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
axios_1["default"].defaults.baseURL = 'http://localhost:5000/api/';
var responseBody = function (response) { return response.data; };
axios_1["default"].interceptors.response.use(function (response) {
    return response;
}, function (error) {
    var _a = error.response, data = _a.data, status = _a.status;
    switch (status) {
        case 400:
            if (data.errors) {
                var modelStateErrors = [];
                for (var key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                react_toastify_1.toast.error(data.title);
                throw modelStateErrors.flat();
            }
            react_toastify_1.toast.error(data.title);
            break;
        case 401:
            react_toastify_1.toast.error(data.title);
            break;
        case 500:
            react_toastify_1.toast.error(data.title);
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
});
var requests = {
    get: function (url) { return axios_1["default"].get(url).then(responseBody); },
    post: function (url, body) { return axios_1["default"].get(url, body).then(responseBody); },
    put: function (url, body) { return axios_1["default"].put(url, body).then(responseBody); },
    "delete": function (url) { return axios_1["default"]["delete"](url).then(responseBody); }
};
var Catalog = {
    list: function () { return requests.get('products'); },
    details: function (id) { return requests.get("products/" + id); }
};
var TestErrors = {
    get400Error: function () { return requests.get('buggy/bad-request'); },
    get401Error: function () { return requests.get('buggy/unauthorised'); },
    get404Error: function () { return requests.get('buggy/not-found'); },
    get500Error: function () { return requests.get('buggy/server-found'); },
    getValidationError: function () { return requests.get('buggy/validation-error'); }
};
var agent = {
    Catalog: Catalog,
    TestErrors: TestErrors
};
exports["default"] = agent;
