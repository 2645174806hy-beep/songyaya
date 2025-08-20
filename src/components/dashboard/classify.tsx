"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
// tableDEMO2上面指定api
// 获取全部数据
async function getArray() {
  return await fetch('api/classify', { method: 'GET' }).then(res => res.json())
}
// 
export default function TableDemo2() {
  // 声明和管理多个组件的状态变量
const [isDialogOpen, setIsDialogOpen] = useState(false);
  // 调用接口函数从后端获取数据
  const { data: classList} = useQuery({
    queryKey: ['todos'],
    queryFn: getArray,
  })

  return (

    <>
      <div className="w-full flex justify-center mt-4 ">
        <div className="w-[30%] flex items-center mx-auto">
          <input
            type="text"
            placeholder="请输入类型名"
            className="border rounded-l px-4 py-2 w-[60%] h-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />&nbsp;
           <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Button >搜索</Button>&nbsp;&nbsp;
          </div>
        </div>
      </div>
      {/* 新增按钮 */}
      <Dialog >
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">新增</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>图书管理</DialogTitle>
              <DialogDescription>
                请输入相关信息
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="invoice">序号</Label>
                <Input
                  id="invoice"
                  className="col-span-3"
                  />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">
                  类名
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">
                  描述
                </Label>
                <Input
                  id="price"
                  type="number"
                  className="col-span-3"
                  />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" >取消</Button>
              </DialogClose>
              <DialogClose asChild>
              <Button type="submit">保存</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      {/* // 表格 */}
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">序号</TableHead>
            <TableHead>类名</TableHead>
            <TableHead>描述</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classList?.map((invoice) => (
            <TableRow key={invoice.number}>
              <TableCell className="font-medium">{invoice.number}</TableCell>
              <TableCell>{invoice.name}</TableCell>
              <TableCell>{invoice.describe}</TableCell>
              <TableCell className="text-right">
                <Button >修改</Button>&nbsp;&nbsp;&nbsp;
                <Button variant="destructive">删除</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>

        </TableFooter>
      </Table>
    </>
  )
}
