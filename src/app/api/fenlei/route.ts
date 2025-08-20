import { createClient } from "@/lib/supabase/serve";

export async function GET() { 
    // 创建客户端连接
    const supbase= await createClient()
    // 查询数据
    const {data,error}=await supbase.from('fenlei').select()
}