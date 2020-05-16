import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/provider/CachProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUserRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProviderService(fakeUserRepository, fakeCacheProvider);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com.br',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Jhon Trois',
      email: 'jhontrois@email.com.br',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Jhon Qua',
      email: 'jhonqua@email.com.br',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([
      user1, user2,
    ]);
  });
});
