import * as MouseWheel from '@livelybone/mouse-wheel'

declare namespace Utils {
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
  ): RemoveListener

  export const $isMobile: boolean
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

declare namespace DragMove {
  declare function bind(
    element: Element | Window,
    listener: DragMoveListener,
    useCapture?: boolean,
  ): Utils.RemoveListener
  declare function bind(
    listener: DragMoveListener,
    useCapture?: boolean,
  ): Utils.RemoveListener

  export { bind }
}

export { DragMove, MouseWheel, Utils }
