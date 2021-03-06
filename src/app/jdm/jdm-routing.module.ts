import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { TermPageComponent } from './term-page/term-page.component';
import {TestingComponent} from './testing/testing.component';
import {UserGuideComponent} from './user-guide/user-guide.component';
const routes: Routes = [
	{
		path: '',
		component: SearchComponent
	},

	{
		path: 'search',
		component: SearchComponent
	},
	{
		path: 'term',
		component: TermPageComponent
	},
	{
		path: 'test',
		component: TestingComponent
	},
	{
		path: 'guide',
		component: UserGuideComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JdmRoutingModule { }
