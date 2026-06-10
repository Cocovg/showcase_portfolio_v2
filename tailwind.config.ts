import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        kapakana: ['Kapakana', 'cursive'],
      },
    },
  },
} satisfies Config
