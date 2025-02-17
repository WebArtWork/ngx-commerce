import { CrudDocument } from 'wacom';

interface Productinfo {
	product: string;
}

export interface Commerceorder extends CrudDocument {
	name: string;
	description: string;
	commerce: string;
	products: Productinfo[];
	status: string;
}
