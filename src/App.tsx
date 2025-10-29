"use client"

import { useState } from "react"
import WheelSpinner from "./components/wheel-spinner"
import NameInput from "./components/name-input"
import WinnerDisplay from "./components/winner-display"

export default function App() {
    const [names, setNames] = useState<string[]>([])
    const [winner, setWinner] = useState<string | null>(null)
    const [isSpinning, setIsSpinning] = useState(false)

    const handleSpin = () => {
        if (names.length === 0 || isSpinning) return

        setIsSpinning(true)
        setWinner(null)

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
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-secondary/30 to-background">
            <div className="flex-1 container max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">
                <div className="flex flex-col items-center gap-8">
                    <WheelSpinner names={names} isSpinning={isSpinning} onSpin={handleSpin} />
                </div>

                <div className="flex flex-col gap-6">
                    <NameInput
                        names={names}
                        onAddName={handleAddName}
                        onRemoveName={handleRemoveName}
                        onSetNames={handleSetNames}
                    />
                </div>
            </div>

            {winner && (
                <WinnerDisplay winner={winner} onRemoveFromList={handleRemoveWinner} onKeepInList={handleKeepWinner} />
            )}
        </div>
    )
}
