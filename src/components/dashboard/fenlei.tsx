import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// tableDEMO2上面指定api
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  }
]
// 获取全部数据
// async function getArray() {
//   return await fetch('api/dashboard', { method: 'POST' }).then(res => res.json())
// }
// 
export default function TableDemo2() {
  // 声明和管理多个组件的状态变量

  // 调用接口函数从后端获取数据

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
