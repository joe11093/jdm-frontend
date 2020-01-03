import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { TermPageComponent } from './term-page/term-page.component';

const routes: Routes = [
	{
		path: 'search',
		component: SearchComponent
	},
	{
		path: 'term',
		component: TermPageComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JdmRoutingModule { }
