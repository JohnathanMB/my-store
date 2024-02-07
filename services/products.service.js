const { faker } = require('@faker-js/faker')

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const size = 100;

    for (let index = 1; index <= size; index++) {
      this.products.push({
        id: ""+index,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url()
      });
    }
  }

  create() {

  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(item => item.id == id);
  }

  update() {

  }

  delete() {

  }

}

module.exports = ProductsService;
