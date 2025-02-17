import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommercetagsComponent } from './commercetags.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommercetagsComponent
	},
	{
		path: ':commerce_id/:parent',
		component: CommercetagsComponent
	},
	{
		path: ':commerce_id',
		component: CommercetagsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommercetagsComponent],
	providers: []
})
export class CommercetagsModule { }
