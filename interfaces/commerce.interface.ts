import { CrudDocument } from 'wacom';

export interface Commerce extends CrudDocument {
	name: string;
	description: string;
}
