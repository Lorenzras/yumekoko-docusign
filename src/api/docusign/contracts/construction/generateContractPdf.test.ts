import {getContractData} from '../../../kintone/getContractData';
import {generateContractPdf} from './generateContractPdf';
import fsPromise from 'fs/promises';
import fs from 'fs';
import path from 'path';
import {assetsDir} from '../config/file';

describe('Contract', () => {
  it('should generate contract in pdf', async () =>{
    const contractData = await getContractData({
      projEstimateId: '25',
      userCode: 'RPA03',
    });
    const pdf = await generateContractPdf(contractData, 'Uint8Array ');
    const savePath = path.join(assetsDir, 'test.pdf');

    await fsPromise.writeFile(savePath, pdf);

    expect(fs.existsSync(savePath)).toBe(true);
  });
});
