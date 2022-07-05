"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const docusignSend_1 = tslib_1.__importDefault(require("./route/docusignSend"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use('/docusign/send', docusignSend_1.default);
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
