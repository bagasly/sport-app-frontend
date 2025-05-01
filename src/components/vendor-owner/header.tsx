'use client'

import React, { useEffect, useState } from 'react'
import { Bell, AlarmClock, Calendar } from "lucide-react"

export default function Header() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const now = new Date()
    const formattedDate = new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(now)

    const formattedTime = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })

    setDate(formattedDate)
    setTime(formattedTime)
  }, [])

  return (
    <header className="flex flex-col w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center py-4 gap-4 text-sm text-muted-foreground">
          <AlarmClock></AlarmClock>
          <span className="flex items-center gap-1"> {time || '...'}</span>
          <Calendar></Calendar>
          <span className="flex items-center gap-1">{date || '...'}</span>
        </div>
        <div className="flex items-center py-4 pe-8 gap-4">
          <span className="text-sm font-semibold uppercase">Bagas Yuli</span>
          <Bell className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </header>
  )
}
