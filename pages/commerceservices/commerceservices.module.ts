import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommerceservicesComponent } from './commerceservices.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommerceservicesComponent
	}, 
	{
		path: ':commerce_id',
		component: CommerceservicesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommerceservicesComponent],
	providers: []
})
export class CommerceservicesModule {}
