/* eslint-disable no-empty-function */
import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/provider/CachProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id, year, month, day,
  }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover('ksauhdak');

    console.log(cacheData);

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id, year, month, day,
    });

    // await this.cacheProvider.save('ksauhdak', 'lsdjdf');

    return appointments;
  }
}

export default ListProviderAppointmentsService;
