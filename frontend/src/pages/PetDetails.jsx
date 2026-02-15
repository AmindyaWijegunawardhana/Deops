import { useParams, Link, useNavigate } from 'react-router-dom'
import { getPetById } from '../data/pets'
import React from 'react'

const PetDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const pet = getPetById(id)

  if (!pet) {
    return (
      <div className="max-w-container mx-auto px-container py-16 text-center">
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">Pet Not Found</h2>
        <p className="text-text-secondary mb-8">Sorry, we couldn't find the pet you're looking for.</p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="max-w-container mx-auto px-container">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-primary-700 mb-8 font-medium transition-colors"
        >
          <span className="mr-2">←</span> Back
        </button>

        {/* Main Content - Image Left, Details Right */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side - Large Image */}
            <div className="relative">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-full object-cover"
                style={{ 
                  minHeight: '500px',
                  borderRadius: '16px 0 0 16px'
                }}
              />
              <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full text-sm font-semibold text-primary shadow-lg">
                {pet.type}
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="p-8 lg:p-12">
              {/* Pet Name and Personality */}
              <div className="mb-6">
                <h1 className="text-4xl font-heading font-bold text-text-primary mb-4 flex items-center gap-3">
                  <span>🐾</span>
                  {pet.name}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {pet.personality.map((trait, index) => (
                    <span
                      key={index}
                      className="bg-primary-50 text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                <p className="text-text-secondary text-lg leading-relaxed">
                  {pet.description}
                </p>
              </div>

              {/* Basic Information */}
              <div className="mb-6">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                  Basic Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-100 p-4 rounded-lg">
                    <div className="text-sm text-text-secondary mb-1">Breed</div>
                    <div className="text-lg font-semibold text-text-primary">{pet.breed}</div>
                  </div>
                  <div className="bg-neutral-100 p-4 rounded-lg">
                    <div className="text-sm text-text-secondary mb-1">Age</div>
                    <div className="text-lg font-semibold text-text-primary">{pet.age}</div>
                  </div>
                  <div className="bg-neutral-100 p-4 rounded-lg">
                    <div className="text-sm text-text-secondary mb-1">Gender</div>
                    <div className="text-lg font-semibold text-text-primary">{pet.gender}</div>
                  </div>
                  <div className="bg-neutral-100 p-4 rounded-lg">
                    <div className="text-sm text-text-secondary mb-1">Size</div>
                    <div className="text-lg font-semibold text-text-primary">{pet.size}</div>
                  </div>
                </div>
              </div>

              {/* Vaccine & Health Information */}
              <div className="mb-6">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                  Health & Vaccination
                </h2>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">Health Status</h3>
                      <p className="text-green-800">{pet.healthStatus}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Nutrition Plan - Accent Highlight */}
              <div className="mb-6">
                <div 
                  className="border-2 rounded-lg p-5"
                  style={{ 
                    borderColor: '#A7D8F5',
                    backgroundColor: 'rgba(167, 216, 245, 0.1)'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🍖</span>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
                        Special Nutrition Plan
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {pet.type === 'Dog' 
                          ? `${pet.name} thrives on high-quality dog food with balanced protein and nutrients. We recommend feeding twice daily with fresh water always available. Avoid table scraps and foods toxic to dogs.`
                          : `${pet.name} requires premium cat food rich in protein. Feed 2-3 small meals daily. Ensure fresh water is always accessible. Keep away from toxic plants and human foods harmful to cats.`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Adopt Pet Button */}
              <Link
                to={`/adopt/${pet.id}`}
                className="block w-full text-center font-bold transition-all duration-300 mb-3"
                style={{
                  background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                  color: 'white',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(34, 197, 94, 0.3)',
                  fontSize: '18px'
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
                🏠 Adopt {pet.name}
              </Link>

              {/* Vaccine Care Button */}
              <Link
                to={`/vaccine-care/${pet.id}`}
                className="block w-full text-center font-bold transition-all duration-300"
                style={{
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
                💉 Manage Vaccine Care
              </Link>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-sm text-text-secondary">
                  Have questions? <Link to="/about" className="text-primary hover:underline">Contact us</Link> for more information
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What to Expect Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-heading font-bold text-text-primary mb-8 text-center">
            Adoption Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                1. Application
              </h3>
              <p className="text-text-secondary">
                Fill out our simple adoption form with your information and preferences
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                2. Home Visit
              </h3>
              <p className="text-text-secondary">
                We'll schedule a visit to ensure a perfect match for you and {pet.name}
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                3. Welcome Home
              </h3>
              <p className="text-text-secondary">
                Take your new family member home and start your journey together!
              </p>
            </div>
          </div>
        </div>

        {/* Care Resources Link */}
        <div className="mt-8 text-center">
          <Link
            to="/care"
            className="inline-block px-8 py-3 bg-accent text-white rounded-full font-semibold hover:bg-accent-600 transition-colors shadow-md"
          >
            📚 Learn About Pet Care
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PetDetails
