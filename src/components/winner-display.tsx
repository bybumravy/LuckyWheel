"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, X, RotateCcw } from "lucide-react"

interface WinnerDisplayProps {
    winner: string
    onRemoveFromList: () => void
    onKeepInList: () => void
}

export default function WinnerDisplay({ winner, onRemoveFromList, onKeepInList }: WinnerDisplayProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
            <Card className="w-full max-w-md mx-4 bg-card border-2 border-purple-400 shadow-2xl animate-in zoom-in duration-500">
                <CardContent className="p-10 text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="bg-purple-500/10 p-6 rounded-full">
                            <Trophy className="w-16 h-16 text-purple-500" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-2xl font-semibold text-muted-foreground">Tôi chọn bạn</h2>
                        <p className="text-4xl font-bold text-foreground break-words leading-tight">{winner}</p>
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <Button
                            onClick={onKeepInList}
                            size="lg"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg"
                        >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Close
                        </Button>
                        <Button
                            onClick={onRemoveFromList}
                            size="lg"
                            variant="outline"
                            className="border-2 font-semibold rounded-lg hover:bg-destructive/10 hover:text-destructive hover:border-destructive bg-transparent"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Remove
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
