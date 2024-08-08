import { Inject, Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { StatusEnum } from './enum/status.enum';
import { ItensPedido } from './entities/itens-pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @Inject('PEDIDO_REPOSITORY')
    private readonly pedidoRepository: Repository<Pedido>,

    @Inject('ITEM_PEDIDO_REPOSITORY')
    private readonly itemPedidoRepository: Repository<ItensPedido>,

    private readonly userService: UserService
  ) { }

  private somaTotal(listaProdutos: CreatePedidoDto[]) {
    let valor_total: number = 0

    listaProdutos.forEach((item) => {
      valor_total += Number(item.quantidade) * Number(item.precoVenda)
      // console.log(valor_total)
    })

    return valor_total
  }

  async create(userId, createPedidoDto: CreatePedidoDto[]) {
    this.userService.verifyUser(userId)

    // const createPedido = new Pedido

    // createPedido.status = StatusEnum.PROCESSING
    // createPedido.valorTotal = this.somaTotal(createPedidoDto)
    // createPedido.user = userId

    // this.pedidoRepository.save(createPedido)

    const createdPedido = await this.pedidoRepository.save({
      user: userId,
      status: StatusEnum.PROCESSING,
      valorTotal: this.somaTotal(createPedidoDto)
    })


    createPedidoDto.forEach((item) => {
      // const itemPedido = new ItensPedido

      // itemPedido.pedido = createdPedido.id
      // itemPedido.product = item.productId
      // itemPedido.precoVenda = item.precoVenda
      // itemPedido.quantidade = item.quantidade

      const createdItemPedido = this.itemPedidoRepository.save({
        pedido: createdPedido.id,
        product: item.productId,
        precoVenda: item.precoVenda,
        quantidade: item.quantidade
      })

      // console.log(itemPedido)
      // this.itemPedidoRepository.save(itemPedido)
      // this.pedidoRepository.save(itemPedido)
    })
  }

  findAll() {
    return this.pedidoRepository.find({
      relations:{
        itensPedido:true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
