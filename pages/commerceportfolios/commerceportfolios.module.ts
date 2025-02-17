import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommerceportfoliosComponent } from './commerceportfolios.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommerceportfoliosComponent
	}, 
	{
		path: ':commerce_id',
		component: CommerceportfoliosComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommerceportfoliosComponent],
	providers: []
})
export class CommerceportfoliosModule {}
