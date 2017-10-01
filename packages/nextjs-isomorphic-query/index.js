"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs = require("querystring");
exports.isomorphicQuery = function (query) {
    return Object.keys(query).length === 0 && typeof window !== 'undefined'
        ? qs.parse(location.search.slice(1))
        : query;
};
//# sourceMappingURL=index.js.map