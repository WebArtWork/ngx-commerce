import { CrudDocument } from 'wacom';

export interface Commerceservice extends CrudDocument {
	name: string;
	description: string;
	commerce: string;
}
