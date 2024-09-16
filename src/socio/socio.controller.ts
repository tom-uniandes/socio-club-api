import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { SocioService } from './socio.service';
import { SocioDto } from './socio.dto/socio.dto';
import { SocioEntity } from './socio.entity/socio.entity';

@Controller('members')
@UseInterceptors(BusinessErrorsInterceptor)
export class SocioController {constructor(private readonly socioService: SocioService) {}

    @Get()
    async findAll() {
        return await this.socioService.findAll();
    }

    @Get(':memberId')
    async findOne(@Param('memeberId') memeberId: string) {
        return await this.socioService.findOne(memeberId);
    }

    @Post()
    async create(@Body() socioDto: SocioDto) {
        const socio: SocioEntity = plainToInstance(SocioEntity, socioDto);
        return await this.socioService.create(socio);
    }

    @Put(':memberId')
        async update(@Param('memberId') memberId: string, @Body() socioDto: SocioDto) {
        const socio: SocioEntity = plainToInstance(SocioEntity, socioDto);
        return await this.socioService.update(memberId, socio);
    }

    @Delete(':memberId')
    @HttpCode(204)
        async delete(@Param('memberId') memberId: string) {
        return await this.socioService.delete(memberId);
    }

}
