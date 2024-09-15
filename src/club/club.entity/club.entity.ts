import { SocioEntity } from "../../socio/socio.entity/socio.entity";
import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClubEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    fecha_fundacion: Date;

    @Column()
    imagen: string;

    @Column()
    descripcion: string;

    @ManyToMany(() => SocioEntity, socio => socio.clubes)
    @JoinTable()
    socios: SocioEntity[];
}
