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

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
//获取全部图书
async function getArray() {
  return await fetch('api/dashboard', { method: 'POST' }).then(res => res.json())
}
// 删除图书
async function deleteBook(id: string) {

  const res = await fetch('api/dashboard', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
  if (!res.ok) throw new Error('删除失败')
  return res.json()
}
// 搜索
async function searchBook(searchParams: string) {
  return await fetch('api/dashboard?searchParams=' + searchParams).then(res => res.json())
}
// 新增图书
async function addBook(book: any) {
  return await fetch('api/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  }).then(res => res.json())
}
// 修改图书
async function updateBook(book: any) {
  return await fetch('api/add', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  }).then(res => res.json())
}
export default function TableDemo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSearchTerm, setActiveSearchTerm] = useState("") // 用于存储实际搜索的词
  const [isDialogOpen, setIsDialogOpen] = useState(false) // 添加这一行
  const [editingBook, setEditingBook] = useState<any>(null)
  const [newBook, setNewBook] = useState({
    invoice: "",
    name: "",
    price: "",
    total: ""
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setNewBook(prev => ({
      ...prev,
      [id]: id === "name" || id === "invoice" ? value : Number(value)
    }))
  }


  const queryClient = useQueryClient()
  // 获取数据
  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ['todos', activeSearchTerm],
    queryFn: () => activeSearchTerm ? searchBook(activeSearchTerm) : getArray(),
  })
  // 删除操作
  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  const handleDelete = (id: string) => {
    if (confirm('确定要删除这本书吗？')) {
      deleteMutation.mutate(id)
    }
  }
  // 搜索操作
  // 处理搜索按钮点击
  const handleSearchClick = () => {
    setActiveSearchTerm(searchTerm) // 设置实际搜索词，触发useQuery重新获取数据
  }

  // 处理清除搜索
  const handleClearSearch = () => {
    setSearchTerm("")
    setActiveSearchTerm("")
  }
  // 新增操作
  const addMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setIsDialogOpen(false)
      setNewBook({
        invoice: "",
        name: "",
        price: "",
        total: ""
      })
    },
  })
  const updateMutation = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setIsDialogOpen(false)
      setEditingBook(null)
      setNewBook({
        invoice: "",
        name: "",
        price: "",
        total: ""
      })
    },
  })
  const handleEdit = (book: any) => {
    setEditingBook(book)
    setNewBook({
      invoice: book.invoice,
      name: book.name,
      price: book.price,
      total: book.total
    })
    setIsDialogOpen(true)
  }
  // 处理保存
  const handleSave = () => {
    // 验证必填字段
    if (!newBook.invoice || !newBook.name) {
      alert("请填写序号和书名")
      return
    }

    // 根据是否有 editingBook 来判断是更新还是新增
    if (editingBook) {
      // 编辑模式 - 包含 ID
      updateMutation.mutate({
        ...newBook,
        id: editingBook.id
      })
    } else {
      // 新增模式
      addMutation.mutate(newBook)
    }
  }
  if (isLoading) return <div>加载中...</div>
  if (error) return <div>加载失败: {error.message}</div>

  return (
    <>
      {/* 搜索栏 */}

      <div className="w-full flex justify-center mt-4 ">
        <div className="w-[30%] flex items-center mx-auto">
          <input
            type="text"
            placeholder="请输入书名"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-l px-4 py-2 w-[60%] h-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />&nbsp;

          <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Button onClick={handleSearchClick}>搜索</Button>&nbsp;&nbsp;
          </div>
          {activeSearchTerm && (
            <div className="flex flex-wrap items-center gap-2 md:flex-row">
              <Button onClick={handleClearSearch}>清除</Button>
            </div>
          )}
        </div>
      </div>
      {/* 新增按钮 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">新增图书</Button>
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
                  value={newBook.invoice}
                  onChange={handleInputChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">
                  书名
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={newBook.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">
                  价格
                </Label>
                <Input
                  id="price"
                  type="number"
                  className="col-span-3"
                  value={newBook.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="total">
                  数量
                </Label>
                <Input
                  id="total"
                  type="number"
                  className="col-span-3"
                  value={newBook.total}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" >取消</Button>
              </DialogClose>
              <DialogClose asChild>
              <Button type="submit" onClick={() => handleSave()} disabled={addMutation.isPending}>保存</Button>
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
            <TableHead>书名</TableHead>
            <TableHead>价格</TableHead>
            <TableHead className="text-right">数量</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices?.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.name}</TableCell>
              <TableCell>{invoice.price}</TableCell>
              <TableCell className="text-right">{invoice.total}</TableCell>
              <TableCell className="text-right">
                <Button onClick={() => handleEdit(invoice)}>修改</Button>&nbsp;&nbsp;&nbsp;
                <Button onClick={() => handleDelete(invoice.id)} disabled={deleteMutation.isPending} variant="destructive">删除</Button>
              </TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>

        </TableFooter>
      </Table>
    </>
  )
}
