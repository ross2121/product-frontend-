"use client"
import { RectangleHorizontal } from "lucide-react"

export interface IBrandIconProps {
  className?: string

}

export const BrandIcon = ({
  className,

}: IBrandIconProps) => {
  return (
    <div style={{ perspective: '20px' }}>
      <RectangleHorizontal
        className={`${className}`}
        style={{ transform: 'rotateX(22deg' }}
      />
    </div>
  )
}
