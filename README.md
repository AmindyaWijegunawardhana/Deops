# Happy Tails 🐾

A modern, responsive pet adoption website built with React, TailwindCSS, and React Router.

## Features

- **Home Page**: Hero section with featured pets and adoption statistics
- **Pet Details Page**: Comprehensive information about each pet including personality traits, health status, and adoption process
- **Adoption Form**: Complete application form with validation for prospective pet parents
- **Pet Care Section**: Detailed care guides for both dogs and cats with tips on nutrition, grooming, health, and safety

## Tech Stack

- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd windsurf-project-2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/
│   └── Layout.jsx          # Main layout with navigation and footer
├── pages/
│   ├── Home.jsx            # Home page with pet listings
│   ├── PetDetails.jsx      # Individual pet details
│   ├── AdoptionForm.jsx    # Adoption application form
│   └── Care.jsx            # Pet care guide
├── data/
│   └── pets.js             # Pet data
├── App.jsx                 # Main app component with routing
├── main.jsx                # App entry point
└── index.css               # Global styles and Tailwind imports
```

## Features Breakdown

### Home Page
- Eye-catching hero section
- Adoption statistics
- Grid of available pets with filtering
- Call-to-action sections

### Pet Details
- Large pet images
- Personality traits
- Health information
- Adoption fee
- Quick navigation to adoption form

### Adoption Form
- Multi-section form with validation
- Personal information collection
- Living situation assessment
- Pet experience evaluation
- Success confirmation page

### Care Section
- Tabbed interface for dogs and cats
- Six care categories per pet type
- Emergency warning signs
- Additional resources section

## Customization

### Adding New Pets

Edit `src/data/pets.js` and add new pet objects following the existing structure:

```javascript
{
  id: 7,
  name: "Pet Name",
  type: "Dog" or "Cat",
  breed: "Breed Name",
  age: "X years",
  gender: "Male/Female",
  size: "Small/Medium/Large",
  image: "image-url",
  description: "Description...",
  personality: ["Trait1", "Trait2"],
  healthStatus: "Health info...",
  adoptionFee: "$XXX"
}
```

### Styling

The project uses TailwindCSS with a custom color palette. Modify `tailwind.config.js` to change the theme colors.

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, contact us at info@happytails.com
