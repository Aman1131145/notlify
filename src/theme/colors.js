//This is the dark theme
export const colors = {
    primary: {
        main: '#9F7AEA',
        light: '#B794F4',
        dark: '#6B46C1',
    },
    secondary: {
        main: '#68D391',
        light: '#9AE6B4',
        dark: '#48BB78',
    },
    background: {
        default: '#1A202C',
        paper: '#2D3748',
        card: '#2D3748',
    },
    text: {
        primary: '#F7FAFC',
        secondary: '#E2E8F0',
        disabled: '#718096',
    },
    status: {
        online: '#68D391',
        offline: '#FC8181',
        synced: '#68D391',
        unsynced: '#FC8181',
    },
    ui: {
        border: '#4A5568',
        divider: '#2D3748',
        hover: '#2C5282',
        active: '#2B6CB0',
    },

    components: {
        noteEditor: {
            background: '#2D3748',
            header: '#1A202C',
            toolbar: '#2D3748',
        },
        searchBar: {
            background: '#2D3748',
            border: '#4A5568',
        },
        card: {
            background: '#2D3748',
            border: '#4A5568',
            hover: '#2C5282',
        },
    },
};

// This is the light theme
// export const colors = {
//     primary: {
//         main: '#6B46C1',
//         light: '#9F7AEA',
//         dark: '#553C9A',
//     },
//     secondary: {
//         main: '#48BB78',
//         light: '#68D391',
//         dark: '#38A169',
//     },
//     background: {
//         default: '#F7FAFC',
//         paper: '#FFFFFF',
//         card: '#EDF2F7',
//     },
//     text: {
//         primary: '#1A202C',
//         secondary: '#4A5568',
//         disabled: '#A0AEC0',
//     },
//     status: {
//         online: '#48BB78',
//         offline: '#E53E3E',
//         synced: '#48BB78',
//         unsynced: '#E53E3E',
//     },
//     ui: {
//         border: '#E2E8F0',
//         divider: '#EDF2F7',
//         hover: '#EBF4FF',
//         active: '#BEE3F8',
//     },

//     components: {
//         noteEditor: {
//             background: '#F7FAFC',
//             header: '#EDF2F7',
//             toolbar: '#E2E8F0',
//         },
//         searchBar: {
//             background: '#FFFFFF',
//             border: '#E2E8F0',
//         },
//         card: {
//             background: '#FFFFFF',
//             border: '#E2E8F0',
//             hover: '#EBF4FF',
//         },
//     },
// };
export const theme = {
    palette: {
        primary: colors.primary,
        secondary: colors.secondary,
        background: colors.background,
        text: colors.text,
    },
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: '0.5rem',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0.75rem',
                    textTransform: 'none',
                    fontWeight: 'bold',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '1rem',
                },
            },
        },
    },
}; 