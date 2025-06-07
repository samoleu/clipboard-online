import { CreateClipboardDTO } from '../dto/create-clipboard.dto';
import { ClipboardDTO } from '../dto/clipboard.dto';

export class ClipboardAdapter {
  static fromCreateDto(dto: CreateClipboardDTO): ClipboardDTO {
    const clipboardDTO = new ClipboardDTO();
    clipboardDTO.content = dto.content;
    clipboardDTO.singleVisualization = dto.singleVisualization;
    return clipboardDTO;
  }
}
