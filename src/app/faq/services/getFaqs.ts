export async function getFaqs() {
  const url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
//   const url = "https://tidy-fish-f8bacf1595.strapiapp.com";
//   console.log("URL...", url)
  const res = await fetch(`${url}/api/faqs`, {
    next: { revalidate: 60}
  });

  if (!res.ok) return null;
const data = await  res.json()
return data.data;

  
}
