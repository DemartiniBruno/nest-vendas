import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<Product>
  ){}
  
  async create(createProductDto: CreateProductDto) {
    const createdProduct = await this.productRepository.save(createProductDto)
    return createdProduct;
  }

  async findAll() {
    const findedProducts: Product[] = await this.productRepository.find();
    return findedProducts;
  }

  async findOne(id: string) {
    const findedProduct: Product = await this.productRepository.findOneBy({id})
    this.verifyProduct(findedProduct)
    return findedProduct;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }

  private verifyProduct(Product: Product){
    if(Product===null){
      throw new NotFoundException('Produto não encontrado')
    }
  }
}
