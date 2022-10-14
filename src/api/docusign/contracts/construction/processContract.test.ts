import {processContract} from './processContract';


/* TODO: Unit test, this test routine is not done */
it('should porcess contract', async () => {
  console.log(process.env.NODE_ENV);

  const result = await processContract({
    projEstimateId: '35',
    userCode: 'RPA03',
  },
  'created',
  );

  expect(result).toMatchSnapshot();
}, 30000);
