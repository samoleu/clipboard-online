import { AccessCodeGeneratorSingleton } from './access-code-generator';

export const AccessCodeGeneratorProvider = {
  provide: 'ACCESS_CODE_GENERATOR',
  useFactory: () => AccessCodeGeneratorSingleton.getInstance(),
};