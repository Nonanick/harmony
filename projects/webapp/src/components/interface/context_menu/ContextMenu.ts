import DefaultStyles from '../../style.defaults';
import type { ContextMenuOptions } from './ContextMenuOptions';
import { CreateContextMenuGroup, isContextMenuGroup } from './group/ContextMenuGroup';
import { CreateContextMenuItem, isContextMenuItem } from './item/ContextMenuItem';
import { CreateContextMenuSubmenu, isContextMenuSubmenu } from './submenu/ContextMenuSubmenu';

export function ContextMenu(
  event: MouseEvent,
  options: ContextMenuOptions
) {
  event.preventDefault();
  const contextMenuContainer = buildCMViewport();

  contextMenuContainer.addEventListener('click', () => {
    closeAndCleanup();
  }, { passive: true });

  contextMenuContainer.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    closeAndCleanup();
  });

  const endOnScrollListener = () => { closeAndCleanup() };

  const closeOnEscPress = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      ev.stopPropagation();
      closeAndCleanup();
    }
  };

  document.addEventListener('scroll', endOnScrollListener, { passive: true });
  document.addEventListener('keydown', closeOnEscPress);
  document.body.append(contextMenuContainer);

  const clickCoordinates = { x: event.clientX, y: event.clientY };

  const contextmenu = buildCMContainer(
    clickCoordinates,
    {
      width: contextMenuContainer.getBoundingClientRect().width,
      height: contextMenuContainer.getBoundingClientRect().height
    }
  );

  contextmenu.addEventListener('click', (ev) => {
    ev.stopPropagation();
  });
  contextmenu.addEventListener('contextmenu', (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
  });

  contextMenuContainer.append(contextmenu);

  function closeAndCleanup() {
    contextMenuContainer.remove();
    document.removeEventListener('scroll', endOnScrollListener);
    document.removeEventListener('keypress', closeOnEscPress);
  }

  for(let item of options.items) {
    if(isContextMenuItem(item)) {
      const mItem = CreateContextMenuItem(item);
      contextmenu.append(mItem);
      continue;
    }

    if(isContextMenuGroup(item)) {
      const mGroup = CreateContextMenuGroup(item);
      contextmenu.append(mGroup);

      continue;
    }

    if(isContextMenuSubmenu(item)) {
      const mSub = CreateContextMenuSubmenu(item);
      contextmenu.append(mSub);
      continue;
    }
  }

}

function buildCMViewport() {
  const contextMenuContainer = document.createElement('div');
  contextMenuContainer.classList.add('ui-context-menu-container');

  const listenerStyle: Partial<CSSStyleDeclaration> = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.02)',
    zIndex: '999'
  };

  Object.entries(listenerStyle).forEach(([k, v]) => {
    contextMenuContainer.style[k] = v;
  });

  return contextMenuContainer;
}

function buildCMContainer(
  position: { x: number, y: number },
  viewport: { width: number, height: number }
) {

  const cmWidth = DefaultStyles.interface.ContextMenu.width ?? 200;
  const cmHeight = DefaultStyles.interface.ContextMenu.maxHeight ?? 300;
  const itemHeight = DefaultStyles.interface.ContextMenu.itemHeight ?? 30;

  const cm = document.createElement('div');
  cm.classList.add('ui-context-menu');
  const cmStyle: Partial<CSSStyleDeclaration> = {
    position: 'fixed',
    top: position.y + 'px',
    left: position.x + 'px',
    width: cmWidth + 'px',
    height: 'auto',
    minHeight: itemHeight + 'px',
    maxHeight: cmHeight + 'px',
    backgroundColor: 'var(--background-color)',
    border: '1px solid white',
    borderRadius: '4px',
    boxShadow: 'var(--box-shadow-2)'
  };

  Object.entries(cmStyle).forEach(([k, v]) => {
    cm.style[k] = v;
  });

  return cm;

}