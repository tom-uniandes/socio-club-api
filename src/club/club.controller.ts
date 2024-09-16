import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ClubService } from './club.service';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubController {constructor(private readonly clubService: ClubService) {}}
