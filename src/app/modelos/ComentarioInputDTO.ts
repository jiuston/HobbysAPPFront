import { SimpleTareaInputDTO } from "./simpleTareaInputDTO";

export class ComentarioInputDTO {
    id: string = '';
    comentario: string = '';
    fecha: string = '';
    tarea: SimpleTareaInputDTO = new SimpleTareaInputDTO();
    fechaEditado: string = '';
    editado: boolean = false;
    imagenesURL: string[] = [];
    
}