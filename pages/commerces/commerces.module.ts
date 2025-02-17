import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommercesComponent } from './commerces.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommercesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommercesComponent],
	providers: []
})
export class CommercesModule {}
