import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPetById } from '../data/pets'
import { useAdoption } from '../contexts/AdoptionContext'
import React from 'react'

const AdoptionForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const pet = getPetById(id)
  const { markPetAsAdopted } = useAdoption()

  const [formData, setFormData] = useState({
    petId: id,
    ownerName: '',
    contactNumber: '',
    address: '',
    agreement: false
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required'
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required'
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit phone number'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.agreement) {
      newErrors.agreement = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // In a real app, you would send this data to a server
      console.log('Form submitted:', formData)
      
      // Mark pet as adopted
      markPetAsAdopted(parseInt(id))
      
      // Show success message and navigate to home
      alert(`Thank you for adopting ${pet.name}! We'll contact you soon.`)
      navigate('/')
    }
  }

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
      <div className="max-w-3xl mx-auto px-container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
            Adoption Application
          </h1>
          <p className="text-xl text-text-secondary">
            You're applying to adopt <span className="font-semibold text-primary">{pet.name}</span>
          </p>
        </div>

        {/* Pet Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex items-center gap-6">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-2xl font-heading font-bold text-text-primary flex items-center gap-2">
              <span>🐾</span>
              {pet.name}
            </h3>
            <p className="text-text-secondary">{pet.breed} • {pet.age} • {pet.gender}</p>
          </div>
        </div>

        {/* Adoption Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {/* Pet ID (Auto-filled, Read-only) */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Pet ID
            </label>
            <input
              type="text"
              name="petId"
              value={formData.petId}
              readOnly
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-neutral-100 text-text-secondary cursor-not-allowed"
              style={{ borderRadius: '8px', padding: '12px' }}
            />
            <p className="text-xs text-text-light mt-1">This field is auto-filled</p>
          </div>

          {/* Owner Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Owner Name *
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                errors.ownerName ? 'border-red-500' : 'border-neutral-300'
              }`}
              style={{ borderRadius: '8px', padding: '12px' }}
            />
            {errors.ownerName && (
              <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>
            )}
          </div>

          {/* Contact Number */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Contact Number *
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                errors.contactNumber ? 'border-red-500' : 'border-neutral-300'
              }`}
              style={{ borderRadius: '8px', padding: '12px' }}
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              rows="4"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${
                errors.address ? 'border-red-500' : 'border-neutral-300'
              }`}
              style={{ borderRadius: '8px', padding: '12px' }}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Agreement Checkbox */}
          <div className="mb-8">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-primary border-neutral-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
              />
              <span className="text-sm text-text-secondary leading-relaxed">
                I agree to the terms and conditions of pet adoption. I understand that I am responsible for the pet's care, health, and well-being. I commit to providing a safe and loving home for {pet.name}.
              </span>
            </label>
            {errors.agreement && (
              <p className="text-red-500 text-sm mt-2 ml-8">{errors.agreement}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full font-bold transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
              color: 'white',
              padding: '16px 20px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(34, 197, 94, 0.3)',
              fontSize: '18px',
              border: 'none',
              cursor: 'pointer'
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
            Submit Adoption Application
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full mt-4 py-3 bg-white text-text-secondary border-2 border-neutral-300 text-lg font-medium rounded-lg transition-all duration-200 hover:bg-neutral-50"
            style={{ borderRadius: '8px' }}
          >
            Cancel
          </button>
        </form>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary">
            Need help? <Link to="/about" className="text-primary hover:underline font-semibold">Contact us</Link> for assistance
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdoptionForm
