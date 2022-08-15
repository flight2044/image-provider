import express from 'express';
import routes from './routes/index';
import imgProcessor from './utilities/imageProcessor';

const app = express();
const port = 3000;

const mw = [imgProcessor, routes];

app.use('/', mw);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
