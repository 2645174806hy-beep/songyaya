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
import ProfileForm from "@/components/addbookform/addBookForm"
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
// async function addBook(book: any) {
//   return await fetch('api/add', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(book),
//   }).then(res => res.json())
// }
// 修改图书
// async function updateBook(book: any) {
//   return await fetch('api/add', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(book),
//   }).then(res => res.json())
// }
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
  const handleEdit = (book: any) => {
    setEditingBook(book)
    // setNewBook({
    //   invoice: book.invoice,
    //   name: book.name,
    //   price: book.price,
    //   total: book.total
    // })
    setIsDialogOpen(true)
    console.log("Editing book:", book); // 添加日志
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
          <DialogTrigger asChild>
            <div className="w-full flex mt-4 ">
            <Button variant="outline"  onClick={() => setEditingBook(null)}>新增图书</Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingBook ? '修改图书' : '新增图书'}</DialogTitle>
              <DialogDescription>
                {editingBook ? '修改图书信息' : '添加图书信息'}
              </DialogDescription>
            </DialogHeader>
           <ProfileForm book={editingBook} onSuccess={() => setIsDialogOpen(false)}/>
            <DialogFooter>
            </DialogFooter>
          </DialogContent>
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
                <Button onClick={() => handleEdit(invoice)}>修改</Button>
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
