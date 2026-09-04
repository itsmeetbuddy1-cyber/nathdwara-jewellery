import fs from 'fs';

const categoriesConfig = {
  ring: {
    target: 30,
    queries: ['gold ring', 'diamond ring', 'wedding ring', 'solitaire ring', 'vintage ring jewelry', 'gemstone ring', 'emerald ring', 'ruby ring'],
    includeRegex: /\brings?\b|\bsolitaire\b|\bbands?\b/i,
    excludeRegex: /\bearrings?\b|\bbracelets?\b|\bnecklaces?\b|\bshoes?\b|\bphones?\b|\bwatches?\b|\bcontrollers?\b|\bheadset\b|\blaptops?\b/i
  },
  necklace: {
    target: 30,
    queries: ['gold necklace', 'diamond necklace', 'choker necklace', 'pearl necklace', 'collar necklace jewelry', 'chain necklace gold', 'emerald necklace', 'ruby necklace'],
    includeRegex: /\bnecklaces?\b|\bchokers?\b|\bcollars?\b|\bpendant necklace\b|\bchains?\b/i,
    excludeRegex: /\bearrings?\b|\bbracelets?\b|\brings?\b|\bshoes?\b|\bphones?\b|\bwatches?\b|\bcontrollers?\b|\bheadset\b/i
  },
  earrings: {
    target: 30,
    queries: ['earrings', 'gold earrings', 'diamond earrings', 'drop earrings', 'hoop earrings', 'jhumka earrings', 'pearl earrings', 'vintage earrings', 'stud earrings'],
    includeRegex: /\bearrings?\b|\bhoops?\b|\bstuds?\b|\bjhumka\b|\bdangles?\b|\bear drop\b/i,
    excludeRegex: /\brings?\b|\bbracelets?\b|\bnecklaces?\b|\bshoes?\b|\bphones?\b|\bwatches?\b|\bcrown\b|\bcamera\b|\bcontrollers?\b|\bjeans\b|\bsneakers?\b/i
  },
  bangles: {
    target: 25,
    queries: ['gold bangles', 'indian bangles', 'bangles jewelry', 'kada jewelry', 'gold bangle', 'cuff bangles gold'],
    includeRegex: /\bbangles?\b|\bkada\b|\bkadas\b|\barmlets?\b|\bwristlets?\b/i,
    excludeRegex: /\bearrings?\b|\brings?\b|\bnecklaces?\b|\bshoes?\b|\bphones?\b|\bwatches?\b|\bcamera\b|\bcontrollers?\b|\bjeans\b/i
  },
  bracelet: {
    target: 25,
    queries: ['gold bracelet', 'diamond bracelet', 'tennis bracelet', 'charm bracelet', 'cuff bracelet jewelry', 'chain bracelet gold'],
    includeRegex: /\bbracelets?\b|\bcuffs?\b|\btennis bracelet\b/i,
    excludeRegex: /\bearrings?\b|\bnecklaces?\b|\bshoes?\b|\bphones?\b|\bwatches?\b|\bcamera\b|\bcontrollers?\b|\bjeans\b/i
  },
  pendant: {
    target: 20,
    queries: ['gold pendant', 'diamond pendant', 'medallion pendant gold', 'locket jewelry', 'emerald pendant', 'necklace pendant gold'],
    includeRegex: /\bpendants?\b|\blockets?\b|\bmedallions?\b/i,
    excludeRegex: /\bearrings?\b|\bbracelets?\b|\bshoes?\b|\bphones?\b|\bwatches?\b|\bcamera\b|\bcontrollers?\b|\bjeans\b/i
  },
  bridal: {
    target: 20,
    queries: ['indian bride jewelry', 'indian bridal jewellery', 'kundan bridal', 'bridal necklace gold', 'traditional indian bride', 'wedding jewellery indian'],
    includeRegex: /\bbridal\b|\bbride\b|\bwedding\b|\bkundan\b|\btrousseau\b|\bjewellery\b|\bjewelry\b/i,
    excludeRegex: /\bshoes?\b|\bphones?\b|\bwatches?\b|\bcamera\b|\bcontrollers?\b|\bjeans\b|\bmenswear\b|\bsneakers?\b|\bcasual\b|\btrousers?\b|\bshirt\b/i
  }
};

async function fetchCategory(key, cfg) {
  const collected = [];
  const seenIds = new Set();

  for (const q of cfg.queries) {
    if (collected.length >= cfg.target) break;
    for (let page = 1; page <= 3; page++) {
      if (collected.length >= cfg.target) break;
      const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=30&page=${page}`;
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        const photos = data.results || [];

        for (const p of photos) {
          if (collected.length >= cfg.target) break;
          if (seenIds.has(p.id)) continue;
          seenIds.add(p.id);

          const alt = (p.alt_description || '').toLowerCase();
          const desc = (p.description || '').toLowerCase();
          const fullText = `${alt} ${desc}`;

          // Strict filter
          const isMatch = cfg.includeRegex.test(fullText);
          const isBad = cfg.excludeRegex.test(fullText);

          if (isMatch && !isBad) {
            const rawUrl = p.urls?.raw || p.urls?.regular;
            if (!rawUrl) continue;
            const cleanUrl = `${rawUrl.split('?')[0]}?auto=format&fit=crop&w=800&q=80`;
            collected.push({
              id: p.id,
              alt: p.alt_description || p.description || key,
              url: cleanUrl
            });
          }
        }
      } catch (err) {
        console.error(`Error with ${q} p${page}:`, err.message);
      }
    }
  }

  console.log(`[${key.toUpperCase()}] collected ${collected.length} / ${cfg.target}`);
  return collected;
}

async function main() {
  const result = {};
  const globalSeenUrls = new Set();

  for (const [key, cfg] of Object.entries(categoriesConfig)) {
    const list = await fetchCategory(key, cfg);
    // Deduplicate against other categories
    result[key] = [];
    for (const item of list) {
      if (!globalSeenUrls.has(item.url)) {
        globalSeenUrls.add(item.url);
        result[key].push(item);
      }
    }
    console.log(`[${key}] unique total: ${result[key].length}`);
  }

  console.log('Total globally unique images collected:', globalSeenUrls.size);
  fs.writeFileSync('collected-clean-images.json', JSON.stringify(result, null, 2));
}

main();
