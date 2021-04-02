import type { DefaultStylesInterface } from './DefaultStylesInterface';
import type { BreadcrumbStyle } from './interface/breadcrumb/BreadcrumbStyle';
import type { ButtonStyle } from './interface/button/ButtonStyle';
import type { CardStyle } from './interface/card/CardStyle';
import type { ChipStyle } from './interface/chip/ChipStyle';
import type { CircularFrameStyle } from './interface/circular_frame/CircularFrameStyle';
import type { SVGIconStyle } from './interface/svg_icon/SVGIconStyle';

const Breadcrumb: BreadcrumbStyle = {
  background_color: 'var(--transparent-background-60)',
  fade_ratio: 0.1,
  separator_color: 'var(--main-color)',
  separator_size: '0.7em',
  separator_weight: 800,
  width: 'auto'
};

const Button: ButtonStyle = {
  background_color: 'var(--main-color)',
  text_color: 'var(--text-on-main-color)',
  border: '1px solid transparent',
  padding: '6px 10px',
  width: 'auto',
  text_weight: 500
};

const Card: CardStyle = {
  width: '30vw',
  background_color: 'var(--transparent-background-50)',
  image_vertical_alignment: 'center',
  title_font_size: '1.2em',
  title_font_weight: '500',
  description_font_size: '0.8em',
  description_font_weight: '300',
  actions_background_color: 'rgba(0, 0, 0, 0.05);',
}

const Chip : ChipStyle = {
  background_color : 'var(--main-color-25)',
  color: 'var(--main-color)',
  padding : '2px 15px',
  width: 'auto',
  text_weight : 500,
}

const CircularFrame : CircularFrameStyle = {
  border : '3px solid var(--main-color-50)',
  ratio : 1,
  status_color : 'var(--sucess-color, green)',
  status_text_color : 'var(--text-on-sucess-color, white)',
};

// SVG icon default styling
const SVGIcon: SVGIconStyle = {
  aspect_ratio: 1,
  size: '1.5em',
  bg_color: 'transparent',
  box_radius: '50%',
  color: 'var(--main-color)',
  margin: '0'
};


const DefaultStyles: DefaultStylesInterface = {
  form: {
    CheckBox: {},
    ColorPicker: {},
    DatePicker: {},
    PasswordInput: {},
    Radio: {},
    RichText: {},
    Select: {},
    Switch: {},
    TextArea: {},
    TextInput: {},
  },
  interface: {
    AlertBox: {},
    Breadcrumb,
    Button,
    Card,
    Chip,
    CircularFrame,
    ContextMenu: {},
    Dropdown: {},
    ExpandableContainer: {},
    FloatingActionButton: {},
    IconButton: {},
    Popup: {},
    ProgressBar: {},
    ProgressRing: {},
    ResizableContainer: {},
    SVGIcon,
    Tab: {},
    Tooltip: {},
  },
  modals : {
    AcknowledgeDialog : {},
    ConfirmDialog : {},
    DrawerWindow : {},
    Modal : {},
    Window : {},
  }
};

export default DefaultStyles;
