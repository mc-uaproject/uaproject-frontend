const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
            },
            textColor: {
                default: "var(--color-text)",
                offset: "var(--color-text-offset)",
            },
            backgroundColor: {
                default: "var(--color-background)",
                offset: "var(--color-background-offset)",
            },
            borderColor: {
                default: "var(--color-border)",
            },
        },
    },
    corePlugins: {
        fontSize: false,
    },
    plugins: [require("tailwindcss-fluid-type"), require('daisyui')],

    daisyui: {
        themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: "dark", // name of one of the included themes for dark mode
        base: false, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ":root", // The element that receives theme color CSS variables
    },
};
