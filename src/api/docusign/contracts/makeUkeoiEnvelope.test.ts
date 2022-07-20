import {Xlsx} from 'exceljs';
import {
  makeUkeoiEnvelope,
  generateUkeoiExcel,
} from './makeUkeoiEnvelope';
import path from 'path';

const dummy : TUkeoiFields = {
  custEmail: 'lenzras@gmail.com',
  custName: 'ラス　ロレンズ',
  projId: '111',
  projName: 'ラス　練習　工事',
  custAddress: '愛知県豊橋市野依町字山中19－16レジデンスなかま612号室',
  projLocation: '愛知県豊橋市野依町字山中19－16レジデンスなかま111号',
  repName: '高橋　加奈',
  repEmail: 'cocosumo.rpa03@gmail.com',
};

describe('makeUkeoiEnvelope', () => {
  it('should be able to send envelope from file', async ()=>{
    const result = await makeUkeoiEnvelope(dummy);

    expect(result).toMatchSnapshot();
  });
  it('should save excelFile', async () => {
    const xlsx = await generateUkeoiExcel(dummy) as Xlsx;

    xlsx.writeFile(path.join(__dirname, '__TEST__', 'result.xlsx'));

    expect('xlsx').toMatchSnapshot();
  });
});
