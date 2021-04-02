import type { BreadcrumbStyle } from './interface/breadcrumb/BreadcrumbStyle';
import type { ButtonStyle } from './interface/button/ButtonStyle';
import type { CardStyle } from './interface/card/CardStyle';
import type { ChipStyle } from './interface/chip/ChipStyle';
import type { CircularFrameStyle } from './interface/circular_frame/CircularFrameStyle';
import type { SVGIconStyle } from './interface/svg_icon/SVGIconStyle';

export interface DefaultStylesInterface {
  form: {
    CheckBox: any;
    ColorPicker: any;
    DatePicker: any;
    PasswordInput: any;
    Radio: any;
    RichText: any;
    Select: any;
    Switch: any;
    TextArea: any;
    TextInput: any;
  };
  interface: {
    AlertBox: any;
    Breadcrumb: BreadcrumbStyle;
    Button: ButtonStyle;
    Card: CardStyle;
    Chip: ChipStyle;
    CircularFrame: CircularFrameStyle;
    ContextMenu: any;
    Dropdown: any;
    ExpandableContainer: any;
    FloatingActionButton: any;
    IconButton: any;
    Popup: any;
    ProgressBar: any;
    ProgressRing: any;
    ResizableContainer: any;
    SVGIcon: SVGIconStyle;
    Tab: any;
    Tooltip : any;
  };
  modals : {
    AcknowledgeDialog : any;
    ConfirmDialog : any;
    DrawerWindow : any;
    Modal : any;
    Window : any;
  }
}