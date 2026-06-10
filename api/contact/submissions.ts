import type { VercelRequest, VercelResponse } from "@vercel/node";

// Submissions are not persisted in the serverless deployment (stateless functions,
// and a public ledger of visitor inquiries would be a privacy concern anyway).
// The UI handles an empty ledger gracefully. Wire a datastore here on upgrade.
export default function handler(req: VercelRequest, res: VercelResponse) {
  res.json([]);
}
