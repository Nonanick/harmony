export interface ContextMenuItem {
  title : string;
  icon? : string;
  icon_color? : string;
  enabled? : boolean;
  onClick : () => void;
}

export function CreateContextMenuItem(options: ContextMenuItem) {

}