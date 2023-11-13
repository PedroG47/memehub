import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as iconSet from "@fortawesome/free-solid-svg-icons";

import { theme } from './theme';

function renderCSSValue(cssPropName, cssPropValue) {
  if (cssPropName.includes('horizontal')) {
    return `
      ${cssPropName.replace('horizontal', 'left')}: ${cssPropValue};
      ${cssPropName.replace('horizontal', 'right')}: ${cssPropValue};
    `;
  }
  if (cssPropName.includes('vertical')) {
    return `
      ${cssPropName.replace('vertical', 'top')}: ${cssPropValue};
      ${cssPropName.replace('vertical', 'bottom')}: ${cssPropValue};
    `;
  }

  return cssPropName + ':' + cssPropValue + ';';
}
function renderCSS(props, currentBreakpoint) {
  if (!props) return '';

  return Object
    .keys(props)
    .map((prop) => {
      const cssPropName = prop.split(/(?=[A-Z])/).join('-').toLowerCase();
      const cssPropValue = props[prop];
      const isCssPropValueAnObject = Object.prototype.toString.call(cssPropValue) === '[object Object]';
      const currentCssPropValue = cssPropValue[currentBreakpoint];

      if (currentBreakpoint == 'xs' && !isCssPropValueAnObject) {
        return renderCSSValue(cssPropName, cssPropValue);
      }

      if (currentCssPropValue) {
        return renderCSSValue(cssPropName, currentCssPropValue);
      }
    }).filter(Boolean).join('');
}

export const Box = React.forwardRef(({
  as,
  styleSheet: { focus, hover, srOnly, ...styleSheet },
  ...props
}, ref) => {
  const Tag = as || 'div';

  return (
    <React.Fragment>
      <Tag ref={ref} {...props} className={`${props.className ? props.className : ''} ${srOnly ? 'sr-only' : ''}`} />
      <style jsx>{`
        ${Tag} {
          ${renderCSS(styleSheet, 'xs')};
        }
        ${Tag}:hover {
          ${renderCSS(hover, 'xs')};
        }
        ${Tag}:focus {
          ${renderCSS(focus, 'xs')};
        }
        @media screen and (min-width: ${theme.breakpoints['Breakpoints.sm']}px) {
          ${Tag} {
            ${renderCSS(styleSheet, 'sm')};
          }
          ${Tag}:hover {
            ${renderCSS(hover, 'sm')};
          }
          ${Tag}:focus {
            ${renderCSS(focus, 'sm')};
          }
        }
        @media screen and (min-width: ${theme.breakpoints['Breakpoints.md']}px) {
          ${Tag} {
            ${renderCSS(styleSheet, 'md')};
          }
          ${Tag}:hover {
            ${renderCSS(hover, 'md')};
          }
          ${Tag}:focus {
            ${renderCSS(focus, 'md')};
          }
        }
        @media screen and (min-width: ${theme.breakpoints['Breakpoints.lg']}px) {
          ${Tag} {
            ${renderCSS(styleSheet, 'lg')};
          }
          ${Tag}:hover {
            ${renderCSS(hover, 'lg')};
          }
          ${Tag}:focus {
            ${renderCSS(focus, 'lg')};
          }
        }
        @media screen and (min-width: ${theme.breakpoints['Breakpoints.xl']}px) {
          ${Tag} {
            ${renderCSS(styleSheet, 'xl')};
          }
          ${Tag}:hover {
            ${renderCSS(hover, 'xl')};
          }
          ${Tag}:focus {
            ${renderCSS(focus, 'xl')};
          }
        }
      `}</style>
    </React.Fragment>
  )
});

Box.defaultProps = {
  styleSheet: {},
};

export function Icon({
  as,
  styleSheet: initialStyleSheet,
  ...props
  }) {
  const Tag = 'svg';
  const {
    iconVariant,
    hover,
    focus,
    ...restStyleSheet
  } = initialStyleSheet;
  const styleSheet = {
      width: '1.5ch',
      height: '1.5ch',
      ...restStyleSheet
  };

  return (
    <React.Fragment>
      <Box styleSheet={styleSheet}>
        <FontAwesomeIcon
          icon={iconSet[`fa${capitalize(iconVariant)}`]}
          crossOrigin="anonymous"
          {...props}
        />
      </Box>
    </React.Fragment>
  )
}

