import http from "http";
const PORT = 5000;
const tests=[{ filename:"generated/mock_login.spec.ts", content:"import { test, expect } from \"@playwright/test\"; test(\"mock\", async ({page})=>{ await page.goto(process.env.BASE_URL||\"http://localhost:5000\"); expect(true).toBeTruthy(); });"}];
http.createServer((req,res)=>{ if(req.method==="GET" && (req.url==="/tests/ready"||req.url==="/api/tests/ready")){ res.writeHead(200,{"Content-Type":"application/json"}); res.end(JSON.stringify(tests)); } else { res.writeHead(404); res.end("Not Found"); } }).listen(PORT,()=>console.log("mock listening",PORT));
