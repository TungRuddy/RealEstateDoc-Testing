import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FileUploadModule } from 'ng2-file-upload';
import { PipeFileSize } from "./pipes/fileSize.pipe";


export const SharingImports = [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
]

export const UploadFileImports = [
    FileUploadModule,
    PipeFileSize
]