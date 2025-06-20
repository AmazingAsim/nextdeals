export async function GET() {
  const urls = [
    {
      loc: 'https://www.dealsfromamerica.com/',
      lastmod: '2025-06-20T09:52:29+00:00',
      priority: '1.00',
    },
    {
      loc: 'https://www.dealsfromamerica.com/feedback',
      lastmod: '2025-06-20T09:52:29+00:00',
      priority: '0.80',
    },
    {
      loc: 'https://www.dealsfromamerica.com/suggestions',
      lastmod: '2025-06-20T09:52:29+00:00',
      priority: '0.80',
    },
    {
      loc: 'https://www.dealsfromamerica.com/category/fashion',
      lastmod: '2025-06-20T09:52:29+00:00',
      priority: '0.80',
    },
    {
      loc: 'https://www.dealsfromamerica.com/category/electronics',
      lastmod: '2025-06-20T09:52:29+00:00',
      priority: '0.80',
    },
    {
      loc: 'https://www.dealsfromamerica.com/category/books',
      lastmod: '2025-06-20T09:52:29+00:00',
      priority: '0.80',
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${urls
    .map(
      ({ loc, lastmod, priority }) => `
    <url>
      <loc>${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <priority>${priority}</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
