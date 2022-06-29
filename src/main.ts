import express from 'express';
import docusignRoute from './route/docusignRoute';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/docusign', docusignRoute);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
