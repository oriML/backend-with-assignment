const fetch = require('node-fetch');
const config = require('../config/app');
const { logger } = require('../controllers/logger')


const fetchImages = async () => {
  
    logger.info("fire of the fetch call to 'photoApi' ")

    let fetchedImages= [];
    const calls = [
        await fetch( config.photosApi ),
        await fetch( config.imagesApi )
    ]
    

    await Promise.all([ calls[0].json(), calls[1].json() ])
    .then(res => {

        logger.info("api call succedded. Now checks the data from request ")

        let photosArray = [];
        let imagesArray = [];
            if( !Array.isArray(res) )
            {
                logger.error("api's couldn't fetch the images")
                throw new Error('api couldnt fetch images. try again later')
            }

            if( Array.isArray(res[0]) )//check if 'images' array request fulfilled
            {
                //if does, set the 'images' array with fulfilled data
                imagesArray = res[0][0]
               
            }
            else  logger.error("api of 'photos' failed. path is in config file")

            if( Array.isArray(res[1]) )//check if 'photos' array request fulfilled
            {
                //if does, set the 'photos' array with fulfilled data too
                photosArray = res[1][0]
                
            }
            else logger.error("api of 'images' failed. path is in config file")

        fetchedImages = imagesArray.concat(photosArray);
    })

    //set the api's arrays to one array with unique pattern
    const data = fetchedImages.reduce((prev, current) => 
            [ ...prev, 
            {
            url: current.url? current.url : current.path, title: current.title
            }
        ]
        , [])
    
        logger.info("api call and manipulations finished")
    return data;
}

module.exports = {
    fetchImages
};