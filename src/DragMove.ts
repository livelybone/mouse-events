import { $addListener, $isMobile, RemoveListener } from './Utils'

type OriginalEvent = MouseEvent | TouchEvent
type DragMoveEventType = 'dragMoveStart' | 'dragMove' | 'dragMoveEnd'

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

const client = $isMobile ? 'mobile' : 'pc'

const EventType = {
  start: { pc: 'mousedown', mobile: 'touchstart' }[client],
  move: { pc: 'mousemove', mobile: 'touchmove' }[client],
  end: { pc: 'mouseup', mobile: 'touchend' }[client],
}

function getClientPos(ev: any): Touch | MouseEvent {
  let touch: Touch | null = null
  if ($isMobile) {
    if (ev.changedTouches.length > 0) {
      ;[touch] = ev.changedTouches
    } else if (ev.targetTouched.length > 0) {
      ;[touch] = ev.changedTouches
    } else {
      ;[touch] = ev.touches
    }
  }
  return touch || ev
}

function getEvent(ev: OriginalEvent, startEvent: OriginalEvent) {
  return {
    deltaX: getClientPos(ev).clientX - getClientPos(startEvent).clientX,
    deltaY: getClientPos(ev).clientY - getClientPos(startEvent).clientY,
    originalEvent: ev,
  }
}

const bind: DragMoveBindFn = (
  element: any,
  listener: any,
  useCapture?: any,
) => {
  if (typeof element === 'function') {
    /* eslint-disable no-param-reassign */
    useCapture = listener
    listener = element
    element = window
  }

  let startEvent: OriginalEvent
  let unbindFn: RemoveListener

  function $listener(ev: OriginalEvent) {
    let event: DragMoveEvent = {
      deltaX: 0,
      deltaY: 0,
      originalEvent: ev,
      type: 'dragMoveStart',
    }
    if (ev.type === EventType.start) {
      startEvent = ev

      const unbindMove = $addListener(
        element,
        EventType.move,
        $listener,
        useCapture,
      )
      const unbindEnd = $addListener(
        element,
        EventType.end,
        $listener,
        useCapture,
      )
      unbindFn = () => {
        unbindMove()
        unbindEnd()
      }
    } else if (ev.type === EventType.move) {
      event = { ...getEvent(ev, startEvent), type: 'dragMove' }
    } else if (ev.type === EventType.end) {
      event = { ...getEvent(ev, startEvent), type: 'dragMoveEnd' }
      if (unbindFn) unbindFn()
    }

    listener(event)
  }

  return $addListener(element, EventType.start, $listener, useCapture)
}

export { bind }
