import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommercecontentsComponent } from './commercecontents.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommercecontentsComponent
	},
	{
		path: ':commerce_id',
		component: CommercecontentsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommercecontentsComponent],
	providers: []
})
export class CommercecontentsModule {}
