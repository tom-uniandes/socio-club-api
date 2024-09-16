import { Test, TestingModule } from '@nestjs/testing';
import { SocioService } from './socio.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SocioEntity } from './socio.entity/socio.entity';
import { faker } from '@faker-js/faker';

describe('SocioService', () => {
  let service: SocioService;
  let repository: Repository<SocioEntity>;
  let sociosList: SocioEntity[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SocioService],
    }).compile();

    service = module.get<SocioService>(SocioService);
    repository = module.get<Repository<SocioEntity>>(getRepositoryToken(SocioEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    sociosList = [];
    for(let i = 0; i < 5; i++){
        const socio: SocioEntity = await repository.save({
        nombre_usuario: faker.person.firstName(),
        correo_electronico: faker.internet.email(),
        fecha_nacimiento: faker.date.anytime()})
        sociosList.push(socio);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all socios', async () => {
    const socios: SocioEntity[] = await service.findAll();
    expect(socios).not.toBeNull();
    expect(socios).toHaveLength(sociosList.length);
  });

  it('findOne should return a socio by id', async () => {
    const storedSocio: SocioEntity = sociosList[0];
    const socio: SocioEntity = await service.findOne(storedSocio.id);
    expect(socio).not.toBeNull();
    expect(socio.nombre_usuario).toEqual(storedSocio.nombre_usuario)
    expect(socio.correo_electronico).toEqual(storedSocio.correo_electronico)
    expect(socio.fecha_nacimiento).toEqual(storedSocio.fecha_nacimiento)
  });

  it('findOne should throw an exception for an invalid socio', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The socio with the given id was not found")
  });

  it('create should return a new socio', async () => {
    const socio: SocioEntity = {
      id: "",
      nombre_usuario: faker.person.firstName(),
      correo_electronico: faker.internet.email(),
      fecha_nacimiento: faker.date.anytime(),
      clubes: []
    }
 
    const newSocio: SocioEntity = await service.create(socio);
    expect(newSocio).not.toBeNull();
 
    const storedSocio: SocioEntity = await repository.findOne({where: {id: newSocio.id}})
    expect(socio).not.toBeNull();
    expect(socio.nombre_usuario).toEqual(storedSocio.nombre_usuario)
    expect(socio.correo_electronico).toEqual(storedSocio.correo_electronico)
    expect(socio.fecha_nacimiento).toEqual(storedSocio.fecha_nacimiento)
  });
});
