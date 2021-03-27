import DefaultStyles from '../../style.defaults';
import type { ContextMenuOptions } from './ContextMenuOptions';

export function ContextMenu(
  event: MouseEvent,
  options?: ContextMenuOptions
) {
  event.preventDefault();
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

  contextMenuContainer.addEventListener('click', () => {
    closeAndCleanup();
  }, { passive: true });

  contextMenuContainer.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    closeAndCleanup();
  });

  const endOnScrollListener = () => {
    closeAndCleanup();
  };

  const closeOnEscPress = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") { 
      ev.stopPropagation();
      closeAndCleanup();
    }
  };

  document.addEventListener('scroll', endOnScrollListener, { passive : true});
  document.addEventListener('keydown', closeOnEscPress);

  Object.entries(listenerStyle).forEach(([k, v]) => {
    contextMenuContainer.style[k] = v;
  });

  document.body.append(contextMenuContainer);

  const clickCoordinates = {
    x: event.clientX,
    y: event.clientY
  };

  const viewportSize = {
    width: contextMenuContainer.getBoundingClientRect().width,
    height: contextMenuContainer.getBoundingClientRect().height
  };

  const cmWidth = DefaultStyles.interface.ContextMenu.width ?? 200;
  const cmHeight = DefaultStyles.interface.ContextMenu.maxHeight ?? 300;
  const itemHeight = DefaultStyles.interface.ContextMenu.itemHeight ?? 30;

  const cm = document.createElement('div');
  cm.classList.add('ui-context-menu');
  const cmStyle: Partial<CSSStyleDeclaration> = {
    position: 'fixed',
    top: clickCoordinates.y + 'px',
    left: clickCoordinates.x + 'px',
    width: cmWidth + 'px',
    height: 'auto',
    minHeight: itemHeight + 'px',
    maxHeight: cmHeight + 'px',
    backgroundColor: 'var(--background-color)',
    border: '1px solid white',
    borderRadius: '4px',
    boxShadow: 'var(--box-shadow-2)'
  };

  cm.addEventListener('click', (ev) => {
    ev.stopPropagation();
  });
  cm.addEventListener('contextmenu', (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
  });

  Object.entries(cmStyle).forEach(([k, v]) => {
    cm.style[k] = v;
  });

  contextMenuContainer.append(cm);

  console.log(viewportSize, clickCoordinates);

  function closeAndCleanup() {
    contextMenuContainer.remove();
    document.removeEventListener('scroll', endOnScrollListener);
    document.removeEventListener('keypress', closeOnEscPress);

  }
}

