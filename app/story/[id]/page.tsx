import StoryDisplay from "@/components/StoryDisplay";
import { StoryResponse, StoryNode, StoryOption } from "@/types/story";

type Params = Promise<{ id: string }>

function processStoryOption(option: StoryOption): StoryOption {
  return {
    text: option.text,
    nextId: option.nextId,
  };
}

async function Page(props: { params: Params }) {
  try {
    const params = await props.params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/story/${params.id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const storiesResponse: StoryResponse = await response.json();
    const stories = storiesResponse.chapters.map(chapter => {
      const processedChapter = {
        ...chapter,
        options: chapter.options.map(processStoryOption)
      };

      return processedChapter as StoryNode;
    });

    return (
      <main className="min-h-screen bg-background">
        {stories.length > 0 ? (
          <StoryDisplay stories={stories} />
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