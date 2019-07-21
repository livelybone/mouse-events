import { isMobile } from 'is-mobile'

let prefix: 'on' | '' = ''
let $addEventListener: 'addEventListener' | 'attachEvent'
let $removeEventListener: 'removeEventListener' | 'detachEvent'

// detect event model
if (window.addEventListener) {
  $addEventListener = 'addEventListener'
  $removeEventListener = 'removeEventListener'
} else {
  $addEventListener = 'attachEvent'
  $removeEventListener = 'detachEvent'
  prefix = 'on'
}

export interface CustomListener<T = Event> {
  (ev: T): any
}

export interface RemoveListener {
  (): void
}

export function $addListener<T = Event>(
  element: Element | Window,
  eventName: string,
  listener: CustomListener<T>,
  useCapture?: boolean,
): RemoveListener {
  const addListener = (element as any)[$addEventListener]
  addListener(prefix + eventName, listener, useCapture)

  return () => {
    const removeListener = (element as any)[$removeEventListener]
    removeListener(prefix + eventName, listener, useCapture)
  }
}

export const $isMobile = isMobile()
