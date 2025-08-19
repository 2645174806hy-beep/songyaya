import { createClient } from "@/lib/supabase/client"
import { NextResponse } from "next/server";

// 获取全部图书
export async function  POST(){
    const supbase = await createClient()
    const {data,error} = await supbase.from('books').select()
    console.log(data)
    return new Response(JSON.stringify(data));
}
// 删除图书
export async function DELETE(request: Request) {
    const { id } = await request.json()
    const supabase = await createClient()
    const { error } = await supabase.from('books').delete().eq('id', id)
    if (error) return NextResponse.json({ error }, { status: 500 })
    return NextResponse.json({ success: true })
  }
// 查询图书
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('searchParams') || ''
    
    const supabase = createClient()
    const { data, error } = await supabase
      .from('books')
      .select()
      .ilike('name', `%${query}%`) // 模糊搜索
      
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json(data)
  }
