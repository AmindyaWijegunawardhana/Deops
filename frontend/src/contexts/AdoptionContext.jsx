import React, { createContext, useState, useContext, useEffect } from 'react'

const AdoptionContext = createContext()

export const AdoptionProvider = ({ children }) => {
  const [adoptedPets, setAdoptedPets] = useState(() => {
    // Load adopted pets from localStorage on mount
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('adoptedPets')
        return saved ? JSON.parse(saved) : []
      }
      return []
    } catch (error) {
      console.error('Error loading adopted pets from localStorage:', error)
      return []
    }
  })

  // Save to localStorage whenever adoptedPets changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('adoptedPets', JSON.stringify(adoptedPets))
      }
    } catch (error) {
      console.error('Error saving adopted pets to localStorage:', error)
    }
  }, [adoptedPets])

  const markPetAsAdopted = (petId) => {
    setAdoptedPets(prev => {
      if (!prev.includes(petId)) {
        return [...prev, petId]
      }
      return prev
    })
  }

  const isPetAdopted = (petId) => {
    return adoptedPets.includes(petId)
  }

  return (
    <AdoptionContext.Provider value={{ adoptedPets, markPetAsAdopted, isPetAdopted }}>
      {children}
    </AdoptionContext.Provider>
  )
}

export const useAdoption = () => {
  const context = useContext(AdoptionContext)
  if (!context) {
    throw new Error('useAdoption must be used within AdoptionProvider')
  }
  return context
}
