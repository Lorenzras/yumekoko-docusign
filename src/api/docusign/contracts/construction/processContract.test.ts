import {processContract} from './processContract';


it('should porcess contract', async () => {
  console.log(process.env.NODE_ENV);

  const result = await processContract({
    projEstimateId: '74',
    userCode: 'RPA03',
    signMethod: 'wetInk',
  },
  'sent',
  );

  expect(result).toMatchSnapshot();
}, 30000);