export const Text = React.forwardRef(({ as, styleSheet, ...props }, ref) => {
  const {
    textVariant = {
      fontSize: 'inherit',
    },
    ...restStyleSheet
  } = styleSheet;
  const styleSheetUpdated = { ...textVariant, ...restStyleSheet };
  const tag = as || 'span';
  return (
    <Box
      ref={ref}
      as={tag}
      styleSheet={styleSheetUpdated}
      {...props}
    />
  )
});
Text.defaultProps = {
  styleSheet: {},
};

export function Image({ as, ...props }) {
  const tag = 'img';
  const {
    children,
    dangerouslySetInnerHTML,
    ...imageProps
  } = props;


  return (
    <Box as={tag} {...imageProps} />
  );
}
Image.defaultProps = {
  styleSheet: {},
};

export function Video({ as, ...props }) {
  const tag = 'video';
  const {
    children,
    dangerouslySetInnerHTML,
    ...videoProps
  } = props;


  return (
      <Box as={tag} {...videoProps}>
          {children}
    </Box>
  );
}
Video.defaultProps = {
  styleSheet: {},
};

export function Input({ as, size, icon, styleSheet, ...props }) {
  const inputRef = useRef(props.ref2);

  const tag = 'input';
  const paddingHorizontal = size === 'small' ? theme.space.x3 : theme.space.x4;
  const paddingVertical = size === 'small' ? theme.space['x2'] : theme.space.x3;
  const finalStyleSheet = {
    fontSize: theme.typography.variants.body3.fontSize,
    transition: 'all 0.2s ease-in-out',
    outline: 0,
    textVariant: theme.typography.variants.body2,
    color: theme.colors.neutral[900],
    display: 'block',
    width: theme.space["x1/1"],
    height: size === 'small' ? '40px' : 'inherit',
    border: 0,
    borderRadius: theme.space['x12'],
    paddingHorizontal: paddingHorizontal,
    paddingVertical: paddingVertical,
    backgroundColor: theme.colors.neutral['050'],
    focus: {
      border: `1px solid ${theme.colors.neutral[300]}`,
      boxShadow: `0 5px 10px -5px ${theme.colors.neutral[800]}43`,
    },
    ...styleSheet,
  };

  return (
    <Box styleSheet={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    }}>
      <Box styleSheet={{
        minWidth: '24px',
        minHeight: '24px',
        position: 'absolute',
        marginLeft: theme.space.x2,
        marginRight: theme.space.x2,
        backgroundImage: `url(${icon})`,
      }}>
      </Box>

      <Text as={tag} styleSheet={{
        ...finalStyleSheet,
        paddingLeft: icon ? theme.space.x10 : paddingHorizontal,
      }}{...props} />
    </Box>
  );
}

Input.defaultProps = {
  styleSheet: {},
};

