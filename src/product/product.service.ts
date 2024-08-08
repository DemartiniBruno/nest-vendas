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
    // console.log(findedProduct)
    return findedProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    product.nome=updateProductDto.nome
    product.gtin=updateProductDto.gtin
    product.valor=updateProductDto.valor
    product.quantidadeDisponivel=updateProductDto.quantidadeDisponivel
    product.descricao=updateProductDto.descricao
    product.categoria=updateProductDto.categoria

    await this.productRepository.save(product);
    
    return await this.findOne(id);
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    
    return{
      idProduct: id,
      deletedProdut: await this.productRepository.remove(product)
    }
    
  }

  private verifyProduct(Product: Product){
    if(Product===null){
      throw new NotFoundException('Produto não encontrado')
    }
  }
}
