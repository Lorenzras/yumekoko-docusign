import {generatePdfUkeoi} from './generatePdfUkeoi';
import fs from 'fs/promises';
import path from 'path';

describe('pdf', ()=>{
  it('should modify pdf', async ()=>{
    const result = await generatePdfUkeoi();
    await fs.writeFile(path.join(__dirname, 'assets', 'test.pdf'), result);
    expect('result').toMatchSnapshot();
  }, 30000);
});
