# image-provider
Provides scaled images

Service Endpoints:
/getImage --> is a Get service that takes the name of the image and its desired width and height, then returns the resized image

    Parameters:
	   img --> image name e.g. fjord
	   width --> the desired width of the image
	   height --> the desired height of the image

	Returns:
	   200 - The resized image if the image name specified exist in the server and the width and height are numbers greater than 0
       400 - If the image name specified does not exist in the server
	   500 - If the image can't be resized, ususally if the width and height are not valid 

Here is an example of a service call:

     http://localhost:3000/processImage?img=fjord&width=200&height=200

Technical Details:
- Resized image is returned if it already exist on the server
- Image is resized using sharp if the image with desired width and height does not exist yet, the resized image is then saved
    with file name format <imageName>_resized_w<width>h<height>.jpg
- If the image name passed as parameter does not exist on the server, an error message is sent
- If the image name does exist on the server but the width and height are not valid values, an error message is also sent	


Scripts Available:
     prettier - for code formatting
     jasmine - runs jasmine tests
     build - builds the project
     start - starts the server
     test - runs build and test
	 lint - runs lint script


