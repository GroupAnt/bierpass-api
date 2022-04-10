import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.repository.preload({ id, ...updateProductDto });

    if (!product) throw new NotFoundException(`Produto não encontrado`);

    return this.repository.save(product);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
