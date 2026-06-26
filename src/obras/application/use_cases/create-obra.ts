import type { IObrasRepository } from "../../domain/obras.interface.repository";
import { createObraSchema, type CreateObraRequest } from "../../domain/obras.dto.request";
import type { CreateObraResponse } from "../../domain/obras.dto.response";

export class CreateObraUseCase {
  constructor(private obrasRepository: IObrasRepository) {}

  async execute(data: CreateObraRequest): Promise<CreateObraResponse> {
    const parsedData = createObraSchema.parse({
      name: data.name,
      status: data.status,
    });

    const obra = await this.obrasRepository.create({
      ...parsedData,
      companyId: data.companyId,
    });

    return obra;
  }
}
