import type { ILongPressMenuConfig } from '../../domain/interfaces/ILongPressMenuConfig';

/**
 * Default configuration for long press menu
 * Optimized for iOS/Android native feel
 */
export const DEFAULT_LONG_PRESS_CONFIG: ILongPressMenuConfig = {
  // Gesture settings (iOS standard: 500ms)
  minDuration: 500,
  maxDistance: 10,

  // Feedback
  hapticFeedback: true,

  // Animation timing (Material Design: 200ms)
  animationDuration: 200,

  // Layout (Apple HIG: 44pt minimum touch target)
  menuWidth: 200,
  menuPadding: 8,
  itemHeight: 48,
  edgeMargin: 16,
};
