// Colors

const neutral = {
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
}

const background = {
    default: '#FCFCFC',
    grade: '#F9FAFC',
    paper: '#FFFFFF',
    primary: '#1f296a',
}

const divider = '#8a97cb'

const primary = {
    main: '#1f296a',
    light: '#FF8264',
    dark: '#1f296a',
    contrastText: '#FFFFFF',
}

const secondary = {
    main: '#65748B',
    light: '#65748B',
    dark: '#65748B',
    contrastText: '#FFFFFF',
}

const free = {
    main: '#333333',
    light: '#333333',
    dark: '#333333',
    contrastText: '#FFFFFF',
}

const basic = {
    main: '#FF8264',
    light: '#FF8264',
    dark: '#FF8264',
    contrastText: '#FFFFFF',
}

const pro = {
    main: '#9B1CFF',
    light: '#9B1CFF',
    dark: '#9B1CFF',
    contrastText: '#FFFFFF',
}

const success = {
    main: '#14B8A6',
    light: '#43C6B7',
    dark: '#0E8074',
    contrastText: '#FFFFFF',
}

const disable = {
    main: '#888',
    light: '#888',
    dark: '#888',
    contrastText: '#FFFFFF',
}

const info = {
    main: '#1C60FF',
    light: '#64B6F7',
    dark: '#0B79D0',
    contrastText: '#FFFFFF',
}

const warning = {
    main: '#FFB020',
    light: '#FFBF4C',
    dark: '#B27B16',
    contrastText: '#FFFFFF',
}

const error = {
    main: '#1f296a',
    light: '#DA6868',
    dark: '#922E2E',
    contrastText: '#FFFFFF',
}

const text = {
    primary: '#121828',
    secondary: '#65748B',
    disabled: 'rgba(55, 65, 81, 0.48)',
    black: '#000',
    white: '#fff',
}

export const lightThemeOptions = {
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: neutral[500],
                    color: '#FFFFFF',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-filledDefault': {
                        backgroundColor: neutral[200],
                        '& .MuiChip-deleteIcon': {
                            color: neutral[400],
                        },
                    },
                    '&.MuiChip-outlinedDefault': {
                        '& .MuiChip-deleteIcon': {
                            color: neutral[300],
                        },
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        opacity: 1,
                        color: text.secondary,
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: divider,
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderColor: divider,
                    borderStyle: 'solid',
                    borderWidth: 1,
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    borderColor: divider,
                    borderStyle: 'solid',
                    borderWidth: 1,
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    color: neutral[500],
                },
                track: {
                    backgroundColor: neutral[400],
                    opacity: 1,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${divider}`,
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: neutral[100],
                    '.MuiTableCell-root': {
                        color: neutral[700],
                    },
                },
            },
        },
    },
    palette: {
        action: {
            active: neutral[500],
            focus: 'rgba(55, 65, 81, 0.12)',
            hover: 'rgba(55, 65, 81, 0.04)',
            selected: 'rgba(55, 65, 81, 0.08)',
            disabledBackground: 'rgba(55, 65, 81, 0.12)',
            disabled: 'rgba(55, 65, 81, 0.26)',
        },
        white: {
            main: '#FFFFFF',
            light: '#FFFFFF',
            dark: '#FFFFFF',
            contrastText: '#FFFFFF',
        },
        background,
        divider,
        error,
        info,
        mode: 'light',
        neutral,
        primary,
        secondary,
        free,
        basic,
        pro,
        disable,
        success,
        text,
        warning,
    },
    shadows: [
        'none',
        '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
        '0px 1px 2px rgba(100, 116, 139, 0.12)',
        '0px 1px 4px rgba(100, 116, 139, 0.12)',
        '0px 1px 5px rgba(100, 116, 139, 0.12)',
        '0px 1px 6px rgba(100, 116, 139, 0.12)',
        '0px 2px 6px rgba(100, 116, 139, 0.12)',
        '0px 3px 6px rgba(100, 116, 139, 0.12)',
        '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
        '0px 5px 12px rgba(100, 116, 139, 0.12)',
        '0px 5px 14px rgba(100, 116, 139, 0.12)',
        '0px 5px 15px rgba(100, 116, 139, 0.12)',
        '0px 6px 15px rgba(100, 116, 139, 0.12)',
        '0px 7px 15px rgba(100, 116, 139, 0.12)',
        '0px 8px 15px rgba(100, 116, 139, 0.12)',
        '0px 9px 15px rgba(100, 116, 139, 0.12)',
        '0px 10px 15px rgba(100, 116, 139, 0.12)',
        '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
        '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
        '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
        '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
        '0px 25px 50px rgba(100, 116, 139, 0.25)',
        '0px 25px 50px rgba(100, 116, 139, 0.25)',
        '0px 25px 50px rgba(100, 116, 139, 0.25)',
        '0px 25px 50px rgba(100, 116, 139, 0.25)',
    ],
}
