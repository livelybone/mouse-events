import * as MouseWheel from '@livelybone/mouse-wheel'

export interface CustomListener<T = Event> {
  (ev: T): any
}

export interface RemoveListener {
  (): void
}

declare namespace Utils {
  function $addListener<T = Event>(
    element: Element | Window,
    eventName: string,
    listener: CustomListener<T>,
    useCapture?: boolean,
  ): RemoveListener

  const $isMobile: boolean

  export { $addListener, $isMobile }
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

declare namespace DragMove {
  const bind: DragMoveBindFn
  export { bind }
}

export { DragMove, MouseWheel, Utils }
