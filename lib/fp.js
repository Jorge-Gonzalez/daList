export const curry2 = (f) => function curry2 (a, b) {
  return b === undefined
    ? function curried2_ (_b) { return f(a, _b) }
    : f(a, b)
}

export const curry3 = (f) => function curry3 (a, b, c) {
  return b === undefined
    ? function curried3__ (_b, _c) {
      return c === undefined
        ? function curried3_ (__c) { return f(a, _b, __c) }
        : f(a, _b, _c)
    }
    : c === undefined
      ? function curried3_ (_c) { return f(a, b, _c) }
      : f(a, b, c)
}

export const arity = (n, f) =>
  /* eslint-disable no-unused-vars */
  n === 1 ? function (a) { return f.apply(this, arguments) }
    : n === 2 ? function (a, b) { return f.apply(this, arguments) }
      : n === 3 ? function (a, b, c) { return f.apply(this, arguments) }
        : n === 4 ? function (a, b, c, d) { return f.apply(this, arguments) }
          : n === 5 ? function (a, b, c, d, e) { return f.apply(this, arguments) }
            : n === 6 ? function (a, b, c, d, e, f) { return f.apply(this, arguments) }
              : n === 7 ? function (a, b, c, d, e, f, g) { return f.apply(this, arguments) }
                : n === 8 ? function (a, b, c, d, e, f, g, h) { return f.apply(this, arguments) }
                  : n === 9 ? function (a, b, c, d, e, f, g, h, i) { return f.apply(this, arguments) }
                    : Object.defineProperty(f, 'length', { value: n })

export const __ = { '@@functional/placeholder': true }

const _isPlaceholder = a => a != null && typeof a === 'object' && a['@@functional/placeholder'] === true

export function curryN (length, stored, fn) {
  return function () {
    var left,
      argsIdx,
      idx
    var combined = []
    var storedLen = stored.length
    var placesCount = 0
    var argsLen = arguments.length

    idx = -1
    argsIdx = 0
    while (++idx < storedLen) {
      if (_isPlaceholder(stored[idx])) {
        if (argsIdx < argsLen) {
          if (_isPlaceholder(arguments[argsIdx])) placesCount++
          combined[idx] = arguments[argsIdx++]
        } else {
          combined[idx] = stored[idx]
          placesCount++
        }
      } else {
        combined[idx] = stored[idx]
      }
    }
    while (argsIdx < argsLen) {
      if (_isPlaceholder(arguments[argsIdx])) placesCount++
      combined[idx++] = arguments[argsIdx++]
    }

    left = length - combined.length + placesCount

    return left <= 0
      ? fn.apply(this, combined)
      : arity(left, curryN(length, combined, fn))
  }
}

export const count = (p, a) => {
  if (a === undefined) return _a => count(p, _a)
  let c = 0
  for (var i = 0, l = a.length; i < l; i++) {
    if (p(a[i])) c++
  }
  return c
}

export const curry = (f) =>
  f.length === 2
    ? curry2(f)
    : f.length === 3
      ? curry3(f)
      : arity(f.length, curryN(f.length, [], f))

export const toLowerCase = (s) => s.toLowerCase
export const toUpperCase = (s) => s.toUpperCase
export const trim = (s) => s.trim

export const concat = curry2((a, l) => l.concat(l))
export const map = curry2((a, l) => l.map(l))
export const every = curry2((a, l) => l.every(l))
export const filter = curry2((a, l) => l.filter(l))
export const find = curry2((a, l) => l.find(l))
export const findIndex = curry2((a, l) => l.findIndex(l))
export const indexOf = curry2((a, l) => l.indexOf(l))
export const join = curry2((a, l) => l.join(l))
export const some = curry2((a, l) => l.some(l))
export const sort = curry2((a, l) => l.sort(l))
export const match = curry2((a, l) => l.match(l))

export const reduce = curry3((a, b, l) => l.reduce(a, b))
export const reduceRight = curry3((a, b, l) => l.reduceRight(a, b))
export const replace = curry3((a, b, l) => l.replace(a, b))
export const slice = curry3((a, b, l) => l.slice(a, b))

