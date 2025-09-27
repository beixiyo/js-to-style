import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'


/**
 * 写入文件，如果不存在文件夹，则自动创建递归文件夹
 */
export function forceWriteFile(path: string, content: string) {
  const dir = dirname(path)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  writeFileSync(path, content)
}
