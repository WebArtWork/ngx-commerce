import { CrudDocument } from 'wacom';

export interface Commerceportfolio extends CrudDocument {
	name: string;
	description: string;
	commerce: string;
}
