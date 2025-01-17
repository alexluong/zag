type Key = keyof CSSStyleDeclaration | (string & {})
type Styles = Record<Key, any>
type El = HTMLElement | null | undefined

const styleCache: WeakMap<HTMLElement, Styles> = new WeakMap()

export function getComputedStyle(el: El): Styles {
  if (!el) return {} as Styles
  let style: Styles | undefined = styleCache.get(el)
  if (!style) {
    const win = el?.ownerDocument.defaultView ?? window
    style = win.getComputedStyle(el) as Styles
    styleCache.set(el, style)
  }
  return style
}
