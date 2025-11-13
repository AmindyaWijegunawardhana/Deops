import { useState } from 'react'
import { Link } from 'react-router-dom'
import { pets } from '../data/pets'

const Home = () => {
  const [filterType, setFilterType] = useState('All')
  const [adoptionFilter, setAdoptionFilter] = useState('Show All')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter pets based on type, adoption status, and search query
  const filteredPets = pets.filter(pet => {
    const matchesType = filterType === 'All' || pet.type === filterType
    const matchesAdoption = 
      adoptionFilter === 'Show All' ||
      (adoptionFilter === 'Available' && !pet.isAdopted) ||
      (adoptionFilter === 'Adopted' && pet.isAdopted)
    const matchesSearch = searchQuery === '' || 
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesAdoption && matchesSearch
  })

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-700 text-white py-6">
        <div className="max-w-container mx-auto px-container text-center">
          <h1 className="text-2xl font-heading font-bold mb-2">
            Adopt a Street Pet - Give Them a Second Chance
          </h1>
          <p className="text-sm text-white">
            Free adoption • Save a life • Find a loyal companion
          </p>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className="bg-white shadow-sm sticky top-10 z-40">
        <div className="max-w-container mx-auto px-container py-3">
          <div className="flex flex-col gap-4">
            {/* Top Row: Type Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Type Filter Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setFilterType('All')}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    filterType === 'All'
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-neutral-100 text-text-secondary hover:bg-neutral-200'
                  }`}
                >
                  All Pets
                </button>
                <button
                  onClick={() => setFilterType('Dog')}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                    filterType === 'Dog'
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-neutral-100 text-text-secondary hover:bg-neutral-200'
                  }`}
                >
                  🐕 Dogs
                </button>
                <button
                  onClick={() => setFilterType('Cat')}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                    filterType === 'Cat'
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-neutral-100 text-text-secondary hover:bg-neutral-200'
                  }`}
                >
                  🐈 Cats
                </button>
              </div>

              {/* Search Bar */}
              <div className="w-full md:w-96">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name or breed..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light">
                    🔍
                  </span>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light hover:text-text-primary"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Row: Adoption Status Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-text-primary">Adoption Status:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setAdoptionFilter('Show All')}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    adoptionFilter === 'Show All'
                      ? 'bg-accent text-white shadow-md'
                      : 'bg-neutral-100 text-text-secondary hover:bg-neutral-200'
                  }`}
                >
                  Show All
                </button>
                <button
                  onClick={() => setAdoptionFilter('Available')}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    adoptionFilter === 'Available'
                      ? 'bg-accent text-white shadow-md'
                      : 'bg-neutral-100 text-text-secondary hover:bg-neutral-200'
                  }`}
                >
                  Available
                </button>
                <button
                  onClick={() => setAdoptionFilter('Adopted')}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    adoptionFilter === 'Adopted'
                      ? 'bg-accent text-white shadow-md'
                      : 'bg-neutral-100 text-text-secondary hover:bg-neutral-200'
                  }`}
                >
                  Adopted
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center text-text-secondary text-sm">
              Showing {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'}
            </div>
          </div>
        </div>
      </section>

      {/* Pet Cards Grid */}
      <section className="py-12">
        <div className="max-w-container mx-auto px-container">
          {filteredPets.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🐾</div>
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                No pets found
              </h3>
              <p className="text-text-secondary mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setFilterType('All')
                  setAdoptionFilter('Show All')
                  setSearchQuery('')
                }}
                className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
                  style={{ padding: '16px' }}
                >
                  {/* Pet Image */}
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                        pet.isAdopted ? 'blur-sm grayscale-[30%]' : ''
                      }`}
                      style={{ 
                        height: '220px',
                        filter: pet.isAdopted ? 'blur(2.5px) grayscale(30%)' : 'none'
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-md">
                      {pet.type}
                    </div>
                    
                    {/* Adopted Overlay Chip */}
                    {pet.isAdopted && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="bg-primary text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl flex items-center gap-2"
                          style={{ backgroundColor: 'rgba(255, 182, 185, 0.95)' }}
                        >
                          <span>🐾</span>
                          <span>Adopted</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pet Info */}
                  <div className="space-y-2">
                    {/* Name with Paw Icon */}
                    <h3 className="font-bold text-text-primary flex items-center gap-2" style={{ fontSize: '16px' }}>
                      <span>🐾</span>
                      {pet.name}
                    </h3>

                    {/* Breed */}
                    <p className="text-text-secondary" style={{ fontSize: '14px', color: '#666' }}>
                      {pet.breed}
                    </p>

                    {/* Age */}
                    <p className="text-text-light" style={{ fontSize: '12px' }}>
                      {pet.age} • {pet.gender}
                    </p>

                    {/* Personality Tags */}
                    <div className="flex flex-wrap gap-1 pt-2">
                      {pet.personality.slice(0, 2).map((trait, index) => (
                        <span
                          key={index}
                          className="bg-primary-50 text-primary px-2 py-1 rounded-full text-xs"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>

                    {/* More Details Button - Hidden/Disabled for Adopted Pets */}
                    {!pet.isAdopted ? (
                      <Link
                        to={`/pet/${pet.id}`}
                        className="block w-full mt-4 text-center font-bold transition-all duration-300"
                        style={{ 
                          fontSize: '14px',
                          background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                          color: 'white',
                          padding: '12px 20px',
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px rgba(34, 197, 94, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.boxShadow = '0 6px 12px rgba(34, 197, 94, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 6px rgba(34, 197, 94, 0.3)';
                        }}
                      >
                        More Details
                      </Link>
                    ) : (
                      <div className="mt-4 px-4 py-2 bg-neutral-200 text-neutral-500 text-center rounded-full font-medium cursor-not-allowed"
                        style={{ fontSize: '14px' }}
                      >
                        Already Adopted
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-accent text-white">
        <div className="max-w-container mx-auto px-container text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-white">
            Adopting a pet changes two lives - yours and theirs
          </p>
          <Link 
            to="/care" 
            className="inline-block px-8 py-3 bg-white text-accent-700 rounded-full font-semibold hover:bg-neutral-100 transition-colors shadow-lg"
          >
            Learn About Pet Care
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
