"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus } from "lucide-react"

interface NameInputProps {
    names: string[]
    onAddName: (name: string) => void
    onRemoveName: (index: number) => void
    onSetNames: (names: string[]) => void
}

export default function NameInput({ names, onAddName, onRemoveName, onSetNames }: NameInputProps) {
    const [inputValue, setInputValue] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputValue.trim()) {
            const newNames = inputValue
                .split("\n")
                .map((name) => name.trim())
                .filter((name) => name.length > 0)

            if (newNames.length > 0) {
                onSetNames([...names, ...newNames])
                setInputValue("")
            }
        }
    }

    return (
        <Card className="bg-card border-border shadow-lg">
            <CardHeader className="border-b border-border">
                <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-between">
                    <span>Danh sách </span>
                    <span className="text-sm font-normal text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            {names.length} mống
          </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập tên (mỗi dòng một tên)..."
              className="w-full min-h-[120px] p-4 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-y bg-background text-foreground placeholder:text-muted-foreground font-sans"
          />
                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm vào danh sách
                    </Button>
                </form>

                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {names.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8 text-sm">Của tao của tao</p>
                    ) : (
                        names.map((name, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors border border-border/50"
                            >
                                <span className="font-medium text-foreground">{name}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemoveName(index)}
                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0 rounded-md"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
