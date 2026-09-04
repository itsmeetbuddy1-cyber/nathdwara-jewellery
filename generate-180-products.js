import fs from 'fs';

// Load raw images
const rawData = JSON.parse(fs.readFileSync('final-180-images.json', 'utf8'));

// Apply precision curated replacements
// Bangles replacement for rubber band
rawData.bangles[22] = {
  id: 'LgqT3xzH7aw',
  alt: 'Indian traditional artisan bangles and kadas',
  url: 'https://plus.unsplash.com/premium_photo-1769958022102-1697e19a2e32?auto=format&fit=crop&w=800&q=80'
};

// Bracelet replacements
rawData.bracelet[18] = {
  id: '_5i0qw5yBK0',
  alt: 'A rose gold bracelet with mother of pearl accents on geometric display pedestals',
  url: 'https://images.unsplash.com/photo-1787520542819-24e2b17764e3?auto=format&fit=crop&w=800&q=80'
};
rawData.bracelet[24] = {
  id: 'UJYHFiJQqW8',
  alt: 'silver and gold bracelet on white surface',
  url: 'https://images.unsplash.com/photo-1628872354761-c289e269092f?auto=format&fit=crop&w=800&q=80'
};

// Earrings replacements
rawData.earrings[9] = {
  id: 'hHv-_so4MGU',
  alt: 'Rows of ornate jhumka earrings hanging',
  url: 'https://images.unsplash.com/photo-1762686130435-897de4b26aac?auto=format&fit=crop&w=800&q=80'
};
rawData.earrings[25] = {
  id: 'LBvg2FW_VII',
  alt: 'a pair of silver and gold earrings',
  url: 'https://images.unsplash.com/photo-1714733831162-0a6e849141be?auto=format&fit=crop&w=800&q=80'
};

// Bridal replacement
rawData.bridal[4] = {
  id: 'VPwSJhu5uhs',
  alt: 'A woman in traditional red bridal attire with ornate gold jewelry and a veil',
  url: 'https://images.unsplash.com/photo-1600685890506-593fdf55949b?auto=format&fit=crop&w=800&q=80'
};

// Pendant replacements
rawData.pendant[10] = {
  id: 'abYsl-z_om0',
  alt: 'gold rectangular pendant necklace on white surface',
  url: 'https://images.unsplash.com/photo-1588575788949-dc6e8d9f76c9?auto=format&fit=crop&w=800&q=80'
};
rawData.pendant[11] = {
  id: 'mXhch3zbQkE',
  alt: 'a gold pendant on a brown background',
  url: 'https://plus.unsplash.com/premium_photo-1680187492781-5f6d4e2081c1?auto=format&fit=crop&w=800&q=80'
};
rawData.pendant[15] = {
  id: '2BYXjDSVtlc',
  alt: 'Ornate pearl and diamond necklace with matching earrings and pendant',
  url: 'https://images.unsplash.com/photo-1719862057229-4dd650b5ccee?auto=format&fit=crop&w=800&q=80'
};

// Verify global uniqueness of all 180 images
const allImages = [];
for (const [cat, list] of Object.entries(rawData)) {
  for (const item of list) {
    allImages.push(item.url);
  }
}

const uniqueUrls = new Set(allImages);
console.log(`Total images: ${allImages.length}, Unique images: ${uniqueUrls.size}`);
if (allImages.length !== uniqueUrls.size) {
  throw new Error(`Duplicate image URLs found! Total: ${allImages.length}, Unique: ${uniqueUrls.size}`);
}

