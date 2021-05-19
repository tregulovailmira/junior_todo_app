import {
  EntityRepository,
  Repository,
  getRepository,
  getManager,
} from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../../entity/User';
import { Role } from '../../entity/Role';

@EntityRepository(User)
export class UsersService extends Repository<User> {
  async createAndSave(name, email, password, roleId): Promise<object> {
    const user = new User();
    const roleRepository = getRepository(Role);

    user.name = name;
    user.email = email;
    user.role = await roleRepository.findOne({ id: roleId || 2 });
    user.password = password;

    try {
      const newUser = await this.save(user);
      return newUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findMany(limit, offset): Promise<object[]> {
    return await getManager()
      .createQueryBuilder(User, 'user')
      .limit(limit ? limit : 10)
      .offset(offset ? offset : 0)
      .getMany();
  }

  async findById(id): Promise<object> {
    const foundUser = await this.findOne(id);
    if (foundUser) {
      return foundUser;
    }
    throw new NotFoundException('User not found');
  }

  async updateUser(id, data): Promise<object> {
    const { affected } = await this.update(id, data);
    if (affected === 0) {
      throw new BadRequestException("Can't update user with this id");
    }
    return await this.findOne(id);
  }

  async deleteUser(id): Promise<void> {
    const { affected } = await this.delete(id);
    if (affected === 0) {
      throw new BadRequestException("Can't update user with this id");
    }
  }

  async deleteMany(usersIds): Promise<void> {
    const deletedUsers = await this.findByIds(usersIds);
    await this.remove(deletedUsers);
  }
}
