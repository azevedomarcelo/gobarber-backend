import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    // expect(user.provider_id).toBe('132154656');
  });

  it('should not be able to create an existing email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com.br',
      password: '123456',
    });

    expect(createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com.br',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});