// 180 unique product titles and prices
const ringCatalog = [
  ['The Koh-i-Noor Aura Solitaire Ring', 84500, '18K Yellow Gold', '18KT / 750', '5.20 g', '0.90 ct Solitaire (VVS1, E-F)', 'Signature Solitaire'],
  ['The Shrinathji Lotus Floral Gold Ring', 52500, '22K Yellow Gold', '22KT / 916', '6.40 g', '0.75 ct Burmese Ruby Cabochon', 'Spiritual Grace'],
  ['The Udaipur Maharani Halo Ring', 112000, '18K Sunset Rose Gold', '18KT / 750', '7.10 g', '1.20 ct Round Brilliant VVS1', 'Royal Edition'],
  ['Vajra 22K Navratna Royal Ring', 68000, '22K Imperial Yellow Gold', '22KT / 916', '8.50 g', 'Authentic 9 Gemstones (Navratna)', 'Sacred Heirloom'],
  ['Celeste 950 Platinum Eternity Band', 145000, '950 Pure Platinum', '950 Pt', '6.80 g', '2.10 ct Continuous Pavé Diamonds', 'Modern Luxury'],
  ['Mewar Peacock Carved Cocktail Ring', 76000, '22K Yellow Gold', '22KT / 916', '9.20 g', 'Polki Diamonds & Green Meenakari', 'Master Karigar'],
  ['Padmavati Emerald Solitaire Ring', 95000, '18K Royal Gold', '18KT / 750', '5.80 g', '1.45 ct Zambian Emerald & Baguettes', 'Heirloom Pick'],
  ['Surya Radiant Crown Band Ring', 48500, '22K Yellow Gold', '22KT / 916', '5.50 g', '0.45 ct Micro-Pavé Diamonds', 'Bestseller'],
  ['The Amber Palace Cushion Diamond Ring', 128000, '18K Rose Gold', '18KT / 750', '6.40 g', '1.50 ct Cushion Cut VVS Diamond', 'Signature Pick'],
  ['Royal Rajputana Filigree Signet Ring', 62000, '22K Imperial Gold', '22KT / 916', '10.20 g', 'Hand-Engraved Imperial Crest', 'Heritage Collection'],
  ['Chandra Moonlit Basra Pearl Ring', 54000, '22K Yellow Gold', '22KT / 916', '7.40 g', 'Basra Pearl with Diamond Halo', 'Classic Grace'],
  ['Kashmiri Blue Sapphire Solitaire', 135000, '950 Platinum', '950 Pt', '7.90 g', '1.80 ct Natural Royal Blue Sapphire', 'Rare Gemstone'],
  ['Nathdwara Temple Floral Gold Band', 42000, '22K Yellow Gold', '22KT / 916', '5.10 g', 'Pure Hand-Chased Gold Floral Work', 'Everyday Luxury'],
  ['The Sovereign Princess Cut Solitaire', 108000, '18K White Gold', '18KT / 750', '5.60 g', '1.10 ct Ideal Princess Cut VVS1', 'Bridal Choice'],
  ['Roopmati Ruby Trilogy Ring', 89000, '18K Rose Gold', '18KT / 750', '6.20 g', 'Trio of Certified Burmese Rubies', 'Limited Edition'],
  ['The Golden Jaali Lattice Band', 46000, '22K Yellow Gold', '22KT / 916', '5.80 g', 'Openwork Sacred Indian Jaali Motif', 'Artisanal Craft'],
  ['Imperial Baguette Diamond Band', 79000, '950 Platinum', '950 Pt', '6.10 g', '0.85 ct Channel-Set Baguette Diamonds', 'Sophisticated'],
  ['The Devyani Vintage Cluster Ring', 72500, '22K Yellow Gold', '22KT / 916', '7.30 g', 'Syndicate Polki & Pink Tourmalines', 'Antique Revival'],
  ['Solitaire Promise Micro-Pave Ring', 58000, '18K Rose Gold', '18KT / 750', '4.40 g', '0.60 ct Solitaire with Diamond Band', 'Romantic Token'],
  ['Mogul Empress Pear-Cut Solitaire', 152000, '18K Yellow Gold', '18KT / 750', '6.90 g', '1.75 ct D-Color Flawless Pear Diamond', 'Grand Masterpiece'],
  ['The Lotus Bud Diamond Solitaire', 81000, '18K Rose Gold', '18KT / 750', '5.30 g', '0.80 ct Brilliant Diamond in Lotus Cup', 'Divine Elegance'],
  ['Marwar Royal Antique Seal Ring', 64000, '22K Yellow Gold', '22KT / 916', '9.80 g', 'Traditional Antique Matte Finish', 'Collector Choice'],
  ['The Starlight Diamond Chevron Ring', 39000, '18K Yellow Gold', '18KT / 750', '3.80 g', 'V-Shaped Contoured Diamond Band', 'Stackable Trend'],
  ['The Shrinathji Flute Engraved Band', 49500, '22K Yellow Gold', '22KT / 916', '6.20 g', 'Laser-engraved Sacred Bansuri Motif', 'Spiritual Harmony'],
  ['The Kohinoor Twin Solitaire Toi-et-Moi', 165000, '950 Platinum', '950 Pt', '7.40 g', '1.0 ct Diamond & 1.2 ct Colombian Emerald', 'Haute Joaillerie'],
  ['The Bikaner Jadau Oval Solitaire Ring', 98000, '22K Yellow Gold', '22KT / 916', '8.10 g', 'Oval Polki Center with Pearl Border', 'Traditional Gem'],
  ['The Radiant Oval Cut Diamond Ring', 115000, '18K Yellow Gold', '18KT / 750', '5.90 g', '1.30 ct Oval Diamond with Hidden Halo', 'Modern Classic'],
  ['The Royal Emerald Eternity Band', 86000, '18K Yellow Gold', '18KT / 750', '6.10 g', 'Continuous Zambian Emerald Baguettes', 'Precious Green'],
  ['The Jaipur Meenakari Floral Ring', 54000, '22K Yellow Gold', '22KT / 916', '7.20 g', 'Hand-painted Enamel Lotus Blossom', 'Artisanal Craft'],
  ['The Sovereign Signet Crest Ring', 72000, '22K Imperial Gold', '22KT / 916', '11.50 g', 'Solid Gold Nathdwara Royal Crest', 'Statement Piece']
];

