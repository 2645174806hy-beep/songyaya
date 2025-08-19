import { createClient } from "@/lib/supabase/serve"
import { NextResponse } from "next/server"

//   新增图书
export async function POST(request: Request) { 
    const { invoice,name, price, total } = await request.json()
    const supabase = await createClient()
    // const { error } = await supabase.from('books').insert({ invoice,name, price, total })
    console.log('Inserting data:', { invoice, name, price, total });
    const { data, error } = await supabase.from('books').insert({ invoice, name, price, total });
    console.log('Error details:', error);
    if (error) return NextResponse.json({ error }, { status: 500 })
    return NextResponse.json({ success: true })
} 

// 修改图书
export async function PUT(request: Request) { 
    const { id, invoice, name, price, total } = await request.json()
    const supabase = await createClient()
    const { error } = await supabase.from('books').update({ invoice, name, price, total }).eq('id', id)
    if (error) return NextResponse.json({ error }, { status: 500 })
    return NextResponse.json({ success: true })
}
