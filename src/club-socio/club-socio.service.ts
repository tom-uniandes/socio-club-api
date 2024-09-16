import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubEntity } from '../club/club.entity/club.entity';
import { SocioEntity } from '../socio/socio.entity/socio.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ClubSocioService {
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>
   
    @InjectRepository(SocioEntity)
    private readonly socioRepository: Repository<SocioEntity>

    async addMemberToClub(clubId: string, socioId: string): Promise<ClubEntity> {
        const socio: SocioEntity = await this.socioRepository.findOne({where: {id: socioId}});
        if (!socio)
            throw new BusinessLogicException("The socio with the given id was not found", BusinessError.NOT_FOUND);
        
        const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]})
        if (!club)
            throw new BusinessLogicException("The club with the given id was not found", BusinessError.NOT_FOUND);

        club.socios = [...club.socios, socio];
        return await this.socioRepository.save(club);
    }
}
