import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/provider/CachProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider, fakeCacheProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an existing email', async () => {
    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com.br',
      password: '123456',
    });

    await expect(createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com.br',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});
