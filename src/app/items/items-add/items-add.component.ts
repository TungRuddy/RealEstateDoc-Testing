import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITEM } from '../../models/items.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotifyService } from '../../services/notify.service';
import { SharingImports } from '../../sharing.module';
import { MaterialImports } from '../../materials.module';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-items-add',
  imports: [
    SharingImports,
    MaterialImports,
    MatDialogModule
  ],
  templateUrl: './items-add.component.html',
  styleUrl: './items-add.component.scss',
})
export class ItemsAddComponent implements OnInit, AfterViewInit, OnDestroy {
  form: FormGroup<any> = new FormGroup({});

  // readonly data = inject(MAT_DIALOG_DATA);

  constructor(
    private itemsService: ItemsService,
    private notifyService: NotifyService,
    private dialogRef: MatDialogRef<ItemsAddComponent>,
  ) {
    this.setForm(null);
  }
  ngOnInit(): void {
    
  }
  setForm(obj: ITEM | null) {
    this.form = new FormGroup({
      name: new FormControl(obj?.name || '', [Validators.required]),
      type: new FormControl(obj?.type || ''),
      itemcategory: new FormControl(obj?.itemcategory || ''),
      price: new FormControl(obj?.price || 0),
      sku: new FormControl(obj?.sku || ''),
      onhand: new FormControl(obj?.onhand || 0),
      files: new FormControl(obj?.files || []),

    });
  }
  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
    
  }


  async save(btn: MatButton){
    btn.disabled = true;
    const res = await this.itemsService.save({
      ...this.form?.getRawValue(),
      created: new Date(),
    }).toPromise();
    if(res){
      this.notifyService.sendData('Item created successfully!');
      this.dialogRef.close(res);
      btn.disabled = false;
    } else {
      this.notifyService.sendData('Cant create item!');
      btn.disabled = false;
    }
  }

}
