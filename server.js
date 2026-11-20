import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(express.json({limit:"32kb"}));
app.use(express.static("public"));
const PORT=process.env.PORT||3000;
const API_KEY=process.env.OPENAI_API_KEY;
const APP_PIN=process.env.APP_PIN;
app.post("/api/chat",async(req,res)=>{
  if(!APP_PIN || req.get("X-App-Pin")!==APP_PIN) return res.status(401).json({error:"Unauthorized"});
  if(!API_KEY) return res.status(503).json({error:"AI server not configured"});
  const messages=Array.isArray(req.body.messages)?req.body.messages.slice(-12):[];
  const safe=messages.filter(m=>["user","assistant"].includes(m.role)&&typeof m.content==="string").map(m=>({role:m.role,content:m.content.slice(0,4000)}));
  if(!safe.length)return res.status(400).json({error:"No message"});
  try{
    const response=await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      headers:{"Authorization":`Bearer ${API_KEY}`,"Content-Type":"application/json"},
      body:JSON.stringify({
        model:process.env.OPENAI_MODEL||"gpt-6-astra",
        instructions:"You are Sajib Assistant, a helpful bilingual personal assistant. Reply in the language the user uses. Be clear, safe, and age-appropriate. Never claim to have made a phone call or taken an action unless a user-approved tool actually did it. Do not ask for passwords, OTPs, or private secrets.",
        input:safe.map(m=>({role:m.role,content:[{type:"input_text",text:m.content}]})),
        store:false
      })
    });
    const data=await response.json();
    if(!response.ok)return res.status(502).json({error:"AI provider request failed"});
    const reply=(data.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==="output_text").map(x=>x.text).join("\n").trim();
    if(!reply)return res.status(502).json({error:"Empty AI response"});
    res.json({reply});
  }catch(e){res.status(502).json({error:"AI service unavailable"});}
});
app.get("/health",(req,res)=>res.json({ok:true}));
app.listen(PORT,()=>console.log(`Sajib Assistant running on http://localhost:${PORT}`));
