import fs from 'fs';

// Specific high-quality search queries and strict filters
const categorySpecs = {
  ring: {
    target: 30,
    queries: ['gold ring diamond', 'engagement ring gold', 'solitaire diamond ring', 'wedding band gold', 'vintage gold ring', 'gemstone ring gold'],
    mustHave: /\b(ring|rings|band|bands|solitaire)\b/i,
    mustNotHave: /\b(earring|necklace|bracelet|pendant|bangle|watch|man|men|hat|shoe|fruit|paper|book|flower ornament)\b/i
  },
  necklace: {
    target: 30,
    queries: ['gold necklace', 'diamond necklace', 'gold choker necklace', 'pearl necklace gold', 'indian necklace gold', 'kundan necklace'],
    mustHave: /\b(necklace|necklaces|choker|chokers|collar|chains?)\b/i,
    mustNotHave: /\b(earring|ring|bracelet|bangle|watch|man in black|men|hat|shoe|fruit|paper|book|microphone)\b/i
  },
  earrings: {
    target: 30,
    queries: ['gold earrings', 'diamond earrings', 'jhumka earrings', 'drop earrings gold', 'hoop earrings gold', 'stud earrings diamond', 'chandbali earrings'],
    mustHave: /\b(earring|earrings|jhumka|hoops?|studs?|dangle|dangles)\b/i,
    mustNotHave: /\b(ring|rings|necklace|bracelet|bangle|watch|hat|shoe|fruit|paper|book|camera|controller|ps5|phone|sneaker)\b/i
  },
  bangles: {
    target: 25,
    queries: ['gold bangles indian', 'bangles gold jewelry', 'kada gold jewelry', 'indian traditional bangles', 'gold kada bangles'],
    mustHave: /\b(bangle|bangles|kada|kadas)\b/i,
    mustNotHave: /\b(fruit|rack|textile|earring|necklace|ring|shoes?|phones?|watch|camera|controller)\b/i
  },
  bracelet: {
    target: 25,
    queries: ['gold bracelet', 'diamond tennis bracelet', 'gold chain bracelet', 'cuff bracelet gold', 'charm bracelet gold'],
    mustHave: /\b(bracelet|bracelets|tennis bracelet|cuff)\b/i,
    mustNotHave: /\b(ring|rings|earring|necklace|bangle|watch|shoes?|phones?|camera|controller|fruit|paper)\b/i
  },
  pendant: {
    target: 20,
    queries: ['gold pendant', 'diamond pendant gold', 'locket gold pendant', 'emerald pendant gold', 'cross pendant gold', 'medallion pendant gold'],
    mustHave: /\b(pendant|pendants|locket|lockets|medallion)\b/i,
    mustNotHave: /\b(watch|pocket watch|fish skeleton|baseball|cap|hat|earring|bracelet|ring|shoes?|phones?|camera|controller)\b/i
  },
  bridal: {
    target: 20,
    queries: ['indian bride jewellery', 'indian bridal jewellery gold', 'kundan bridal jewellery', 'royal indian bride gold', 'bridal necklace set'],
    mustHave: /\b(bridal|bride|wedding|kundan|trousseau)\b/i,
    mustNotHave: /\b(microphone|casual|shoes?|phones?|camera|controller|sneaker|jeans|menswear|suit|trousers|floral dress holding)\b/i
  }
};

async function collectCategory(catKey) {
  const spec = categorySpecs[catKey];
  const items = [];
  const seenIds = new Set();

  for (const q of spec.queries) {
    if (items.length >= spec.target + 10) break;
    for (let page = 1; page <= 4; page++) {
      if (items.length >= spec.target + 10) break;
      const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=30&page=${page}`;
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        const photos = data.results || [];

        for (const p of photos) {
          if (items.length >= spec.target + 10) break;
          if (seenIds.has(p.id)) continue;
          seenIds.add(p.id);

          const fullDesc = `${p.alt_description || ''} ${p.description || ''}`;
          if (!spec.mustHave.test(fullDesc)) continue;
          if (spec.mustNotHave.test(fullDesc)) continue;

          const raw = p.urls?.raw || p.urls?.regular;
          if (!raw) continue;
          const cleanUrl = `${raw.split('?')[0]}?auto=format&fit=crop&w=800&q=80`;

          items.push({
            id: p.id,
            alt: p.alt_description || p.description || q,
            url: cleanUrl
          });
        }
      } catch (e) {
        // ignore network error
      }
    }
  }

  console.log(`[${catKey}] Valid candidates: ${items.length} (needed: ${spec.target})`);
  return items;
}

async function verifyUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok && res.status === 200;
  } catch (e) {
    return false;
  }
}

async function run() {
  const finalSet = {};
  const globalUrls = new Set();

  for (const [catKey, spec] of Object.entries(categorySpecs)) {
    const candidates = await collectCategory(catKey);
    finalSet[catKey] = [];

    for (const c of candidates) {
      if (finalSet[catKey].length >= spec.target) break;
      if (globalUrls.has(c.url)) continue;

      // Verify HTTP 200
      const ok = await verifyUrl(c.url);
      if (ok) {
        globalUrls.add(c.url);
        finalSet[catKey].push(c);
      }
    }
    console.log(`[${catKey}] Final confirmed HTTP 200: ${finalSet[catKey].length} / ${spec.target}`);
  }

  console.log(`Total 100% verified unique images across all categories: ${globalUrls.size}`);
  fs.writeFileSync('final-180-images.json', JSON.stringify(finalSet, null, 2));
}

run();
