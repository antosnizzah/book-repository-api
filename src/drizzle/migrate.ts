import "dotenv/config";

import { migrate } from "drizzle-orm/neon-http/migrator";

import db from "./db";

async function migration(){
    console.log("====== migration Started ====")
    await migrate(db, {migrationsFolder:__dirname + "/migrations"})
}

migration();