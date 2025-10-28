"use client"

import { useState } from "react"
import WheelSpinner from "@/components/wheel-spinner"
import NameInput from "@/components/name-input"
import WinnerDisplay from "@/components/winner-display"

export default function App() {
    const [names, setNames] = useState<string[]>(["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D"])
    const [winner, setWinner] = useState<string | null>(null)
    const [isSpinning, setIsSpinning] = useState(false)

    const handleSpin = () => {
        if (names.length === 0 || isSpinning) return

        setIsSpinning(true)
        setWinner(null)

        // Simulate spinning for 3 seconds
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * names.length)
            setWinner(names[randomIndex])
            setIsSpinning(false)
        }, 10)
    }

    const handleAddName = (name: string) => {
        setNames([...names, name])
    }

    const handleRemoveName = (index: number) => {
        setNames(names.filter((_, i) => i !== index))
    }

    const handleReset = () => {
        setWinner(null)
    }

    const handleRemoveWinner = () => {
        if (winner) {
            setNames(names.filter((name) => name !== winner))
            setWinner(null)
        }
    }

    const handleKeepWinner = () => {
        setWinner(null)
    }

    const handleSetNames = (newNames: string[]) => {
        setNames(newNames)
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
            {/* Container chính */}
            <div className="flex-1 container max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">

                {/* Cột trái: WheelSpinner */}
                <div className="flex flex-col items-center gap-6">
                    <WheelSpinner
                        names={names}
                        isSpinning={isSpinning}
                        onSpin={handleSpin}
                    />
                </div>

                {/* Cột phải: NameInput */}
                <div className="flex flex-col gap-6 max-h-[80vh] overflow-auto">
                    <NameInput
                        names={names}
                        onAddName={handleAddName}
                        onRemoveName={handleRemoveName}
                        onSetNames={handleSetNames}
                    />
                </div>

            </div>

            {/* WinnerDisplay overlay */}
            {winner && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <WinnerDisplay
                        winner={winner}
                        onRemoveFromList={handleRemoveWinner}
                        onKeepInList={handleKeepWinner}
                    />
                </div>
            )}
        </div>

    )
}
