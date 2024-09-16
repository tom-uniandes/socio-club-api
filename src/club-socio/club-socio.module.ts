import { Module } from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from '../club/club.entity/club.entity';
import { SocioEntity } from '../socio/socio.entity/socio.entity';
import { ClubSocioController } from './club-socio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity, SocioEntity])],
  providers: [ClubSocioService],
  controllers: [ClubSocioController]
})
export class ClubSocioModule {}
