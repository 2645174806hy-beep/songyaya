"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default function TableDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* 搜索栏 */}
      <div className="w-full flex justify-center mt-4 bg-blue-50">
        <div className="w-[30%] flex items-center mx-auto">
          <input
            type="text"
            placeholder="请输入姓名"
            className="border rounded-l px-4 py-2 w-[60%] h-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-orange-400 text-white ml-4 h-7 w-[10%] rounded-r hover:bg-orange-600 text-center">
            搜索
          </button>
        </div>
      </div>

      {/* // 表格 */}
      <div className="flex justify-center w-full bg-white py-15 px-4 rounded-lg shadow-xl p-6">
        <div className="flex justify-around w-[100%] ">
          <div className="w-[80%] border border-gray-300">
            <Table className="w-full border-collapse">
              <TableHeader>
                <TableRow className="grid grid-cols-8 border border-gray-300">
                  {[...Array(8)].map((_, i) => (
                    <TableHead
                      key={i}
                      className="flex items-center justify-center p-2 border-r border-gray-300 last:border-r-0"
                    >
                      {["序号", "姓名", "年龄", "性别", "地址", "电话", "邮箱", "操作"][i]}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice} className="grid grid-cols-8 border border-t-0 border-gray-300">
                    <TableCell className="flex items-center justify-center p-2 border-r border-gray-300">{invoice.invoice}</TableCell>
                    <TableCell className="flex items-center justify-center p-2 border-r border-gray-300">{invoice.paymentStatus}</TableCell>
                    <TableCell className="flex items-center justify-center p-2 border-r border-gray-300">{invoice.paymentMethod}</TableCell>
                    <TableCell className="flex items-center justify-center p-2 border-r border-gray-300">{invoice.totalAmount}</TableCell>
                    <TableCell className="flex items-center justify-center p-2 border-r border-gray-300">{invoice.totalAmount}</TableCell>
                    <TableCell className="flex items-center justify-center p-2 border-r border-gray-300">{invoice.totalAmount}</TableCell>
                    <TableCell className="flex items-center justify-center p-2 border-r border-gray-300">{invoice.totalAmount}</TableCell>
                    <TableCell className="flex items-center justify-center gap-2 p-2">
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded">修改</button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded">删除</button>
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
