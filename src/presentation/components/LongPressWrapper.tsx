import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { useLongPressGesture } from '../hooks/useLongPressGesture';
import { useLongPressMenu } from '../hooks/useLongPressMenu';
import { LongPressMenu } from './LongPressMenu';
import type { MenuAction } from '../../domain/entities/MenuAction';

interface LongPressWrapperProps {
  children: React.ReactNode;
  actions: MenuAction[];
  onActionPress: (actionId: string) => void;
  disabled?: boolean;
  minDuration?: number;
  hapticFeedback?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Long press wrapper component
 * Wraps any component to add long press menu functionality
 *
 * @example
 * <LongPressWrapper
 *   actions={[
 *     { id: 'edit', icon: 'Edit', label: 'Edit' },
 *     { id: 'delete', icon: 'Trash2', label: 'Delete', destructive: true }
 *   ]}
 *   onActionPress={(id) => handleAction(id)}
 * >
 *   <YourComponent />
 * </LongPressWrapper>
 */
export const LongPressWrapper: React.FC<LongPressWrapperProps> = ({
  children,
  actions,
  onActionPress,
  disabled = false,
  minDuration = 500,
  hapticFeedback = true,
  style,
}) => {
  const { visible, position, actions: menuActions, show, hide } = useLongPressMenu();

  const gesture = useLongPressGesture({
    actions,
    onShow: (x, y) => show(x, y, actions),
    disabled,
    minDuration,
    hapticFeedback,
  });

  return (
    <>
      <GestureDetector gesture={gesture}>
        <View style={style}>{children}</View>
      </GestureDetector>

      <LongPressMenu
        visible={visible}
        position={position}
        actions={menuActions}
        onActionPress={onActionPress}
        onClose={hide}
      />
    </>
  );
};
