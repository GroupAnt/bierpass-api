import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.repository.create(createProductDto);
    return this.repository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Product> {
    return this.repository.findOne(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.repository.preload({ id, ...updateProductDto });

    if (!product) throw new NotFoundException(`Produto não encontrado`);

    return this.repository.save(product);
  }

  async remove(id: string): Promise<Product> {
    const product = await this.repository.findOne(id);
    
    if (!product) throw new NotFoundException(`Produto não encontrado`);

    try {
      await this.repository.delete(id);

      return product;
    } catch(error) {
      const violatesForeingKeyCode = '23503';

      if (error?.code === violatesForeingKeyCode) {
        throw new BadRequestException('Não é possível realizar a remoção');
      }
      
      throw new BadRequestException();
    }
  }
}
