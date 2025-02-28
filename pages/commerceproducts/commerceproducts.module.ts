import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommerceproductsComponent } from './commerceproducts.component';
import { Routes, RouterModule } from '@angular/router';
import path from 'path';

const routes: Routes = [
	{
		path: '',
		component: CommerceproductsComponent
	},
	{
		path: ':commerce_id',
		component: CommerceproductsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommerceproductsComponent],
	providers: []
})
export class CommerceproductsModule {}
