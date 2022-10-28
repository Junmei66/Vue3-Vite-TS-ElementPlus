/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE_API: string
  readonly VITE_IMG: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}