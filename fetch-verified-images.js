import fs from 'fs';

const categories = {
  ring: {
    target: 30,
    queries: ['gold ring jewelry', 'diamond ring', 'solitaire ring', 'gemstone ring jewelry', 'wedding ring jewelry', 'vintage ring gold'],
    includeKeywords: ['ring', 'band', 'solitaire', 'diamond', 'jewel', 'gem'],
    excludeKeywords: ['phone', 'shoe', 'shirt', 'pant', 'watch', 'camera', 'electronic', 'controller', 'sneaker', 'laptop', 'headphone']
  },
  necklace: {
    target: 30,
    queries: ['gold necklace jewelry', 'diamond necklace', 'pearl necklace jewelry', 'choker necklace jewelry', 'pendant necklace', 'chain necklace gold'],
    includeKeywords: ['necklace', 'choker', 'collar', 'chain', 'jewel', 'pendant', 'pearl'],
    excludeKeywords: ['phone', 'shoe', 'shirt', 'pant', 'watch', 'camera', 'electronic', 'controller', 'sneaker', 'laptop', 'headphone']
  },
  earrings: {
    target: 30,
    queries: ['earrings jewelry', 'gold earrings jewelry', 'diamond earrings', 'drop earrings jewelry', 'hoop earrings jewelry', 'stud earrings jewelry', 'dangle earrings jewelry'],
    includeKeywords: ['earring', 'earrings', 'stud', 'hoop', 'jhumka', 'dangle', 'drop'],
    excludeKeywords: ['phone', 'shoe', 'shirt', 'pant', 'watch', 'camera', 'electronic', 'controller', 'sneaker', 'laptop', 'headphone', 'ring', 'bracelet', 'clothes']
  },
  bangles: {
    target: 25,
    queries: ['gold bangles jewelry', 'indian bangles jewelry', 'kada jewelry gold', 'bangles traditional jewelry', 'cuff bangle gold jewelry'],
    includeKeywords: ['bangle', 'bangles', 'kada', 'kadas', 'armlet', 'wristlet', 'bracelet', 'jewel'],
    excludeKeywords: ['phone', 'shoe', 'shirt', 'pant', 'watch', 'camera', 'electronic', 'controller', 'sneaker', 'laptop', 'headphone', 'jeans', 'clothes']
  },
  bracelet: {
    target: 25,
    queries: ['gold bracelet jewelry', 'diamond bracelet jewelry', 'tennis bracelet jewelry', 'charm bracelet gold', 'cuff bracelet jewelry', 'chain bracelet gold'],
    includeKeywords: ['bracelet', 'cuff', 'bangle', 'wrist', 'chain', 'jewel'],
    excludeKeywords: ['phone', 'shoe', 'shirt', 'pant', 'camera', 'electronic', 'controller', 'sneaker', 'laptop', 'headphone', 'jeans', 'clothes']
  },
  pendant: {
    target: 20,
    queries: ['gold pendant jewelry', 'diamond pendant jewelry', 'medallion pendant gold', 'locket jewelry gold', 'emerald pendant gold'],
    includeKeywords: ['pendant', 'locket', 'medallion', 'charm', 'necklace', 'jewel'],
    excludeKeywords: ['phone', 'shoe', 'shirt', 'pant', 'watch', 'camera', 'electronic', 'controller', 'sneaker', 'laptop', 'headphone', 'jeans', 'clothes']
  },
  bridal: {
    target: 20,
    queries: ['indian bridal jewellery set', 'indian bride gold jewellery', 'kundan jewellery bridal', 'royal indian wedding jewellery', 'bridal necklace set gold', 'indian bride jewelry necklace'],
    includeKeywords: ['bridal', 'bride', 'necklace', 'jewellery', 'jewelry', 'kundan', 'wedding', 'gold', 'queen', 'indian'],
    excludeKeywords: ['phone', 'shoe', 'shirt', 'pant', 'shoes', 'camera', 'electronic', 'controller', 'sneaker', 'laptop', 'headphone', 'jeans', 'menswear', 'suit', 'outfit']
  }
};

async function searchCategory(catKey) {
  const cat = categories[catKey];
  const results = [];
  const seenIds = new Set();

  for (const q of cat.queries) {
    for (let page = 1; page <= 4; page++) {
      if (results.length >= cat.target + 15) break;
      const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=25&page=${page}`;
      try {
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        if (!res.ok) continue;
        const data = await res.json();
        const photos = data.results || [];

        for (const p of photos) {
          if (seenIds.has(p.id)) continue;
          seenIds.add(p.id);

          const desc = `${p.alt_description || ''} ${p.description || ''}`.toLowerCase();
          
          // Check excludes
          const hasExclude = cat.excludeKeywords.some(w => desc.includes(w));
          if (hasExclude) continue;

          // For earrings, ensure it mentions earring or studs or hoops or drops
          if (catKey === 'earrings') {
            const hasEarringWord = ['earring', 'earrings', 'stud', 'hoop', 'jhumka', 'dangle', 'drop'].some(w => desc.includes(w));
            if (!hasEarringWord) continue;
          }

          const imgUrl = `${p.urls.raw.split('?')[0]}?auto=format&fit=crop&w=800&q=80`;
          results.push({
            id: p.id,
            desc: desc.slice(0, 100),
            url: imgUrl
          });

          if (results.length >= cat.target + 15) break;
        }
      } catch (err) {
        console.error(`Error querying ${q}:`, err.message);
      }
    }
  }

  console.log(`Found ${results.length} valid images for ${catKey}`);
  return results;
}

async function run() {
  const allData = {};
  for (const key of Object.keys(categories)) {
    console.log(`Searching for category: ${key}...`);
    allData[key] = await searchCategory(key);
  }

  fs.writeFileSync('./verified-images-raw.json', JSON.stringify(allData, null, 2));
  console.log('Saved to verified-images-raw.json');
}

run();