const necklaceCatalog = [
  ['Padmavati Royal Polki Choker', 345000, '22K Imperial Yellow Gold', '22KT / 916', '48.60 g', '12.50 ct Syndicate Polki & Basra Pearls', 'Royal Heritage'],
  ['The Jodha Bai Emerald Collar Haar', 485000, '22K Yellow Gold', '22KT / 916', '64.20 g', 'Natural Zambian Emerald Drops & Kundan', 'Grand Royal'],
  ['Noor-e-Nathdwara Diamond Choker', 520000, '18K White Gold', '18KT / 750', '52.00 g', '8.40 ct VVS Brilliant Cut Diamonds', 'Diamond Haute'],
  ['Mewar Royal Rani Haar Necklace', 620000, '22K Imperial Gold', '22KT / 916', '88.50 g', 'Layered Uncut Polki with Basra Pearls', 'Sovereign Heirloom'],
  ['The Shrinathji Sacred Hasli Choker', 285000, '22K Yellow Gold', '22KT / 916', '38.20 g', 'Solid Gold Torque with Lotus Repoussé', 'Temple Devotion'],
  ['The Celeste Tennis Diamond Collar', 395000, '950 Platinum', '950 Pt', '34.00 g', '7.20 ct Graduated DEF Diamonds', 'Modern Glamour'],
  ['Rajputana Vintage Guluband Collar', 310000, '22K Yellow Gold', '22KT / 916', '42.00 g', 'Traditional Royal Neckband with Meenakari', 'Heritage Classic'],
  ['The Amber Floral Polki Haar', 440000, '22K Yellow Gold', '22KT / 916', '58.00 g', 'Nine Lotus Medallions with Basra Pearls', 'Grand Rajputana'],
  ['Devyani Ruby Tassel Collar Necklace', 365000, '18K Rose Gold', '18KT / 750', '44.80 g', 'Natural Burmese Rubies with Diamond Clusters', 'Imperial Ruby'],
  ['The Basra Pearl Multistrand Haar', 290000, '22K Yellow Gold', '22KT / 916', '36.50 g', 'Seven Strands of Certified Natural Pearls', 'Timeless Purity'],
  ['The Mandir Kasu Mala Coin Haar', 225000, '22K Yellow Gold', '22KT / 916', '45.00 g', 'Traditional Goddess Lakshmi Embossed Coins', 'Auspicious Glow'],
  ['The Diamond Waterfall Rivier Necklace', 580000, '18K White Gold', '18KT / 750', '49.20 g', '10.50 ct Cascading Marquise Diamonds', 'Red Carpet Glam'],
  ['Jaipur Kundan Meenakari Choker', 275000, '22K Yellow Gold', '22KT / 916', '41.50 g', 'Reversible Red & Green Enameling with Polki', 'Artisan Wonder'],
  ['The Navratna Imperial Vedic Collar', 330000, '22K Imperial Gold', '22KT / 916', '46.00 g', 'Nine Sacred Vedic Gemstones in Gold Bezel', 'Sacred Protection'],
  ['The Kohinoor Pear Diamond Necklace', 690000, '950 Platinum', '950 Pt', '55.00 g', '14.00 ct DEF Color VVS Pear Diamonds', 'Crown Jewel'],
  ['The Royal Bikaner Jadau Necklace', 380000, '22K Yellow Gold', '22KT / 916', '54.00 g', 'Uncut Diamonds with Carved Emerald Beads', 'Palace Splendor'],
  ['The Golden Mesh Byzantine Collar', 195000, '22K Yellow Gold', '22KT / 916', '32.00 g', 'Intricately Woven Flexible Gold Mesh', 'Contemporary Chic'],
  ['The Sovereign Peacock Pendant Haar', 355000, '22K Imperial Gold', '22KT / 916', '50.40 g', 'Dancing Peacock Crest with Polki Accents', 'Symbol of Grace'],
  ['The Moonlit Diamond Y-Drop Necklace', 240000, '18K Rose Gold', '18KT / 750', '28.50 g', '4.20 ct Brilliant Solitaires in Y-Silhouette', 'Delicate Allure'],
  ['The Royal Temple Mango Mala', 260000, '22K Yellow Gold', '22KT / 916', '43.80 g', 'Traditional Paisley (Kairi) Gold Motifs', 'Heritage Gold'],
  ['The Empress Colombian Emerald Collar', 750000, '18K Yellow Gold', '18KT / 750', '62.00 g', 'Certified Vivid Green Colombian Emeralds', 'High Jewellery'],
  ['The Chandra Pearl Choker with Ruby Stud', 215000, '22K Yellow Gold', '22KT / 916', '31.00 g', 'Natural Seed Pearls with Center Ruby Brooch', 'Vintage Romance'],
  ['The Diamond Baguette Bar Necklace', 185000, '950 Platinum', '950 Pt', '24.00 g', '3.50 ct Geometric Baguette Diamonds', 'Modernist Luxe'],
  ['The Nathdwara Haveli Gate Choker', 410000, '22K Yellow Gold', '22KT / 916', '56.00 g', 'Sculpted Temple Archway Motifs with Polki', 'Devotional Art'],
  ['The Royal Rajwada Pachlada Haar', 540000, '22K Imperial Gold', '22KT / 916', '72.00 g', 'Five-Layered Pearl & Gemstone Royal Garland', 'Aristocratic Grace'],
  ['The Solitaire Diamond Tennis Choker', 465000, '18K White Gold', '18KT / 750', '33.50 g', '8.00 ct Flawless Round Diamonds', 'Everyday Royalty'],
  ['The Antique Nakshi Floral Collar', 280000, '22K Yellow Gold', '22KT / 916', '46.50 g', 'Deep Chased Gold Floral Relief Work', 'Karigar Legacy'],
  ['The Sapphire Twilight Royal Collar', 495000, '18K White Gold', '18KT / 750', '48.00 g', 'Ceylonese Royal Blue Sapphires with Diamonds', 'Midnight Radiance'],
  ['The Jodhpur Sunburst Gold Choker', 325000, '22K Yellow Gold', '22KT / 916', '45.20 g', 'Radiating Gold Rays with Uncut Polki Diamonds', 'Solar Splendor'],
  ['The Sovereign Grand Coronation Haar', 890000, '22K Imperial Gold', '22KT / 916', '115.00 g', 'Museum-Grade 22K Gold Masterpiece with Polki', 'Imperial Masterpiece']
];

