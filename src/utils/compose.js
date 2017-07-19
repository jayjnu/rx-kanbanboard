import { _pipe } from './_pipe';

export const compose = (...fns) => fns.reduceRight(_pipe);