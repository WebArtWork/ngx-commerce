import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommerceordersComponent } from './commerceorders.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommerceordersComponent
	}, 
	{
		path: ':commerce_id',
		component: CommerceordersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommerceordersComponent],
	providers: []
})
export class CommerceordersModule {}
