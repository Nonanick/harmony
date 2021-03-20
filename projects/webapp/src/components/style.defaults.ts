import type { DefaultStylesInterface  } from './DefaultStylesInterface';

// SVG icon default styling
const SVGIcon = {
  aspect_ratio: 1,
  size: '16pt',
  bg_color: 'transparent',
  box_radius: '50%',
  color: '#303030'
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
    Breadcrumb: {},
    Button: {},
    Card: {},
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
    Tooltip : {},
  }
};

export default DefaultStyles;
