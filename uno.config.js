import { defineConfig, presetAttributify, presetUno } from "unocss";

export default defineConfig({
    presets: [presetAttributify(), presetUno()],
    preflights: [
    {
      getCSS: () => `
      .el-button {
        background-color: var(--el-button-bg-color, var(--el-color-white))
      }
      .n-button {
        background-color: var(--n-color)
      }
      `,
    },
  ],
})