"use client"

import type React from "react"

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
        "#FF3B5C",
        "#FF6B35",
        "#FFB627",
        "#00D9A3",
        "#00C4CC",
        "#4A90E2",
        "#7B68EE",
        "#B565D8",
        "#FF69B4",
        "#FF4757",
        "#FFA502",
        "#26DE81",
        "#20E3B2",
        "#5F27CD",
        "#FF6348",
        "#FF9FF3",
    ]

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Responsive: canvas vuông
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientWidth
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const radius = centerX - 20

        const drawWheel = (rotation: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Nếu chưa có tên
            if (names.length === 0) {
                const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
                gradient.addColorStop(0, "#f8f9fa")
                gradient.addColorStop(1, "#e9ecef")
                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
                ctx.fill()
                ctx.strokeStyle = "#dee2e6"
                ctx.lineWidth = 3
                ctx.stroke()

                ctx.fillStyle = "#495057"
                ctx.font = `600 ${canvas.width / 22}px "Plus Jakarta Sans", Inter, sans-serif`
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillText("Bạn là imposter", centerX, centerY)
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

                ctx.strokeStyle = "#ffffff"
                ctx.lineWidth = 4
                ctx.stroke()

                ctx.save()
                ctx.translate(centerX, centerY)
                ctx.rotate(startAngle + sliceAngle / 2)
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillStyle = "#ffffff"
                ctx.font = `700 ${canvas.width / 26}px "Noto Sans JP", sans-serif`
                ctx.shadowColor = "rgba(0,0,0,0.4)"
                ctx.shadowBlur = 6
                ctx.shadowOffsetY = 2
                ctx.fillText(name, radius * 0.65, 0)
                ctx.restore()
            })

            const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 8)
            centerGradient.addColorStop(0, "#ffffff")
            centerGradient.addColorStop(1, "#f1f3f5")
            ctx.fillStyle = centerGradient
            ctx.beginPath()
            ctx.arc(centerX, centerY, canvas.width / 8, 0, 2 * Math.PI)
            ctx.fill()

            ctx.strokeStyle = "#FFB627"
            ctx.lineWidth = 4
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(centerX, centerY, canvas.width / 8 - 6, 0, 2 * Math.PI)
            ctx.strokeStyle = "#FF6B35"
            ctx.lineWidth = 2
            ctx.stroke()

            ctx.save()
            ctx.shadowColor = "rgba(0,0,0,0.3)"
            ctx.shadowBlur = 8
            ctx.shadowOffsetX = 2
            ctx.shadowOffsetY = 2

            ctx.fillStyle = "#FF3B5C"
            ctx.beginPath()
            ctx.moveTo(centerX + radius - 20, centerY - 18)
            ctx.lineTo(centerX + radius + 20, centerY)
            ctx.lineTo(centerX + radius - 20, centerY + 18)
            ctx.closePath()
            ctx.fill()

            ctx.strokeStyle = "#ffffff"
            ctx.lineWidth = 3
            ctx.stroke()
            ctx.restore()
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

    // Click nút trung tâm
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
        if (distance <= canvas.width / 8) onSpin()
    }

    return (
        <div className="flex justify-center w-full max-w-lg mx-auto">
            <div className="relative w-full aspect-square">
                <canvas
                    ref={canvasRef}
                    className="rounded-full shadow-2xl w-full h-full border-[6px] border-white cursor-pointer"
                    onClick={handleCanvasClick}
                />

                <button
                    onClick={onSpin}
                    disabled={names.length === 0 || isSpinning}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     w-24 h-24
                     bg-gradient-to-br from-[#FF6B35] via-[#FF3B5C] to-[#B565D8]
                     hover:from-[#FF8555] hover:via-[#FF5B7C] hover:to-[#C585F8]
                     rounded-full
                     shadow-[0_8px_30px_rgba(255,59,92,0.4)]
                     hover:shadow-[0_12px_40px_rgba(255,59,92,0.6)]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 ease-out
                     hover:scale-110 active:scale-95
                     border-4 border-white/40"
                />
            </div>
        </div>
    )
}
