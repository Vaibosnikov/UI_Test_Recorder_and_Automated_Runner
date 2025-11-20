
document.getElementById('start').onclick=()=>chrome.runtime.sendMessage({cmd:'start'},()=>document.getElementById('status').textContent='Recording...');
document.getElementById('stop').onclick=()=>chrome.runtime.sendMessage({cmd:'stop'},()=>document.getElementById('status').textContent='Stopped');
document.getElementById('export').onclick=()=>chrome.storage.local.get({events:[]},d=>{const b=new Blob([JSON.stringify(d.events,null,2)],{type:'application/json'}); const u=URL.createObjectURL(b); const a=document.createElement('a'); a.href=u; a.download='session.json'; a.click(); URL.revokeObjectURL(u);});
