import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response("", { headers });
  }

  const store = getStore({ name: "leaderboard", consistency: "strong" });

  if (req.method === "GET") {
    try {
      const data = await store.get("scores", { type: "json" });
      return new Response(JSON.stringify(data || []), { headers });
    } catch {
      return new Response(JSON.stringify([]), { headers });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, score } = await req.json();
      if (!name || typeof score !== "number" || score < 1 || name.length > 20) {
        return new Response(JSON.stringify({ error: "Invalid" }), { status: 400, headers });
      }

      let scores: any[] = [];
      try {
        scores = (await store.get("scores", { type: "json" })) || [];
      } catch { scores = []; }

      scores.push({ name: name.slice(0, 20), score, date: Date.now() });
      scores.sort((a: any, b: any) => b.score - a.score);
      scores = scores.slice(0, 500);

      await store.setJSON("scores", scores);

      const rank = scores.findIndex((s: any) => s.score === score && s.name === name) + 1;
      return new Response(JSON.stringify({ rank, total: scores.length }), { headers });
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
    }
  }

  return new Response("Method not allowed", { status: 405, headers });
};

export const config = {
  path: "/api/scores",
};
