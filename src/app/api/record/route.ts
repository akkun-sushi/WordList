import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

/*
export async function GET(req: Request, res: NextApiResponse) {
  const { data, error } = await supabase.from("record").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
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

  return NextResponse.json(data);
}
*/


// CORS ヘッダーを設定する関数
const setCorsHeaders = (res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // すべてのオリジンを許可
  res.setHeader("Access-Control-Allow-Headers", "authorization, x-client-info, apikey, content-type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
};

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS のオプションリクエストに対応
  if (req.method === "OPTIONS") {
    setCorsHeaders(res);
    res.status(200).end();
    return;
  }

  setCorsHeaders(res);

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase.from("record").select("*");

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}