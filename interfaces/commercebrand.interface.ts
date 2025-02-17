import { CrudDocument } from 'wacom';

export interface Commercebrand extends CrudDocument {
	name: string;
	description: string;
	commerce: string;
}
