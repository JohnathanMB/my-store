const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')
const ProductModel = require('./../models/product.model');

class ProductsService {

  async create(data) {

    const product = new ProductModel({
      _id: faker.string.uuid(),
      ...data
    })

    return await product.save();
  }

  async find() {
    return ProductModel.find();
  }

  async findOne(id) {
    ProductModel.findOne
    const product = await ProductModel.findById(id);
    if (Object.is(product, null)) {
      throw boom.notFound("Product Not Found");
    }
    if (product.isBlock){
      throw boom.conflict("Product is blocked")
    }

    return product;
  }

  async update(id, changes) {
    const updated = await ProductModel.findByIdAndUpdate(id, {$set: changes})

    if (updated === null ) {
      throw boom.notFound("Product Not Found");
    }

    return updated;
  }

  async delete(id) {
    const deleted = await ProductModel.findByIdAndDelete(id);

    if (deleted === null ) {
      throw boom.notFound("Product Not Found");
    }

    return deleted;
  }

}

module.exports = ProductsService;
