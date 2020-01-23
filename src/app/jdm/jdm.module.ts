import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { JdmRoutingModule } from './jdm-routing.module';
import { SearchComponent } from './search/search.component';
import { TermPageComponent } from './term-page/term-page.component';
import { TestingComponent } from './testing/testing.component';
import { UserGuideComponent } from './user-guide/user-guide.component';

@NgModule({
  declarations: [SearchComponent, TermPageComponent, TestingComponent, UserGuideComponent],
  imports: [
    CommonModule,
    JdmRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class JdmModule { }
