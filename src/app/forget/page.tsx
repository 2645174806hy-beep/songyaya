import { LoginForm } from "@/components/login/login-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
         <Card>
       
        <CardContent>
       <div className="grid gap-3">
                <Label htmlFor="email">新密码</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入密码"
                  required
                />
              </div>
       <div className="flex flex-col gap-6 mt-4">
  <Button type="submit" className="w-full">
    提交
  </Button>
</div>
    </CardContent>
    </Card>
    </div>
  )
}
