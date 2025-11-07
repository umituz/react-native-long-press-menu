# @umituz/react-native-long-press-menu

Context menus with long press for React Native with iOS/Android-style, haptic feedback, and animations.

## Installation

```bash
npm install @umituz/react-native-long-press-menu
```

## Peer Dependencies

- `react` >= 18.2.0
- `react-native` >= 0.74.0
- `react-native-reanimated` >= 3.0.0
- `react-native-gesture-handler` >= 2.0.0
- `@umituz/react-native-design-system` *
- `@umituz/react-native-haptics` *

## Features

- ✅ iOS/Android-style context menus
- ✅ Haptic feedback on activation
- ✅ 500ms minimum duration
- ✅ 10pt max finger movement
- ✅ Fade/scale animations (200ms)
- ✅ Edge collision detection
- ✅ Theme-aware backdrop
- ✅ Offline-compatible

## Usage

### Basic Usage

```typescript
import { LongPressWrapper, useLongPressMenu } from '@umituz/react-native-long-press-menu';
import { useHaptics } from '@umituz/react-native-haptics';

const MyComponent = () => {
  const { visible, position, actions, show, hide, handleAction } = useLongPressMenu();
  const haptics = useHaptics();

  const menuActions = [
    { id: 'copy', label: 'Copy', icon: 'copy' },
    { id: 'share', label: 'Share', icon: 'share' },
    { id: 'delete', label: 'Delete', icon: 'trash', destructive: true },
  ];

  return (
    <LongPressWrapper
      onLongPress={(x, y) => {
        haptics.longPress();
        show(x, y, menuActions);
      }}
      onActionPress={handleAction}
      onClose={hide}
      visible={visible}
      position={position}
      actions={actions}
    >
      <View>
        <Text>Long press me!</Text>
      </View>
    </LongPressWrapper>
  );
};
```

### Custom Configuration

```typescript
import { LongPressWrapper, DEFAULT_LONG_PRESS_CONFIG } from '@umituz/react-native-long-press-menu';

const config = {
  ...DEFAULT_LONG_PRESS_CONFIG,
  minDuration: 600, // 600ms instead of 500ms
  maxMovement: 15, // 15pt instead of 10pt
};
```

## Components

- `LongPressWrapper` - Wrapper component that adds long press gesture
- `LongPressMenu` - Menu container with animations
- `LongPressMenuItem` - Individual menu item

## Hooks

- `useLongPressMenu` - Manage menu state (visibility, position, actions)
- `useLongPressGesture` - Handle long press gesture detection

## License

MIT

