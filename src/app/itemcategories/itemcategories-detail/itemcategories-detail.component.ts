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
import { NotifyService } from '../../services/notify.service';
import { MaterialImports } from '../../materials.module';
import { SharingImports, UploadFileImports } from '../../sharing.module';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemcategoriesService } from '../../services/itemcategories.service';
import { ITEMCATEGORY } from '../../models/itemcategories.model';

@Component({
  selector: 'app-itemcategories-detail',
  imports: [SharingImports, MaterialImports],
  templateUrl: './itemcategories-detail.component.html',
  styleUrl: './itemcategories-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemcategoriesDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  form!: FormGroup<any> | null;
  sub!: Subscription;
  constructor(
    private itemcategoriesService: ItemcategoriesService,
    private notifyService: NotifyService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.form = null;
        if(this.sub) this.sub.unsubscribe();
        this.cd.markForCheck();
        this.sub = this.itemcategoriesService.get(params['id']).subscribe((res) => {
          if (res) {
            this.setForm(res);
            
          }
        });
      }
    });
  }
  setForm(obj: ITEMCATEGORY | null) {
    this.form = new FormGroup({
      id: new FormControl(obj?.id),
      name: new FormControl(obj?.name || '', [Validators.required]),
      created: new FormControl(obj?.created),
    });

    this.cd.markForCheck();
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}

  async save(btn: MatButton) {
    btn.disabled = true;
    const res = await this.itemcategoriesService
      .save({
        ...this.form?.getRawValue(),
      })
      .toPromise();
    if (res) {
      this.setForm(res);
      this.notifyService.sendData('Saved successfully!');
      this.itemcategoriesService.sendData(res)
      btn.disabled = false;
    } else {
      this.notifyService.sendData('Cant save itemcategories!');
      btn.disabled = false;
    }
  }
}
