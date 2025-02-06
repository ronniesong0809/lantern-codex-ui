import Typewriter from "@/components/Typewriter";

async function Page() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/story`);
  const stories = await response.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {stories.length > 0 ? (
        <div className="w-full">
          <div className="space-y-4">
            {stories.map((story: any, index: number) => (
              <div key={`story-${story._id || index}`} className="p-4 border rounded-lg dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-bold dark:text-white">{story.title}</h3>
                <Typewriter text={story.content} />
                <div className="flex flex-col gap-2">
                  {story.options.map((option: any, optIndex: number) => (
                    <button key={`option-${option._id || optIndex}`} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="dark:text-white">No stories found</p>
      )}
    </div>
  );
}

export default Page;
