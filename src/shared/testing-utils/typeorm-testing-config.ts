import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from '../../club/club.entity/club.entity';
import { SocioEntity } from '../../socio/socio.entity/socio.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [ClubEntity, SocioEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([ClubEntity, SocioEntity]),
];