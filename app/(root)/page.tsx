import StartupCard, { StartupCardType } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

// app/page.tsx
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query
  const params = {search:query || null}
  // const posts = await client.fetch(STARTUPS_QUERY)
  const {data:posts} = await sanityFetch({query:STARTUPS_QUERY,params})
  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1, name: "Danish" },
  //     _id: 1,
  //     description: "A deep dive into humanity's relationship with AI in a futuristic dystopia.",
  //     image: "https://images.unsplash.com/photo-1634912314704-c646c586b131?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
  //     category: "Robots",
  //     title: "We Robots",
  //   },
  //   {
  //     _createdAt: new Date(),
  //     views: 120,
  //     author: { _id: 2, name: "Yuki" },
  //     _id: 2,
  //     description: "Exploring the hidden meanings and emotions in Your Name.",
  //     image: "https://images.unsplash.com/photo-1604212902034-39d2d46e1e9f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
  //     category: "Anime",
  //     title: "Why 'Your Name' Still Hurts",
  //   },
  //   {
  //     _createdAt: new Date(),
  //     views: 89,
  //     author: { _id: 3, name: "Ken" },
  //     _id: 3,
  //     description: "Naruto's journey from zero to hero inspires millions. Here's how.",
  //     image: "https://images.unsplash.com/photo-1632553487545-87bb7d1ecb7e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
  //     category: "Anime",
  //     title: "Lessons from Naruto Uzumaki",
  //   },
  //   {
  //     _createdAt: new Date(),
  //     views: 210,
  //     author: { _id: 4, name: "Ava" },
  //     _id: 4,
  //     description: "The legacy of Skyrim and why it's still one of the greatest RPGs ever made.",
  //     image: "https://images.unsplash.com/photo-1606312611702-67e5057fe5b1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
  //     category: "PC Games",
  //     title: "Skyrim: A Timeless Classic",
  //   },
  //   {
  //     _createdAt: new Date(),
  //     views: 145,
  //     author: { _id: 5, name: "Zara" },
  //     _id: 5,
  //     description: "How Elden Ring redefined open-world storytelling in gaming.",
  //     image: "https://images.unsplash.com/photo-1615761595124-87c0b7bfc155?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
  //     category: "PC Games",
  //     title: "Elden Ring: The Modern Masterpiece",
  //   },
  //   {
  //     _createdAt: new Date(),
  //     views: 78,
  //     author: { _id: 6, name: "Shinji" },
  //     _id: 6,
  //     description: "Attack on Titan’s final season is an emotional rollercoaster. Here's why.",
  //     image: "https://images.unsplash.com/photo-1637026269113-b95ae2b06269?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
  //     category: "Anime",
  //     title: "The Fall of Titans",
  //   },
  // ];
  
  
  return < >
    <section className="pink_container" >
      <h1 className="heading" >Pitch your startup connect with entrepreneurs</h1>
      <p className="sub-heading !max-w-3xl" >Submit Ideas, Vote on Pitches, and Get Noticed in Virtual</p>

      <SearchForm query={query} />
    </section>
    <section className="section_container" >
      <p className="text-30-bold" >
        {query ? `Search result for "${query}"` : "All Startups"}
      </p>
        <ul className="mt-7 card_grid" >
          {
            posts.length > 0 ? (
              posts.map((post:StartupCardType)=>(
                 <StartupCard key={post?._id} post={post} />
              ))
            ):(
              <p className="no-result"></p>
            )
          }
        </ul>
    </section>

<SanityLive/>
  </>;
}