const earringCatalog = [
  ['Padmavati Royal Polki Chandbalis', 132000, '22K Imperial Gold', '22KT / 916', '25.00 g', 'Burmese Rubies with Golden Pearls', 'Regal Masterpiece'],
  ['The Sovereign Grand Bridal Jhumkas', 158000, '22K Imperial Gold', '22KT / 916', '32.00 g', 'Triple-Tiered Sovereign Bridal Jhumkas', 'Grand Heirloom'],
  ['The Amber Meenakari Peacock Chandbalis', 92000, '22K Yellow Gold', '22KT / 916', '17.50 g', 'Green & Blue Enameling with Polki', 'Heritage Craft'],
  ['The Lotus Petal Rose Gold Drops', 59000, '18K Rose Gold', '18KT / 750', '7.20 g', 'Petal silhouettes with brilliant diamonds', 'Contemporary'],
  ['The Diamond Baguette Linear Drops', 79000, '18K White Gold', '18KT / 750', '8.10 g', 'Linear Geometric Baguette Diamonds', 'Red Carpet'],
  ['The Basra Pearl Chandelier Drops', 110000, '22K Imperial Gold', '22KT / 916', '21.00 g', 'Multiple Pearl Tassels with Polki Stud', 'Palace Favorite'],
  ['The Sunburst Diamond Drop Earrings', 118000, '18K Rose Gold', '18KT / 750', '12.40 g', '2.20 ct Brilliant Diamonds in Star Halo', 'Modern Classic'],
  ['The Royal Temple Kasu Earrings', 56000, '22K Yellow Gold', '22KT / 916', '9.80 g', 'Embossed Temple Coins with Antique Finish', 'Traditional'],
  ['The Emerald Teardrop Diamond Drops', 128000, '18K Yellow Gold', '18KT / 750', '11.60 g', 'Pear-Cut Zambian Emeralds & Diamonds', 'High Jewellery'],
  ['The Solitaire Diamond Huggie Hoops', 69000, '18K Rose Gold', '18KT / 750', '6.40 g', '1.10 ct Inside-Out Diamond Hoops', 'Modern Luxury'],
  ['The Golden Filigree Hoop Earrings', 42000, '22K Yellow Gold', '22KT / 916', '8.40 g', 'Handmade Twisted Wire Gold Hoops', 'Minimal Chic'],
  ['The Marwar Antique Chased Jhumkas', 84000, '22K Yellow Gold', '22KT / 916', '16.80 g', 'Repoussé Dome with Subtle Jingling Bells', 'Pure Gold'],
  ['The Starlet Princess Cut Diamond Studs', 96000, '950 Platinum', '950 Pt', '4.80 g', '1.60 ct Total Princess Solitaires', 'Timeless Gift'],
  ['The Navratna Sacred Ear Drops', 74000, '22K Yellow Gold', '22KT / 916', '13.80 g', 'Nine Certified Vedic Gemstones', 'Auspicious Glow'],
  ['The Jaipuri Jadau Chandbali Tops', 88000, '22K Yellow Gold', '22KT / 916', '15.40 g', 'Flat Studs with Detachable Pearl Hangings', 'Versatile Style'],
  ['The Devyani Ruby Chandelier Earrings', 142000, '18K Rose Gold', '18KT / 750', '18.50 g', 'Certified Pigeon Blood Rubies with Diamonds', 'Royal Glamour'],
  ['The Celeste Diamond Waterfall Earrings', 168000, '950 Platinum', '950 Pt', '14.20 g', 'Graduated Oval Diamonds in Fluid Cascade', 'Couture Design'],
  ['The Bikaner Nakshi Bell Jhumkas', 78000, '22K Yellow Gold', '22KT / 916', '16.00 g', 'Floral Cap with Filigree Lattice Dome', 'Temple Heritage'],
  ['The Shrinathji Lotus Stud Earrings', 45000, '22K Yellow Gold', '22KT / 916', '6.80 g', 'Carved Ruby Lotus with Gold Petals', 'Spiritual Aura'],
  ['The Diamond Pavé Swirl Climbers', 64000, '18K White Gold', '18KT / 750', '5.50 g', 'Organic Ear Silhouette with Micro-Pavé', 'Modern Trend'],
  ['The Kashmir Sapphire Diamond Drops', 175000, '950 Platinum', '950 Pt', '12.80 g', 'Oval Blue Sapphires with Halo Tops', 'Precious Gem'],
  ['The Mewar Carved Jade & Polki Drops', 105000, '22K Yellow Gold', '22KT / 916', '19.20 g', 'Carved Mughal Floral Jade with Diamonds', 'Collector Piece'],
  ['The Radiant Oval Solitaire Studs', 125000, '18K Yellow Gold', '18KT / 750', '4.60 g', '2.00 ct Total DEF/VVS Oval Solitaires', 'Everyday Sparkle'],
  ['The Golden Jaali Dome Jhumkas', 68000, '22K Yellow Gold', '22KT / 916', '14.00 g', 'Lightweight Openwork Dome with Pearls', 'Featherweight'],
  ['The Victorian Rose Cut Diamond Drops', 115000, '18K Sunset Gold', '18KT / 750', '13.40 g', 'Antique Flat-Back Rose Cut Diamonds', 'Vintage Elegance'],
  ['The Udaipur Pearl Cluster Chandbalis', 82000, '22K Yellow Gold', '22KT / 916', '17.00 g', 'Crescent Moon Silhouette with Seed Pearls', 'Poetic Grace'],
  ['The Tanzanite Royal Blue Drop Earrings', 138000, '18K White Gold', '18KT / 750', '11.00 g', 'Cushion Cut Tanzanites with Pavé Halo', 'Rare Splendor'],
  ['The Peacock Enamel Feather Earrings', 53000, '22K Yellow Gold', '22KT / 916', '8.90 g', 'Vibrant Jaipur Meenakari Enameling', 'Artisan Story'],
  ['The Classic Brilliant Diamond Studs', 86000, '950 Platinum', '950 Pt', '3.90 g', '1.20 ct Round Brilliant Solitaires', 'Essential Luxury'],
  ['The Sovereign Grand Maharani Kanphool', 198000, '22K Imperial Gold', '22KT / 916', '38.00 g', 'Full Ear Cuff with Layered Hair Chains', 'Grand Bridal Heirloom']
];

