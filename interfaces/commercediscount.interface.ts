import { CrudDocument } from 'wacom';

export interface Commercediscount extends CrudDocument {
	name: string;
	description: string;
	commerce: string;
}
