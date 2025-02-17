import { Injectable } from '@angular/core';
import { Commerceproduct } from '../interfaces/commerceproduct.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommerceproductService extends CrudService<Commerceproduct> {
	constructor() {
		super({
			name: 'commerceproduct'
		});
	}
}
