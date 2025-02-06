import StoryDisplay from "@/components/StoryDisplay";

async function Page() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/story`);
  const stories = await response.json();

  return (
    <main className="container mx-auto p-4 min-h-screen">
      {stories.length > 0 ? (
        <StoryDisplay stories={stories} />
      ) : (
        <p className="text-center text-muted-foreground">No stories found</p>
      )}
    </main>
  );
}

export default Page;
