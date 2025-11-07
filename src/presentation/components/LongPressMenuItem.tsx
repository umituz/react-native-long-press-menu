import React from 'react';
import { StyleSheet, TouchableOpacity, type StyleProp, type ViewStyle } from 'react-native';
import { useAppDesignTokens, AtomicText } from '@umituz/react-native-design-system';
import { Icon } from '@umituz/react-native-design-system';
import type { MenuAction } from '../../domain/entities/MenuAction';

interface LongPressMenuItemProps {
  action: MenuAction;
  onPress: () => void;
  isLast?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Single menu item component
 * Displays icon, label, and handles press
 */
export const LongPressMenuItem: React.FC<LongPressMenuItemProps> = ({
  action,
  onPress,
  isLast = false,
  style,
}) => {
  const tokens = useAppDesignTokens();

  const itemBackgroundColor = action.disabled
    ? tokens.colors.surfaceDisabled
    : tokens.colors.surface;

  const iconColor: 'surfaceVariant' | 'error' | 'primary' = action.disabled
    ? 'surfaceVariant'
    : action.destructive
    ? 'error'
    : 'primary';

  const textColor = action.disabled
    ? tokens.colors.textDisabled
    : action.destructive
    ? tokens.colors.error
    : tokens.colors.textPrimary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={action.disabled}
      style={[
        styles.container,
        { backgroundColor: itemBackgroundColor },
        !isLast ? {
          borderBottomWidth: 1,
          borderBottomColor: tokens.colors.border,
        } : undefined,
        style,
      ]}
      activeOpacity={0.7}
    >
      <Icon name={action.icon as string} size="sm" color={iconColor} />
      <AtomicText
        type="bodyMedium"
        style={[styles.label, { color: textColor }]}
      >
        {action.label}
      </AtomicText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
  },
  label: {
    marginLeft: 12,
    flex: 1,
  },
});
