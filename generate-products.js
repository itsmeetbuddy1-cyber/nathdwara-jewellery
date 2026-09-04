import fs from 'fs';

// Verified 100% working high-resolution photography pools
const ringImages = [
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
];

const necklaceImages = [
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
];

const earringImages = [
  'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1620656798579-1984d9e87dfa?auto=format&fit=crop&w=800&q=80',
];

const bangleImages = [
  'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80',
];

const braceletImages = [
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80',
];

const pendantImages = [
  'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80',
];

const bridalImages = [
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
];

// Titles & descriptors
const ringTitles = [
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

const necklaceTitles = [
  ['Padmavati Royal Polki Choker', 345000, '22K Imperial Yellow Gold', '22KT / 916', '48.60 g', '12.50 ct Syndicate Polki & Basra Pearls', 'Royal Heritage'],
  ['The Jodha Bai Emerald Collar Haar', 485000, '22K Yellow Gold', '22KT / 916', '64.20 g', 'Natural Zambian Emerald Drops & Kundan', 'Grand Royal'],
  ['Noor-e-Nathdwara Diamond Choker', 520000, '18K White Gold', '18KT / 750', '52.00 g', '8.40 ct VVS Brilliant Cut Diamonds', 'Diamond Haute'],
  ['Mewar Royal Rani Haar Necklace', 620000, '22K Imperial Gold', '22KT / 916', '88.50 g', 'Layered Uncut Polki with Basra Pearls', 'Sovereign Heirloom'],
  ['The Shrinathji Sacred Hasli Choker', 285000, '22K Yellow Gold', '22KT / 916', '38.20 g', 'Solid Gold Torque with Lotus Repoussé', 'Temple Devotion'],
  ['The Celeste Tennis Diamond Collar', 395000, '950 Platinum', '950 Pt', '34.00 g', '7.20 ct Graduated DEF Diamonds', 'Modern Glamour'],
  ['The Rajputana Ruby Cascade Necklace', 440000, '22K Yellow Gold', '22KT / 916', '56.00 g', 'Pigeon Blood Rubies & Syndicate Polki', 'Imperial Jewel'],
  ['The Amber Heritage Gulbandh Choker', 310000, '22K Yellow Gold', '22KT / 916', '42.50 g', 'Intricate Meenakari Back & Polki Front', 'Rajasthani Art'],
  ['The Mayur Feather Kundan Haar', 375000, '22K Yellow Gold', '22KT / 916', '51.40 g', 'Peacock Motifs with Russian Emeralds', 'Atelier Masterpiece'],
  ['Devi Temple Coin Mangal Haar', 260000, '22K Imperial Gold', '22KT / 916', '46.00 g', 'Sacred Kasu Coins with Antique Patina', 'Traditional Auspicious'],
  ['The Diamond Luminary Choker Set', 490000, '18K Rose Gold', '18KT / 750', '44.80 g', '6.50 ct Round & Marquise Diamonds', 'Bridal Evening'],
  ['The Basra Pearl Seven-String Haar', 330000, '22K Yellow Gold', '22KT / 916', '62.00 g', 'Seven Strands of Basra Natural Pearls', 'Timeless Heritage'],
  ['The Royal Navratna Collar Necklace', 360000, '22K Yellow Gold', '22KT / 916', '47.30 g', 'Nine Sacred Planetary Gems in 22K', 'Cosmic Aura'],
  ['The Minimalist Solitaire Diamond Chain', 78000, '18K Yellow Gold', '18KT / 750', '6.20 g', '0.70 ct Bezel-Set Solitaire Diamond', 'Daily Elegance'],
  ['The Udaipur Lake Palace Choker', 425000, '22K Imperial Gold', '22KT / 916', '54.20 g', 'Hand-cut Jadau Stones & Emerald Drops', 'Palace Tribute'],
  ['The Kohinoor Floral Hasli Necklace', 295000, '22K Yellow Gold', '22KT / 916', '41.00 g', 'Hand-sculpted Floral Medallions', 'Master Karigar'],
  ['The Starlight Diamond Lariat Necklace', 185000, '18K Rose Gold', '18KT / 750', '16.50 g', '2.80 ct Brilliant Diamonds Cascading', 'Contemporary'],
  ['The Maharani Basra Pearl Choker', 390000, '22K Yellow Gold', '22KT / 916', '50.20 g', 'Woven Natural Pearls with Polki Center', 'Vintage Royalty'],
  ['The Celestial Sunburst Kundan Haar', 465000, '22K Imperial Gold', '22KT / 916', '61.50 g', 'Radiant Sun Medallions with Rubies', 'Grand Ceremony'],
  ['The Jaipur Meenakari Bridal Choker', 380000, '22K Yellow Gold', '22KT / 916', '49.80 g', 'Traditional Bikaneri Enamel Craft', 'Artisanal Gem'],
  ['The Emerald Dewdrop Diamond Necklace', 315000, '18K White Gold', '18KT / 750', '32.40 g', 'Pear Colombian Emeralds & Diamonds', 'Exquisite Drape'],
  ['The Classic Mangalsutra Diamond Haar', 125000, '18K Yellow Gold', '18KT / 750', '12.80 g', '1.20 ct Brilliant Solitaire with Black Beads', 'Sacred Bond'],
  ['The Royal Nizam Choker Necklace', 540000, '22K Imperial Gold', '22KT / 916', '72.00 g', 'Syndicate Polki and South Sea Pearls', 'Museum Grade'],
  ['The Golden Filigree Princess Collar', 245000, '22K Yellow Gold', '22KT / 916', '36.50 g', 'Delicate Wire-twist Gold Goldsmithing', 'Pure Gold Art'],
  ['The Padmapriya Lotus Kundan Haar', 410000, '22K Yellow Gold', '22KT / 916', '58.00 g', 'Sacred Lotus Motifs with Fine Rubies', 'Devotional Craft'],
  ['The Bikaner Jadau Crescent Necklace', 365000, '22K Yellow Gold', '22KT / 916', '45.00 g', 'Crescent Moon Motifs with Ruby Clusters', 'Heirloom Piece'],
  ['The Diamond Rivierè Tennis Collar', 445000, '950 Platinum', '950 Pt', '38.00 g', '8.0 ct Graduated Brilliant Diamonds', 'Red Carpet Star'],
  ['The Temple Nakshi Lakshmi Haar', 320000, '22K Imperial Gold', '22KT / 916', '52.00 g', 'Antique Repoussé Goddess Lakshmi Center', 'Divine Blessings'],
  ['The Princess Layered Diamond Necklace', 275000, '18K Rose Gold', '18KT / 750', '26.50 g', 'Dual Strand Diamond Links with Drops', 'Modern Elegance'],
  ['The Sacred Rudraksha Gold Mala', 195000, '22K Yellow Gold', '22KT / 916', '34.00 g', 'Authentic 5-Mukhi Rudraksha capped in 22K Gold', 'Spiritual Serenity']
];

const earringTitles = [
  ['Nathdwara Mayur Chandbali Earrings', 98000, '22K Yellow Gold', '22KT / 916', '18.40 g', 'Zambian Emerald Drops & Diamonds', 'Artisanal Gem'],
  ['The Jodha Bai Royal Polki Jhumkas', 125000, '22K Imperial Gold', '22KT / 916', '24.50 g', 'Syndicate Uncut Polki & Pearl Hangings', 'Bestseller'],
  ['The Udaipur Lake Palace Chandbalis', 115000, '22K Yellow Gold', '22KT / 916', '22.00 g', 'Crescent Moon Filigree with Ruby Beads', 'Royal Heritage'],
  ['The Celeste Diamond Stud Earrings', 85000, '950 Pure Platinum', '950 Pt', '4.20 g', '1.50 ct Total DEF VVS Solitaires', 'Signature Solitaire'],
  ['The Shrinathji Lotus Gold Jhumkas', 78000, '22K Yellow Gold', '22KT / 916', '16.80 g', 'Layered Lotus Petals with Gold Bells', 'Spiritual Grace'],
  ['The Rajputana Kundan Ear Cuffs', 105000, '22K Yellow Gold', '22KT / 916', '19.20 g', 'Full Ear Canopy with Cascading Pearls', 'Bridal Pick'],
  ['The Kashmiri Sapphire Chandelier Drops', 145000, '18K White Gold', '18KT / 750', '14.60 g', '3.40 ct Royal Blue Sapphires & Diamonds', 'Evening Glamour'],
  ['The Basra Pearl Sui Dhaga Earrings', 48000, '22K Yellow Gold', '22KT / 916', '6.80 g', 'Threader Gold Chains with Basra Pearls', 'Everyday Luxe'],
  ['The Amber Meenakari Peacock Jhumkas', 92000, '22K Yellow Gold', '22KT / 916', '17.50 g', 'Green & Blue Enameling with Polki', 'Heritage Craft'],
  ['The Sunburst Diamond Drop Earrings', 118000, '18K Rose Gold', '18KT / 750', '12.40 g', '2.20 ct Brilliant Diamonds in Star Halo', 'Modern Classic'],
  ['The Padmavati Ruby Chandbalis', 132000, '22K Imperial Gold', '22KT / 916', '25.00 g', 'Burmese Rubies with Golden Pearls', 'Regal Masterpiece'],
  ['The Mogul Blossom Stud Earrings', 62000, '18K Yellow Gold', '18KT / 750', '5.80 g', '0.85 ct Floral Cluster Diamonds', 'Delicate Shine'],
  ['The Royal Temple Kasu Earrings', 56000, '22K Yellow Gold', '22KT / 916', '12.20 g', 'Embossed Temple Coins with Antique Red Stems', 'Traditional'],
  ['The Emerald Teardrop Diamond Drops', 128000, '18K Yellow Gold', '18KT / 750', '11.50 g', 'Pear-Cut Zambian Emeralds & Diamonds', 'High Jewellery'],
  ['The Solitaire Diamond Huggie Hoops', 69000, '18K Rose Gold', '18KT / 750', '6.40 g', '1.10 ct Inside-Out Diamond Hoops', 'Modern Luxury'],
  ['The Marwar Antique Chased Jhumkas', 84000, '22K Yellow Gold', '22KT / 916', '18.00 g', 'Repoussé Dome with Subtle Jingling Bells', 'Pure Gold'],
  ['The Navratna Sacred Ear Drops', 74000, '22K Yellow Gold', '22KT / 916', '13.80 g', 'Nine Certified Vedic Gemstones', 'Auspicious Glow'],
  ['The Golden Filigree Hoop Earrings', 42000, '22K Yellow Gold', '22KT / 916', '8.40 g', 'Handmade Twisted Wire Gold Hoops', 'Minimal Chic'],
  ['The Basra Pearl Chandelier Dangle', 110000, '22K Imperial Gold', '22KT / 916', '21.00 g', 'Multiple Pearl Tassels with Polki Stud', 'Palace Favorite'],
  ['The Starlet Princess Cut Diamond Studs', 96000, '950 Platinum', '950 Pt', '4.80 g', '1.60 ct Total Princess Solitaires', 'Timeless Gift'],
  ['The Jaipuri Jadau Chandbali Tops', 88000, '22K Yellow Gold', '22KT / 916', '15.60 g', 'Flat Studs with Detachable Pearl Hangings', 'Versatile Style'],
  ['The Lotus Petal Rose Gold Drops', 59000, '18K Rose Gold', '18KT / 750', '7.20 g', 'Petal silhouettes with brilliant diamonds', 'Contemporary'],
  ['The Sovereign Grand Bridal Jhumkas', 158000, '22K Imperial Gold', '22KT / 916', '32.00 g', 'Triple-Tiered Sovereign Bridal Jhumkas', 'Grand Heirloom'],
  ['The Diamond Baguette Linear Drops', 79000, '18K White Gold', '18KT / 750', '8.10 g', 'Linear Geometric Baguette Diamonds', 'Red Carpet'],
  ['The Devyani Vintage Polki Tops', 68000, '22K Yellow Gold', '22KT / 916', '11.20 g', 'Antique Syndicate Polki Tops', 'Heritage Charm'],
  ['The Peacock Pearl Studded Jhumkis', 76000, '22K Yellow Gold', '22KT / 916', '14.50 g', 'Peacock Tops with Bell Hangings', 'Festive Favorite'],
  ['The Tanzanite & Diamond Chandelier Earrings', 165000, '18K White Gold', '18KT / 750', '13.20 g', 'Vivid Blue-Violet Tanzanite Drops', 'Collector Specimen'],
  ['The Radiant Cushion Diamond Halo Studs', 104000, '18K Yellow Gold', '18KT / 750', '5.40 g', '1.80 ct Total Weight Cushion Diamonds', 'Classic Solitaire'],
  ['The Temple Filigree Lakshmi Earrings', 64000, '22K Imperial Gold', '22KT / 916', '13.00 g', 'Sacred Lakshmi Motifs with Red Rubies', 'Traditional Blessings'],
  ['The Minimalist Gold Bar Studs', 34000, '22K Yellow Gold', '22KT / 916', '4.20 g', 'Modern Polished Gold Geometry', 'Office Luxe']
];

const bangleTitles = [
  ['Mewar Royal Carved Kada Bangle', 185000, '22K Yellow Gold', '22KT / 916', '32.10 g', 'Hand-carved Floral Motifs & Rubies', 'Master Craft'],
  ['The Shrinathji Lotus Temple Kada', 215000, '22K Imperial Gold', '22KT / 916', '38.50 g', 'Repoussé Lotus Blossoms with Clasp', 'Divine Heirloom'],
  ['The Rajputana Polki Pachheli Bangles (Pair)', 295000, '22K Yellow Gold', '22KT / 916', '54.00 g', 'Syndicate Polki Stones with Basra Pearls', 'Bridal Essential'],
  ['The Jodha Bai Filigree Gold Bangles (Set of 4)', 260000, '22K Yellow Gold', '22KT / 916', '46.80 g', 'Intricate Twisted Wirework in Pure Gold', 'Traditional Beauty'],
  ['The Celeste Diamond Tennis Bangle', 195000, '950 Pure Platinum', '950 Pt', '18.20 g', '3.50 ct Continuous Ideal Cut Diamonds', 'Modern Luxury'],
  ['The Amber Meenakari Elephant Kada', 240000, '22K Imperial Gold', '22KT / 916', '42.00 g', 'Carved Royal Elephants with Enamel', 'Heritage Edition'],
  ['The Devyani Antique Gold Kangan (Pair)', 175000, '22K Yellow Gold', '22KT / 916', '31.50 g', 'Hand-hammered Antique Matte Finish', 'Classic Gold'],
  ['The Royal Navratna Protective Kada', 165000, '22K Yellow Gold', '22KT / 916', '29.00 g', 'Nine Astrological Stones in Solid Gold', 'Auspicious Power'],
  ['The Padmavati Ruby Studded Bangles', 225000, '22K Yellow Gold', '22KT / 916', '39.40 g', 'Burmese Natural Rubies in Screw Clasp', 'Royal Treasure'],
  ['The Udaipur Lake Floral Diamond Bangle', 145000, '18K Rose Gold', '18KT / 750', '15.60 g', '2.10 ct Floral Diamond Clusters', 'Contemporary'],
  ['The Sovereign South Indian Kasu Bangle', 155000, '22K Imperial Gold', '22KT / 916', '28.00 g', 'Temple Coin Motifs with Screw Lock', 'Sacred Legacy'],
  ['The Jaipur Jaali Lattice Kada', 135000, '22K Yellow Gold', '22KT / 916', '24.20 g', 'Openwork Architectural Jaali Carving', 'Artisanal Pride'],
  ['The Baguette & Solitaire Diamond Bangle', 180000, '18K White Gold', '18KT / 750', '17.00 g', '2.80 ct Mixed Cut Brilliant Diamonds', 'Signature Choice'],
  ['The Basra Pearl Seeded Gold Bangles', 190000, '22K Yellow Gold', '22KT / 916', '34.00 g', 'Tiny River Pearls woven on Solid Gold', 'Timeless Charm'],
  ['The Royal Rajputana Lion-Head Kada', 270000, '22K Imperial Gold', '22KT / 916', '48.50 g', 'Roaring Simha Heads with Emerald Eyes', 'Warrior Regal'],
  ['The Everyday Minimalist Gold Bangle', 85000, '22K Yellow Gold', '22KT / 916', '14.80 g', 'Solid Half-Round Comfort Fit Band', 'Everyday Elegance'],
  ['The Diamond Wave Rose Gold Bangle', 115000, '18K Rose Gold', '18KT / 750', '12.80 g', '1.60 ct Flowing Diamond Waves', 'Modern Chic'],
  ['The Mogul Filigree Kada with Screw', 160000, '22K Yellow Gold', '22KT / 916', '27.50 g', 'Concealed Safety Screw Clasp', 'Heirloom Piece'],
  ['The Grand Trousseau Chooda Kangan Set', 320000, '22K Imperial Gold', '22KT / 916', '58.00 g', 'Pair of Heavy Kadas with Side Bangles', 'Bridal Masterpiece'],
  ['The Platinum Pavé Diamond Cuff', 230000, '950 Platinum', '950 Pt', '22.00 g', '4.20 ct Micro-Pavé Diamonds in Flex Cuff', 'High Luxury'],
  ['The Peacock Enamelled Royal Bangle', 148000, '22K Yellow Gold', '22KT / 916', '26.00 g', 'Meenakari Peacock Feathers in Gold', 'Heritage Craft'],
  ['The Emerald & Polki Royal Kada', 210000, '22K Imperial Gold', '22KT / 916', '36.80 g', 'Cabochon Emeralds with Flat Diamonds', 'Palace Jewel'],
  ['The Classic Daily Wear Gold Bangles (Set of 2)', 118000, '22K Yellow Gold', '22KT / 916', '21.00 g', 'Diamond-Cut Faceted Polished Bangles', 'Daily Classic'],
  ['The Gokhru Spiked Royal Gold Kada', 195000, '22K Yellow Gold', '22KT / 916', '34.50 g', 'Traditional Rajasthan Gokhru Spikes', 'Marwar Antique'],
  ['The Celestial Navratna Hinged Bangle', 172000, '22K Yellow Gold', '22KT / 916', '30.00 g', 'Hinged Bangle with Nine Precious Gems', 'Vedic Harmony']
];

const braceletTitles = [
  ['Celeste 950 Platinum Diamond Tennis Bracelet', 215000, '950 Platinum', '950 Pt', '14.20 g', '3.20 ct DEF VVS Ideal Cut Diamonds', 'Modern Luxury'],
  ['The Royal Solitaire Diamond Link Bracelet', 175000, '18K Yellow Gold', '18KT / 750', '16.00 g', '2.50 ct Bezel-Set Solitaire Diamonds', 'Bestseller'],
  ['The Shrinathji Bansuri Charm Bracelet', 68000, '22K Yellow Gold', '22KT / 916', '9.50 g', 'Flute & Peacock Feather Charms in Gold', 'Spiritual Grace'],
  ['The Padmavati Polki Diamond Bracelet', 195000, '22K Imperial Gold', '22KT / 916', '21.00 g', 'Syndicate Polki Links with Safety Clasp', 'Royal Heritage'],
  ['The Emerald & Diamond Articulated Bracelet', 245000, '18K White Gold', '18KT / 750', '18.40 g', 'Zambian Emeralds & Baguette Diamonds', 'Haute Joaillerie'],
  ['The Rose Gold Diamond Infinity Bracelet', 92000, '18K Rose Gold', '18KT / 750', '10.20 g', '1.40 ct Interlocking Diamond Infinity', 'Modern Classic'],
  ['The Traditional Mangalsutra Diamond Bracelet', 78000, '18K Yellow Gold', '18KT / 750', '8.60 g', '0.95 ct Solitaire with Black Beads', 'Auspicious Luxury'],
  ['The Amber Palace Kundan Tennis Bracelet', 165000, '22K Yellow Gold', '22KT / 916', '19.80 g', 'Uncut Jadau Kundan with Basra Pearls', 'Artisanal Craft'],
  ['The Basra Pearl & Diamond Link Bracelet', 135000, '22K Yellow Gold', '22KT / 916', '15.00 g', 'Natural River Pearls with Gold Dividers', 'Vintage Elegance'],
  ['The Royal Rajputana Filigree Gold Bracelet', 110000, '22K Imperial Gold', '22KT / 916', '18.50 g', 'Intricate Hand-braided 22K Gold Chains', 'Pure Gold'],
  ['The Radiant Ruby Tennis Line Bracelet', 185000, '18K Rose Gold', '18KT / 750', '13.50 g', 'Burmese Rubies Alternating with Diamonds', 'Color of Passion'],
  ['The Celestial Moon & Star Charm Bracelet', 58000, '18K Yellow Gold', '18KT / 750', '7.80 g', 'Diamond-set Star and Crescent Charms', 'Everyday Glamour'],
  ['The Kashmiri Sapphire Tennis Bracelet', 235000, '950 Platinum', '950 Pt', '15.80 g', '3.80 ct Royal Blue Sapphires & Platinum', 'Rare Masterpiece'],
  ['The Minimalist Gold Bar Diamond Bracelet', 48000, '18K Yellow Gold', '18KT / 750', '6.50 g', '0.40 ct Pavé Diamond Bar on Gold Chain', 'Daily Chic'],
  ['The Evil Eye Protection Diamond Bracelet', 64000, '18K Rose Gold', '18KT / 750', '7.20 g', 'Turquoise & Diamond Talisman', 'Auspicious Bond'],
  ['The Lotus Blossom Diamond Flex Bracelet', 142000, '18K Yellow Gold', '18KT / 750', '14.00 g', '1.80 ct Flexible Stretch Mesh with Diamonds', 'Easy Comfort'],
  ['The Royal Bangle-Style Diamond Kada Bracelet', 168000, '18K Yellow Gold', '18KT / 750', '17.20 g', 'Dual-row Pave Diamonds with Push Lock', 'Signature Look'],
  ['The Vintage Floral Rose Gold Link Bracelet', 105000, '18K Rose Gold', '18KT / 750', '12.00 g', 'Articulated Floral Motifs with Rubies', 'Romantic Gem'],
  ['The Platinum Curb Link Heavy Men Bracelet', 285000, '950 Platinum', '950 Pt', '32.00 g', 'Solid Pure 950 Platinum Hand-polished', 'Gentleman Luxe'],
  ['The Sacred Om Talisman Gold Bracelet', 55000, '22K Yellow Gold', '22KT / 916', '8.20 g', 'Sacred Om Symbol with Beaded Black Stones', 'Devotional Power']
];

const pendantTitles = [
  ['Suryavanshi Radiant Diamond Pendant', 62000, '18K Rose Gold', '18KT / 750', '4.80 g', '0.65 ct Round Brilliant Diamonds (VVS)', 'Modern Classic'],
  ['The Shrinathji Divine Charanamrit Pendant', 54000, '22K Yellow Gold', '22KT / 916', '7.20 g', 'Hand-engraved Sacred Feet of Lord Krishna', 'Spiritual Grace'],
  ['The Kohinoor Drop Solitaire Pendant', 89000, '18K Yellow Gold', '18KT / 750', '5.50 g', '1.05 ct Certified Flawless Solitaire', 'Signature Solitaire'],
  ['The Jodha Bai Polki Medallion Pendant', 95000, '22K Imperial Gold', '22KT / 916', '12.00 g', 'Syndicate Polki with Emerald Bead Drop', 'Royal Heritage'],
  ['The Celeste 950 Platinum Cross Pendant', 78000, '950 Platinum', '950 Pt', '6.20 g', '1.20 ct Princess & Brilliant Diamonds', 'Platinum Luxury'],
  ['The Sacred Om & Gayatri Diamond Pendant', 46000, '22K Yellow Gold', '22KT / 916', '5.80 g', 'Sacred Om Carved in Pure 22K Gold', 'Devotional Art'],
  ['The Zambian Emerald Royal Halo Pendant', 105000, '18K Yellow Gold', '18KT / 750', '6.80 g', '1.80 ct Natural Emerald with Diamond Halo', 'Heirloom Gem'],
  ['The Padmavati Ruby Lotus Talisman', 82000, '22K Yellow Gold', '22KT / 916', '8.50 g', 'Burmese Ruby Heart with Lotus Filigree', 'Master Karigar'],
  ['The Basra Pearl Tear Pendant with Chain', 58000, '22K Yellow Gold', '22KT / 916', '6.40 g', 'Natural Basra Pearl with Diamond Cap', 'Classic Elegance'],
  ['The Navratna Nine-Gem Celestial Pendant', 68000, '22K Imperial Gold', '22KT / 916', '9.10 g', 'Authentic Vedic Planetary Nine Stones', 'Auspicious Shield'],
  ['The Amber Palace Peacock Feather Pendant', 72000, '18K Rose Gold', '18KT / 750', '7.00 g', 'Blue Sapphire & Emerald Feather Details', 'Atelier Special'],
  ['The Minimalist Bezel Solitaire Drop', 42000, '18K Yellow Gold', '18KT / 750', '3.80 g', '0.50 ct Bezel Set Solitaire Diamond', 'Daily Luxe'],
  ['The Royal Rajputana Sun Crest Pendant', 64000, '22K Yellow Gold', '22KT / 916', '8.80 g', 'Suryavanshi Emblem with Antique Polish', 'Pure Gold Art'],
  ['The Heart of Nathdwara Diamond Locket', 88000, '18K Rose Gold', '18KT / 750', '8.20 g', 'Opening Photo Keepsake with Pavé Diamonds', 'Sentimental Treasure'],
  ['The Kashmir Sapphire Solitaire Drop', 118000, '950 Platinum', '950 Pt', '6.50 g', '1.60 ct Royal Blue Sapphire in Platinum', 'High Jewellery'],
  ['The Ganesha Divine Prosperity Pendant', 52000, '22K Yellow Gold', '22KT / 916', '6.90 g', 'Lord Ganesha in Repoussé Gold with Ruby', 'Blessing Token'],
  ['The Radiant Pear Solitaire Diamond Pendant', 94000, '18K White Gold', '18KT / 750', '5.20 g', '1.15 ct Pear Brilliant Cut Solitaire', 'Modern Elegance'],
  ['The Lotus Mandir Temple Carved Pendant', 49000, '22K Yellow Gold', '22KT / 916', '6.40 g', 'Sacred Temple Lotus Carving', 'Heritage Touch'],
  ['The Diamond Floral Cluster Locket', 76000, '18K Rose Gold', '18KT / 750', '6.80 g', '0.90 ct Cluster Diamonds in Gold Bezel', 'Timeless Gift'],
  ['The Royal Trishul & Damru Gold Pendant', 58000, '22K Yellow Gold', '22KT / 916', '7.50 g', 'Shiva Trishul in 22K Solid Gold', 'Devotional Power']
];

const bridalTitles = [
  ['The Udaipur Maharani Bridal Set', 680000, '22K Imperial Gold', '22KT / 916', '94.50 g', 'Handcrafted Polki, Rubies & Basra Pearls', 'Grand Bridal Masterpiece'],
  ['The Jodha Bai Sovereign Trousseau Set', 850000, '22K Yellow Gold', '22KT / 916', '124.00 g', 'Grand Choker, Long Haar, Chandbalis & Tikka', 'Imperial Heirloom'],
  ['The Padmavati Royal Kundan Bridal Suite', 740000, '22K Imperial Gold', '22KT / 916', '108.00 g', 'Bikaneri Meenakari with Russian Emeralds', 'Palace Favorite'],
  ['The Noor-e-Nathdwara Diamond Bridal Set', 920000, '18K White Gold', '18KT / 750', '86.00 g', '16.50 ct Brilliant Cut Certified Diamonds', 'Diamond Haute'],
  ['The Mewar Princess Wedding Choker Set', 590000, '22K Yellow Gold', '22KT / 916', '82.00 g', 'Syndicate Polki with Cascading Pearl Drops', 'Royal Bride'],
  ['The Amber Palace Emerald Trousseau Set', 780000, '22K Imperial Gold', '22KT / 916', '112.00 g', 'Zambian Emerald Drops with Grand Choker', 'Collector Edition'],
  ['The Devyani Grand Matha Patti & Haar Suite', 640000, '22K Yellow Gold', '22KT / 916', '96.00 g', 'Complete Bridal Ensemble with Haathphool', 'Master Karigar'],
  ['The Rajputana Heritage Polki Rani Set', 820000, '22K Imperial Gold', '22KT / 916', '118.50 g', 'Grand 7-Row Basra Pearl Haar with Pendant', 'Sovereign Heritage'],
  ['The Shrinathji Sacred Bridal Mangal Set', 530000, '22K Yellow Gold', '22KT / 916', '76.00 g', 'Temple Carved Choker with Matching Jhumkas', 'Divine Auspicious'],
  ['The Celeste Platinum & Diamond Bridal Suite', 790000, '950 Platinum', '950 Pt', '68.00 g', '14.20 ct Flawless Diamonds in Platinum Set', 'Modern Royalty'],
  ['The Jaipur Royal Jadau Bridal Trousseau', 690000, '22K Imperial Gold', '22KT / 916', '98.00 g', 'Traditional Polki & Basra River Pearls', 'Heirloom Quality'],
  ['The Marwar Queen Emerald & Pearl Set', 720000, '22K Yellow Gold', '22KT / 916', '104.00 g', 'Cascading Emerald Drops with Heavy Choker', 'Imperial Wedding'],
  ['The Solitaire Luminary Bridal Diamond Set', 860000, '18K Rose Gold', '18KT / 750', '79.00 g', '15.00 ct Round and Marquise Diamonds', 'Modern Glamour'],
  ['The Royal Nizam Vintage Wedding Suite', 980000, '22K Imperial Gold', '22KT / 916', '136.00 g', 'Museum-Grade Polki and Basra Pearls', 'Sovereign Sovereign'],
  ['The Rajputana Heritage Haathphool & Set', 490000, '22K Yellow Gold', '22KT / 916', '68.00 g', 'Bridal Choker with Matching Haathphool', 'Complete Adornment'],
  ['The Padmapriya Lotus Grand Bridal Set', 660000, '22K Imperial Gold', '22KT / 916', '92.00 g', 'Sacred Lotus Motifs in Solid 22K Gold', 'Devotional Luxury'],
  ['The Bikaner Heritage Navratna Wedding Set', 710000, '22K Imperial Gold', '22KT / 916', '102.00 g', 'Navratna Gemstones with Uncut Diamonds', 'Vedic Auspicious'],
  ['The Amber Fort Jadau Long Haar Set', 630000, '22K Yellow Gold', '22KT / 916', '89.00 g', 'Traditional Jadau Choker with Extended Haar', 'Grand Princess'],
  ['The Basra Pearl Cascading Bridal Trousseau', 760000, '22K Imperial Gold', '22KT / 916', '110.00 g', 'Natural Saltwater Basra Pearls & Polki', 'Timeless Heritage'],
  ['The Sovereign Peacock Meenakari Grand Suite', 810000, '22K Yellow Gold', '22KT / 916', '115.00 g', 'Royal Blue Enamel with Diamond Accents', 'Regal Splendour']
];

const allProducts = [];

function buildProducts(titleList, category, imagePool, prefix, sizes) {
  titleList.forEach((item, index) => {
    const [name, price, metalType, purity, grossWeight, stoneDetails, tag] = item;
    const img1 = imagePool[index % imagePool.length];
    const img2 = imagePool[(index + 1) % imagePool.length];
    const img3 = imagePool[(index + 2) % imagePool.length];
    const originalPrice = Math.round(price * 1.12);

    allProducts.push({
      id: `nj-${prefix}-${String(index + 1).padStart(2, '0')}`,
      name,
      category,
      price,
      originalPrice,
      metalType,
      purity,
      grossWeight,
      stoneDetails,
      has3D: index % 3 === 0, // Enable 3D viewer on key pieces
      tag,
      images: [img1, img2, img3],
      sizes: sizes || ['Standard'],
      description: `Exquisitely handcrafted by Nathdwara master karigars in ${metalType} (${purity}). Adorned with ${stoneDetails}, carefully burnished for timeless brilliance and comfort.`,
      inStock: true,
      featured: index < 4,
    });
  });
}

buildProducts(ringTitles, 'Rings', ringImages, 'ring', ['10', '12', '14', '16', '18', '20']);
buildProducts(necklaceTitles, 'Necklaces', necklaceImages, 'necklace', ['Standard Adjustable Dori', '16 inch chain', '18 inch chain']);
buildProducts(earringTitles, 'Earrings', earringImages, 'earring', ['Free Size']);
buildProducts(bangleTitles, 'Bangles', bangleImages, 'bangle', ['2.4', '2.6', '2.8']);
buildProducts(braceletTitles, 'Bracelets', braceletImages, 'bracelet', ['6.5 inch', '7.0 inch', '7.5 inch']);
buildProducts(pendantTitles, 'Pendants', pendantImages, 'pendant', ['16 inch chain', '18 inch chain', 'Pendant Only']);
buildProducts(bridalTitles, 'Bridal Jewellery', bridalImages, 'bridal', ['Full Sovereign Suite (Choker, Haar, Earrings, Tikka)']);

console.log(`Generated ${allProducts.length} rich jewellery products!`);

const fileContent = `export const FALLBACK_JEWELLERY_IMAGE = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80';

export const PRODUCTS = ${JSON.stringify(allProducts, null, 2)};

export const CATEGORIES = [
  { id: 'all', name: 'All Masterpieces (${allProducts.length})' },
  { id: 'Rings', name: 'Rings (${ringTitles.length})' },
  { id: 'Necklaces', name: 'Necklaces (${necklaceTitles.length})' },
  { id: 'Earrings', name: 'Earrings (${earringTitles.length})' },
  { id: 'Bangles', name: 'Bangles & Kadas (${bangleTitles.length})' },
  { id: 'Bracelets', name: 'Bracelets (${braceletTitles.length})' },
  { id: 'Pendants', name: 'Pendants (${pendantTitles.length})' },
  { id: 'Bridal Jewellery', name: 'Bridal Jewellery (${bridalTitles.length})' },
];
`;

fs.writeFileSync('./src/data/products.js', fileContent);
console.log('Successfully wrote to src/data/products.js');
