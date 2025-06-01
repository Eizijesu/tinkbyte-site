/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", 
    "./public/**/*.html",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // TinkByte Brand Typography
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'sans': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      
      // TinkByte Brand Colors
      colors: {
        'tinkbyte': {
          'primary': '#1E40AF',
          'secondary': '#6B7280',
          'accent': '#3B82F6',
          'dark': '#1a2b5c',
        }
      },
      
      // Container System from Global CSS
      maxWidth: {
        'container-xs': '480px',   // Small content like forms
        'container-sm': '640px',   // Newsletter, narrow content
        'container-md': '768px',   // Single column content
        'container-lg': '1024px',  // Two column layouts
        'container-xl': '1280px',  // Three column layouts
        'container-2xl': '1440px', // Full content width
        'container-3xl': '1600px', // Maximum content width
      },
      
      // Custom Spacing for TinkByte
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Enhanced Typography Scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.1' }],
        '9xl': ['8rem', { lineHeight: '1.1' }],
      },
      
      // Custom Animations from Global CSS
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        'slide-down': 'slideDown 0.6s ease forwards',
        'scale-in': 'scaleIn 0.6s ease forwards',
        'float-slow': 'float-slow 20s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'glow': 'glow 12s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      // Custom Keyframes
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          'from': { transform: 'translateY(-20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          'from': { transform: 'scale(0.95)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-10px) translateX(10px)' },
          '50%': { transform: 'translateY(-5px) translateX(-5px)' },
          '75%': { transform: 'translateY(10px) translateX(5px)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4', transform: 'translate(0, 0) scale(1)' },
          '25%': { opacity: '0.5', transform: 'translate(5%, 5%) scale(1.1)' },
          '50%': { opacity: '0.3', transform: 'translate(0, 10%) scale(0.95)' },
          '75%': { opacity: '0.5', transform: 'translate(-5%, 5%) scale(1.05)' },
        },
      },
      
      // Enhanced Box Shadows
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.05)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 50px -10px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)',
      },
      
      // Enhanced Border Radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      
      // Custom Z-Index Scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Enhanced Typography Plugin Configuration
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Base Typography
            fontFamily: theme('fontFamily.space-grotesk'),
            lineHeight: '1.7',
            color: theme('colors.zinc.700'),
            maxWidth: 'none',
            
            // Links
            a: {
              color: theme('colors.tinkbyte.primary'),
              textDecoration: 'none',
              borderBottom: `1px solid transparent`,
              transition: 'all 0.2s ease',
              '&:hover': {
                color: theme('colors.tinkbyte.accent'),
                borderBottomColor: theme('colors.tinkbyte.accent'),
              },
            },
            
            // Headings
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: theme('fontFamily.space-grotesk'),
              fontWeight: '600',
              color: theme('colors.zinc.900'),
              lineHeight: '1.3',
            },
            
            h1: {
              fontSize: theme('fontSize.4xl[0]'),
              marginTop: '0',
              marginBottom: theme('spacing.6'),
              borderBottom: `1px solid ${theme('colors.zinc.200')}`,
              paddingBottom: theme('spacing.4'),
            },
            
            h2: {
              fontSize: theme('fontSize.3xl[0]'),
              marginTop: theme('spacing.10'),
              marginBottom: theme('spacing.4'),
              borderBottom: `1px solid ${theme('colors.zinc.200')}`,
              paddingBottom: theme('spacing.2'),
            },
            
            h3: {
              fontSize: theme('fontSize.2xl[0]'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.4'),
            },
            
            // Paragraphs
            p: {
              marginTop: theme('spacing.5'),
              marginBottom: theme('spacing.5'),
              fontFamily: theme('fontFamily.space-grotesk'),
            },
            
            // Strong text with TinkByte styling
            strong: {
              fontWeight: '700',
              color: theme('colors.teal.700'),
              background: 'linear-gradient(to bottom, transparent 60%, rgba(20, 184, 166, 0.2) 40%)',
              padding: '0 0.2em',
              borderRadius: '0.2em',
            },
            
            // Code styling
            code: {
              fontFamily: theme('fontFamily.mono'),
              fontSize: theme('fontSize.sm[0]'),
              color: theme('colors.red.600'),
              backgroundColor: theme('colors.zinc.100'),
              borderRadius: theme('borderRadius.md'),
              padding: `${theme('spacing.1')} ${theme('spacing.1.5')}`,
              fontWeight: '500',
            },
            
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            
            // Pre blocks
            pre: {
              backgroundColor: theme('colors.slate.800'),
              borderRadius: theme('borderRadius.lg'),
              padding: theme('spacing.4'),
              overflow: 'auto',
              boxShadow: theme('boxShadow.lg'),
              border: `1px solid ${theme('colors.slate.700')}`,
              
              code: {
                backgroundColor: 'transparent',
                color: theme('colors.slate.200'),
                padding: '0',
                fontWeight: 'normal',
              },
            },
            
            // Lists
            'ul, ol': {
              marginTop: theme('spacing.4'),
              marginBottom: theme('spacing.4'),
              paddingLeft: theme('spacing.6'),
            },
            
            li: {
              marginTop: theme('spacing.2'),
              marginBottom: theme('spacing.2'),
            },
            
            // Blockquotes
            blockquote: {
              borderLeft: `4px solid ${theme('colors.tinkbyte.accent')}`,
              padding: `${theme('spacing.4')} ${theme('spacing.6')}`,
              margin: `${theme('spacing.6')} 0`,
              backgroundColor: theme('colors.zinc.50'),
              borderRadius: theme('borderRadius.lg'),
              fontStyle: 'italic',
              
              p: {
                marginTop: theme('spacing.2'),
                marginBottom: theme('spacing.2'),
              },
            },
            
            // Tables
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.6'),
              fontSize: theme('fontSize.sm[0]'),
              boxShadow: theme('boxShadow.lg'),
              borderRadius: theme('borderRadius.lg'),
              overflow: 'hidden',
            },
            
            th: {
              backgroundColor: theme('colors.zinc.100'),
              color: theme('colors.zinc.900'),
              fontWeight: '600',
              padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
              borderBottom: `2px solid ${theme('colors.zinc.200')}`,
              textAlign: 'left',
            },
            
            td: {
              padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
              borderBottom: `1px solid ${theme('colors.zinc.200')}`,
            },
            
            // Images
            img: {
              borderRadius: theme('borderRadius.lg'),
              boxShadow: theme('boxShadow.lg'),
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.6'),
            },
            
            // Horizontal rules
            hr: {
              borderColor: theme('colors.zinc.200'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.8'),
            },
          },
        },
        
        // Dark mode typography
        invert: {
          css: {
            color: theme('colors.zinc.300'),
            
            a: {
              color: theme('colors.tinkbyte.accent'),
              '&:hover': {
                color: theme('colors.blue.400'),
                borderBottomColor: theme('colors.blue.400'),
              },
            },
            
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.zinc.100'),
            },
            
            h1: {
              borderBottomColor: theme('colors.zinc.700'),
            },
            
            h2: {
              borderBottomColor: theme('colors.zinc.700'),
            },
            
            strong: {
              color: theme('colors.teal.400'),
              background: 'linear-gradient(to bottom, transparent 60%, rgba(20, 184, 166, 0.15) 40%)',
            },
            
            code: {
              color: theme('colors.red.400'),
              backgroundColor: theme('colors.zinc.800'),
            },
            
            pre: {
              backgroundColor: theme('colors.slate.900'),
              borderColor: theme('colors.slate.700'),
            },
            
            blockquote: {
              borderLeftColor: theme('colors.tinkbyte.accent'),
              backgroundColor: theme('colors.zinc.800'),
            },
            
            th: {
              backgroundColor: theme('colors.zinc.800'),
              color: theme('colors.zinc.100'),
              borderBottomColor: theme('colors.zinc.700'),
            },
            
            td: {
              borderBottomColor: theme('colors.zinc.700'),
            },
            
            hr: {
              borderColor: theme('colors.zinc.700'),
            },
          },
        },
        
        // TinkByte specific prose variant
        tinkbyte: {
          css: {
            '--tw-prose-body': theme('colors.zinc.700'),
            '--tw-prose-headings': theme('colors.zinc.900'),
            '--tw-prose-lead': theme('colors.zinc.600'),
            '--tw-prose-links': theme('colors.tinkbyte.primary'),
            '--tw-prose-bold': theme('colors.zinc.900'),
            '--tw-prose-counters': theme('colors.tinkbyte.secondary'),
            '--tw-prose-bullets': theme('colors.tinkbyte.secondary'),
            '--tw-prose-hr': theme('colors.zinc.200'),
            '--tw-prose-quotes': theme('colors.zinc.900'),
            '--tw-prose-quote-borders': theme('colors.tinkbyte.accent'),
            '--tw-prose-captions': theme('colors.zinc.600'),
            '--tw-prose-code': theme('colors.red.600'),
            '--tw-prose-pre-code': theme('colors.slate.200'),
            '--tw-prose-pre-bg': theme('colors.slate.800'),
            '--tw-prose-th-borders': theme('colors.zinc.300'),
            '--tw-prose-td-borders': theme('colors.zinc.200'),
          },
        },
      }),
    },
  },
  
  plugins: [
    require('@tailwindcss/typography'),
    
    // Custom plugin for TinkByte utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Theme transition utilities
        '.theme-transition-all': {
          'transition-property': 'background-color, border-color, color, fill, stroke',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '300ms',
        },
        '.theme-transition-colors': {
          'transition-property': 'color, fill, stroke',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '300ms',
        },
        '.theme-transition-bg': {
          'transition-property': 'background-color',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '300ms',
        },
        
        // Animation delay utilities
        '.delay-100': { 'animation-delay': '0.1s' },
        '.delay-200': { 'animation-delay': '0.2s' },
        '.delay-300': { 'animation-delay': '0.3s' },
        '.delay-400': { 'animation-delay': '0.4s' },
        '.delay-1000': { 'animation-delay': '1s' },
        '.delay-2000': { 'animation-delay': '2s' },
      }
      
      addUtilities(newUtilities)
    },
  ],
};
