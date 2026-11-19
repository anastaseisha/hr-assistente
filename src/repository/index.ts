import { createDemoRepository } from './demoRepository';
import type { HrRepository } from './contracts';

/** Composition root: replace this implementation when integrating backend. */
export const repository: HrRepository = createDemoRepository();
