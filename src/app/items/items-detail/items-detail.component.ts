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
import { SharingImports } from '../../sharing.module';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-items-detail',
  imports: [SharingImports, MaterialImports],
  templateUrl: './items-detail.component.html',
  styleUrl: './items-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  form!: FormGroup<any> | null;
  sub!: Subscription;

  constructor(
    private itemsService: ItemsService,
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
    this.cd.detectChanges();
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}

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
