import { BadGatewayException, BadRequestException, Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { StatusEnum } from './enum/status.enum';
import { ItensPedido } from './entities/itens-pedido.entity';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class PedidoService {
  constructor(
    @Inject('PEDIDO_REPOSITORY')
    private readonly pedidoRepository: Repository<Pedido>,

    @Inject('ITEM_PEDIDO_REPOSITORY')
    private readonly itemPedidoRepository: Repository<ItensPedido>,

    private readonly userService: UserService,

    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<Product>,

    private readonly productService: ProductService
  ) { }

  private somaTotal(itens: ItensPedido[]){
    return itens.reduce(
      (total, itemPedido)=>total+(itemPedido.precoVenda*itemPedido.quantidade),0
    )
  }

  private verifyPedido(pedido) {
    if (pedido === null) {
      throw new NotFoundException('Pedido não encontrado')
    }
  }

  private verifyQuantidade(quantidade, quantidadeDisponivel) {
    if (quantidade > quantidadeDisponivel) {
      throw new BadRequestException(`Quantidade: ${quantidade} maior do que a disponível: ${quantidadeDisponivel}`)
    }
  }


  private async criaItemPedido(listaItens: CreatePedidoDto){
    let itens:ItensPedido[] = []

    for (const item of listaItens.itensPedido){
      const produto = await this.productService.findOne(item.productId)

      this.verifyQuantidade(item.quantidade, produto.quantidadeDisponivel)

      const itemPedido = new ItensPedido
      itemPedido.product = item.productId
      itemPedido.precoVenda = produto.valor
      itemPedido.quantidade=item.quantidade
    
      itens.push(itemPedido)
    }

    return itens
  }

  //------------------------------------------------------
  async create(userId, listaItens: CreatePedidoDto, ) { //Verificar o tipo desse listaItens para passar o itensPedido direto do construtor
    const user = await this.userService.findOne(userId)

    const itens = await this.criaItemPedido(listaItens)
    
    const pedido = new Pedido
    pedido.user = user
    pedido.status = StatusEnum.PROCESSING
    pedido.valorTotal = this.somaTotal(itens)
    pedido.itensPedido = itens
    
    return this.pedidoRepository.save(pedido);
  }
  //------------------------------------------------------

  async findAll() {
    return this.pedidoRepository.find({});
  }

  async findOne(id: string) {
    const pedido = await this.pedidoRepository.findOne({
      relations:{
        itensPedido:true,

      },
      where: {
        id: id
      }
    })

    this.verifyPedido(pedido);

    return pedido;
  }


  // private async baixandoQuantidade(pedido: Pedido){
    
  //   for(const item of pedido.itensPedido){
  //     const produto = await this.productService.findOne(item.ItensPedido.id)
  //     console.log(produto)
  //   }

  // }

  async update(id: string, updatePedidoDto: UpdatePedidoDto) {
    /*
      Por enquanto vou fazer a alteração apenas do status
    */
    const pedido = await this.pedidoRepository.findOne({
      loadEagerRelations:true,
      relations:{
        itensPedido:true
      },
      where:{id:id}
    })
    console.log(pedido)

    // pedido.status = updatePedidoDto.status
    // if(pedido.status===StatusEnum.COMPLETED){
    //   // this.baixandoQuantidade(pedido)
    //   for (const item of pedido.itensPedido){
    //     // const produto = await this.productService.findOne(item.id)
    //     // console.log(produto)
    //   }
    // }

    // await this.pedidoRepository.save(pedido)

    // return await this.findOne(id)

  }

  async remove(id: string) {

    const pedido = await this.findOne(id)

    return await this.pedidoRepository.remove(pedido)
  }
}
