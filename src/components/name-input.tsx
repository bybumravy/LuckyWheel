"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

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
            // Split by line breaks and filter empty lines
            const newNames = inputValue
                .split("\n")
                .map((name) => name.trim())
                .filter((name) => name.length > 0)

            if (newNames.length > 0) {
                // Add all names at once
                onSetNames([...names, ...newNames])
                setInputValue("")
            }
        }
    }

    return (
        <Card className="bg-white/95 backdrop-blur shadow-2xl h-fit">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Danh sách ({names.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập danh sách tên (mỗi tên 1 dòng)..."
              className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Thêm vào danh sách
                    </Button>
                </form>

                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {names.length === 0 ? (
                        <p className="text-gray-500 text-center py-4 text-sm">Chưa có tên nào</p>
                    ) : (
                        names.map((name, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg hover:shadow-md transition-shadow"
                            >
                                <span className="font-medium text-gray-800 text-sm">{name}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemoveName(index)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-100 h-6 w-6 p-0"
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
