import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/provider/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    });
    await sendForgotPasswordEmail.execute({
      email: 'jhondoe@email.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'jhondoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateTokens = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'jhondoe@email.com',
    });

    expect(generateTokens).toHaveBeenCalledWith(user.id);
  });
});
