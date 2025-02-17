import { CrudDocument } from 'wacom';

export interface Commercecontent extends CrudDocument {
	name: string;
	description: string;
	commerce: string;
}
