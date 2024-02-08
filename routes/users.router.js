const express = require('express');
const { faker } = require('@faker-js/faker')

const router = express.Router();

router.get('/', (req, res) => {

  const users = [];
  const { limit = 10, offset=0 } = req.query;

  for( let index=1; index <= limit; index++){
    users.push({
      id: index,
      name: faker.person.fullName,
      lastname: faker.person.lastName(),
      image: faker.image.urlPicsumPhotos()
    });
  }

  if( limit && offset){
    res.json({
      data: {
        limit,
        offset
      },
      users: users.slice(offset, limit)
    });
  }else{
    res.json({
      message: "No hay parametros"
    })
  }

})

module.exports = router;

