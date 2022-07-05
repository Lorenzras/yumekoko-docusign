"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUkeoiReq = void 0;
const tslib_1 = require("tslib");
const processUkeoi_1 = require("../lib/contracts/processUkeoi");
const sendUkeoiReq = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log('Received', body);
    const projId = body.projId;
    try {
        if (projId && typeof projId === 'string') {
            const result = yield (0, processUkeoi_1.processUkeoi)(projId);
            console.log('Success');
            res.status(200).json(result);
        }
        else {
            res.status(401).send('<h1> 400 Bad Request</h1>');
        }
    }
    catch (error) {
        res.status(400).send(`Request failed. ${error.message}`);
    }
});
exports.sendUkeoiReq = sendUkeoiReq;
