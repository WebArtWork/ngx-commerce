import { CrudDocument } from 'wacom';

export interface Commerceproductquantity extends CrudDocument {
	name: string;
	description: string;
	product: string;
	store: string;
	warehouse: string;
}
