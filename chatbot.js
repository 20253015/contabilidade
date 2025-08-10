:root{
  --cb-brand:#0A2540;
  --cb-accent:#49A6E9;
  --cb-bg:#fff;
  --cb-text:#0f172a;
}
.cb-fab{
  position:fixed; right:18px; bottom:78px; z-index:9999;
  width:64px; height:64px; border-radius:50%; border:0; cursor:pointer;
  box-shadow:0 10px 20px rgba(0,0,0,.2); background:#fff; padding:0;
  display:grid; place-items:center; transition:transform .2s ease;
}
.cb-fab svg{ width:44px; height:44px; }
.cb-fab:hover{ transform:translateY(-1px); }
.cb-fab.attn{ animation: cb-pulse 1.2s ease-in-out 3; }
@keyframes cb-pulse{ 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }

.cb-box{
  position:fixed; right:18px; bottom:150px; z-index:9999;
  width:340px; max-width:92vw; background:var(--cb-bg); color:var(--cb-text);
  border:1px solid #e2e8f0; border-radius:16px; box-shadow:0 18px 40px rgba(2,14,34,.16);
  overflow:hidden; display:none; font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
.cb-box.show{ animation: cb-pop .35s ease; }
@keyframes cb-pop{ 0%{transform:scale(.92); opacity:0} 100%{transform:scale(1); opacity:1} }

.cb-head{
  background:linear-gradient(135deg,var(--cb-brand),#1B4B7A); color:#fff; padding:12px 14px;
  display:flex; align-items:center; justify-content:space-between
}
.cb-title{display:grid}
.cb-title strong{font-weight:700; line-height:1.1}
.cb-sub{opacity:.85; font-size:12px}
.cb-close{background:transparent;border:0;color:#fff;font-size:20px;cursor:pointer}

.cb-body{padding:12px; max-height:380px; overflow:auto; display:grid; gap:10px}
.cb-msg{padding:10px 12px; border-radius:12px; max-width:88%; line-height:1.35; font-size:14px}
.cb-bot{background:#f1f5f9; color:#0f172a; border:1px solid #e2e8f0}
.cb-user{background:#e8f4ff; color:#0f172a; justify-self:end; border:1px solid #cfe8ff}
.cb-ops{display:flex; flex-wrap:wrap; gap:8px}
.cb-ops button{
  padding:8px 10px; border:1px solid #e2e8f0; background:#fff; border-radius:999px; cursor:pointer; font-weight:600; font-size:13px;
}
.cb-foot{padding:10px; border-top:1px solid #e2e8f0; display:grid; gap:8px}
.cb-field{display:grid; gap:6px}
.cb-field input{
  width:100%; padding:10px 12px; border:1px solid #e2e8f0; border-radius:10px; font-size:14px;
}
.cb-actions{display:flex; gap:8px; justify-content:flex-end}
.cb-btn{padding:10px 14px; border-radius:10px; border:0; cursor:pointer; font-weight:700}
.cb-btn.primary{background:var(--cb-brand); color:#fff}
.cb-btn.secondary{background:#f1f5f9}
.cb-consent{display:flex; gap:8px; align-items:flex-start; font-size:12px; color:#334155}

@media (max-width:420px){
  .cb-box{right:10px; left:10px; width:auto; bottom:120px}
  .cb-fab{right:12px; bottom:72px}
}
