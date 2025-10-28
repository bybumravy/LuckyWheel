"use client"

import { useEffect, useRef } from "react"

interface WheelSpinnerProps {
    names: string[]
    isSpinning: boolean
    onSpin: () => void
}

export default function WheelSpinner({ names, isSpinning, onSpin }: WheelSpinnerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rotationRef = useRef(0)
    const animationRef = useRef<number>()

    const colors = [
        "#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8",
        "#F7DC6F","#BB8FCE","#85C1E2","#F8B739","#52B788",
        "#E76F51","#2A9D8F",
    ]

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Responsive: set canvas size theo clientWidth
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientWidth
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const radius = centerX - 10

        const drawWheel = (rotation: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            if (names.length === 0) {
                ctx.fillStyle = "#E0E0E0"
                ctx.beginPath()
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
                ctx.fill()
                ctx.fillStyle = "#666"
                ctx.font = `${canvas.width / 30}px Arial`
                ctx.textAlign = "center"
                ctx.fillText("Thêm tên để bắt đầu", centerX, centerY)
                return
            }

            const sliceAngle = (2 * Math.PI) / names.length

            names.forEach((name, index) => {
                const startAngle = rotation + index * sliceAngle
                const endAngle = startAngle + sliceAngle

                ctx.fillStyle = colors[index % colors.length]
                ctx.beginPath()
                ctx.moveTo(centerX, centerY)
                ctx.arc(centerX, centerY, radius, startAngle, endAngle)
                ctx.closePath()
                ctx.fill()

                ctx.strokeStyle = "#fff"
                ctx.lineWidth = 3
                ctx.stroke()

                ctx.save()
                ctx.translate(centerX, centerY)
                ctx.rotate(startAngle + sliceAngle / 2)
                ctx.textAlign = "center"
                ctx.fillStyle = "#fff"
                ctx.font = `bold ${canvas.width / 35}px Arial`
                ctx.shadowColor = "rgba(0,0,0,0.5)"
                ctx.shadowBlur = 4
                ctx.fillText(name, radius * 0.65, 5)
                ctx.restore()
            })

            // Center circle & play icon
            ctx.fillStyle = "#fff"
            ctx.beginPath()
            ctx.arc(centerX, centerY, canvas.width / 15, 0, 2 * Math.PI)
            ctx.fill()
            ctx.strokeStyle = "#333"
            ctx.lineWidth = 3
            ctx.stroke()

            ctx.fillStyle = "#4CAF50"
            ctx.beginPath()
            ctx.moveTo(centerX - canvas.width / 60, centerY - canvas.width / 40)
            ctx.lineTo(centerX + canvas.width / 40, centerY)
            ctx.lineTo(centerX - canvas.width / 60, centerY + canvas.width / 40)
            ctx.closePath()
            ctx.fill()

            // Pointer
            ctx.fillStyle = "#FF4444"
            ctx.beginPath()
            ctx.moveTo(centerX + radius - canvas.width / 30, centerY - canvas.width / 40)
            ctx.lineTo(centerX + radius + canvas.width / 40, centerY)
            ctx.lineTo(centerX + radius - canvas.width / 30, centerY + canvas.width / 40)
            ctx.closePath()
            ctx.fill()
            ctx.strokeStyle = "#fff"
            ctx.lineWidth = 2
            ctx.stroke()
        }

        if (isSpinning) {
            let speed = 0.5
            const animate = () => {
                rotationRef.current += speed
                speed *= 0.99
                drawWheel(rotationRef.current)
                if (speed > 0.01) {
                    animationRef.current = requestAnimationFrame(animate)
                }
            }
            animate()
        } else {
            drawWheel(rotationRef.current)
        }

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [names, isSpinning])

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (names.length === 0 || isSpinning) return
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
        if (distance <= canvas.width / 15) onSpin()
    }

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="relative w-full max-w-md aspect-square">
                <canvas
                    ref={canvasRef}
                    className="rounded-full shadow-2xl cursor-pointer w-full h-full"
                    onClick={handleCanvasClick}
                />
            </div>
        </div>
    )
}
