import StoryDisplay from "@/components/StoryDisplay";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  try {
    const storyId = searchParams.storyId || '66f1172e-fd98-43ed-b75b-5f6246ba3f67';
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/story/${storyId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const stories = await response.json();

    return (
      <main className="min-h-screen bg-background">
        {(stories.chapters && stories.chapters.length > 0) ? (
          <StoryDisplay stories={stories.chapters} />
        ) : (
          <p className="text-center text-muted-foreground">No stories found</p>
        )}
      </main>
    );
  } catch (error) {
    console.error('Error fetching stories:', error);
    return (
      <main className="min-h-screen bg-background">
        <p className="text-center text-red-500">Failed to load stories</p>
      </main>
    );
  }
}

export default Page;
