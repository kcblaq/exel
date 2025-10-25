export async function getPosts() {
  const url = process.env.NEXT_PUBLIC_STRAPI_API_URL || "https://tidy-fish-f8bacf1595.strapiapp.com";

  const res = await fetch(`${url}/api/posts`, {
    next: { revalidate: 60}
  });
  if (!res.ok) return null;

return res.json();

  
}


export async function getPostBySlug(slug: string) {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  
  const res = await fetch(`${API_URL}/api/posts/slug/${slug}`, {
    next: { revalidate: 60 },
  });
console.log("FULL URLL", `${API_URL}/api/posts/slug/${slug}`)
  if (!res.ok) {
    return null
  }

  const data = await res.json();
  return data.data ?? null;
}