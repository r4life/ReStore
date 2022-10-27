"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var agent_1 = require("../../app/api/agent");
function ProductDetails() {
    var id = react_router_dom_1.useParams().id;
    var _a = react_1.useState(null), product = _a[0], setProduct = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    react_1.useEffect(function () {
        agent_1["default"].Catalog.details(parseInt(id))
            .then(function (response) { return setProduct(response); })["catch"](function (error) { return console.log(error.response); })["finally"](function () { return setLoading(false); });
    }, [id]);
    if (loading)
        return React.createElement("h3", null, "Loading...");
    if (!product)
        return React.createElement("h3", null, "Product not found");
    return (React.createElement(material_1.Grid, { container: true, spacing: 6 },
        React.createElement(material_1.Grid, { item: true, xs: 6 },
            React.createElement("img", { src: product.pictureUrl, alt: product.name, style: { width: '100%' } })),
        React.createElement(material_1.Grid, { item: true, xs: 6 },
            React.createElement(material_1.Typography, { variant: 'h3' }, product.name),
            React.createElement(material_1.Divider, { sx: { mb: 3 } }),
            React.createElement(material_1.Typography, { variant: 'h4' },
                "$ ",
                (product.price / 100).toFixed(2)),
            React.createElement(material_1.Table, null,
                React.createElement(material_1.TableBody, null,
                    React.createElement(material_1.TableRow, null,
                        React.createElement(material_1.TableCell, null, "Name"),
                        React.createElement(material_1.TableCell, null, product.name)),
                    React.createElement(material_1.TableRow, null,
                        React.createElement(material_1.TableCell, null, "Description"),
                        React.createElement(material_1.TableCell, null, product.description)),
                    React.createElement(material_1.TableRow, null,
                        React.createElement(material_1.TableCell, null, "Type"),
                        React.createElement(material_1.TableCell, null, product.type)),
                    React.createElement(material_1.TableRow, null,
                        React.createElement(material_1.TableCell, null, "Brand"),
                        React.createElement(material_1.TableCell, null, product.brand)),
                    React.createElement(material_1.TableRow, null,
                        React.createElement(material_1.TableCell, null, "Quantity in Stock"),
                        React.createElement(material_1.TableCell, null, product.quantityInStock)))))));
}
exports["default"] = ProductDetails;
