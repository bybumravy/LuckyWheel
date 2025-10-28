"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy } from "lucide-react"

interface WinnerDisplayProps {
    winner: string
    onRemoveFromList: () => void
    onKeepInList: () => void
}

export default function WinnerDisplay({ winner, onRemoveFromList, onKeepInList }: WinnerDisplayProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-md mx-4 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 border-4 border-yellow-300 shadow-2xl animate-in zoom-in duration-500">
                <CardContent className="p-8 text-center space-y-6">
                    <Trophy className="w-20 h-20 mx-auto text-white drop-shadow-lg animate-bounce" />
                    <h2 className="text-3xl font-bold text-white drop-shadow-lg">Chúc mừng!</h2>
                    <p className="text-5xl font-black text-white drop-shadow-lg break-words">{winner}</p>

                    <div className="flex flex-col gap-3 mt-6">
                        <Button
                            onClick={onRemoveFromList}
                            size="lg"
                            className="bg-white text-red-600 hover:bg-red-50 font-bold shadow-lg"
                        >
                            Xóa khỏi danh sách
                        </Button>
                        <Button
                            onClick={onKeepInList}
                            size="lg"
                            variant="outline"
                            className="bg-white/90 text-orange-600 hover:bg-white font-bold border-2 border-white shadow-lg"
                        >
                            Giữ nguyên & Quay lại
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
