import { customAlphabet } from 'nanoid';
import { ALPHABET_WITH_NUMBERS } from './const';

export class AccessCodeGeneratorSingleton {
  private static instance: AccessCodeGeneratorSingleton;
  private readonly nanoid = customAlphabet(ALPHABET_WITH_NUMBERS, 6);

  private constructor() {}

  static getInstance(): AccessCodeGeneratorSingleton {
    if (!this.instance) {
      this.instance = new AccessCodeGeneratorSingleton();
    }
    return this.instance;
  }

  generate(): string {
    return this.nanoid();
  }
}