export class ClipboardDTO {
  code: string;
  content: string;
  singleVisualization: boolean;
  createdAt: Date;
  expiresAt?: Date;
  expirationTime?: string;
}
