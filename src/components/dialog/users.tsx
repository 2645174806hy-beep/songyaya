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
    <div className={cn("flex flex-col gap-6", className)}>
      <h1 className="text-left text-2xl font-bold">修改操作</h1>
          <form>
           
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">用户名<Input
                  id="email"
                  type="email"
                  required /></Label>
              </div>
              
            </div>
            <div className="grid gap-3">
              
                  <Label htmlFor="password">密码&nbsp;&nbsp;<Input id="password" type="password" required /></Label>
               
                
              </div>   
          </form>
    </div>
  )
}
