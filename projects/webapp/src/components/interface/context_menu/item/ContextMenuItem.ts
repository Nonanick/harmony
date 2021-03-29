export interface ContextMenuItem {
  title : string;
  icon? : string;
  icon_color? : string;
  enabled? : boolean;
  onClick : () => void;
}

export function CreateContextMenuItem(options: ContextMenuItem) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('clickable');
  const itemHeight = '35px';
  const itemStyle : Partial<CSSStyleDeclaration> = {
    display : 'grid',
    gridTemplateColumns : itemHeight + ' 1fr',
    gridTemplateRows : itemHeight,
    borderBottom : '1px solid rgba(0,0,0,0.02)'
  };
  Object.entries(itemStyle).forEach(([k,v]) => {
    itemEl.style[k] = v;
  });

  const titleEl = document.createElement('div');
  titleEl.innerHTML = options.title;

  const titleStyle : Partial<CSSStyleDeclaration> = {
    lineHeight : itemHeight,
    boxSizing : 'border-box',
    padding: '0 10px'
  };

  if(options.icon != null) {

    const iconEl = document.createElement('div');
    const iconStyle : Partial<CSSStyleDeclaration> = {
      gridColumn : '1 / 2'
    };
    Object.entries(iconStyle).forEach(([k,v]) => {
      iconEl.style[k] = v;
    });
    itemEl.append(iconEl);
    titleStyle.gridColumn = '2 / 3';
  } else {
    titleStyle.gridColumn = '1 / 3';
  }

  Object.entries(titleStyle).forEach(([k,v]) => {
    titleEl.style[k] = v;
  });

  itemEl.append(titleEl);
  itemEl.addEventListener('click', options.onClick);
  return itemEl;
}

export function isContextMenuItem(obj : any) : obj is ContextMenuItem {
  return (
    typeof obj.title === "string" 
    && typeof obj.onClick === "function"
    && (typeof obj.icon === "string" || obj.icon == null)
    && (typeof obj.icon_color === "string" || obj.icon_color == null)
    && (typeof obj.enabled === "boolean" || obj.enabled == null)
  );
}