import { Estado } from './estados';
export class TareaInputDTO {
    id: string = '';
    titulo: string = '';
    descripcion: string = '';
    estado?: Estado;
    fechaCreacionTarea: string = '';
    fechaCambioTarea: string = '';
    hobbyName: string = '';
    hobbyID: string = '';
}