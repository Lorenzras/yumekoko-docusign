import express from 'express';
import docusignSend from './route/docusign';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/docusign', docusignSend);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
