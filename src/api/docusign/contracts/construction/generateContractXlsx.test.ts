import {getContractData} from '../../../kintone/getContractData';
import {generateContractXlsx} from './generateContractXlsx';
import path from 'path';
import {assetsDir} from '../config/file';
import fs from 'fs';

describe('Generate Contract', () => {
  it('should generate contract in excel', async () => {
    const contractData = await getContractData({
      projEstimateId: '25',
      userCode: 'RPA03',
    });

    const savePath = path.join(assetsDir, 'contractTest.xlsx');

    // Delete existing test file as to not contaminate the test.
    if (fs.existsSync(savePath)) fs.unlinkSync(savePath);


    const xlsFile = await generateContractXlsx(contractData, 'xlsx');

    if (typeof xlsFile !== 'string' && 'writeFile' in xlsFile) {
      await xlsFile.writeFile(savePath);
    } else {
      throw new Error('Invalid output type for saving.');
    }

    expect(fs.existsSync(savePath)).toBe(true);
  });
});
