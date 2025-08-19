"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription
} from "@radix-ui/react-dialog"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { SetStateAction, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
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

      <div className="w-full flex justify-center mt-4 bg-blue-50">
        <div className="w-[30%] flex items-center mx-auto">
          <input
            type="text"
            placeholder="请输入书名"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-l px-4 py-2 w-[60%] h-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearchClick}
            className="bg-orange-400 text-white h-8 px-4 rounded-r hover:bg-orange-600"
          >
            搜索
          </button>
          {activeSearchTerm && (
            <button
              onClick={handleClearSearch}
              className="bg-gray-400 text-white h-8 px-4 ml-2 rounded hover:bg-gray-600"
            >
              清除
            </button>
          )}
        </div>
      </div>
      {/* 新增按钮 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="bg-blue-500 text-white h-8 px-4 rounded hover:bg-blue-600 w-[100px]">
            新增
          </button>
        </DialogTrigger>
        <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
          <DialogTitle className="text-lg font-medium">新增图书</DialogTitle>
          <DialogDescription>
            请填写图书信息
          </DialogDescription>
          <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="invoice">
                序号
              </Label>
              <Input
                id="invoice"
                className="col-span-3"
                value={newBook.invoice}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
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
            <div className="grid grid-cols-4 items-center gap-4">
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
            <div className="grid grid-cols-4 items-center gap-4">
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
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => handleSave()} disabled={addMutation.isPending}>
              保存
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* // 表格 */}
      <div className="flex justify-center w-full bg-white py-15 px-4 rounded-lg shadow-xl p-6">
        <div className="flex justify-around w-[100%] ">
          <div className="w-[80%] border border-gray-300">
            <Table>
              <TableHeader>
                <TableRow className="flex border-gray-300">
                  <TableHead className="flex-1 flex items-center justify-center border-r border-gray-300">序号</TableHead>
                  <TableHead className="flex-1 flex items-center justify-center border-r border-gray-300">名称</TableHead>
                  <TableHead className="flex-1 flex items-center justify-center border-r border-gray-300">价格</TableHead>
                  <TableHead className="flex-1 flex items-center justify-center border-r border-gray-300">数量</TableHead>
                  <TableHead className="flex-1 flex items-center justify-center border-gray-300">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices?.map((invoice) => (
                  <TableRow className="flex border-gray-300" key={invoice.invoice}>
                    <TableCell className="flex-1 flex items-center justify-center border-r border-gray-300">{invoice.invoice}</TableCell>
                    <TableCell className="flex-1 flex items-center justify-center border-r border-gray-300">{invoice.name}</TableCell>
                    <TableCell className="flex-1 flex items-center justify-center border-r border-gray-300">{invoice.price}</TableCell>
                    <TableCell className="flex-1 flex items-center justify-center border-r border-gray-300">{invoice.total}</TableCell>
                    <TableCell className="flex-1 flex items-center justify-center border-gray-300">
                      <button className="bg-yellow-500 text-white px-5 py-1 mx-5 rounded" onClick={() => handleEdit(invoice)}>修改</button>
                      <button className="bg-red-500 text-white px-5 py-1 rounded" onClick={() => handleDelete(invoice.id)}
                        disabled={deleteMutation.isPending}>删除</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

        </div>
      </div>
    </>
  )
}
