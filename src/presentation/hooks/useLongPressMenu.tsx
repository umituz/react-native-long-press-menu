import { useState, useCallback } from 'react';
import type { MenuAction } from '../../domain/entities/MenuAction';

interface MenuPosition {
  x: number;
  y: number;
}

/**
 * Hook to manage long press menu state
 * Handles visibility, position, and action callbacks
 */
export const useLongPressMenu = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<MenuPosition>({ x: 0, y: 0 });
  const [actions, setActions] = useState<MenuAction[]>([]);

  const show = useCallback((x: number, y: number, menuActions: MenuAction[]) => {
    setPosition({ x, y });
    setActions(menuActions);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    visible,
    position,
    actions,
    show,
    hide,
  };
};
