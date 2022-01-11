const catchAsync = require('../utils/catchAsync');
const imgService = require('../services/imgService')

// ------ fetch function. Sends the request automatically to custom catch errors function ------

const getImages = catchAsync(async (req, res) => {

    const images = await imgService.fetchImages()
        
    res.status(200).json(images);

});

module.exports = {
    getImages
};