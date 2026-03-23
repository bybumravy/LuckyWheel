"use client"

import { useState } from "react"
import WheelSpinner from "./components/wheel-spinner"
import NameInput from "./components/name-input"
import WinnerDisplay from "./components/winner-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function App() {
    const [names, setNames] = useState<string[]>([])
    const [winnerIndex, setWinnerIndex] = useState<number | null>(null)
    const [winner, setWinner] = useState<string | null>(null)
    const [isSpinning, setIsSpinning] = useState(false)
    const [removedHistory, setRemovedHistory] = useState<string[]>([])

    const getSecureRandomIndex = (maxExclusive: number) => {
        if (maxExclusive <= 0) return 0
        const cryptoObj = globalThis.crypto
        const maxUint32 = 0x100000000
        const limit = maxUint32 - (maxUint32 % maxExclusive)
        const randomBuffer = new Uint32Array(1)

        let randomValue = 0
        do {
            cryptoObj.getRandomValues(randomBuffer)
            randomValue = randomBuffer[0]
        } while (randomValue >= limit)

        return randomValue % maxExclusive
    }

    const handleSpin = () => {
        if (names.length === 0 || isSpinning) return

        setIsSpinning(true)
        setWinner(null)
        setWinnerIndex(null)

        setTimeout(() => {
            const randomIndex = getSecureRandomIndex(names.length)
            setWinnerIndex(randomIndex)
            setWinner(names[randomIndex] ?? null)
            setIsSpinning(false)
        }, 10)
    }

    const handleAddName = (name: string) => {
        setNames((prevNames) => [...prevNames, name])
    }

    const handleRemoveName = (index: number) => {
        setNames((prevNames) => {
            const removedName = prevNames[index]
            if (removedName) {
                setRemovedHistory((prevHistory) => [...prevHistory, removedName])
            }
            return prevNames.filter((_, i) => i !== index)
        })
    }

    const handleRemoveWinner = () => {
        if (winner && winnerIndex !== null) {
            setNames((prevNames) => prevNames.filter((_, index) => index !== winnerIndex))
            setRemovedHistory((prevHistory) => [...prevHistory, winner])
            setWinner(null)
            setWinnerIndex(null)
        }
    }

    const handleKeepWinner = () => {
        setWinner(null)
        setWinnerIndex(null)
    }

    const handleSetNames = (newNames: string[]) => {
        setNames(newNames)
        setRemovedHistory([])
    }

    const handleClearHistory = () => {
        setRemovedHistory([])
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-secondary/30 to-background">
            <div className="flex-1 container max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">
                <div className="flex flex-col items-center gap-8">
                    <WheelSpinner names={names} isSpinning={isSpinning} onSpin={handleSpin} />
                    <Card className="w-full max-w-lg bg-card border-border shadow-lg">
                        <CardHeader className="border-b border-border pb-4">
                            <CardTitle className="text-base font-semibold text-foreground flex items-center justify-between">
                                <span>Lịch sử đã xóa</span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleClearHistory}
                                    disabled={removedHistory.length === 0}
                                    className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive"
                                >
                                    Xóa lịch sử
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
                                {removedHistory.length === 0 ? (
                                    <p className="text-muted-foreground text-sm">Chưa có mục nào bị xóa.</p>
                                ) : (
                                    removedHistory.map((name, index) => (
                                        <div
                                            key={`${name}-${index}`}
                                            className="flex items-center gap-2 p-2 rounded-md bg-secondary/30 border border-border/40 text-sm text-foreground"
                                        >
                                            <span className="text-muted-foreground font-medium">{index + 1}.</span>
                                            {name}
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
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
