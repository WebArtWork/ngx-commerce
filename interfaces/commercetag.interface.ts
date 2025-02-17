import { CrudDocument } from 'wacom';

export interface Commercetag extends CrudDocument {
	_id: string;
	name: string;
	description: string;
	commerce: string;
	parent: string;
}
