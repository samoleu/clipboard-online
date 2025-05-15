import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ClipboardDTO } from './clipboard.dto';

export class CreateClipboardDTO {
  @IsNotEmpty({ message: 'Content cannot be empty' })
  @IsString({ message: 'Content is a string parameter' })
  content: string;

  @IsNotEmpty({ message: 'singleVisualization cannot be empty' })
  @IsBoolean({ message: 'singleVisualization is a boolean parameter' })
  singleVisualization: boolean;

  constructor(content: string, singleVisualization: boolean) {
    this.content = content;
    this.singleVisualization = singleVisualization;
  }

  toClipboardDTO() {
    const clipboardDTO = new ClipboardDTO();
    clipboardDTO.content = this.content;
    clipboardDTO.singleVisualization = this.singleVisualization;
    return clipboardDTO;
  }
}
