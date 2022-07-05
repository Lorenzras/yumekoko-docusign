"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUkeoiEnvelope = exports.generateUkeoiExcel = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const exceljs_1 = tslib_1.__importDefault(require("exceljs"));
/**
 * Populate 請負契約書 details
 *
 *
 * @param param0
 * @param outputType the type to return
 * @returns {Object} returns Xlsx by default
 */
const generateUkeoiExcel = ({ custName, custAddress, projId, projName, projLocation, repName, }, outputType = 'xlsx') => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const ukeoiFile = path_1.default.join(__dirname, 'assets', '請負契約書.xlsx');
    // Read excel file.
    let workbook = new exceljs_1.default.Workbook();
    workbook = yield workbook.xlsx.readFile(ukeoiFile);
    const ws = workbook.getWorksheet('契約書');
    // 工事番号
    ws.getCell('H2').value = projId;
    // 工事番号
    ws.getCell('K16').value = projLocation;
    // 工事名
    ['M2', 'G14']
        .forEach((c) => ws.getCell(c).value = projName);
    // 発注者
    ['G9', 'K41']
        .forEach((c) => ws.getCell(c).value = `${custName} 様`);
    // 発注者の住所
    ws.getCell('K40').value = custAddress;
    // 担当者名
    ws.getCell('K46').value = repName;
    switch (outputType) {
        case 'b64':
            return Buffer.from(yield workbook.xlsx.writeBuffer())
                .toString('base64');
        case 'buffer':
            return yield workbook.xlsx.writeBuffer();
        case 'xlsx':
            return workbook.xlsx;
        case 'binary':
            return Buffer.from(yield workbook.xlsx.writeBuffer())
                .toString('binary');
    }
});
exports.generateUkeoiExcel = generateUkeoiExcel;
/**
 * Creates envelope from file
 *
 * @param data
 * @param status Status of created envelope
 * @returns {EnvelopeDefinition} the envelope object
 */
const makeUkeoiEnvelope = (data, status = 'sent') => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { custEmail, custName, repName, repEmail, } = data;
    const customerSigner = {
        email: custEmail,
        name: custName,
        recipientId: '1',
        routingOrder: '2',
        tabs: {
            signHereTabs: [{
                    anchorString: '/sH/',
                    documentId: '1',
                    recipientId: '1',
                    pageNumber: '1',
                    tabLabel: 'sH',
                }],
        },
    };
    const companySigner = {
        email: repEmail,
        name: repName,
        recipientId: '2',
        routingOrder: '1',
        tabs: {
            signHereTabs: [{
                    anchorString: '/sC/',
                    documentId: '1',
                    recipientId: '2',
                    pageNumber: '1',
                    tabLabel: 'sC',
                }],
        },
    };
    const env = {
        emailSubject: '請負契約書です。サインをお願い致します。',
        documents: [
            {
                documentBase64: yield (0, exports.generateUkeoiExcel)(data, 'b64'),
                name: '請負契約書',
                fileExtension: 'xls',
                documentId: '1',
            },
        ],
        recipients: {
            signers: [customerSigner, companySigner],
        },
        status: status,
    };
    return env;
});
exports.makeUkeoiEnvelope = makeUkeoiEnvelope;
