import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PlusCircle } from "lucide-react";

interface Story {
  _id: string;
  story_id: string;
  background: string;
  created_at: string;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

async function Page() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/story`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const stories = await response.json() as Story[];

    return (
      <main className="min-h-screen bg-background p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Lantern Codex</h1>
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          {stories.length > 0 ? (
            stories.map((story) => (
              <Link key={story._id} href={`/story/${story.story_id}`}>
                <Card className="hover:bg-primary/5 transition-all duration-200 cursor-pointer h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl line-clamp-2">{story.background}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {formatDate(story.created_at)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full">
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground text-center mb-4">No stories available yet</p>
                  <Link href="/story/new">
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Your First Story
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching stories:', error);
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-8">Lantern Codex</h1>
          <Card className="max-w-md mx-auto bg-destructive/10">
            <CardContent className="flex flex-col items-center py-6">
              <p className="text-destructive text-center mb-4">Failed to load stories</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }
}

export default Page;
