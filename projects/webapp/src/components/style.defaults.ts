import { DefaultTheme } from '../themes/theme.default';
import type { DefaultStylesInterface } from './DefaultStylesInterface';
import type { BreadcrumbStyle } from './interface/breadcrumb/BreadcrumbStyle';
import type { ButtonStyle } from './interface/button/ButtonStyle';
import type { CardStyle } from './interface/card/CardStyle';
import type { SVGIconStyle } from './interface/svg_icon/SVGIconStyle';

const Breadcrumb: BreadcrumbStyle = {
  background_color: 'rgba(255,255,255,0.6)',
  fade_ratio: 0.1,
  separator_color: DefaultTheme.variables['main-color'],
  separator_size: '0.7em',
  separator_weight: 800,
  width: 'auto'
};

const Button: ButtonStyle = {
  background_color: DefaultTheme.variables['main-color'],
  text_color: DefaultTheme.variables['text-on-main-color'],
  border: '1px solid transparent',
  padding: '6px 10px',
  width: 'auto',
  text_weight: 500
};

const Card: CardStyle = {
  width: '30vw',
  background_color: 'rgba(255,255,255,0.5)',
  image_vertical_alignment: 'center',
  title_font_size: '1.2em',
  title_font_weight: '500',
  description_font_size: '0.8em',
  description_font_weight: '300',
  actions_background_color: 'rgba(0, 0, 0, 0.05);',
}

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
    Chip: {},
    CircularFrame: {},
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
  }
};

export default DefaultStyles;
