import { query } from "@/app/_utils";

export async function GET(req, { params }) {
    const id = params.id;
    const rows = await query('SELECT * FROM "user" WHERE id = $1', [id]);
    return Response.json(rows.rows[0]);
}
