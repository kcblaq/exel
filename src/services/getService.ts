

export async function getServices() {
  const url = process.env.NEXT_PUBLIC_STRAPI_API_URL || "https://tidy-fish-f8bacf1595.strapiapp.com";
  const res = await fetch(`${url}/api/services`, {
    next: { revalidate: 60}
  });
  if (!res.ok) return null;

return res.json();

  
}


// lib/api.ts




export async function getServiceBySlug(slug: string) {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "https://tidy-fish-f8bacf1595.strapiapp.com";



  const res = await fetch(`${API_URL}/api/services/slug/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return null
  }

  const data = await res.json();
  return data.data ?? null;
}
