import {generatePdfUkeoi} from './generatePdfUkeoi';
import fs from 'fs/promises';
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

describe('pdf', ()=>{
  it('should modify pdf', async ()=>{
    const result = await generatePdfUkeoi(dummy, 'img');
    await fs.writeFile(path.join(__dirname, 'assets', 'test.pdf'), result);
    expect('result').toMatchSnapshot();
  }, 30000);
});
