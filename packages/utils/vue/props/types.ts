import type { icPropKey } from './runtime'
import type { IfNever, UnknownToNever, WritableArray } from './util'
import type { ExtractPropTypes, PropType } from 'vue'

type Value<T> = T[keyof T]

/**
 * 对 prop 进行类型约束
 */
export type IcPropInput<
  Type,
  Value,
  Validator,
  Default extends EpPropMergeType<Type, Value, Validator>,
  Required extends boolean
> = {
  type?: Type
  required?: Required
  values?: readonly Value[]
  validator?: ((val: any) => boolean) | ((val: any) => val is Validator)
  default?: EpPropInputDefault<Required, Default>
}

/** 合并 Type、Value、Validator 的类型 */
export type EpPropMergeType<Type, Value, Validator> =
  | IfNever<UnknownToNever<Value>, ResolvePropType<Type>, never>
  | UnknownToNever<Value>
  | UnknownToNever<Validator>

/** 约束默认值类型 */
export type EpPropInputDefault<
  Required extends boolean,
  Default
> = Required extends true
  ? never
  : Default extends Record<string, unknown> | Array<any>
  ? () => Default
  : (() => Default) | Default

/**
 * 从运行时的 props 中提取单个 prop 的参数类型
 *
 * @example
 * ExtractPropType<{ type: StringConstructor }> => string | undefined
 * ExtractPropType<{ type: StringConstructor, required: true }> => string
 * ExtractPropType<{ type: BooleanConstructor }> => boolean
 *
 */
export type ExtractPropType<T extends object> = Value<
  ExtractPropTypes<{
    key: T
  }>
>

/** 通过 ExtractPropTypes 提取类型 */
export type ResolvePropType<T> = IfNever<
  T,
  never,
  ExtractPropType<{
    type: WritableArray<T>
    required: true
  }>
>

/** 将结果转换为 IcProp 结构 */
export type IcPropFinalized<Type, Value, Validator, Default, Required> = IcProp<
  EpPropMergeType<Type, Value, Validator>,
  UnknownToNever<Default>,
  Required
>

/**
 * buildProp 工具类型的返回值类型
 */
export type IcProp<Type, Default, Required> = {
  readonly type: PropType<Type>
  readonly required: [Required] extends [true] ? true : false
  readonly validator: ((val: unknown) => boolean) | undefined
  [icPropKey]: true
} & IfNever<Default, unknown, { readonly default: Default }>
