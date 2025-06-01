import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RootPage() {
  return (
    <main className=" h-dvh w-dvw flex justify-center-safe items-center-safe p-4">
      <Card className=" w-full max-w-sm border-none">
        <CardHeader>
          <CardTitle className=" text-xl">Terry&Perry</CardTitle>
          <CardDescription>Login your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="jhon"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
            <Button type="submit" className="w-full mt-5">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}