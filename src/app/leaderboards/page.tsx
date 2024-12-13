import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";

export default async function Page() {
  const scores = await prisma.user.findMany();

  if (!scores) {
    return (
      <main className="w-screen flex justify-center items-center">
        Something went wrong
      </main>
    );
  }

  return (
    <main className="w-screen flex flex-col justify-center items-center px-12 py-10 gap-6">
      <h1 className="text-6xl font-medium">Soldier Strong Leaderboards</h1>
      <Card className="w-3/4">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scores.map((d) => {
                return (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell className="text-right">{d.points}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
