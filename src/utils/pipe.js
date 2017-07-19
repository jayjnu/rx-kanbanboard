import { _pipe } from './_pipe';

export const pipe = (...fns) => fns.reduce(_pipe);
