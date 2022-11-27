import {Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {editFileName, imageFileFilter} from "../helpers/file-upload.helper";
import {diskStorage} from 'multer';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post('/single')
  @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: process.env.UPLOADED_FILES_DESTINATION,
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,

        limits: {
          fileSize: Math.pow(1024, 2) // 1MB
        }

      }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      filename: file.filename,
      destination: process.env.UPLOADED_FILES_DESTINATION,
    };
    return response;
  }

  @Post('/multiple')
  @UseInterceptors(
      FilesInterceptor('image', 20, {
        storage: diskStorage({
          destination: process.env.UPLOADED_FILES_DESTINATION,
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        filename: file.filename,
        destination: process.env.UPLOADED_FILES_DESTINATION,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get(':filepath')
  seeUploadedFile(@Param('filepath') image, @Res() res) {
    return res.sendFile(image, {root: process.env.UPLOADED_FILES_DESTINATION});
  }


}
