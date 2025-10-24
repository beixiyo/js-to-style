/**
 * 主题模式配置
 */
export interface ThemeConfig {
  /** 主题模式配置 */
  modes: {
    /** 浅色模式配置 */
    light: Record<string, string | number>
    /** 深色模式配置 */
    dark: Record<string, string | number>
  }
}

/**
 * 解析选项
 */
export interface ParseOptions {
  /** 读取 js 文件路径 */
  jsPath: string
  /** 输出 css 文件路径 */
  cssPath?: string
  /** 输出 scss 文件路径 */
  scssPath?: string
  /** 输出 less 文件路径 */
  lessPath?: string
  /**
   * CSS 变量前缀
   * @default '--'
   */
  cssPrefix?: string
  /**
   * SCSS 变量前缀
   * @default '$'
   */
  scssPrefix?: string
  /**
   * LESS 变量前缀
   * @default '@'
   */
  lessPrefix?: string
  /**
   * 深色模式类名
   * @default '.dark'
   */
  darkClassName?: string
  /**
   * 浅色模式类名
   * @default ':root'
   */
  lightClassName?: string
  /**
   * 是否生成浅色模式变量
   * @default true
   */
  generateLight?: boolean
  /**
   * 是否生成深色模式变量
   * @default true
   */
  generateDark?: boolean
  /**
   * 自定义变量名转换函数
   * @default (name: string) => name
   */
  variableNameTransform?: (name: string) => string
}

/**
 * Vite 插件选项
 */
export interface AutoParseStylesPluginOptions extends ParseOptions {
  /**
   * 是否监听文件变化
   * @default true
   */
  watch?: boolean
}