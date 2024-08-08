import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { StatusEnum } from './enum/status.enum';
import { ItensPedido } from './entities/itens-pedido.entity';
import { NotFoundError } from 'rxjs';

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

  private verifyPedido(pedido) {
    if(pedido===null){
      throw new NotAcceptableException('Pedido não encontrado');
    }
  }

  async create(userId, createPedidoDto: CreatePedidoDto[]) {
    this.userService.verifyUser(userId)

    const createdPedido = await this.pedidoRepository.save({
      user: userId,
      status: StatusEnum.PROCESSING,
      valorTotal: this.somaTotal(createPedidoDto)
    })


    createPedidoDto.forEach((item) => {

      const createdItemPedido = this.itemPedidoRepository.save({
        pedido: createdPedido.id,
        product: item.productId,
        precoVenda: item.precoVenda,
        quantidade: item.quantidade
      })

    })
  }

  async findAll() {
    return this.pedidoRepository.find({});
  }

  async findOne(id: string) {
    const pedido = await this.pedidoRepository.findOne({
      where: {
        id: id
      },
      relations: {
        itensPedido: true
      }
    })

    this.verifyPedido(pedido);

    return pedido;
  }


  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