const bangleCatalog = [
  ['The Amber Palace Antique Nakshi Kada', 245000, '22K Imperial Gold', '22KT / 916', '42.50 g', 'Hand-Chased Royal Elephants & Floral Scroll', 'Museum Craft'],
  ['The Royal Jadau Uncut Polki Bangle', 285000, '22K Yellow Gold', '22KT / 916', '48.00 g', 'Continuous Polki Line with Green Enameling', 'Grand Heritage'],
  ['The Shrinathji Devotional Sacred Kada', 195000, '22K Yellow Gold', '22KT / 916', '35.00 g', 'Embossed Lotus Petals with Screw Clasp', 'Spiritual Grace'],
  ['The Diamond Pavé Eternity Bangle', 320000, '18K Rose Gold', '18KT / 750', '32.00 g', '4.50 ct Round Brilliant Pavé Diamonds', 'Modern Glamour'],
  ['The Rajputana Heritage Patla Pair', 390000, '22K Imperial Gold', '22KT / 916', '68.00 g', 'Pair of Broad Chased Wedding Patlas', 'Bridal Essential'],
  ['The Celeste 950 Platinum Channel Bangle', 265000, '950 Platinum', '950 Pt', '38.00 g', 'Channel-Set Baguette Diamonds (3.20 ct)', 'Understated Luxe'],
  ['The Mewar Peacock Carved Gold Kada', 230000, '22K Yellow Gold', '22KT / 916', '40.00 g', 'Facing Peacock Heads with Ruby Eyes', 'Royal Symbol'],
  ['The Basra Pearl Lined Gold Bangle', 175000, '22K Yellow Gold', '22KT / 916', '28.50 g', 'Natural Seed Pearls Flanked by Gold Rims', 'Vintage Purity'],
  ['The Jaipur Meenakari Floral Bangle', 165000, '22K Yellow Gold', '22KT / 916', '30.00 g', 'Multi-color Enameling with Floral Vine', 'Artisanal Gem'],
  ['The Zambian Emerald Bezel Kada', 340000, '18K Yellow Gold', '18KT / 750', '36.50 g', 'Square-Cut Emeralds Alternating with Diamonds', 'Precious Stone'],
  ['The Twisted Wire Classic Gold Bangle', 145000, '22K Yellow Gold', '22KT / 916', '24.00 g', 'Hand-Twisted Solid Gold Ropes', 'Everyday Classic'],
  ['The Mandir Lakshmi Coin Kada', 185000, '22K Yellow Gold', '22KT / 916', '33.00 g', 'Embossed Goddess Lakshmi Coins with Rubies', 'Auspicious Wealth'],
  ['The Royal Rajwada Filigree Cuff', 215000, '22K Imperial Gold', '22KT / 916', '37.80 g', 'Delicate Openwork Gold Jaali Lace', 'Masterpiece'],
  ['The Burmese Ruby Cabochon Bangle', 295000, '18K Rose Gold', '18KT / 750', '34.00 g', 'Natural Cabochon Rubies with Pavé Halo', 'Crimson Radiance'],
  ['The Sovereign Heavy Solid Gold Kada', 360000, '22K Imperial Gold', '22KT / 916', '62.50 g', 'Solid Gold Rod with Lion Head Finials', 'Warrior Sovereign'],
  ['The Navratna Vedic Harmonizing Bangle', 225000, '22K Yellow Gold', '22KT / 916', '36.00 g', 'Nine Astrology-Approved Certified Gems', 'Spiritual Energy'],
  ['The Rose Gold Slim Stacking Bangles (Set of 3)', 155000, '18K Rose Gold', '18KT / 750', '26.00 g', 'Trio of Textured & Diamond-Cut Bangles', 'Chic Stack'],
  ['The Bikaner Jadau Openable Kada', 270000, '22K Yellow Gold', '22KT / 916', '44.00 g', 'Hidden Push-Screw Lock with Polki Work', 'Palace Art'],
  ['The Diamond Baguette Cross Bangle', 250000, '18K White Gold', '18KT / 750', '29.50 g', 'Interlocking Diamond Baguettes (2.80 ct)', 'Architectural'],
  ['The Udaipur Royal Chooda Kada Set', 420000, '22K Imperial Gold', '22KT / 916', '74.00 g', 'Complete Bridal Chooda Kadis with Pearls', 'Sovereign Bridal'],
  ['The Polki Starburst Open Cuff', 198000, '22K Yellow Gold', '22KT / 916', '31.50 g', 'Flexible Open Cuff with Polki Floral Tips', 'Contemporary Fusion'],
  ['The Chandra Moonlit Pearl Kada', 188000, '22K Yellow Gold', '22KT / 916', '32.40 g', 'Lustrous Basra Pearls set in Gold Claws', 'Ethereal Grace'],
  ['The Kashmir Sapphire Oval Kada', 375000, '950 Platinum', '950 Pt', '41.00 g', 'Royal Blue Sapphires with Diamond Borders', 'Rare Masterpiece'],
  ['The Traditional Temple Kasu Bangle', 160000, '22K Yellow Gold', '22KT / 916', '27.80 g', 'Overlapping Gold Coin Medallions', 'Devotional Shine'],
  ['The Sovereign Imperial Coronation Kada', 480000, '22K Imperial Gold', '22KT / 916', '85.00 g', 'Museum-grade Chased Gold with Uncut Polki', 'Coronation Jewel']
];

