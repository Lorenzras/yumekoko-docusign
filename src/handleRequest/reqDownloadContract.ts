
import {RequestHandler} from 'express';
import {Xlsx} from 'exceljs';
import {getContractData} from '../api/kintone/getContractData';
import {
  generateContractXlsx, generateContractPdf,
} from '../api/docusign/contracts/';


export const reqDownloadContract: RequestHandler = async (req, res) => {
  try {
    const {
      projEstimateId,
      userCode = 'RPA03',
      fileType,
    } = req.query as ReqDownloadParams;
    console.log('hello', req.query);

    let file;

    if (!projEstimateId) throw new Error('projEstimateId not defined');

    const contractData = await getContractData({
      projEstimateId,
      userCode: userCode,
    });

    const {projName, envelopeStatus} = contractData;
    switch (fileType) {
      case 'xlsx':
        file = await generateContractXlsx(contractData, 'xlsx') as Xlsx;

        res.attachment(`請負契約書 - ${projName}.xlsx`)
          .status(200);
        await file.write(res);
        break;
      case 'pdf':
        console.log('Generating pdf');
        file = await generateContractPdf(contractData, 'base64');

        res.status(200).json({
          // Array here to accomodate multi-documents in the future
          documents: [file],
          envelopeStatus,
        });
    }
    res.end();
  } catch (e: any) {
    res.status(501).send(`エラーが発生しました。管理者をご連絡ください。${e.message}`);
  }
};
