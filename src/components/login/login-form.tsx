import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">欢迎来到图书管理系统</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">用户名</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入用户名"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">密码</Label>
                </div>
                <Input id="password" type="password" placeholder="请输入密码" required />
              </div>
              <div className="flex justify-end">
                 <a
                    href="/forget"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline "
                  >
                   忘记密码
                  </a>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  登录
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              没有账号?{" "}
              <a href="/register" className="underline underline-offset-4">
                点击注册
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
