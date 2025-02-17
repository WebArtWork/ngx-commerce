import { CrudDocument } from 'wacom';

export interface Commerceproduct extends CrudDocument {
	thumb: string;
	name: string;
	description: string;
	commerce: string;
	tags?: string[];
}
