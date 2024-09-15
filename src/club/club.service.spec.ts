import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClubService } from './club.service';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ClubEntity } from './club.entity/club.entity';
import { faker } from '@faker-js/faker';

describe('ClubService', () => {
  let service: ClubService;
  let repository: Repository<ClubEntity>;
  let clubsList: ClubEntity[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubService],
    }).compile();

    service = module.get<ClubService>(ClubService);
    repository = module.get<Repository<ClubEntity>>(getRepositoryToken(ClubEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    clubsList = [];
    for(let i = 0; i < 5; i++){
        const club: ClubEntity = await repository.save({
        nombre: faker.company.name(),
        fecha_fundacion: faker.date.anytime(),
        imagen: faker.image.url(),
        descripcion: faker.word.words(2)})
        clubsList.push(club);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all clubs', async () => {
    const clubs: ClubEntity[] = await service.findAll();
    expect(clubs).not.toBeNull();
    expect(clubs).toHaveLength(clubsList.length);
  });
});

