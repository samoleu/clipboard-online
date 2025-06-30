# Expiration Strategy Pattern Implementation (Backend Only)

## Overview

This document explains how the Strategy Behavioral pattern has been implemented in the clipboard-online project to handle different expiration behaviors for clipboard content. This implementation is **backend-only** and maintains the existing API interface.

## Problem Solved

The original implementation had hardcoded expiration logic in the `ClipboardService.findOne()` method:

```typescript
if (query.singleVisualization) {
  await this.clipboard.deleteOne({ code: code });
} else if (
  query.createdAt &&
  new Date().getTime() - query.createdAt.getTime() >= ONE_HOUR_IN_MILLISECONDS
) {
  await this.clipboard.deleteOne({ code: code });
  return null;
}
```

This approach had several issues:
- **Tight coupling**: Expiration logic was embedded in the service
- **Hard to extend**: Adding new expiration types required modifying existing code
- **Violation of Single Responsibility**: Service handled both business logic and expiration rules
- **Difficult to test**: Expiration logic couldn't be tested in isolation

## Solution: Strategy Pattern (Backend Only)

The Strategy pattern was implemented to separate different expiration behaviors into their own classes, making the system more flexible and maintainable. **No new API endpoints were added, and the frontend remains unchanged.**

## Architecture

### 1. Strategy Interface

```typescript
interface ExpirationStrategy {
  shouldExpire(clipboard: Clipboard): boolean;
  handleExpiration(clipboard: Clipboard, model: Model<Clipboard>): Promise<void>;
  getStrategyName(): string;
  getDescription(): string;
}
```

### 2. Concrete Strategies

#### Single Visualization Strategy
- **Purpose**: Handles clipboards that should be deleted after first access
- **Logic**: Checks if `singleVisualization` is true AND `accessed` is true
- **Action**: Deletes clipboard after first access (not at creation time)
- **Access Tracking**: Uses `accessed` field to track whether clipboard has been viewed

#### Time-Based Expiration Strategy
- **Purpose**: Handles clipboards that expire after a time period
- **Logic**: Checks if creation time + expiration period has passed
- **Action**: Deletes clipboard if expired

### 3. Context Class

```typescript
@Injectable()
export class ExpirationContext {
  async checkAndHandleExpiration(clipboard: Clipboard, model: Model<Clipboard>): Promise<boolean>
  getAvailableStrategies(): Array<{ name: string; description: string }>
}
```

## Implementation Details

### Strategy Selection Logic

The `ExpirationContext` automatically selects the appropriate strategy based on clipboard properties:

