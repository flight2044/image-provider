import express from 'express';
import path from 'path';
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';

interface ImageDetails {
  imageName: string;
  width: number;
  height: number;
  imagePath: string;
  outputImage: string;
}

const resize = async (imageDetails: ImageDetails, res: express.Response) => {
  try {
    let response = await sharp(imageDetails.imagePath)
      .resize(imageDetails.width, imageDetails.height)
      .toFile(imageDetails.outputImage, function (err) {
        console.log('Processing image ' + imageDetails.outputImage);
        res.status(200).sendFile(imageDetails.outputImage);
      });
    console.log('Done processing');
  } catch (error) {
    console.error(`Could not convert image to requested size: ${error}`);
    res.status(500).send("Image can't be resized!");
  }
};

const getImage = async (imageDetails: ImageDetails, res: express.Response) => {
  try {
    const myFile = await fsPromises.access(imageDetails.imagePath);
    getResizedImage(imageDetails, res);
  } catch (error) {
    console.log('Original image file does not exist.' + imageDetails.imagePath);
    res.status(400).send("Image can't be found!");
  }
};

const getResizedImage = async (
  imageDetails: ImageDetails,
  res: express.Response
) => {
  try {
    const myFile = await fsPromises.access(imageDetails.outputImage);
    console.log('Resized file exists so just return');
    res.status(200).sendFile(imageDetails.outputImage);
  } catch (error) {
    console.log('Resized file does not exist, so resize original file.');
    resize(imageDetails, res);
  }
};

const imgProcessor = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const imageName: string = req.query.img as string;
  const wt: string = req.query.width as string;
  const ht: string = req.query.height as string;

  const imagePath = path.join(__dirname, `../assets/${imageName}.jpg`);
  const outputImage = path.join(
    __dirname,
    `../assets/${imageName}_resized_w${wt}h${ht}.jpg`
  );

  const imgDetails: ImageDetails = {
    imageName: imageName as string,
    width: parseInt(wt),
    height: parseInt(ht),
    imagePath: imagePath,
    outputImage: outputImage,
  };
  getImage(imgDetails, res);
};

export default imgProcessor;
