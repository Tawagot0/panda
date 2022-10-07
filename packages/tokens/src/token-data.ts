import { cssVar, getNegativePath } from '@css-panda/shared'
import type { TokenCategory } from '@css-panda/types'
import { negate } from './calc'

type TokenDataOptions = {
  condition?: string
  path: string[]
  value: string
  description?: string
  negative?: boolean
  prefix?: string
}

export function getTokenData(data: TokenDataOptions) {
  const { condition = '', path, value, negative = false, prefix, description = '' } = data
  const [category, ...keys] = path

  const _var = cssVar(keys.join('-'), {
    prefix: [prefix, category].filter(Boolean).join('-'),
  })

  const key = negative ? getNegativePath(keys).join('.') : keys.join('.')

  return {
    condition,
    category: category as TokenCategory,
    key,
    prop: `${category}.${key}`,
    value: negative ? negate(value) : value,
    var: _var.var,
    varRef: negative ? negate(_var.ref) : _var.ref,
    negative,
    description,
  }
}

export type TokenData = ReturnType<typeof getTokenData>
