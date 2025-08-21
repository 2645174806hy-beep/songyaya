"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DialogClose } from "@radix-ui/react-dialog"
import { useEffect, useState } from "react"
// 校验规则
const formSchema = z.object({
  invoice: z.string().min(1, {
    message: "序号不能为空",
  }),
  name: z.string().min(1, {
    message: "书名不能为空",
  }),
  price: z.string().min(1, {
    message: "价格不能为空",
  }),
  total: z.string().min(1, {
    message: "数量不能为空",
  }),
})
// 新增图书
async function addBook(book: any) {
  const res = await fetch('api/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
  if (res.ok) {
    return await res.json()
  } else {
    throw new Error('序号已存在，请使用不同的序号')
  }
}
// 编辑图书
async function updateBook(book: any) {
   const res = await fetch('api/add', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
  if (res.ok) {
    return await res.json()
  } else {
    throw new Error('序号已存在，请使用不同的序号')
  }
}
interface ProfileFormProps {
  book?: any;
  onSuccess: () => void;
}
export default function ProfileForm({ book, onSuccess }: ProfileFormProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoice: "",
      name: "",
      price: "",
      total: "",
    },
  })
  // 当传入book时，表示编辑模式
  useEffect(() => {
    if (book) {
      form.reset({
        invoice: book.invoice || "",
        name: book.name || "",
        price: book.price?.toString() || "", // 确保转换为字符串
        total: book.total?.toString() || "", // 确保转换为字符串
      })
    }else {
      form.reset({
        invoice: "",
        name: "",
        price: "",
        total: "",
      })
    }
  }, [book, form])
  const queryClient = useQueryClient()
  // 新增图书
  const addMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      form.reset() // 重置表单
      onSuccess()
    },
    onError: (error) => {
      alert(error.message)
    },
  })
  // 编辑图书
  const updateMutation = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      form.reset() // 重置表单
      onSuccess()
    },
    onError: (error) => {
      alert(error.message)
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // 检查表单验证是否通过
  // if (!form.formState.isValid) {
  //   console.log("表单验证未通过:", form.formState.errors);
  //   return;
  // }
    // 使用 react-hook-form 获取的表单数据
    if (book) {
      console.log("正在提交编辑数据:", { ...values, id: book.id });
      updateMutation.mutate({ ...values, id: book.id })
    } else {
      console.log("正在提交新增数据:", values);
      addMutation.mutate(values)
    }
    console.log(values)
  }
  const isPending = book ? updateMutation.isPending : addMutation.isPending
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="invoice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>序号</FormLabel>
              <FormControl>
                <Input placeholder="请输入序号" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>书名</FormLabel>
              <FormControl>
                <Input placeholder="请输入书名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>价格</FormLabel>
              <FormControl>
                <Input type="number" placeholder="请输入价格" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>数量</FormLabel>
              <FormControl>
                <Input type="number" placeholder="请输入数量" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2">
          {/* <DialogClose asChild> */}
            <Button type="submit" disabled={updateMutation.isPending || addMutation.isPending}>
              {updateMutation.isPending || addMutation.isPending ? "提交中..." : book ? "保存修改" : "提交"}
            </Button>
          {/* </DialogClose> */}
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={() => {
              form.reset();
            }}>
              取消
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  )
}