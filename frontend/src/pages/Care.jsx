import { useState } from 'react'
import React from 'react'

const Care = () => {
  const [activeTab, setActiveTab] = useState('dogs')

  const dogCare = [
    {
      title: "Nutrition",
      icon: "🍖",
      tips: [
        "Feed high-quality dog food appropriate for their age and size",
        "Provide fresh water at all times",
        "Avoid feeding human foods that are toxic to dogs (chocolate, grapes, onions)",
        "Maintain a consistent feeding schedule",
        "Monitor weight and adjust portions as needed"
      ]
    },
    {
      title: "Exercise",
      icon: "🏃",
      tips: [
        "Daily walks are essential for physical and mental health",
        "Play interactive games like fetch or tug-of-war",
        "Provide mental stimulation through puzzle toys",
        "Adjust exercise intensity based on age and breed",
        "Socialize with other dogs in safe environments"
      ]
    },
    {
      title: "Grooming",
      icon: "✂️",
      tips: [
        "Brush regularly to prevent matting and reduce shedding",
        "Bathe as needed, typically every 4-8 weeks",
        "Trim nails monthly or as needed",
        "Clean ears weekly to prevent infections",
        "Brush teeth daily or use dental chews"
      ]
    },
    {
      title: "Health Care",
      icon: "🏥",
      tips: [
        "Schedule annual veterinary check-ups",
        "Keep vaccinations up to date",
        "Use preventive medications for fleas, ticks, and heartworms",
        "Watch for signs of illness (lethargy, loss of appetite, vomiting)",
        "Spay or neuter to prevent health issues and overpopulation"
      ]
    },
    {
      title: "Training",
      icon: "🎓",
      tips: [
        "Start training early with positive reinforcement",
        "Be consistent with commands and rules",
        "Socialize puppies with people and other animals",
        "Use treats and praise to reward good behavior",
        "Consider professional training classes for best results"
      ]
    },
    {
      title: "Safety",
      icon: "🛡️",
      tips: [
        "Keep toxic substances out of reach",
        "Provide a safe, comfortable space for rest",
        "Use proper restraints in vehicles",
        "Ensure your yard is securely fenced",
        "Keep identification tags and microchip information current"
      ]
    }
  ]

  const catCare = [
    {
      title: "Nutrition",
      icon: "🐟",
      tips: [
        "Feed high-quality cat food with proper protein content",
        "Provide fresh water daily, consider a water fountain",
        "Avoid feeding dogs food or toxic human foods (onions, garlic, chocolate)",
        "Feed at consistent times each day",
        "Monitor weight and adjust portions accordingly"
      ]
    },
    {
      title: "Litter Box",
      icon: "📦",
      tips: [
        "Scoop litter box daily, change completely weekly",
        "Provide one litter box per cat, plus one extra",
        "Place boxes in quiet, accessible locations",
        "Use unscented, clumping litter most cats prefer",
        "Clean boxes thoroughly with mild soap regularly"
      ]
    },
    {
      title: "Grooming",
      icon: "✂️",
      tips: [
        "Brush long-haired cats daily, short-haired weekly",
        "Trim nails every 2-3 weeks",
        "Check ears weekly for dirt or signs of infection",
        "Brush teeth regularly or provide dental treats",
        "Most cats don't need baths unless they get very dirty"
      ]
    },
    {
      title: "Health Care",
      icon: "🏥",
      tips: [
        "Schedule annual veterinary check-ups",
        "Keep vaccinations current",
        "Use flea and tick prevention year-round",
        "Watch for changes in behavior, eating, or litter box habits",
        "Spay or neuter to prevent health issues"
      ]
    },
    {
      title: "Enrichment",
      icon: "🎾",
      tips: [
        "Provide scratching posts to satisfy natural instincts",
        "Offer interactive toys and rotate them regularly",
        "Create vertical spaces with cat trees or shelves",
        "Play with your cat daily using wand toys",
        "Consider puzzle feeders for mental stimulation"
      ]
    },
    {
      title: "Safety",
      icon: "🛡️",
      tips: [
        "Keep toxic plants and substances out of reach",
        "Secure windows and balconies",
        "Provide hiding spots for when they feel stressed",
        "Keep small objects that could be swallowed away",
        "Ensure microchip and ID tag information is current"
      ]
    }
  ]

  const currentCare = activeTab === 'dogs' ? dogCare : catCare

  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
        <div className="max-w-container mx-auto px-container text-center">
          <h1 className="text-5xl font-bold mb-4">Pet Care Guide</h1>
          <p className="text-xl text-primary-100">
            Everything you need to know to keep your pet happy and healthy
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="max-w-container mx-auto px-container">
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => setActiveTab('dogs')}
              className={`py-4 px-6 font-semibold text-lg transition-colors border-b-4 ${
                activeTab === 'dogs'
                  ? 'border-primary-600 text-primary'
                  : 'border-transparent text-text-secondary hover:text-primary'
              }`}
            >
              🐕 Dog Care
            </button>
            <button
              onClick={() => setActiveTab('cats')}
              className={`py-4 px-6 font-semibold text-lg transition-colors border-b-4 ${
                activeTab === 'cats'
                  ? 'border-primary-600 text-primary'
                  : 'border-transparent text-text-secondary hover:text-primary'
              }`}
            >
              🐈 Cat Care
            </button>
          </div>
        </div>
      </div>

      {/* Care Tips Grid */}
      <section className="py-16">
        <div className="max-w-container mx-auto px-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCare.map((category, index) => (
              <div key={index} className="card">
                <div className="p-6">
                  <div className="text-5xl mb-4 text-center">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4 text-center">
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <span className="text-primary mr-2 mt-1 flex-shrink-0">✓</span>
                        <span className="text-text-secondary">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-white">
        <div className="max-w-container mx-auto px-container">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-8">
            <div className="flex items-start">
              <span className="text-4xl mr-4">🚨</span>
              <div>
                <h2 className="text-2xl font-bold text-red-900 mb-4">
                  Emergency Warning Signs
                </h2>
                <p className="text-red-800 mb-4">
                  Contact your veterinarian immediately if you notice any of these symptoms:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-red-800">
                    <li>• Difficulty breathing</li>
                    <li>• Severe bleeding or trauma</li>
                    <li>• Seizures or collapse</li>
                    <li>• Inability to urinate or defecate</li>
                    <li>• Severe vomiting or diarrhea</li>
                  </ul>
                  <ul className="space-y-2 text-red-800">
                    <li>• Ingestion of toxic substances</li>
                    <li>• Extreme lethargy or weakness</li>
                    <li>• Bloated or distended abdomen</li>
                    <li>• Eye injuries</li>
                    <li>• Heatstroke symptoms</li>
                  </ul>
                </div>
                <div className="mt-6 p-4 bg-red-100 rounded-lg">
                  <p className="font-semibold text-red-900">
                    📞 Keep your veterinarian's emergency number and the nearest 24-hour emergency clinic information readily available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-secondary">
        <div className="max-w-container mx-auto px-container">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Training Guides
              </h3>
              <p className="text-text-secondary mb-4">
                Access comprehensive training resources and tips
              </p>
              <button className="text-primary font-semibold hover:text-primary-700">
                Learn More →
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Find a Vet
              </h3>
              <p className="text-text-secondary mb-4">
                Locate trusted veterinarians in your area
              </p>
              <button className="text-primary font-semibold hover:text-primary-700">
                Search Now →
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Community Forum
              </h3>
              <p className="text-text-secondary mb-4">
                Connect with other pet owners and share experiences
              </p>
              <button className="text-primary font-semibold hover:text-primary-700">
                Join Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-white">
        <div className="max-w-container mx-auto px-container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Adopt?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Now that you know how to care for a pet, find your perfect companion
          </p>
          <a href="/#pets" className="btn-primary bg-white text-primary hover:bg-gray-100">
            Browse Available Pets
          </a>
        </div>
      </section>
    </div>
  )
}

export default Care