const braceletCatalog = [
  ['Celeste 950 Platinum Diamond Tennis Bracelet', 215000, '950 Pure Platinum', '950 Pt', '18.40 g', '3.20 ct Total Weight DEF / VVS Ideal Cut', 'Modern Luxury'],
  ['The Royal Gold Byzantine Link Bracelet', 125000, '22K Yellow Gold', '22KT / 916', '22.00 g', 'Intricately Hand-Linked Royal Weave', 'Heritage Classic'],
  ['The Rose Gold Diamond Charm Bracelet', 98000, '18K Rose Gold', '18KT / 750', '14.50 g', 'Dangling Lotus & Celestial Diamond Charms', 'Chic Sparkle'],
  ['The Sovereign Polki Floral Link Bracelet', 165000, '22K Imperial Gold', '22KT / 916', '24.80 g', 'Artisanal Uncut Polki in Gold Bezels', 'Palace Favorite'],
  ['The Sacred Evil Eye Protective Bracelet', 58000, '18K Yellow Gold', '18KT / 750', '7.80 g', 'Sapphire & Diamond Evil Eye Talisman', 'Auspicious Gift'],
  ['The Emerald Bezel Slider Bracelet', 112000, '18K Yellow Gold', '18KT / 750', '12.00 g', 'Zambian Emerald Ovals with Adjustable Ball', 'Versatile Luxe'],
  ['The Diamond Baguette Bar Tennis Bracelet', 240000, '18K White Gold', '18KT / 750', '19.50 g', '4.10 ct Alternating Round & Baguette Diamonds', 'Red Carpet Glam'],
  ['The Rajputana Filigree Cuff Bracelet', 148000, '22K Yellow Gold', '22KT / 916', '25.00 g', 'Openwork Floral Jaali with Hinged Clasp', 'Karigar Craft'],
  ['The Pearl & Diamond Rivière Bracelet', 135000, '18K Rose Gold', '18KT / 750', '16.20 g', 'Lustrous Pearls Alternating with Solitaires', 'Poetic Elegance'],
  ['The Shrinathji Bansuri Gold Bracelet', 82000, '22K Yellow Gold', '22KT / 916', '13.40 g', 'Sculpted Golden Flute Motif with Diamond', 'Spiritual Aura'],
  ['The Burmese Ruby Halo Tennis Bracelet', 185000, '18K Rose Gold', '18KT / 750', '17.00 g', 'Certified Natural Rubies with Pavé Halos', 'Precious Ruby'],
  ['The Solid Gold Anchor Cuban Link Bracelet', 155000, '22K Imperial Gold', '22KT / 916', '28.00 g', 'Hand-Polished High-Density Gold Curb Chain', 'Bold Statement'],
  ['The Diamond Eternity Bangle-Bracelet', 192000, '950 Platinum', '950 Pt', '16.80 g', 'Seamless Click-Lock Diamond Orbit (2.80 ct)', 'Timeless Pick'],
  ['The Mewar Meenakari Peacock Link Bracelet', 118000, '22K Yellow Gold', '22KT / 916', '18.20 g', 'Hand-Enamelled Peacock Plumes with Polki', 'Artisan Pride'],
  ['The Sapphire Twilight Tennis Bracelet', 205000, '18K White Gold', '18KT / 750', '17.80 g', 'Ceylonese Blue Sapphires & Diamonds', 'Royal Radiance'],
  ['The Delicate Diamond Station Chain Bracelet', 48000, '18K Yellow Gold', '18KT / 750', '6.20 g', 'Bezel-Set Diamonds along Dainty Gold Chain', 'Everyday Shimmer'],
  ['The Amber Palace Cushion Diamond Bracelet', 275000, '18K Rose Gold', '18KT / 750', '21.00 g', '5.00 ct Cushion Diamonds in Vintage Collets', 'High Haute'],
  ['The Traditional Nakshi Coin Bracelet', 95000, '22K Yellow Gold', '22KT / 916', '15.60 g', 'Goddess Lakshmi Coins with Ruby Accents', 'Temple Heritage'],
  ['The Mother of Pearl Rose Gold Cuff', 108000, '18K Rose Gold', '18KT / 750', '15.00 g', 'Iridescent Natural Mother of Pearl with Diamonds', 'Modern Classic'],
  ['The Navratna Vedic Celestial Bracelet', 138000, '22K Yellow Gold', '22KT / 916', '20.50 g', 'Nine Sacred Gemstones with Protective Energy', 'Vedic Harmony'],
  ['The Starlight Diamond Wave Bracelet', 178000, '18K White Gold', '18KT / 750', '16.00 g', 'Fluid S-Curve Diamond Links (2.90 ct)', 'Contemporary'],
  ['The Jaipur Polki Tassel Bracelet', 142000, '22K Yellow Gold', '22KT / 916', '22.40 g', 'Polki Floral Station with Seed Pearl Tassels', 'Festive Glam'],
  ['The Dual Tone Gold Twisted Cable Bracelet', 89000, '18K Yellow & White Gold', '18KT / 750', '13.80 g', 'Helical Cable Design with Diamond End Caps', 'Urban Luxe'],
  ['The Sovereign Grand Emperor Link Bracelet', 290000, '22K Imperial Gold', '22KT / 916', '45.00 g', 'Heavy Solid Gold Sovereign Royal Links', 'Aristocratic Power'],
  ['The Celeste Marquise Diamond Tennis Bracelet', 260000, '950 Platinum', '950 Pt', '19.00 g', 'Graduated Marquise-Cut Solitaires (4.20 ct)', 'Diamond Couture']
];

const pendantCatalog = [
  ['Suryavanshi Radiant Diamond Solitaire Pendant', 62000, '18K Rose Gold', '18KT / 750', '4.20 g', '0.65 ct Round Brilliant Diamonds (VVS, F-G)', 'Spiritual Grace'],
  ['The Shrinathji Divine Golden Locket', 78000, '22K Yellow Gold', '22KT / 916', '9.50 g', 'Hand-Engraved Sacred Shrinathji Iconography', 'Devotional Blessing'],
  ['The Royal Emerald Teardrop Pendant', 115000, '18K Yellow Gold', '18KT / 750', '6.80 g', '1.80 ct Natural Zambian Pear Emerald & Diamonds', 'Precious Heirloom'],
  ['The Sacred Om Diamond Medallion', 54000, '22K Yellow Gold', '22KT / 916', '6.20 g', 'Vedic Om in Micro-Pavé Diamonds', 'Auspicious Energy'],
  ['The Basra Pearl Luminous Solitaire Pendant', 48000, '18K Rose Gold', '18KT / 750', '5.10 g', '10mm Certified Natural Basra Pearl with Halo', 'Timeless Purity'],
  ['The Koh-i-Noor Princess Cut Solitaire Pendant', 95000, '950 Platinum', '950 Pt', '5.40 g', '1.10 ct Ideal Princess Cut VVS1 Solitaire', 'Pure Radiance'],
  ['The Padmavati Ruby & Polki Medallion', 88000, '22K Imperial Gold', '22KT / 916', '8.40 g', 'Burmese Ruby Center with Uncut Polki Petals', 'Royal Rajputana'],
  ['The Celestial Moon & Star Diamond Pendant', 42500, '18K White Gold', '18KT / 750', '3.80 g', 'Crescent Moon with Dangling Diamond Star', 'Dreamy Chic'],
  ['The Temple Lakshmi Gold Coin Pendant', 64000, '22K Yellow Gold', '22KT / 916', '8.80 g', 'Embossed Goddess of Wealth with Ruby Halo', 'Auspicious Fortune'],
  ['The Kashmir Sapphire Oval Halo Pendant', 128000, '950 Platinum', '950 Pt', '6.50 g', '1.60 ct Royal Blue Sapphire with Diamonds', 'Rare Sapphire'],
  ['The Golden Jaali Floral Medallion', 49500, '22K Yellow Gold', '22KT / 916', '6.90 g', 'Laser-Cut Openwork Sacred Geometric Jaali', 'Artisan Craft'],
  ['The Diamond Heart of Nathdwara Pendant', 72000, '18K Rose Gold', '18KT / 750', '5.60 g', 'Heart Silhouette with Double Diamond Halo', 'Romantic Heirloom'],
  ['The Amber Meenakari Peacock Pendant', 58000, '22K Yellow Gold', '22KT / 916', '7.90 g', 'Hand-Painted Enamel Feather with Polki Diamond', 'Vibrant Heritage'],
  ['The Navratna Nine Gem Cosmic Pendant', 76000, '22K Imperial Gold', '22KT / 916', '9.20 g', 'Nine Authentic Vedic Gems in Star Setting', 'Cosmic Harmony'],
  ['The Solitaire Diamond Cross of Light', 68000, '18K White Gold', '18KT / 750', '4.90 g', 'Channel-Set Baguette Diamonds (0.95 ct)', 'Sacred Grace'],
  ['The Shrinathji Lotus Bud Ruby Pendant', 61000, '22K Yellow Gold', '22KT / 916', '7.40 g', 'Carved Ruby Lotus with Gold Petal Collar', 'Temple Devotion'],
  ['The Diamond Baguette Bar Modern Pendant', 52000, '950 Platinum', '950 Pt', '4.40 g', 'Geometric Baguettes in Clean Minimal Drop', 'Modern Architectural'],
  ['The Bikaner Jadau Oval Locket', 92000, '22K Yellow Gold', '22KT / 916', '11.00 g', 'Opening Photo Locket with Floral Polki Front', 'Antique Vintage'],
  ['The Sovereign Golden Sunburst Pendant', 84000, '22K Imperial Gold', '22KT / 916', '10.20 g', 'Radiant Gold Spikes with Diamond Center', 'Solar Majesty'],
  ['The Empress Pear Diamond Solitaire Pendant', 145000, '18K Yellow Gold', '18KT / 750', '6.20 g', '1.50 ct D-Color Flawless Pear Diamond Drop', 'Grand Solitaire']
];

