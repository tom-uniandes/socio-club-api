import {IsNotEmpty, IsString} from 'class-validator';

export class SocioDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre_usuario: string;

    @IsString()
    @IsNotEmpty()
    readonly correo_electronico: string;

    @IsString()
    @IsNotEmpty()
    readonly fecha_nacimiento: string;

}

