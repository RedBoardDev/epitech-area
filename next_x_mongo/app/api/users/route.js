//** mongodb
import { findDocuments, insertDocument } from "@/app/_utils";

export async function GET(req) {
    const rows = await findDocuments('user', {});
    return Response.json(rows);
}

//** postgres
// import { query } from "@/app/_utils";

// export async function GET(req) {
//     const rows = await query('SELECT * FROM "user"');
//     return Response.json(rows.rows);
// }
