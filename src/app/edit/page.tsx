import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function Page() {
  const scores = await prisma.user.findMany();

  return (
    <main className="w-screen flex flex-col px-8 py-6">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add score</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a score</DialogTitle>
              <DialogDescription>
                Input the score and it will automatically update on the
                leaderboards
              </DialogDescription>
            </DialogHeader>
            <form
              className="flex flex-col gap-4"
              action={async (data: FormData) => {
                "use server";
                const name = data.get("name")?.toString();
                const score = data.get("score")?.toString();

                if (!name || !score) {
                  return;
                }

                const points = parseInt(score);

                await prisma.user.create({ data: { name, points } });

                revalidatePath("/edit");
              }}
            >
              <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input type="text" name="name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Score</Label>
                <Input type="number" name="score" />
              </div>
              <Button>Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-5 px-8 gap-4">
        {scores.map((score) => {
          return (
            <Card key={score.id}>
              <CardHeader>
                <CardTitle>{score.name}</CardTitle>
                <CardDescription>Points: {score.points}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
