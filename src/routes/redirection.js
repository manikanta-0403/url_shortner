const { Router } = require('express')
const { findLongUrl } = require('../services/url-service')

const route = Router()


route.get('/:shortCode', async (req, res) => {

    const shortCode = req.params.shortCode;

    const url = await findLongUrl(shortCode);

    if(url){
        return res.redirect(url.link);
    } else {
        return res.redirect("www.google.com");
    }
})

module.exports = route