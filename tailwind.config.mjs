export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        rollout: {
          blue: '#4169E1',
          purple: '#7B68EE',
          orange: '#FF6B35',
          yellow: '#FDB813'
        }
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'Century Gothic', 'sans-serif']
      }
    }
  }
};