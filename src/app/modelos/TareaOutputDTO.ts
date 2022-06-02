import { Estado } from './estados';
export class TareaOutputDTO {
    titulo: string = '';
    descripcion: string = '';
    estado?: Estado | null;
}