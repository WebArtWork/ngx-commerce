import { CrudDocument } from 'wacom';

export interface Commercetag extends CrudDocument {
	_id: string;
	order: number;
	name: string;
	description: string;
	commerce: string;
	parent: string;
}
