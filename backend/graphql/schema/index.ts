import './post';
import './hello';
import { builder } from '../builder';

builder.queryType();
// builder.mutationType();

export const schema = builder.toSchema();
