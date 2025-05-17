import { customAlphabet } from 'nanoid';
import { ALPHABET_WITH_NUMBERS } from './const';

export class AccessCodeGenerator {
  private static readonly nanoid = customAlphabet(ALPHABET_WITH_NUMBERS, 6);

  static generate(): string {
    return this.nanoid();
  }
}

export class AccessCodeGeneratorSingleton {
  private static instance: AccessCodeGeneratorSingleton;

  private constructor() {}

  static getInstance(): AccessCodeGeneratorSingleton {
    if (!this.instance) {
      this.instance = new AccessCodeGeneratorSingleton();
    }
    return this.instance;
  }

  generate(): string {
    return AccessCodeGenerator.generate();
  }
}
