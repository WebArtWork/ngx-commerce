import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommercestoresComponent } from './commercestores.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommercestoresComponent
	},
	{
		path: ':commerce_id',
		component: CommercestoresComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommercestoresComponent],
	providers: []
})
export class CommercestoresModule {}