const bridalCatalog = [
  ['The Udaipur Maharani Bridal Set', 680000, '22K Imperial Gold', '22KT / 916', '125.00 g', 'Handcrafted Polki, Mozambique Rubies & Pearls', 'Grand Bridal Masterpiece'],
  ['The Royal Rajwada Sovereign Bridal Trousseau', 950000, '22K Imperial Gold', '22KT / 916', '168.00 g', 'Complete 7-Piece Sovereign Suite with Matha Patti', 'Imperial Royal'],
  ['The Padmavati Kundan Choker & Rani Haar Suite', 820000, '22K Yellow Gold', '22KT / 916', '142.00 g', 'Layered Kundan Collar, Long Haar & Chandbalis', 'Heirloom Trousseau'],
  ['The Noor-e-Nathdwara Diamond Bridal Suite', 1150000, '18K White Gold', '18KT / 750', '110.00 g', '18.50 ct VVS Brilliant Cut Diamond Trousseau', 'Haute Joaillerie'],
  ['The Shrinathji Temple Heritage Bridal Set', 590000, '22K Imperial Gold', '22KT / 916', '118.00 g', 'Sacred Nakshi Chased Gold with Basra Pearls', 'Sacred Blessing'],
  ['The Jodha Bai Emerald Bridal Garland Suite', 890000, '22K Yellow Gold', '22KT / 916', '155.00 g', 'Colombian Emerald Drops with Uncut Polki Diamonds', 'Palace Splendor'],
  ['The Mewar Royal Coronation Bridal Ensemble', 1350000, '22K Imperial Gold', '22KT / 916', '210.00 g', 'Grand Trousseau with Haathphool, Nath & Borla', 'Crown Sovereign'],
  ['The Celeste 950 Platinum Diamond Bridal Suite', 980000, '950 Pure Platinum', '950 Pt', '98.00 g', '15.00 ct Cushion Diamonds in Regal Setting', 'Contemporary Royalty'],
  ['The Bikaner Jadau Meenakari Bridal Set', 740000, '22K Yellow Gold', '22KT / 916', '136.00 g', 'Reversible Traditional Enameling with Syndicate Polki', 'Artisanal Legacy'],
  ['The Amber Palace Rose Gold Bridal Suite', 650000, '18K Rose Gold', '18KT / 750', '105.00 g', 'Sunset Gold with Morganites, Rubies & Diamonds', 'Modern Princess'],
  ['The Devyani Pigeon Blood Ruby Bridal Set', 870000, '22K Imperial Gold', '22KT / 916', '148.00 g', 'Certified Burmese Rubies with Diamond Clusters', 'Crimson Grandeur'],
  ['The Basra Pearl Sovereign 7-Strand Bridal Set', 790000, '22K Yellow Gold', '22KT / 916', '132.00 g', 'Seven Strands of Natural Pearls with Polki Brooches', 'Timeless Pure'],
  ['The Mandir Kasu Mala Temple Bridal Suite', 520000, '22K Yellow Gold', '22KT / 916', '112.00 g', 'Goddess Lakshmi Coins with Grand Choker & Jhumkas', 'South-Indian Splendor'],
  ['The Kohinoor Pear Diamond Haute Bridal Set', 1580000, '18K White Gold', '18KT / 750', '128.00 g', '22.00 ct Cascading Pear Diamonds & Matching Tiara', 'Diamond Legend'],
  ['The Jaipur Pachlada Royal Bridal Garland', 710000, '22K Imperial Gold', '22KT / 916', '130.00 g', 'Five-Layered Royal Garland with Polki Tops', 'Aristocratic Grace'],
  ['The Chandra Moonlit Pearl Bridal Trousseau', 620000, '22K Yellow Gold', '22KT / 916', '115.00 g', 'Lustrous Basra Pearls with Rose-Cut Diamonds', 'Poetic Bridal'],
  ['The Royal Rajputana Guluband Bridal Ensemble', 840000, '22K Imperial Gold', '22KT / 916', '150.00 g', 'Broad Neck Collar with Matching Matha Patti', 'Traditional Royal'],
  ['The Sapphire Twilight Royal Bridal Suite', 920000, '18K White Gold', '18KT / 750', '118.00 g', 'Royal Blue Sapphires with DEF Diamond Halos', 'Majestic Twilight'],
  ['The Sovereign Grand Nizam Bridal Collection', 1850000, '22K Imperial Gold', '22KT / 916', '260.00 g', 'Museum Replica Sovereign Nizam Bridal Set', 'Nizam Masterpiece'],
  ['The Nathdwara Sovereign Eternal Bridal Trousseau', 1980000, '22K Imperial Gold', '22KT / 916', '285.00 g', 'Master Karigar Opus with Certified Polki & Pearls', 'Ultimate Sovereign']
];

// Helper to construct product object with guaranteed unique price
const usedPrices = new Set();

