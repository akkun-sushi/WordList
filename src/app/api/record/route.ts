import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  const { data, error } = await supabase.from("record").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // CORS ヘッダーを追加してレスポンスを返す
  const response = NextResponse.json(data);
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "authorization, x-client-info, apikey, content-type"
  );

  return response;
}

export async function POST(req: Request, res: NextApiResponse) {
  const { key, date, hour, minute, content } = await req.json();

  const { data, error } = await supabase
    .from("record")
    .insert([
      { key: key, date: date, hour: hour, minute: minute, content: content },
    ])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // CORS ヘッダーを追加してレスポンスを返す
  const response = NextResponse.json(data);
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "authorization, x-client-info, apikey, content-type"
  );
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");

  return response;
}

export async function OPTIONS() {
  // OPTIONS メソッドのリクエストに対応するための処理
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "authorization, x-client-info, apikey, content-type"
  );
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");

  return response;
}