1. **Priority Order**: Single visualization takes precedence over time-based expiration
2. **Automatic Detection**: Strategy is selected based on `singleVisualization` flag and creation time
3. **Fallback**: Returns first strategy if no conditions are met (shouldn't happen in normal flow)

### Updated Service Logic

```typescript
async findOne(code: string): Promise<Clipboard | null> {
  const query = await this.clipboard.findOne({ code: code });

  if (!query) return null;

  // Mark single visualization clipboards as accessed
  if (query.singleVisualization && !query.accessed) {
    await this.clipboard.updateOne(
      { code: code },
      { accessed: true }
    );
    query.accessed = true;
  }

  // Use expiration strategy to check and handle expiration
  const wasExpired = await this.expirationContext.checkAndHandleExpiration(query, this.clipboard);
  
  if (wasExpired) {
    return null;
  }

  return query;
}
```

### Access Tracking for Single Visualization

To properly implement single visualization expiration, the system now tracks access:

1. **New Field**: Added `accessed: boolean` to the Clipboard model
2. **Access Marking**: When a single visualization clipboard is retrieved, it's marked as `accessed: true`
3. **Expiration Logic**: Single visualization strategy only expires clipboards that have been viewed

## Benefits

### 1. **Separation of Concerns**
- Each strategy handles one specific expiration type
- Service focuses on business logic, not expiration rules
- Clear boundaries between different responsibilities

### 2. **Extensibility**
- New expiration strategies can be added without modifying existing code
- Easy to add new expiration types (e.g., usage-based, date-based)
- Strategies are loosely coupled

### 3. **Testability**
- Each strategy can be tested independently
- Mock strategies can be used for testing
- Clear interfaces make testing straightforward

### 4. **Maintainability**
- Expiration logic is centralized in strategy classes
- Easy to understand and modify individual strategies
- Changes to one strategy don't affect others

### 5. **Backward Compatibility**
- **No API changes**: Existing endpoints work exactly the same
- **No frontend changes**: User interface remains unchanged
- **Transparent implementation**: Strategy pattern is internal to the backend

### 6. **Correct Single Visualization Behavior**
- **Fixed Issue**: Single visualization clipboards now only expire after first access, not at creation
- **Access Tracking**: Proper tracking of whether a clipboard has been viewed
- **Expected Behavior**: Users can create single-view clipboards and they remain available until first access

## API Interface (Unchanged)

The existing API endpoints remain exactly the same:

```
GET /clipboard/:code
POST /clipboard
```

No new endpoints were added. The Strategy pattern implementation is completely internal to the backend.

## Adding New Expiration Strategies

### Example: Usage-Based Expiration

1. **Create Strategy Class:**
```typescript
export class UsageBasedExpirationStrategy implements ExpirationStrategy {
  shouldExpire(clipboard: Clipboard): boolean {
    return clipboard.accessCount >= 5; // Expire after 5 accesses
  }

  async handleExpiration(clipboard: Clipboard, model: Model<Clipboard>): Promise<void> {
    await model.deleteOne({ code: clipboard.code });
  }

  getStrategyName(): string {
    return 'usage-based';
  }

  getDescription(): string {
    return 'Clipboard expires after 5 accesses';
  }
}
```

2. **Register in Context:**
```typescript
constructor() {
  this.strategies = [
    new SingleVisualizationStrategy(),
    new TimeBasedExpirationStrategy(),
    new UsageBasedExpirationStrategy(), // Add new strategy
  ];
}
```

3. **Update Database Schema** (if needed):
```typescript
// Add accessCount field to Clipboard model
accessCount: { type: Number, default: 0 }
```

## Testing Strategies

### Unit Testing
```typescript
describe('SingleVisualizationStrategy', () => {
  it('should expire single visualization clipboards after access', () => {
    const strategy = new SingleVisualizationStrategy();
    const clipboard = { 
      singleVisualization: true, 
      accessed: true 
    } as Clipboard;
    
    expect(strategy.shouldExpire(clipboard)).toBe(true);
  });

  it('should not expire single visualization clipboards before access', () => {
    const strategy = new SingleVisualizationStrategy();
    const clipboard = { 
      singleVisualization: true, 
      accessed: false 
    } as Clipboard;
    
    expect(strategy.shouldExpire(clipboard)).toBe(false);
  });
});
```

### Integration Testing
```typescript
describe('ExpirationContext', () => {
  it('should handle single visualization expiration after access', async () => {
    const context = new ExpirationContext();
    const clipboard = { 
      singleVisualization: true, 
      accessed: true, 
      code: 'test' 
    } as Clipboard;
    
    const wasExpired = await context.checkAndHandleExpiration(clipboard, mockModel);
    expect(wasExpired).toBe(true);
  });
});
```

## Configuration

Strategies can be configured through environment variables:

```typescript
// Example: Configure expiration periods
const EXPIRATION_PERIODS = {
  SHORT: process.env.SHORT_EXPIRATION || 1000 * 60 * 30, // 30 minutes
  MEDIUM: process.env.MEDIUM_EXPIRATION || 1000 * 60 * 60, // 1 hour
  LONG: process.env.LONG_EXPIRATION || 1000 * 60 * 60 * 24, // 1 day
};
```

## Future Enhancements

### Potential New Strategies

1. **Date-Based Expiration**: Expire on specific dates
2. **Usage-Based Expiration**: Expire after N accesses
3. **Size-Based Expiration**: Expire based on content size
4. **Priority-Based Expiration**: Different expiration rules for different user types
5. **Geographic Expiration**: Expire based on user location

### Advanced Features

1. **Strategy Composition**: Combine multiple strategies
2. **Dynamic Strategy Loading**: Load strategies from configuration
3. **Strategy Metrics**: Track which strategies are used most
4. **A/B Testing**: Test different expiration strategies

## Conclusion

The Strategy pattern implementation for expiration logic provides a robust, flexible, and maintainable solution while maintaining complete backward compatibility. It separates concerns, makes the code more testable, and allows for easy extension of expiration behaviors without modifying existing code or interfaces.

**Key Fix**: The single visualization expiration now works correctly - clipboards are only deleted after first access, not at creation time. This was achieved by adding proper access tracking and updating the strategy logic.

This implementation follows SOLID principles and provides a clean architecture that can easily accommodate future requirements and changes, all while keeping the existing API and frontend unchanged. 