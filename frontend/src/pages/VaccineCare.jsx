import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPetById } from '../data/pets'
import React from 'react'

const VaccineCare = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const pet = getPetById(id)

  // Check if pet is adopted (in real app, this would come from backend)
  const [isAdopted] = useState(true) // Set to true for demo purposes

  // Initial vaccine data
  const [vaccines, setVaccines] = useState([
    {
      id: 1,
      name: 'Rabies',
      date: '2024-01-15',
      nextDate: '2025-01-15',
      status: true,
      notes: 'Annual booster required'
    },
    {
      id: 2,
      name: 'DHPP (Distemper)',
      date: '2024-02-10',
      nextDate: '2025-02-10',
      status: true,
      notes: 'Core vaccine for dogs'
    },
    {
      id: 3,
      name: 'Bordetella',
      date: '2024-03-05',
      nextDate: '2024-09-05',
      status: false,
      notes: 'Due soon - schedule appointment'
    }
  ])

  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    nextDate: '',
    status: false,
    notes: ''
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAdd = () => {
    if (!formData.name || !formData.date || !formData.nextDate) {
      alert('Please fill in all required fields')
      return
    }

    const newVaccine = {
      id: Date.now(),
      ...formData
    }

    setVaccines([...vaccines, newVaccine])
    setFormData({ name: '', date: '', nextDate: '', status: false, notes: '' })
    setIsAddingNew(false)
  }

  const handleEdit = (vaccine) => {
    setEditingId(vaccine.id)
    setFormData(vaccine)
  }

  const handleUpdate = () => {
    if (!formData.name || !formData.date || !formData.nextDate) {
      alert('Please fill in all required fields')
      return
    }

    setVaccines(vaccines.map(v => 
      v.id === editingId ? { ...formData, id: editingId } : v
    ))
    setEditingId(null)
    setFormData({ name: '', date: '', nextDate: '', status: false, notes: '' })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vaccine record?')) {
      setVaccines(vaccines.filter(v => v.id !== id))
    }
  }

  const handleStatusToggle = (id) => {
    setVaccines(vaccines.map(v =>
      v.id === id ? { ...v, status: !v.status } : v
    ))
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsAddingNew(false)
    setFormData({ name: '', date: '', nextDate: '', status: false, notes: '' })
  }

  if (!pet) {
    return (
      <div className="max-w-container mx-auto px-container py-16 text-center">
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">Pet Not Found</h2>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    )
  }

  if (!isAdopted) {
    return (
      <div className="bg-secondary min-h-screen py-16">
        <div className="max-w-container mx-auto px-container text-center">
          <div className="bg-white rounded-xl shadow-lg p-12">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
              Access Restricted
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Vaccine care records are only accessible for adopted pets.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to={`/pet/${id}`} className="btn-secondary">
                View Pet Details
              </Link>
              <Link to="/" className="btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-container">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-primary-700 mb-6 font-medium transition-colors"
        >
          <span className="mr-2">←</span> Back
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary flex items-center gap-2">
                  <span>💉</span>
                  Vaccine Care - {pet.name}
                </h1>
                <p className="text-text-secondary">{pet.breed} • {pet.age}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-text-secondary">Total Vaccines</div>
              <div className="text-3xl font-heading font-bold text-primary">{vaccines.length}</div>
            </div>
          </div>

          {/* Add New Vaccine Button */}
          {!isAddingNew && !editingId && (
            <button
              onClick={() => setIsAddingNew(true)}
              className="w-full font-bold transition-all duration-300 mb-6"
              style={{
                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(34, 197, 94, 0.3)',
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
              + Add New Vaccine
            </button>
          )}

          {/* Add/Edit Form */}
          {(isAddingNew || editingId) && (
            <div className="bg-neutral-50 border-2 border-primary rounded-lg p-6 mb-6">
              <h3 className="text-xl font-heading font-bold text-text-primary mb-4">
                {isAddingNew ? 'Add New Vaccine' : 'Edit Vaccine'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Vaccine Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Rabies, DHPP"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Date Given *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Next Due Date *
                  </label>
                  <input
                    type="date"
                    name="nextDate"
                    value={formData.nextDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Status
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-primary border-neutral-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                    />
                    <span className="text-sm text-text-secondary">Completed</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Additional notes or reminders"
                    rows="2"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={isAddingNew ? handleAdd : handleUpdate}
                  className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
                >
                  {isAddingNew ? 'Add Vaccine' : 'Update Vaccine'}
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-6 py-2 bg-white text-text-secondary border-2 border-neutral-300 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Vaccine Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-neutral-200">
                  <th className="text-left py-3 px-4 font-semibold text-text-primary">Vaccine Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-text-primary">Date Given</th>
                  <th className="text-left py-3 px-4 font-semibold text-text-primary">Next Due Date</th>
                  <th className="text-center py-3 px-4 font-semibold text-text-primary">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-text-primary">Notes</th>
                  <th className="text-center py-3 px-4 font-semibold text-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-text-secondary">
                      <div className="text-5xl mb-4">💉</div>
                      <p className="text-lg">No vaccine records yet</p>
                      <p className="text-sm">Click "Add New Vaccine" to get started</p>
                    </td>
                  </tr>
                ) : (
                  vaccines.map((vaccine, index) => (
                    <tr
                      key={vaccine.id}
                      className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                      }`}
                    >
                      <td className="py-3 px-4 font-medium text-text-primary">{vaccine.name}</td>
                      <td className="py-3 px-4 text-text-secondary">{vaccine.date}</td>
                      <td className="py-3 px-4 text-text-secondary">{vaccine.nextDate}</td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={vaccine.status}
                          onChange={() => handleStatusToggle(vaccine.id)}
                          className="cursor-pointer"
                          style={{ width: '18px', height: '18px' }}
                        />
                      </td>
                      <td className="py-3 px-4 text-text-secondary text-sm">{vaccine.notes || '-'}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(vaccine)}
                            className="px-3 py-1 text-sm border-2 border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(vaccine.id)}
                            className="px-3 py-1 text-sm border-2 border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-accent-50 border-l-4 border-accent rounded-lg p-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">ℹ️</span>
            <div>
              <h3 className="text-lg font-heading font-bold text-text-primary mb-2">
                Vaccine Care Tips
              </h3>
              <ul className="space-y-1 text-text-secondary text-sm">
                <li>• Keep all vaccine records up to date</li>
                <li>• Schedule appointments before the next due date</li>
                <li>• Consult your veterinarian for vaccine recommendations</li>
                <li>• Monitor your pet for any reactions after vaccination</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VaccineCare
