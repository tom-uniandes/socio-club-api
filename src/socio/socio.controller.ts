import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { SocioService } from './socio.service';

@Controller('members')
@UseInterceptors(BusinessErrorsInterceptor)
export class SocioController {constructor(private readonly socioService: SocioService) {}}
