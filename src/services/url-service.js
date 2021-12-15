const { URLs } = require('../models/db')

const { intToRadix64, radix64ToInt } = require("../services/radix64-service");

async function createRandomShortCode(link){
    const genCode = parseInt(Math.random() * 99999999999);
    const exists = await URLs.findOne({
        where: {
          id: genCode,
        },
      });
      if (exists) {
        // FIX: possible race condition if multiple servers vs 1 db
        return await createRandomShortCode(link);
      }
      return await URLs.create({
        id: genCode,
        shortCode: intToRadix64(genCode),
        link: link,
      });

}

async function createCustomeLink(shortCode, link){

    const id = radix64ToInt(shortCode)
    const exists = await URLs.findOne({
        where : {
            id: id
        }
    })
    if(exists){
        throw new Error('This shortCode [' + shortCode + '] already exists')
    }

    return await URLs.create({
        id:id,
        shortCode: shortCode,
        link: link
    })

}
async function findLongUrl(shortCode){
    const id = radix64ToInt(shortCode)
    return await URLs.findOne({
        where: {
            id:id
        }
    })
}
module.exports = {
    createRandomShortCode,
    createCustomeLink,
    findLongUrl,
  };