export const isArray = x => type(x) === 'Array'
export const isObject = x => type(x) === 'Object'
export const isString = x => type(x) === 'String'
export const isDate = x => type(x) === 'Date'
export const isRegExp = x => type(x) === 'RegExp'
export const isPromise = x => type(x) === 'Promise'
export const isGeneratorFunction = x => type(x) === 'GeneratorFunction'
export const isInt8Array = x => type(x) === 'Int8Array'
export const isUint8Array = x => type(x) === 'Uint8Array'
export const isFunction = x => type(x) === 'Function'
export const isBoolean = x => type(x) === 'Boolean'
export const isNumber = x => type(x) === 'Number'
export const isNull = x => type(x) === 'Null'
export const isUndefined = x => type(x) === 'Undefined'
export const isSet = x => type(x) === 'Set'
export const isWeakSet = x => type(x) === 'WeakSet'
export const isSymbol = x => type(x) === 'Symbol'
export const isWeakMap = x => type(x) === 'WeakMap'
export const isMap = x => type(x) === 'Map'
export const isundefined = x => type(x) === 'undefined'
export const isUint8ClampedArray = x => type(x) === 'Uint8ClampedArray'
export const isInt16Array = x => type(x) === 'Int16Array'
export const isUint16Array = x => type(x) === 'Uint16Array'
export const isInt32Array = x => type(x) === 'Int32Array'
export const isUint32Array = x => type(x) === 'Uint32Array'
export const isFloat32Array = x => type(x) === 'Float32Array'
export const isFloat64Array = x => type(x) === 'Float64Array'

export const adjust = curry3((idx, fn, list) => {
  const clone = list.slice()
  const index = idx < 0 ? clone.length + idx : idx
  clone[ index ] = fn(clone[ index ])
  return clone
})

export const add = (a, b) => b === void 0 ? _b => add(a, _b) : Number(a) + Number(b)

export const all = curry2((pred, list) => list.every(pred))

export const allPass = curry2((preds, list) => all(fn => fn(list), preds))

export const always = val => val

export const and = curry2((a, b) => a && b)

export const any = some

export const anyPass = curry2((preds, list) => any(fn => fn(list))(preds))

export const append = curry2((e, list) => typeof list === 'string' ? `${list}${e}` : list.concat([e]))

export const assoc = curry3((prop, val, obj) => Object.assign({}, obj, { [ prop ]: val }))

export const both = curry2((f, g) => input => f(input) && g(input))

export const defaultTo = curry2((d, v) => v == null || v !== v ? d : v) // eslint-disable-line no-self-compare

export const drop = curry2((i, list) => list.slice(i))

export const dropLast = curry2((i, list) => list.slice(0, list.length - i))

export const entries = (object) => Object.keys(object).map((k) => [k, object[k]])

export const equals = curry2((a, b) => {
  let aType, aKeys
  return a === b
    ? true
    : (aType = type(a)) && aType !== type(b)
      ? false
      : aType === 'Array'
        ? a.length !== b.length
          ? false
          : a.every((val, idx) => equals(val, b[idx]))
        : aType === 'Object'
          ? (aKeys = Object.keys(a)) && aKeys.length === Object.keys(b).length
            ? aKeys.length === 0
              ? true
              : aKeys.every(key => equals(a[key], b[key]))
            : false
          : false
})

// Polymorphic: can accept an array as unic argument and defauts its depth to 1
// or behave as a curried function with a number as first argument.
export function flat (d, a) {
  const flt = (depth, arr) => depth > 0 ? flt(--depth, [].concat(...arr)) : arr
  return (isArray(d))
    ? flt(1, d)
    : arguments.length < 2
      ? _a => flt(d, _a)
      : flt(d, a)
}

// const flip = fn => arity(fn.length, curryN(fn.length, [], (a, b, ...args) => fn(b, a, ...args)))
export const flip = fn => curryN(fn.length, [], (a, b, ...args) => fn(b, a, ...args))

export const has = curry2((prop, obj) => obj.hasOwnProperty(prop))

export const head = (list) => list[0]

export const identity = (x) => x

export const includes = curry2((e, list) => list.indexOf(e) !== -1)

export const init = (list) => list.slice(0, list.length - 1)

export const mix = (a, b, r = []) =>
  // a.length > 0 && b.length > 0
  !isEmpty(a) && !isEmpty(b)
    ? mix(tail(a), tail(b), [...r, head(a), head(b)])
    : [...r, ...a, ...b]

