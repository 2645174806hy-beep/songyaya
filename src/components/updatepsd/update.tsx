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

export function UpdateForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-[390px]">
       
        <CardContent>
          <form>
            <div className="flex flex-col gap-6 ">
              <div className="grid gap-3">
                <Label htmlFor="email">新密码</Label>
                <Input
                  id="email"
                  type="password"
                  placeholder="请输入新密码"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">确认密码</Label>
                </div>
                <Input id="password" type="password" placeholder="请输入确认密码" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  保存
                </Button>
              </div>
            </div>
           
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
