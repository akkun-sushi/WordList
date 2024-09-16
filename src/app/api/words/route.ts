import { supabase } from "@/utils/supabaseClient";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  const { data, error } = await supabase.from("words").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request, res: NextApiResponse) {
  const { id, en, ja } = await req.json();

  const { data, error } = await supabase
    .from("words")
    .insert([{ id: id, en: en, ja: ja }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(req: Request, res: NextApiResponse) {
  const { id, editedEn, editedJa } = await req.json();

  const { data, error } = await supabase
    .from("words")
    .update({ id: id, en: editedEn, ja: editedJa })
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
