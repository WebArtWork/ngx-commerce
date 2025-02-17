import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommercewarehousesComponent } from './commercewarehouses.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommercewarehousesComponent
	}, 
	{
		path: ':commerce_id',
		component: CommercewarehousesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommercewarehousesComponent],
	providers: []
})
export class CommercewarehousesModule {}
