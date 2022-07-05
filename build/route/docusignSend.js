"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const sendUkeoiReq_1 = require("../handleRequest/sendUkeoiReq");
const downloadUkeoiReq_1 = require("../handleRequest/downloadUkeoiReq");
const previewUkeoiReq_1 = require("./../handleRequest/previewUkeoiReq");
const route = (0, express_1.Router)();
route.use(body_parser_1.default.urlencoded({ extended: false }));
route.use(body_parser_1.default.json());
route.post('/ukeoi/preview', previewUkeoiReq_1.previewUkeoiReq);
route.get('/ukeoi/download', downloadUkeoiReq_1.downloadUkeoiReq);
route.post('/ukeoi', sendUkeoiReq_1.sendUkeoiReq);
route.get('/test', (req, res) => {
    console.log('Connection test is succes');
    res.status(200).send('SUCCESS');
});
exports.default = route;
