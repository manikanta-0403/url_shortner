const { Router } = require('express')
const { 
    createRandomShortCode,
    createCustomeLink,
    findLongUrl
} = require('../services/url-service')

const route = Router()

route.get('/', (request, response) => {
    response.send('find it fast')
})

/**
 * POST request to /api/links
 * BODY
 *      link: 
 */
route.post('/', async (req, res) => {

    const link = req.body.link;
    const shortCode = req.body.shortCode

    // TODO: validate link must exist

    if(!shortCode){
        const url = await createRandomShortCode(link)
        return res.json(url)
    }

    try{
        const url = await createCustomeLink(shortCode, link);
        return res.json(url);
    } catch (e) {
        return res.status(400).json({error: e.message});
    }

});

/**
 * GET 
 * /api/links/{shortCode}
 * RESPONSE
 *      link:
 * 
 */
route.get('/:shortCode', async (req, res) => {

    const shortCode = req.params.shortCode
    const url = await findLongUrl(shortCode);

    if (url) {
        return res.json(url);
      } else {
        return res.status(404).json({ error: "No such shortcode created" });
      }

});

module.exports =  route