import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { MaterialImports } from '../../materials.module';
import { MatDrawer } from '@angular/material/sidenav';
import { SharingImports } from '../../sharing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core',
  imports: [MaterialImports, SharingImports],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;

  openNav = true;
  menus = [
    { name: 'Items', value: 'items', icon: 'list' },
    { name: 'Item categories', value: 'itemcategories', icon: 'folder' },
  ];

  showForTesting = true;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    console.log(this.drawer);
    this.cd.detectChanges();
  }
  ngOnDestroy(): void {}

  goToRoute(route?: string) {
    this.router.navigateByUrl(route ? route : '');
  }
}
