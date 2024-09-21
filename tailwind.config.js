/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'intense-black': '0 0 5px 5px black',
        'intense-white': '0 0 5px 5px white',
        'intense-gray': '0 0 5px 5px gray',
        'intense-red': '0 0 5px 5px red',
        'intense-green': '0 0 5px 5px green',
        'intense-blue': '0 0 5px 5px blue',
        'intense-yellow': '0 0 5px 5px yellow',

        'mild-black': '0 0 2px 2px black',
        'mild-white': '0 0 2px 2px white',
        'mild-gray': '0 0 2px 2px gray',
        'mild-red': '0 0 2px 2px red',
        'mild-green': '0 0 2px 2px green',
        'mild-blue': '0 0 2px 2px blue',
        'mild-yellow': '0 0 2px 2px yellow',
      },
      keyframes: {
        floatUpAndFadeOut: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '80%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(-20px)', opacity: 0 },
        },
        entityAnimate: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-100%,0,0)' },
        },
        entityAnimateLeft: {
          '0%': { transform: 'translate3d(-100%,0,0) scaleX(-1)' },
          '100%': { transform: 'translate3d(0,0,0) scaleX(-1)' },
        },
        floatUpAndDown: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
          '100%': { transform: 'translateY(0)' },
        },
        borderPulse: {
          '0%': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
            boxShadow: '0 0 5px 2px rgba(255, 255, 255, 0.5)',
          },
          '50%': {
            borderColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0 0 5px 2px rgba(255, 255, 255, 1)',
          },
          '100%': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
            boxShadow: '0 0 5px 2px rgba(255, 255, 255, 0.5)',
          },
        },
      },
      animation: {
        floatUpAndFadeOut15: 'floatUpAndFadeOut 1.5s linear',
        floatUpAndFadeOut20: 'floatUpAndFadeOut 2s linear',
        floatUpAndFadeOut25: 'floatUpAndFadeOut 2.5s linear',

        entityAnimate05: 'entityAnimate 0.5s steps(6) infinite',
        entityAnimateOnce05: 'entityAnimate 0.5s steps(6) forwards',
        entityAnimate08: 'entityAnimate 0.8s steps(6) infinite',
        entityAnimateOnce08: 'entityAnimate 0.8s steps(6) forwards',
        entityAnimate10: 'entityAnimate 1s steps(6) infinite',
        entityAnimate20: 'entityAnimate 2s steps(6) infinite',

        entityAnimateLeft05: 'entityAnimateLeft 0.5s steps(6) infinite',
        entityAnimateLeftOnce05: 'entityAnimateLeft 0.5s steps(6) forwards',
        entityAnimateLeft08: 'entityAnimateLeft 0.8s steps(6) infinite',
        entityAnimateLeftOnce08: 'entityAnimateLeft 0.8s steps(6) forwards',
        entityAnimateLeft10: 'entityAnimateLeft 1s steps(6) infinite',
        entityAnimateLeft20: 'entityAnimateLeft 2s steps(6) infinite',

        floatUpAndDown: 'floatUpAndDown 1s linear infinite',

        borderPulse: 'borderPulse 1s linear infinite',
      },
    },
  },
  plugins: [],
};
