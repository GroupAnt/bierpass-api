import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  findByFederalTaxId(federalTaxId: string): Promise<User> {
    return this.repository.findOne({ federalTaxId: federalTaxId });
  }

  findAll(user: User): Promise<User[]> {
    if (!user.hasAdmin) {
      throw new ForbiddenException('You are not allowed to fetch users');
    }

    return this.repository.find();
  }

  findOne(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const item = await this.repository.preload({ id: id, ...updateUserDto });
    if (!item) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    return this.repository.save(item);
  }
}
