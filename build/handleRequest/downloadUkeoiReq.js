"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadUkeoiReq = void 0;
const tslib_1 = require("tslib");
const getUkeoiData_1 = require("../lib/contracts/getUkeoiData");
const generateXlsxUkeoi_1 = require("../lib/contracts/generateXlsxUkeoi");
const downloadUkeoiReq = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const projId = req.query.projId;
    console.log('Received project id', projId);
    if (projId) {
        const data = yield (0, getUkeoiData_1.getUkeoiData)(projId);
        const file = yield (0, generateXlsxUkeoi_1.generateXlsxUkeoi)(data, 'xlsx');
        res.attachment(`請負契約書 - ${data.projName}.xlsx`)
            .status(200);
        yield file.write(res);
        res.end();
    }
    else {
        res.status(501).send('Invalid project id.').end();
    }
});
exports.downloadUkeoiReq = downloadUkeoiReq;
