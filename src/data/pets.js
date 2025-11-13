export const pets = [
  {
    id: 1,
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: "3 years",
    gender: "Male",
    size: "Large",
    image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80",
    description: "Max is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks. He's great with kids and other dogs.",
    personality: ["Friendly", "Energetic", "Loyal", "Playful"],
    healthStatus: "Vaccinated, neutered, microchipped",
    isAdopted: true
  },
  {
    id: 2,
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: "2 years",
    gender: "Female",
    size: "Medium",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800&q=80",
    description: "Luna is a graceful Siamese cat with beautiful blue eyes. She's affectionate and loves to curl up in your lap for a good nap.",
    personality: ["Affectionate", "Calm", "Independent", "Vocal"],
    healthStatus: "Vaccinated, spayed, microchipped",
    isAdopted: false
  },
  {
    id: 3,
    name: "Charlie",
    type: "Dog",
    breed: "Beagle",
    age: "5 years",
    gender: "Male",
    size: "Medium",
    image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&q=80",
    description: "Charlie is a sweet Beagle with a curious nature. He loves exploring and following interesting scents. Perfect for an active family.",
    personality: ["Curious", "Gentle", "Friendly", "Active"],
    healthStatus: "Vaccinated, neutered, microchipped",
    isAdopted: false
  },
  {
    id: 4,
    name: "Bella",
    type: "Cat",
    breed: "Persian",
    age: "4 years",
    gender: "Female",
    size: "Small",
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&q=80",
    description: "Bella is a beautiful Persian cat with a luxurious coat. She's calm and enjoys a peaceful environment with lots of cuddles.",
    personality: ["Calm", "Affectionate", "Quiet", "Gentle"],
    healthStatus: "Vaccinated, spayed, microchipped",
    isAdopted: true
  },
  {
    id: 5,
    name: "Rocky",
    type: "Dog",
    breed: "German Shepherd",
    age: "2 years",
    gender: "Male",
    size: "Large",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&q=80",
    description: "Rocky is an intelligent and loyal German Shepherd. He's protective of his family and would make an excellent companion for an active household.",
    personality: ["Intelligent", "Loyal", "Protective", "Trainable"],
    healthStatus: "Vaccinated, neutered, microchipped",
    isAdopted: false
  },
  {
    id: 6,
    name: "Mittens",
    type: "Cat",
    breed: "Tabby",
    age: "1 year",
    gender: "Female",
    size: "Small",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",
    description: "Mittens is a playful young tabby cat who loves toys and climbing. She's full of energy and will keep you entertained for hours.",
    personality: ["Playful", "Energetic", "Curious", "Social"],
    healthStatus: "Vaccinated, spayed, microchipped",
    isAdopted: false
  }
]

export const getPetById = (id) => {
  return pets.find(pet => pet.id === parseInt(id))
}
