import express from 'express';
import path from 'path';
import { promises as fsPromises } from 'fs';

const routes = express.Router();

routes.get('/getImage', (req: express.Request, res: express.Response) => {});

export default routes;
