import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ITEM } from '../../models/items.model';
import { ItemsService } from '../../services/items.service';
import { NotifyService } from '../../services/notify.service';
import { MaterialImports } from '../../materials.module';
import { SharingImports, UploadFileImports } from '../../sharing.module';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-items-detail',
  imports: [SharingImports, MaterialImports, UploadFileImports],
  templateUrl: './items-detail.component.html',
  styleUrl: './items-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  form!: FormGroup<any> | null;
  sub!: Subscription;

  uploader: FileUploader = new FileUploader({
    url: environment.api_url + '/files',
    isHTML5: true,
    autoUpload: false,
  });
  hasDropZoneOver!: boolean;
  interval: any;
  constructor(
    private itemsService: ItemsService,
    private filesService: FilesService,
    private notifyService: NotifyService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.form = null;
        if(this.sub) this.sub.unsubscribe();
        this.cd.detectChanges();
        this.sub = this.itemsService.get(params['id']).subscribe((res) => {
          if (res) {
            this.setForm(res);
            
          }
        });
      }
    });

    this.initUpload();
  }
  setForm(obj: ITEM | null) {
    this.form = new FormGroup({
      id: new FormControl(obj?.id),
      name: new FormControl(obj?.name || '', [Validators.required]),
      type: new FormControl(obj?.type || ''),
      itemcategory: new FormControl(obj?.itemcategory || ''),
      price: new FormControl(obj?.price || 0),
      sku: new FormControl(obj?.sku || ''),
      onhand: new FormControl(obj?.onhand || 0),
      files: new FormControl(obj?.files || []),
    });

    // this.uploader.onBuildItemForm = (item, form) => {
    //   form.append('id', this.form?.getRawValue().id);
    // };
    this.cd.detectChanges();
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}

  initUpload(){
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item: FileItem, response: string) => {
      let data = JSON.parse(response);
      this.uploader.clearQueue();
      const input = <HTMLInputElement> document.getElementById('uploader-input');
      if(input) input.value = '';
      console.log(data);
    };
    this.uploader.onAfterAddingFile = async (item: any) => {
      item.withCredentials = false;
      console.log(item);
      // const input = <any> document.getElementById('uploader-input');
      // const file = input.files[0];
      // console.log(file);
      this.form?.value.files.push(await this.filesService.save({
        ...item.file,
        created: new Date()
      }).toPromise());
      this.form?.controls['files'].setValue([...this.form?.value.files]);
      this.cd.detectChanges();
      // await this.itemsService.save({id: this.form?.value.id, files: this.form?.value.files}).toPromise();
      await this.itemsService.save(this.form?.getRawValue()).toPromise();
      this.uploader.clearQueue();
      const input = <HTMLInputElement> document.getElementById('uploader-input');
      if(input) input.value = '';
    };
    this.uploader.onWhenAddingFileFailed = (item, filter) => {
      
    };
  }

  async save(btn: MatButton) {
    btn.disabled = true;
    const res = await this.itemsService
      .save({
        ...this.form?.getRawValue(),
      })
      .toPromise();
    if (res) {
      this.setForm(res);
      this.notifyService.sendData('Saved successfully!');
      this.itemsService.sendData(res)
      btn.disabled = false;
    } else {
      this.notifyService.sendData('Cant save item!');
      btn.disabled = false;
    }
  }
}
