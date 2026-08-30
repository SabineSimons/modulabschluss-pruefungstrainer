(()=>{
  const btn=document.getElementById('nextBtn');
  if(!btn || btn.dataset.progressSavePatch==='1') return;
  btn.dataset.progressSavePatch='1';

  btn.onclick=()=>{
    const q=queue[idx];

    if(exam){
      if(idx===queue.length-1) finish();
      else { idx++; render(); }
      return;
    }

    if(!checked.has(q.id)){
      const a=answers[q.id]||[];
      if(!a.length){
        alert('Bitte zuerst eine Antwort auswählen.');
        return;
      }
      const ok=arrEq(a,q.correct);
      checked.add(q.id);
      state.results[q.id]={correct:ok};
      save();
    }

    if(idx===queue.length-1) finish();
    else { idx++; render(); }
  };
})();
