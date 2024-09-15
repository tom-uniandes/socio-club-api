import { ClubEntity } from "../../club/club.entity/club.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SocioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre_usuario: string;

    @Column()
    correo_electronico: string;

    @Column()
    fecha_nacimiento: Date;

    @ManyToMany(() => ClubEntity, club => club.socios)
    clubes: ClubEntity[];
}
