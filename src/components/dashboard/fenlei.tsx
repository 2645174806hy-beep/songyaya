import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
  },
]

export default function TableDemo2() {
  return (

    <>
      <div className="w-full flex justify-center mt-4 bg-blue-50">
        <div className="w-[30%] flex items-center mx-auto">
          <input
            type="text"
            placeholder="请输入书名"
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
            <Table>
              <TableHeader>
                <TableRow className="flex border-gray-300">
                  <TableHead className="flex-1 flex items-center justify-center border-r border-gray-300">序号</TableHead>
                  <TableHead className="flex-1 flex items-center justify-center border-r border-gray-300">类型名称</TableHead>
                  <TableHead className="flex-1 flex items-center justify-center border-r border-gray-300">类型描述</TableHead>
                  <TableHead className="flex-1 flex items-center justify-center border-gray-300">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow className="flex border-gray-300" key={invoice.invoice}>
                    <TableCell className="flex-1 flex items-center justify-center border-r border-gray-300">{invoice.invoice}</TableCell>
                    <TableCell className="flex-1 flex items-center justify-center border-r border-gray-300">{invoice.paymentStatus}</TableCell>
                    <TableCell className="flex-1 flex items-center justify-center border-r border-gray-300">{invoice.totalAmount}</TableCell>
                    <TableCell className="flex-1 flex items-center justify-center border-gray-300">
                      <button className="bg-yellow-500 text-white px-5 py-1 mx-5 rounded">修改</button>
                      <button className="bg-red-500 text-white px-5 py-1 rounded">删除</button>
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
