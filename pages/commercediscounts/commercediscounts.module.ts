import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommercediscountsComponent } from './commercediscounts.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommercediscountsComponent
	}, 
	{
		path: ':commerce_id',
		component: CommercediscountsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommercediscountsComponent],
	providers: []
})
export class CommercediscountsModule {}
