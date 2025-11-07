/**
 * Long press menu configuration interface
 * Controls gesture behavior and menu appearance
 */
export interface ILongPressMenuConfig {
  /** Minimum press duration in milliseconds (default: 500) */
  minDuration: number;

  /** Maximum finger movement allowed in points (default: 10) */
  maxDistance: number;

  /** Enable haptic feedback on activation (default: true) */
  hapticFeedback: boolean;

  /** Animation duration in milliseconds (default: 200) */
  animationDuration: number;

  /** Menu width in points (default: 200) */
  menuWidth: number;

  /** Menu padding in points (default: 8) */
  menuPadding: number;

  /** Menu item height in points (default: 48) */
  itemHeight: number;

  /** Edge margin (distance from screen edges) (default: 16) */
  edgeMargin: number;
}