function getUniquePrice(basePrice) {
  let p = basePrice;
  let offset = 250;
  while (usedPrices.has(p)) {
    p = basePrice + offset;
    offset += 250;
  }
  usedPrices.add(p);
  return p;
}

function buildProduct(id, item, photo, category, sizes, descPrefix) {
  const [name, rawPrice, metalType, purity, grossWeight, stoneDetails, tag] = item;
  const price = getUniquePrice(rawPrice);
  const originalPrice = Math.round(price * 1.12);

  return {
    id,
    name,
    category,
    price,
    originalPrice,
    metalType,
    purity,
    grossWeight,
    stoneDetails,
    has3D: true,
    tag,
    images: [
      photo.url
    ],
    sizes,
    description: `Exquisitely handcrafted by Nathdwara master karigars in ${metalType} (${purity}). Adorned with ${stoneDetails}, meticulously finished for royalty and lifelong heirloom brilliance.`,
    inStock: true,
    leadTime: 'Complimentary Insured Delivery in 3–5 Business Days',
    certification: 'BIS 916 Hallmarked & Certified Natural Gems'
  };
}

const products = [];

// 1. Rings (30)
ringCatalog.forEach((item, idx) => {
  const idNum = String(idx + 1).padStart(2, '0');
  const photo = rawData.ring[idx];
  products.push(buildProduct(
    `nj-ring-${idNum}`,
    item,
    photo,
    'Rings',
    ['10', '12', '14', '16', '18', '20'],
    'Ring'
  ));
});

// 2. Necklaces (30)
necklaceCatalog.forEach((item, idx) => {
  const idNum = String(idx + 1).padStart(2, '0');
  const photo = rawData.necklace[idx];
  products.push(buildProduct(
    `nj-necklace-${idNum}`,
    item,
    photo,
    'Necklaces',
    ['16 inches (Choker)', '18 inches (Standard)', '20 inches (Princess)', '24 inches (Rani Haar)'],
    'Necklace'
  ));
});

// 3. Earrings (30)
earringCatalog.forEach((item, idx) => {
  const idNum = String(idx + 1).padStart(2, '0');
  const photo = rawData.earrings[idx];
  products.push(buildProduct(
    `nj-earring-${idNum}`,
    item,
    photo,
    'Earrings',
    ['Standard Post (Push Back)', 'Screw Back (South Indian)', 'Clip-on (Comfort)'],
    'Earrings'
  ));
});

// 4. Bangles (25)
bangleCatalog.forEach((item, idx) => {
  const idNum = String(idx + 1).padStart(2, '0');
  const photo = rawData.bangles[idx];
  products.push(buildProduct(
    `nj-bangle-${idNum}`,
    item,
    photo,
    'Bangles',
    ['2.4 (Small)', '2.6 (Medium)', '2.8 (Large)', '2.10 (Broad)'],
    'Bangles'
  ));
});

// 5. Bracelets (25)
braceletCatalog.forEach((item, idx) => {
  const idNum = String(idx + 1).padStart(2, '0');
  const photo = rawData.bracelet[idx];
  products.push(buildProduct(
    `nj-bracelet-${idNum}`,
    item,
    photo,
    'Bracelets',
    ['6.5 inches (Petite)', '7.0 inches (Standard)', '7.5 inches (Comfort)', '8.0 inches (Relaxed)'],
    'Bracelet'
  ));
});

// 6. Pendants (20)
pendantCatalog.forEach((item, idx) => {
  const idNum = String(idx + 1).padStart(2, '0');
  const photo = rawData.pendant[idx];
  products.push(buildProduct(
    `nj-pendant-${idNum}`,
    item,
    photo,
    'Pendants',
    ['Pendant Only', 'With 18K Gold Chain (16")', 'With 18K Gold Chain (18")'],
    'Pendant'
  ));
});

// 7. Bridal (20)
bridalCatalog.forEach((item, idx) => {
  const idNum = String(idx + 1).padStart(2, '0');
  const photo = rawData.bridal[idx];
  products.push(buildProduct(
    `nj-bridal-${idNum}`,
    item,
    photo,
    'Bridal',
    ['Custom Atelier Tailored', 'Standard Royal Fit (Adjustable Dori)'],
    'Bridal Suite'
  ));
});

// VALIDATIONS
console.log('Total generated products:', products.length);
if (products.length !== 180) {
  throw new Error(`Expected 180 products, got ${products.length}`);
}

const namesSet = new Set(products.map(p => p.name));
console.log('Unique product names:', namesSet.size);
if (namesSet.size !== 180) {
  throw new Error(`Duplicate names found! Unique count: ${namesSet.size}`);
}

const pricesSet = new Set(products.map(p => p.price));
console.log('Unique product prices:', pricesSet.size);
if (pricesSet.size !== 180) {
  // Let's print duplicates if any
  const seen = new Set();
  const dupes = [];
  products.forEach(p => {
    if (seen.has(p.price)) dupes.push(p.price);
    seen.add(p.price);
  });
  console.log('Duplicate prices found:', dupes);
  throw new Error(`Duplicate prices found! Unique count: ${pricesSet.size}`);
}

const imagesSet = new Set(products.map(p => p.images[0]));
console.log('Unique product images:', imagesSet.size);
if (imagesSet.size !== 180) {
  throw new Error(`Duplicate images found! Unique count: ${imagesSet.size}`);
}

const fileContent = `export const FALLBACK_JEWELLERY_IMAGE = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80';

export const CATEGORIES = [
  { id: 'all', name: 'All Masterpieces' },
  { id: 'Rings', name: 'Rings' },
  { id: 'Necklaces', name: 'Necklaces' },
  { id: 'Earrings', name: 'Earrings' },
  { id: 'Bracelets', name: 'Bracelets' },
  { id: 'Bangles', name: 'Bangles' },
  { id: 'Pendants', name: 'Pendants' },
  { id: 'Bridal', name: 'Bridal Jewellery' },
];

export const PRODUCTS = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('src/data/products.js', fileContent, 'utf8');
console.log('SUCCESS! Wrote 180 unique products to src/data/products.js');
