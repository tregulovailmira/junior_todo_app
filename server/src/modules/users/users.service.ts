import {
  EntityRepository,
  Repository,
  getRepository,
  getManager,
} from 'typeorm';
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

    const newUser = await this.save(user);
    return newUser;
  }

  async findMany(limit, offset): Promise<object[]> {
    return await getManager()
      .createQueryBuilder(User, 'user')
      .limit(limit ? limit : 10)
      .offset(offset ? offset : 0)
      .getMany();
  }

  async findById(id): Promise<object> {
    return await this.findOne(id);
  }

  async updateUser(id, data): Promise<object> {
    await this.update(id, data);
    const updatedUser = await this.findOne(id);
    return updatedUser;
  }

  async deleteUser(id): Promise<void> {
    await this.delete(id);
  }

  async deleteMany(usersIds): Promise<void> {
    const deletedUsers = await this.findByIds(usersIds);
    await this.remove(deletedUsers);
  }
}
