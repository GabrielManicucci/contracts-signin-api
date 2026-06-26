import type { IObrasRepository } from "../../domain/obras.interface.repository";
import type { CreateObraResponse } from "../../domain/obras.dto.response";

export class ListObrasUseCase {
  constructor(private obrasRepository: IObrasRepository) {}

  async execute(companyId: string): Promise<CreateObraResponse[]> {
    const obras = await this.obrasRepository.findByCompanyId(companyId);
    return obras;
  }
}
