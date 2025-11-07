import { useMemo } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import type { MenuAction } from '../../domain/entities/MenuAction';

interface UseLongPressGestureProps {
  actions: MenuAction[];
  onShow: (x: number, y: number) => void;
  disabled?: boolean;
  minDuration?: number;
  hapticFeedback?: boolean;
}

/**
 * Hook to create long press gesture handler
 * Handles gesture detection and haptic feedback
 */
export const useLongPressGesture = ({
  actions,
  onShow,
  disabled = false,
  minDuration = 500,
  hapticFeedback = true,
}: UseLongPressGestureProps) => {
  const gesture = useMemo(() => {
    if (disabled || actions.length === 0) {
      return Gesture.LongPress().enabled(false);
    }

    return Gesture.LongPress()
      .minDuration(minDuration)
      .maxDistance(10)
      .onStart((event) => {
        if (hapticFeedback) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }

        onShow(event.absoluteX, event.absoluteY);
      });
  }, [actions, disabled, minDuration, hapticFeedback, onShow]);

  return gesture;
};
