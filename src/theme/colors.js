export const colors = {
    // Primary colors
    primary: {
        main: '#6B46C1', // Purple
        light: '#9F7AEA',
        dark: '#553C9A',
    },
    // Secondary colors
    secondary: {
        main: '#48BB78', // Green
        light: '#68D391',
        dark: '#38A169',
    },
    // Background colors
    background: {
        default: '#F7FAFC',
        paper: '#FFFFFF',
        card: '#EDF2F7',
    },
    // Text colors
    text: {
        primary: '#1A202C',
        secondary: '#4A5568',
        disabled: '#A0AEC0',
    },
    // Status colors
    status: {
        online: '#48BB78', // Green
        offline: '#E53E3E', // Red
        synced: '#48BB78', // Green
        unsynced: '#E53E3E', // Red
    },
    // UI Element colors
    ui: {
        border: '#E2E8F0',
        divider: '#EDF2F7',
        hover: '#EBF4FF',
        active: '#BEE3F8',
    },
    // Component specific colors
    components: {
        noteEditor: {
            background: '#F7FAFC',
            header: '#EDF2F7',
            toolbar: '#E2E8F0',
        },
        searchBar: {
            background: '#FFFFFF',
            border: '#E2E8F0',
        },
        card: {
            background: '#FFFFFF',
            border: '#E2E8F0',
            hover: '#EBF4FF',
        },
    },
};

// Theme configuration for Material-UI
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