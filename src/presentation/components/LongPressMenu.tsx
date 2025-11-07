import React, { useMemo } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, useWindowDimensions, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useAppDesignTokens } from '@umituz/react-native-design-system';
import { LongPressMenuItem } from './LongPressMenuItem';
import type { MenuAction } from '../../domain/entities/MenuAction';
import { DEFAULT_LONG_PRESS_CONFIG } from '../../infrastructure/config/defaultConfig';

interface LongPressMenuProps {
  visible: boolean;
  position: { x: number; y: number };
  actions: MenuAction[];
  onActionPress: (actionId: string) => void;
  onClose: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Long press menu container with animations
 * Displays menu near touch position with backdrop
 */
export const LongPressMenu: React.FC<LongPressMenuProps> = ({
  visible,
  position,
  actions,
  onActionPress,
  onClose,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const menuPosition = useMemo(() => {
    const { menuWidth, edgeMargin } = DEFAULT_LONG_PRESS_CONFIG;
    const menuHeight = actions.length * DEFAULT_LONG_PRESS_CONFIG.itemHeight;

    let x = position.x;
    let y = position.y;

    if (x + menuWidth > screenWidth - edgeMargin) {
      x = screenWidth - menuWidth - edgeMargin;
    }
    if (x < edgeMargin) {
      x = edgeMargin;
    }

    if (y + menuHeight > screenHeight - edgeMargin) {
      y = screenHeight - menuHeight - edgeMargin;
    }
    if (y < edgeMargin) {
      y = edgeMargin;
    }

    return { x, y };
  }, [position, actions.length, screenWidth, screenHeight]);

  const handleActionPress = (actionId: string) => {
    onActionPress(actionId);
    onClose();
  };

  if (!visible) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          entering={FadeIn.duration(DEFAULT_LONG_PRESS_CONFIG.animationDuration)}
          exiting={FadeOut.duration(DEFAULT_LONG_PRESS_CONFIG.animationDuration)}
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          ]}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        entering={FadeIn.duration(DEFAULT_LONG_PRESS_CONFIG.animationDuration)}
        exiting={FadeOut.duration(DEFAULT_LONG_PRESS_CONFIG.animationDuration)}
        style={[
          styles.menu,
          {
            top: menuPosition.y,
            left: menuPosition.x,
            width: DEFAULT_LONG_PRESS_CONFIG.menuWidth,
            backgroundColor: tokens.colors.surface,
            borderWidth: 1,
            borderColor: tokens.colors.border,
            borderRadius: tokens.borders.radius.md,
          },
          style,
        ]}
      >
        {actions.map((action, index) => (
          <LongPressMenuItem
            key={action.id}
            action={action}
            onPress={() => handleActionPress(action.id)}
            isLast={index === actions.length - 1}
          />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    overflow: 'hidden',
  },
});
