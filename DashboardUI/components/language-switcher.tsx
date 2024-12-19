'use client'

import { useState } from 'react'
// import { Button } from "@/components/ui/button" //Removed import as Button is not used anymore

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<'en' | 'ne'>('en')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ne' : 'en')
  }

  return null;
}

