"use client"

import { useState, useEffect, useRef, useCallback, useMemo, ReactNode } from "react"

interface IProps {
  items: any[]
  minColumnWidth?: number
  gap?: number
  renderItem: (item: any) => ReactNode
}

function VirtualGrid({ items, minColumnWidth = 320, gap = 16, renderItem }: IProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [heights, setHeights] = useState<number[]>([])
  const itemsRef = useRef(new Map<number, HTMLDivElement>())

  const columns = useMemo(() => {
    return Math.max(1, Math.floor(containerWidth / (minColumnWidth + gap)))
  }, [containerWidth, minColumnWidth, gap])

  const [positions, totalHeight] = useMemo(() => {
    const columnHeights = new Array(columns).fill(0)
    const positions: { top: number; column: number }[] = []

    items.forEach((_, index) => {
      const column = columnHeights.indexOf(Math.min(...columnHeights))
      const top = columnHeights[column]
      const height = heights[index] || 0

      positions.push({ top, column })
      columnHeights[column] = top + height + gap
    })

    const totalHeight = Math.max(...columnHeights) + gap
    return [positions, totalHeight]
  }, [items, heights, columns, gap])

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width)
    })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    requestAnimationFrame(() => {
      setScrollTop(e.currentTarget.scrollTop)
    })
  }, [])

  const { startIndex, endIndex } = useMemo(() => {
    const viewportHeight = containerRef.current?.clientHeight || 0
    const buffer = viewportHeight
    const start = Math.max(0, scrollTop - buffer)
    const end = scrollTop + viewportHeight + buffer

    let startIndex = 0
    let endIndex = items.length - 1

    // Бинарный поиск startIndex
    let low = 0,
      high = items.length - 1
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const pos = positions[mid]
      if (pos.top + (heights[mid] || 0) >= start) {
        high = mid - 1
        startIndex = mid
      } else {
        low = mid + 1
      }
    }
    startIndex = Math.max(0, startIndex - columns)

    // Бинарный поиск endIndex
    ;(low = 0), (high = items.length - 1)
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const pos = positions[mid]
      if (pos.top <= end) {
        low = mid + 1
        endIndex = mid
      } else {
        high = mid - 1
      }
    }
    endIndex = Math.min(items.length - 1, endIndex + columns)

    return { startIndex, endIndex }
  }, [scrollTop, positions, heights, columns, items.length])

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute("data-index"))
        const newHeight = entry.contentRect.height

        if (heights[index] !== newHeight) {
          setHeights((prev) => {
            const newHeights = [...prev]
            newHeights[index] = newHeight
            return newHeights
          })
        }
      })
    })

    itemsRef.current.forEach((el, index) => {
      if (index >= startIndex && index <= endIndex) {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [startIndex, endIndex, heights])

  const getItemStyle = (index: number): React.CSSProperties => {
    const columnWidth = (containerWidth - (columns - 1) * gap) / columns
    const left = columnWidth * positions[index].column + gap * positions[index].column

    return {
      position: "absolute",
      top: positions[index]?.top || 0,
      left: left,
      width: columns === 1 ? "100%" : columnWidth,
      transition: "height 0.3s ease",
    }
  }

  return (
    <div
      ref={containerRef}
      style={{
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        overflowY: "auto",
        position: "relative",
      }}
      onScroll={handleScroll}
      className="scroll-no"
    >
      <div style={{ height: totalHeight, width: "100%" }}>
        {items.slice(startIndex, endIndex + 1).map((item, i) => {
          const index = startIndex + i
          return (
            <div
              key={index}
              data-index={index}
              //@ts-ignore
              ref={(el) => (el ? itemsRef.current.set(index, el!) : itemsRef.current.delete(index))}
              style={getItemStyle(index)}
            >
              {renderItem(item)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VirtualGrid
