import UnoCSS from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'

export default {
  plugins: [
    UnoCSS({
      presets: [
        presetUno(),
        presetIcons({ /* options */ }),
        presetWebFonts({
          provider: 'google', // default provider
          fonts: {
            // these will extend the default theme
            sans: 'Noto Sans',
          },
        }),
      ],
    })
  ]
}