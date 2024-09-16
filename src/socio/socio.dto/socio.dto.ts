import {IsNotEmpty, IsString, IsDate} from 'class-validator';

export class SocioDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre_usuario: string;

    @IsString()
    @IsNotEmpty()
    readonly correo_electronico: string;

    @IsDate()
    @IsNotEmpty()
    readonly fecha_nacimiento: Date;
    
}

