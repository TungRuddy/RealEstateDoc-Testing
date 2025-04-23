import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotifyService } from '../../services/notify.service';
import { SharingImports } from '../../sharing.module';
import { MaterialImports } from '../../materials.module';
import { MatButton } from '@angular/material/button';
import { ItemcategoriesService } from '../../services/itemcategories.service';
import { ITEMCATEGORY } from '../../models/itemcategories.model';

@Component({
  selector: 'app-category-add',
  imports: [
    SharingImports,
    MaterialImports,
    MatDialogModule
  ],
  templateUrl: './itemcategories-add.component.html',
  styleUrl: './itemcategories-add.component.scss',
})
export class ItemsAddComponent implements OnInit, AfterViewInit, OnDestroy {
  form: FormGroup<any> = new FormGroup({});

  // readonly data = inject(MAT_DIALOG_DATA);

  constructor(
    private itemcategoriesService: ItemcategoriesService,
    private notifyService: NotifyService,
    private dialogRef: MatDialogRef<ItemsAddComponent>,
  ) {
    this.setForm(null);
  }
  ngOnInit(): void {
    
  }
  setForm(obj: ITEMCATEGORY | null) {
    this.form = new FormGroup({
      name: new FormControl(obj?.name || '', [Validators.required]),
    });
  }
  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
    
  }


  async save(btn: MatButton){
    btn.disabled = true;
    const res = await this.itemcategoriesService.save({
      ...this.form?.getRawValue(),
      created: new Date(),
    }).toPromise();
    if(res){
      this.notifyService.sendData('Category created successfully!');
      this.dialogRef.close(res);
      btn.disabled = false;
    } else {
      this.notifyService.sendData('Cant create category!');
      btn.disabled = false;
    }
  }

}