export function Select({ as, size, icon, onChange, value, styleSheet, ...props }) {
  const tag = 'select';
  const paddingHorizontal = size === 'small' ? theme.space.x3 : theme.space.x4;
  const paddingVertical = size === 'small' ? theme.space['x2'] : theme.space.x3;
  const finalStyleSheet = {
    transition: 'all 0.2s ease-in-out',
    outline: 0,
    fontSize: theme.typography.variants.body2.fontSize,
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.neutral[900],
    display: 'block',
    height: size === 'small' ? '40px' : 'inherit',
    border: `1px solid ${theme.colors.neutral[300]}`,
    borderRadius: theme.space['x1.5'],
    paddingHorizontal: paddingHorizontal,
    paddingVertical: paddingVertical,
    paddingRight: '32px',
    appearance: 'none',
    backgroundImage: `url(/images/chevron-down.svg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'calc(100% - 8px) center',
    backgroundSize: '16px',
    focus: {
      border: `1px solid ${theme.colors.primary[800]}`,
      boxShadow: `0 5px 10px -5px ${theme.colors.neutral[999]}43`,
    },
    ...styleSheet,
  };

  return (
      <Box as={tag} onChange={onChange} value={value} styleSheet={{
        ...finalStyleSheet
      }}>
          {props.children}
      </Box>
  );
}

Input.defaultProps = {
  styleSheet: {},
};

export function Checkbox({ as, styleSheet, ...props }) {
  const [checked, setChecked] = useState(false)
  const tag = 'input';
  const finalStyleSheet = {
    transition: 'all 0.2s ease-in-out',
    outline: 0,
    textVariant: theme.typography.variants.body2,
    color: theme.colors.neutral[900],
    display: 'block',
    width: '20px',
    height: '20px',
    border: `2px solid ${theme.colors.neutral[100]}`,
    borderRadius: theme.space['x1'],
    appearance: 'none',
    hover: {
      borderColor: theme.colors.neutral[300]
    },
    ...styleSheet,
  };

  return (
    <Text as={tag} type="checkbox" styleSheet={finalStyleSheet} {...props}/>
  );
}
Checkbox.defaultProps = {
  styleSheet: {},
};

export function Radio({ as, styleSheet, text, ...props }) {
  const tag = 'input';
  const finalStyleSheet = {
    transition: 'all 0.2s ease-in-out',
    outline: 0,
    textVariant: theme.typography.variants.body2,
    color: theme.colors.neutral[900],
    display: 'block',
    width: '20px',
    height: '20px',
    border: `2px solid ${theme.colors.neutral[100]}`,
    borderRadius: '50%',
    appearance: 'none',
    hover: {
      borderColor: theme.colors.neutral[300]
    },
    ...styleSheet,
  };

  return (
    <Box styleSheet={{
      display: 'flex',
      gap: theme.space['x1.5']
    }}>
      <Text as={tag} type="radio" styleSheet={finalStyleSheet} {...props} />
      <Text>{text}</Text>
    </Box>
  );
}
Radio.defaultProps = {
  styleSheet: {},
};

export function Label({ as, styleSheet, ...props }) {
  const tag = 'label';
  const finalStyleSheet = {
    display: 'block',
    textVariant: theme.typography.variants.body3.fontSize,
    fontWeight: 600,
    marginBottom: theme.space['x2'],
    color: theme.colors.neutral[900],
    paddingLeft: theme.space.x4,
    ...styleSheet,
  };

  return (
    <Text as={tag} styleSheet={finalStyleSheet} {...props} />
  );
}
Label.defaultProps = {
  styleSheet: {},
};

export function InputGroup({ as, styleSheet, ...props }) {
  const tag = 'div';
  const finalStyleSheet = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.space['x3'],
    padding: theme.space.x1 + ' 0',
    ...styleSheet,
  };

  return (
    <Box as={tag} styleSheet={finalStyleSheet} {...props} />
  );
}
InputGroup.defaultProps = {
  styleSheet: {},
};

export function Button({ as, styleSheet, ...props }) {
  const {
    buttonVariant = 'primary',
    ...restStyleSheet
  } = styleSheet;
  const tag = 'button';

  const finalStyleSheet = {
    cursor: 'pointer',
    textVariant: theme.typography.variants.body1,
    fontWeight: 500,
    color: theme.colors.neutral["000"],
    display: 'block',
    outline: 0,
    width: theme.space["x1/1"],
    border: 0,
    borderRadius: theme.space['x12'],
    paddingHorizontal: {
      xs: theme.space.x5,
      sm: theme.space.x10
    },
    paddingVertical: theme.space['x2.5'],
    transition: 'all 0.2s ease-in-out',
    backgroundColor: theme.colors.palette.orange,
    hover: {
      opacity: '.8',
    },
    focus: {
    },
    ...restStyleSheet,
  };
  

  return (
    <Text as={tag} styleSheet={finalStyleSheet} {...props} />
  );
}
Button.defaultProps = {
  styleSheet: {},
};

export function Container({ as, styleSheet, ...props }) {
  const tag = 'div';
  const finalStyleSheet = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',

    ...styleSheet,
  };
  return (
    <Box as={tag} styleSheet={finalStyleSheet} {...props}>
      <Box styleSheet={{
        display: 'flex',
        width: '100%',
        maxWidth: '1200px',
        flexDirection: 'column',
      }}>
        {props.children}
      </Box>
    </Box>
  );
}
Container.defaultProps = {
  styleSheet: {},
};

export function Line({ as, styleSheet, ...props }) {
  const tag = 'div';
  const finalStyleSheet = {
    width: '100%',
    borderTop: `2px solid ${theme.colors.neutral[100]}`,
    marginTop: '16px',
    marginBottom: '16px',
    ...styleSheet,
  };
  return (
    <Box as={tag} styleSheet={finalStyleSheet} {...props} />
  );
}

export function Heading({ as, styleSheet, ...props }) {
  const tag = 'h3';
  const finalStyleSheet = {
    color: theme.colors.primary[900],
    marginTop: '18px',
    marginBottom: '8px',

    ...styleSheet,
  };
  return (
    <Box as={as ? as : tag} styleSheet={finalStyleSheet} {...props}>{props.children}</Box>
  );
}

Heading.defaultProps = {
  styleSheet: {},
};

export function Paragraph({ as, styleSheet, ...props }) {
  const tag = 'p';
  const finalStyleSheet = {
    ...styleSheet,
  };

  return (
    <Text as={as ? as : tag} styleSheet={finalStyleSheet} {...props}>{props.children}</Text>
  );
}

Paragraph.defaultProps = {
  styleSheet: {},
};


export function Panel({ as, styleSheet, ...props }) {
  const tag = 'div';
  const boxShadowColor = props.color ? props.color : theme.colors.primary['900'];
  const borderColor = props.color ? props.color + '3f' : theme.colors.primary['050'];
  const backgroundColor = props.color ? props.color + '0a' : 'transparent';
  const backgroundColorTitle = props.color ? props.color + '0f' : 'transparent';
  const finalStyleSheet = {
    border: `1px solid ${borderColor}`,
    borderRadius: '6px',
    boxShadow: `0 1px 4px ${boxShadowColor}2b`,
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.2s ease-in-out',
    backgroundColor: backgroundColor,

    ...styleSheet
  };
  return (
    <Box as={tag} styleSheet={finalStyleSheet} {...props}>
      {props.title && (
        <Text styleSheet={{
          textVariant: theme.typography.variants.heading5,
          padding: theme.space.x2 + ' ' + theme.space.x3,
          backgroundColor: backgroundColorTitle,
          color: props.color,
          width: '100%',
          borderBottom: '1px solid ' + borderColor
        }}>{props.title}</Text>
      )}
      {props.children}
    </Box>
  );
}

Panel.defaultProps = {
  styleSheet: {},
};

export function Header({ as, styleSheet, ...props }) {
  const tag = 'div';
  const finalStyleSheet = {
    backgroundColor: theme.colors.neutral[100],
    width: '100%',
    padding: '20px 0',

    ...styleSheet
  };
  return (
    <Box as={tag} styleSheet={finalStyleSheet} {...props}>
      <Container>
        {props.children}
      </Container>
    </Box>

  );
}

Header.defaultProps = {
  styleSheet: {},
};


export function Tabs({ as, styleSheet, ...props }) {
  const tag = 'div';
  const finalStyleSheet = {
    display: 'flex',
    marginTop: '10px',
    gap: '12px',
    borderBottom: props.selected ? theme.space['x1'] + ' solid ' + theme.colors.neutral[100] : 'inherit',

    ...styleSheet
  };
  return (
    <Box as={tag} styleSheet={finalStyleSheet} {...props}>
      {props.children}
    </Box>
  );
}

Tabs.defaultProps = {
  styleSheet: {},
};

export function Tab({ as, styleSheet, onChange, ...props }) {
  const tag = 'div';
  const finalStyleSheet = {
    cursor: 'pointer',
    hover: {
      opacity: .8
    },

    ...styleSheet
  };
  return (
    <Box as={tag} styleSheet={finalStyleSheet} onClick={onChange} {...props}>
      <Box styleSheet={{
        fontWeight: props.selected ? 500 : 'inherit',
        color: props.selected ? theme.colors.palette.orange : 'inherit',
        padding: '0 ' + theme.space.x2,
        paddingBottom: theme.space.x1,
        borderBottom: props.selected ? theme.space['x0.5'] + ' solid ' + theme.colors.palette.orange : 'inherit'
      }}>{props.children}</Box>
    </Box>
  );
}

Tab.defaultProps = {
  styleSheet: {},
};