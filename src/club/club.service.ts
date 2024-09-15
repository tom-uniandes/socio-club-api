import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubEntity } from './club.entity/club.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ClubService {
    constructor(
        @InjectRepository(ClubEntity)
        private readonly clubRepository: Repository<ClubEntity>
    ){}

    async findAll(): Promise<ClubEntity[]> {
        return await this.clubRepository.find({ relations: ["socios"] });
    }

    async findOne(id: string): Promise<ClubEntity> {
        const club: ClubEntity = await this.clubRepository.findOne({where: {id}, relations: ["socios"] } );
        if (!club)
          throw new BusinessLogicException("The club with the given id was not found", BusinessError.NOT_FOUND);
   
        return club;
    }

    async create(club: ClubEntity): Promise<ClubEntity> {
        this.validateDescription(club.descripcion);
        return await this.clubRepository.save(club);
    }

    async update(id: string, club: ClubEntity): Promise<ClubEntity> {
        const persistedClub: ClubEntity = await this.clubRepository.findOne({where:{id}});
        if (!persistedClub)
          throw new BusinessLogicException("The club with the given id was not found", BusinessError.NOT_FOUND);
        
        this.validateDescription(club.descripcion);
        return await this.clubRepository.save({...persistedClub, ...club});
    }

    async delete(id: string) {
        const club: ClubEntity = await this.clubRepository.findOne({where:{id}});
        if (!club)
          throw new BusinessLogicException("The club with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.clubRepository.remove(club);
    }

    validateDescription(description: string) {
        if (description.length > 100) {
            throw new BusinessLogicException(
                "The description can not exceed 100 characters.", 
                BusinessError.BAD_REQUEST
            );
        }
    }
}
