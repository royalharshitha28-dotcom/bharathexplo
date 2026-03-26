import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get('q') || '';
    if (!query.trim()) {
        return NextResponse.json({ results: [] });
    }

    const allResults: any[] = [];
    
    // Smart query translation for common Indian food ambiguities
    let refinedQuery = query.toLowerCase().trim();
    if (refinedQuery === 'kova') refinedQuery = 'khoya khoa';
    
    const unsplashQuery = `${refinedQuery} food dish`;
    const wikiQuery = `${refinedQuery} indian food`;

    // 1. Fetch from Unsplash NAPI
    try {
        console.log(`Searching Unsplash for: ${unsplashQuery}`);
        const unsplashRes = await fetch(
            `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(unsplashQuery)}&per_page=12`,
            { 
              headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Referer': 'https://unsplash.com/s/photos/food',
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9',
              } 
            }
        );
        console.log(`Unsplash Status: ${unsplashRes.status}`);
        if (unsplashRes.ok) {
            const data = await unsplashRes.json();
            console.log(`Unsplash Results: ${data.results?.length || 0}`);
            if (data.results) {
                for (const item of data.results) {
                    allResults.push({
                        id: item.id,
                        url: item.urls?.regular || item.urls?.small,
                        title: item.description || item.alt_description || `${query} dish`,
                        source: `Unsplash (${item.user?.name || 'Unknown'})`,
                    });
                }
            }
        }
    } catch (e) {
        console.error('Unsplash fetch error:', e);
    }

    // 2. Fetch from Wikipedia with better params
    try {
        console.log(`Searching Wikipedia for: ${wikiQuery}`);
        const wikiRes = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|extracts&exintro=1&explaintext=1&generator=search&gsrsearch=${encodeURIComponent(wikiQuery)}&gsrlimit=10&pithumbsize=800&origin=*`,
            { headers: { 'User-Agent': 'Mozilla/5.0 (BharatExplorer/1.0; mailto:info@bharatexplorer.com)' } }
        );
        console.log(`Wikipedia Status: ${wikiRes.status}`);
        if (wikiRes.ok) {
            const data = await wikiRes.json();
                const pages = Object.values(data.query.pages) as any[];
                console.log(`Wikipedia Pages Found: ${pages.length}`);
                for (const page of pages) {
                    if (page.thumbnail && page.thumbnail.source) {
                        allResults.push({
                            id: `wiki_${page.pageid}`,
                            url: page.thumbnail.source,
                            title: page.title,
                            description: page.extract,
                            source: 'Wikipedia Commons',
                        });
                    }
                }
        }
    } catch (e) {
        console.error('Wikipedia fetch error:', e);
    }

    // 3. Last Fallback: Wikimedia Commons direct search if very few results
    if (allResults.length < 3) {
        try {
            const fallbackQuery = `filetype:bitmap ${refinedQuery} food`;
            console.log(`Fallback: Searching Commons for: ${fallbackQuery}`);
            const commonsRes = await fetch(
                `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(fallbackQuery)}&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=800&origin=*`,
                { headers: { 'User-Agent': 'Mozilla/5.0 (BharatExplorer/1.0)' } }
            );
            if (commonsRes.ok) {
                const data = await commonsRes.json();
                if (data.query && data.query.pages) {
                    const pages = Object.values(data.query.pages) as any[];
                    for (const page of pages) {
                        if (page.imageinfo && page.imageinfo[0]) {
                            allResults.push({
                                id: `commons_${page.pageid}`,
                                url: page.imageinfo[0].url || page.imageinfo[0].thumburl,
                                title: page.title.replace('File:', '').replace(/\.\w+$/, ''),
                                source: 'Wikimedia Commons',
                            });
                        }
                    }
                }
            }
        } catch (e) {}
    }

    console.log(`Total Merged Results: ${allResults.length}`);
    return NextResponse.json({ results: allResults.slice(0, 15) });
}
