import * as MouseWheel from '@livelybone/mouse-wheel'

export interface CustomListener<T = Event> {
  (ev: T): any
}

export interface RemoveListener {
  (): void
}

declare function $addListener<T = Event>(
  element: Element | Window,
  eventName: string,
  listener: CustomListener<T>,
  useCapture?: boolean,
): RemoveListener

declare const $isMobile: boolean

declare const Utils$addListener: typeof $addListener
declare const Utils$isMobile: typeof $isMobile
declare namespace Utils {
  export { Utils$addListener as $addListener, Utils$isMobile as $isMobile }
}

declare type OriginalEvent = MouseEvent | TouchEvent
declare type DragMoveEventType = 'dragMoveStart' | 'dragMove' | 'dragMoveEnd'

interface DragMoveEvent {
  type: DragMoveEventType
  deltaX: number
  deltaY: number
  originalEvent: OriginalEvent
}

interface DragMoveListener {
  (ev: DragMoveEvent): any
}

interface DragMoveBindFn {
  (
    element: Element | Window,
    listener: DragMoveListener,
    useCapture?: boolean,
  ): RemoveListener

  (listener: DragMoveListener, useCapture?: boolean): RemoveListener
}

declare const bind: DragMoveBindFn

declare const DragMoveBind: typeof bind
declare namespace DragMove {
  export { DragMoveBind as bind }
}

export { DragMove, MouseWheel, Utils }
