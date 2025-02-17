import { CrudDocument } from 'wacom';

export interface Commercestore extends CrudDocument {
	name: string;
	description: string;
	commerce: string;
}
