import { IsBoolean, IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateClipboardDTO {
  @IsNotEmpty({ message: 'Content cannot be empty' })
  @IsString({ message: 'Content is a string parameter' })
  content: string;

  @IsNotEmpty({ message: 'singleVisualization cannot be empty' })
  @IsBoolean({ message: 'singleVisualization is a boolean parameter' })
  singleVisualization: boolean;

  @IsOptional()
  @IsString({ message: 'expirationTime is a string parameter' })
  @IsIn(['1h', '6h', '12h', '1d', '3d', '7d'], { 
    message: 'expirationTime must be one of: 1h, 6h, 12h, 1d, 3d, 7d' 
  })
  expirationTime?: string;

  constructor(content: string, singleVisualization: boolean, expirationTime?: string) {
    this.content = content;
    this.singleVisualization = singleVisualization;
    this.expirationTime = expirationTime;
  }
}