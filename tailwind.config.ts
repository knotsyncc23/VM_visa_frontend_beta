import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Sora", "ui-sans-serif", "system-ui"],
        body: ["Nunito", "ui-sans-serif", "system-ui"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // VM Visa Brand Colors
        "royal-blue": {
          50: "hsl(var(--royal-blue-50))",
          100: "hsl(var(--royal-blue-100))",
          500: "hsl(var(--royal-blue-500))",
          600: "hsl(var(--royal-blue-600))",
          700: "hsl(var(--royal-blue-700))",
          900: "hsl(var(--royal-blue-900))",
        },
        "sky-blue": {
          300: "hsl(var(--sky-blue-300))",
          400: "hsl(var(--sky-blue-400))",
          500: "hsl(var(--sky-blue-500))",
        },
        "sage-green": {
          300: "hsl(var(--sage-green-300))",
          400: "hsl(var(--sage-green-400))",
          500: "hsl(var(--sage-green-500))",
          600: "hsl(var(--sage-green-600))",
        },
        "mint-green": {
          300: "hsl(var(--mint-green-300))",
          400: "hsl(var(--mint-green-400))",
          500: "hsl(var(--mint-green-500))",
        },
        "creamy-beige": {
          100: "hsl(var(--creamy-beige-100))",
          200: "hsl(var(--creamy-beige-200))",
          300: "hsl(var(--creamy-beige-300))",
        },
        sandstone: {
          300: "hsl(var(--sandstone-300))",
          400: "hsl(var(--sandstone-400))",
          500: "hsl(var(--sandstone-500))",
        },
        "cool-gray": {
          100: "hsl(var(--cool-gray-100))",
          300: "hsl(var(--cool-gray-300))",
          500: "hsl(var(--cool-gray-500))",
          600: "hsl(var(--cool-gray-600))",
          700: "hsl(var(--cool-gray-700))",
          800: "hsl(var(--cool-gray-800))",
        },
        gold: {
          400: "hsl(var(--gold-400))",
          500: "hsl(var(--gold-500))",
          600: "hsl(var(--gold-600))",
        },
      },
      backgroundImage: {
        "gradient-royal":
          "linear-gradient(135deg, hsl(var(--royal-blue-600)), hsl(var(--sky-blue-500)))",
        "gradient-sage":
          "linear-gradient(135deg, hsl(var(--sage-green-500)), hsl(var(--mint-green-400)))",
        "gradient-warm":
          "linear-gradient(135deg, hsl(var(--creamy-beige-200)), hsl(var(--sandstone-400)))",
        "gradient-premium":
          "linear-gradient(135deg, hsl(var(--royal-blue-700)), hsl(var(--gold-500)))",
        "gradient-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "3rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(30, 58, 138, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(30, 58, 138, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.4s ease-out",
        glow: "glow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
