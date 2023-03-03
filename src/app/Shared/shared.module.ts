import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { FormproductComponent } from './formproduct/formproduct.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  providers: [],
  declarations: [HeaderComponent, FooterComponent, FormproductComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [MaterialModule, HeaderComponent, FooterComponent, FormproductComponent]
})
export class SharedModule { }
