import { SimpleTareaInputDTO } from "./simpleTareaInputDTO";

export class GastoInputDTO {
    id: string = '';
    concepto: string = '';
    cantidad: number = 0.0;
    fechaGasto: string = '';
    comentario: string = '';
    imagenesURL: string[] = [];
    tarea: SimpleTareaInputDTO = new SimpleTareaInputDTO();
}