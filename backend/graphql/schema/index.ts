import './post.ts';
import './hello.ts';
import { builder } from '../builder.ts';

builder.queryType();
// builder.mutationType();

export const schema = builder.toSchema();
