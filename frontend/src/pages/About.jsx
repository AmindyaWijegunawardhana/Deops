import React from "react"
const About = () => {
  return (
    <div className="bg-secondary min-h-screen py-16">
      <div className="max-w-container mx-auto px-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading font-bold text-text-primary mb-4">
            About Happy Tails
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We're dedicated to connecting loving families with pets in need of forever homes
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">❤️</span>
            <h2 className="text-3xl font-heading font-bold text-text-primary">Our Mission</h2>
          </div>
          <p className="text-text-secondary text-lg leading-relaxed mb-4">
            Happy Tails was founded with a simple but powerful mission: to ensure every pet finds a loving, permanent home. We believe that the bond between humans and animals is one of life's greatest gifts, and we're committed to making that connection possible for as many pets and families as we can.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed">
            Since our founding in 2024, we've successfully placed over 500 pets in caring homes, and we're just getting started. Every adoption is a celebration, and every pet deserves their happy ending.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
              Forever Homes
            </h3>
            <p className="text-text-secondary">
              We carefully match each pet with the perfect family to ensure lifelong happiness
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-5xl mb-4">💚</div>
            <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
              Compassionate Care
            </h3>
            <p className="text-text-secondary">
              Every pet receives medical care, love, and attention while waiting for adoption
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
              Ongoing Support
            </h3>
            <p className="text-text-secondary">
              We provide resources and guidance to families throughout the adoption journey
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary rounded-xl shadow-lg p-8 md:p-12 text-white">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-heading font-bold mb-2">500+</div>
              <div className="text-lg">Successful Adoptions</div>
            </div>
            <div>
              <div className="text-5xl font-heading font-bold mb-2">50+</div>
              <div className="text-lg">Pets Available Now</div>
            </div>
            <div>
              <div className="text-5xl font-heading font-bold mb-2">100%</div>
              <div className="text-lg">Love & Dedication</div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
            Have Questions?
          </h2>
          <p className="text-text-secondary text-lg mb-6">
            We'd love to hear from you! Reach out to learn more about our adoption process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@happytails.com"
              className="font-bold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                color: 'white',
                padding: '12px 32px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(34, 197, 94, 0.3)',
                textDecoration: 'none',
                display: 'inline-block'
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
              📧 Email Us
            </a>
            <a
              href="tel:5551234567"
              className="font-bold transition-all duration-300"
              style={{
                background: 'white',
                color: '#22c55e',
                padding: '12px 32px',
                borderRadius: '12px',
                border: '2px solid #22c55e',
                boxShadow: '0 4px 6px rgba(34, 197, 94, 0.2)',
                textDecoration: 'none',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.backgroundColor = '#f0fdf4';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(34, 197, 94, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(34, 197, 94, 0.2)';
              }}
            >
              📞 Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
