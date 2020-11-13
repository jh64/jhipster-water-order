import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { WaterorderSharedModule } from 'app/shared/shared.module';
import { WaterorderCoreModule } from 'app/core/core.module';
import { WaterorderAppRoutingModule } from './app-routing.module';
import { WaterorderHomeModule } from './home/home.module';
import { WaterorderEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    WaterorderSharedModule,
    WaterorderCoreModule,
    WaterorderHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    WaterorderEntityModule,
    WaterorderAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class WaterorderAppModule {}
