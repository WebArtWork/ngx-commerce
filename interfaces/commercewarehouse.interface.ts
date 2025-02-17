import { CrudDocument } from 'wacom';

export interface Commercewarehouse extends CrudDocument {
	name: string;
	description: string;
	commerce: string;
}
