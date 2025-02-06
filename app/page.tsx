import StoryDisplay from "@/components/StoryDisplay";

async function Page() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/story`);
  const stories = await response.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {stories.length > 0 ? (
        <div className="w-full">
          <StoryDisplay stories={stories} />
        </div>
      ) : (
        <p className="dark:text-white">No stories found</p>
      )}
    </div>
  );
}

export default Page;
