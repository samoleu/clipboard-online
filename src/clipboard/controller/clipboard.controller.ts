import {
  Controller,
  Get,
  Post,
  Res,
  Param,
  Body,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ClipboardService } from '../service/clipboard.service';
import { Response } from 'express';
import { CreateClipboardDTO } from '../dto/create-clipboard.dto';
import { Clipboard } from '../model/clipboard.model';

@Controller('clipboard')
export class ClipboardController {
  constructor(private service: ClipboardService) {}

  @Get(':code')
  async findByCode(@Param('code') code: string, @Res() res: Response) {
    if (!code)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: "Envie o parametro 'code'" });

    const queryResponse = await this.service.findOne(code);

    if (queryResponse) return res.status(HttpStatus.OK).send(queryResponse);
    else return res.status(HttpStatus.NOT_FOUND).send();
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) body: CreateClipboardDTO,
    @Res() res: Response,
  ) {
    const request = new CreateClipboardDTO(
      body.content,
      body.singleVisualization,
    );
    const clipboardCreated: Clipboard = await this.service.create(
      request.toClipboardDTO(),
    );
    if (!clipboardCreated)
      return res.status(HttpStatus.BAD_REQUEST).send(clipboardCreated);
    return res.status(HttpStatus.CREATED).send(clipboardCreated);
  }
}
