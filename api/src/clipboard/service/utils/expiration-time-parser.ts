export class ExpirationTimeParser {
  private static readonly TIME_PATTERNS = {
    'h': 60 * 60 * 1000,
    'd': 24 * 60 * 60 * 1000,
    'm': 60 * 1000,
    'w': 7 * 24 * 60 * 60 * 1000,
  };

  static parse(expirationTime: string): number {
    if (!expirationTime) {
      return 60 * 60 * 1000;
    }

    const trimmed = expirationTime.trim().toLowerCase();
    
    for (const [unit, multiplier] of Object.entries(this.TIME_PATTERNS)) {
      const regex = new RegExp(`^(\\d+)\\s*${unit}$`);
      const match = trimmed.match(regex);
      
      if (match) {
        const value = parseInt(match[1], 10);
        return value * multiplier;
      }
    }
    
    const milliseconds = parseInt(trimmed, 10);
    if (!isNaN(milliseconds) && milliseconds > 0) {
      return milliseconds;
    }

    return 60 * 60 * 1000;
  }
} 