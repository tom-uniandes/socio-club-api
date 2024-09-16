import {IsNotEmpty, IsString, IsDate} from 'class-validator';
export class ClubDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsDate()
    @IsNotEmpty()
    readonly fecha_fundacion: string;

    @IsString()
    @IsNotEmpty()
    readonly imagen: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;
}
