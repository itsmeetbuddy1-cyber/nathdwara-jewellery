import fs from 'fs';

// Load our verified images
const rawImages = JSON.parse(fs.readFileSync('final-180-images.json', 'utf8'));

// High quality replacements for flagged items
// Bangles replacement for rubber band
rawImages.bangles[22] = {
  id: 'LgqT3xzH7aw',
  alt: 'Indian traditional artisan bangles and kadas',
  url: 'https://images.unsplash.com/photo-1576022390757-1901b0451cf4?auto=format&fit=crop&w=800&q=80' // wait, earlier photo-1576022390757-1901b0451cf4 was 404! Let's check!
};

