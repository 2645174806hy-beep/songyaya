import { createClient } from "@/lib/supabase/serve";
import { NextResponse } from "next/server";

export async function GET() { 
    // 创建客户端连接
    const supbase= await createClient()
    // 查询数据
    const {data,error}=await supbase.from('classify').select()
    console.log(data)
    return new Response(JSON.stringify(data));   
}
//删除分类
export async function DELETE(request: Request) {
    const { id } = await request.json()
    const supabase = await createClient()
    const { error } = await supabase.from('classify').delete().eq('id', id)
    if (error) return NextResponse.json({ error }, { status: 500 })
    return NextResponse.json({ success: true })
  }