import { createClient } from "@/lib/supabase/serve"
import { NextResponse } from "next/server"

//   新增图书
// export async function POST(request: Request) { 
//     const { invoice,name, price, total } = await request.json()
//     const supabase = await createClient()
//     // const { error } = await supabase.from('books').insert({ invoice,name, price, total })
//     console.log('Inserting data:', { invoice, name, price, total });
//     const { data, error } = await supabase.from('books').insert({ invoice, name, price, total });
//     console.log('Error details:', error);
//     if (error) return NextResponse.json({ error }, { status: 500 })
//     return NextResponse.json({ success: true })
// } 

// // 修改图书
// export async function PUT(request: Request) { 
//     const { id, invoice, name, price, total } = await request.json()
//     const supabase = await createClient()
//     const { error } = await supabase.from('books').update({ invoice, name, price, total }).eq('id', id)
//     if (error) return NextResponse.json({ error }, { status: 500 })
//     return NextResponse.json({ success: true })
// }

// 新增图书
export async function POST(request: Request) { 
    const { invoice, name, price, total } = await request.json()
    const supabase = await createClient()
    
    // 检查序号是否已存在
    const { data: existingBook, error: checkError } = await supabase
        .from('books')
        .select('id')
        .eq('invoice', invoice)
        .single()

    if (existingBook) {
        return NextResponse.json({ 
            error: "序号已存在，请使用不同的序号" 
        }, { status: 400 })
    }

    const { data, error } = await supabase
        .from('books')
        .insert({ invoice, name, price, total })
        .select()

    if (error) return NextResponse.json({ error }, { status: 500 })
    return NextResponse.json({ success: true })
} 

// 修改图书
export async function PUT(request: Request) { 
    const { id, invoice, name, price, total } = await request.json()
    const supabase = await createClient()
    
    // 检查序号是否已被其他图书使用（排除当前编辑的图书）
    const { data: existingBook, error: checkError } = await supabase
        .from('books')
        .select('id')
        .eq('invoice', invoice)
        .neq('id', id)
        .single()

    if (existingBook) {
        return NextResponse.json({ 
            error: "序号已存在，请使用不同的序号" 
        }, { status: 400 })
    }

    const { error } = await supabase
        .from('books')
        .update({ invoice, name, price, total })
        .eq('id', id)

    if (error) return NextResponse.json({ error }, { status: 500 })
    return NextResponse.json({ success: true })
}