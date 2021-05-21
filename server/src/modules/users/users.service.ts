import { Repository, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createAndSave(user: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create();
    newUser.name = user.name;
    newUser.email = user.email;
    if (user.role) {
      newUser.role = user.role;
    }
    newUser.password = user.password;
    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async findMany(
    options?: FindManyOptions<UserEntity>,
  ): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find(options);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async findById(id): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOne(id);
    if (foundUser) {
      return foundUser;
    }
    throw new NotFoundException('User not found');
  }

  public async updateUser(id, data): Promise<UserEntity> {
    const { affected } = await this.userRepository.update(id, data);
    if (affected === 0) {
      throw new BadRequestException("Can't update user with this id");
    }
    return await this.userRepository.findOne(id);
  }

  public async deleteUser(id): Promise<void> {
    const { affected } = await this.userRepository.delete(id);
    if (affected === 0) {
      throw new BadRequestException("Can't update user with this id");
    }
  }

  public async deleteMany(usersIds): Promise<void> {
    try {
      await this.userRepository.delete(usersIds);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
