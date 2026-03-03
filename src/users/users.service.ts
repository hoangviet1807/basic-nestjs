import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(dto: CreateUserDto) {
    const newUser = {
      id: Date.now(),
      ...dto,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, dto: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) return null;

    Object.assign(user, dto);
    return user;
  }

  remove(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    return { deleted: true };
  }
}