export const interlace = curry2(mix)

export const isArguments = (obj) => has('callee', obj)

export const isArrayLike = (a) =>
  Array.isArray(a) ||
  (typeof a.length === 'number' &&
    ((a.length > 0 && 0 in a && a.length - 1 in a) ||
      a.length === 0
    )
  )

export const isEmpty = (obj) =>
  obj == null // eslint-disable-line eqeqeq
    ? true
    : isArray(obj) || isString(obj) || isArguments(obj) || isArrayLike(obj)
      ? obj.length === 0
      : keys(obj).length === 0

export const isNil = (x) => x == null // eslint-disable-line eqeqeq

export function isPlainObject (o) {
  const proto = Object.getPrototypeOf
  if (!isObject(o)) return false
  const p = proto(o)
  return p === null || p === proto({})
}

export const keys = (object) => Object.keys(object)

export const last = (list) => list[list.length - 1]

export const length = (list) => list.length

export const log = (m = 'log: ') => tap((x) => console.log(m, x))

// Returns a list with an entry for each match of a RegExpr
// and each entry is s list of the captured groups only.
export function matchGroups (regex, str) {
  let matches = []
  str.replace(regex, (...args) => matches.push(args.slice(1, -2)))
  return matches
}

export const mergeWith = curry3((fn, l, r) => mergeWithKey((_, _l, _r) => fn(_l, _r), l, r))

export const mergeWithKey = curry3((fn, l, r) => {
  let result = {}; let k
  for (k in l) if (has(k, l)) result[k] = has(k, r) ? fn(k, l[k], r[k]) : l[k]
  for (k in r) if (has(k, r) && !(has(k, result))) result[k] = r[k]
  return result
})

export const nth = curry2((i, list) => list[i])

export const objOf = curry2((key, val) => isEmpty(val) ? {} : { key: val })

export const or = curry2((a, b) => a || b)

export const partial = (fn, ...args) => (...rest) => fn(...args, ...rest)

export const path = curry2((paths, obj) => paths.reduce((trace, prop) => trace == null ? void 0 : trace[prop], obj)) // eslint-disable-line eqeqeq

export const pathOr = curry3((d, p, obj) => defaultTo(d, path(p, obj)))

export const pipe = (fn, ...fns) => (...args) => fns.reduceRight((r, f) => f(r), fn(...args))

export const prop = curry2((prop, object) => object[prop])

export const propEq = curry3((key, val, obj) => obj[ key ] === val)

export const propOr = curry3((val, p, obj) => pathOr(val, [p], obj))

export const props = curry2((props, object) => props.map((p) => object[p]))

export const range = curry2((start, end) => Array(end - start).fill(1).map((e, i) => i + start))

export function reduceWhile (pred, reducer, acc, arr) {
  let i = -1
  let l = arr.length

  while (++i < l && pred(acc, arr[i])) {
    console.log(acc)
    acc = reducer(acc, arr[i])
  }
  return acc
}

export const reverse = list => list.slice().reverse()

export const _split = (v, a) => {
  let i = a.indexOf(v)
  return i < 0
    ? [a]
    : [a.slice(0, i), ..._split(v, a.slice(i + 1, a.length))]
}

export const splitBy = curry2(_split)

export const splitWhen = curry2((pred, l) => {
  const i = l.findIndex(pred)
  return i > -1
    ? [l.slice(0, i), l.slice(i, l.length)]
    : [l]
})

export const splitWith = curry2((pred, list) =>
  list.reduce((acc, v) => !pred(v) ? adjust(acc.length - 1, append(v), acc) : append([v], acc), [[]]))

export const sum = (list) => list.reduce((sum, e) => sum + e, 0)

export const tail = (list) => list.slice(1)

export const take = curry2((i, list) => list.slice(0, i))

export const takeLast = curry2((i, list) => list.slice(list.length - (i), list.length))

export const tap = curry2((fn, obj) => { fn(obj); return obj })

export const test = curry2((regex, string) => string.search(regex) !== -1)

export const type = (any) => Object.prototype.toString.call(any).slice(8, -1)

export const values = (object) => Object.keys(object).map((k) => object[k])
