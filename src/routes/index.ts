import express from 'express';
import path from 'path';
import { promises as fsPromises } from 'fs';

const routes = express.Router();

routes.get('/processImage', (req, res) => {});

export default routes;
