import { getCollections, getPages, getProducts } from '@/lib/shopify';
import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap: MetadataRoute.Sitemap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  try {
    const [collections, products, pages] = await Promise.all([
      getCollections(),
      getProducts({}),
      getPages(),
    ]);

    const fetchedRoutes = [
      ...collections.map((collection) => ({
        url: `${baseUrl}${collection.path}`,
        lastModified: collection.updatedAt,
      })),
      ...products.map((product) => ({
        url: `${baseUrl}/product/${product.handle}`,
        lastModified: product.updatedAt,
      })),
      ...pages.map((page) => ({
        url: `${baseUrl}/${page.handle}`,
        lastModified: page.updatedAt,
      })),
    ];

    return [...routesMap, ...fetchedRoutes];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return routesMap; // Return at least the base routes if fetching fails
  }
}
