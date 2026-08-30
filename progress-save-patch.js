(()=>{
  if(window.__progressSavePatchV2) return;
  window.__progressSavePatchV2=true;

  function commitCurrent(){
    try{
      if(typeof exam!=='undefined' && exam) return;
      if(!Array.isArray(queue) || !queue.length || idx<0 || idx>=queue.length) return;
      const q=queue[idx];
      if(!q || !q.id) return;
      const a=(answers && Array.isArray(answers[q.id])) ? answers[q.id] : [];
      if(!a.length) return; // bewusst übersprungene Fragen bleiben offen
      const ok=arrEq(a,q.correct);
      checked.add(q.id);
      state.results[q.id]={correct:ok};
      save();
    }catch(e){console.error('Fortschritt konnte nicht gespeichert werden:',e);}
  }

  // Vor JEDEM Verlassen einer Frage speichern – nicht nur bei „Weiter“.
  document.addEventListener('click',e=>{
    const t=e.target;
    if(!t || typeof t.closest!=='function') return;
    if(t.closest('#nextBtn,#prevBtn,#backHomeTop,.num')) commitCurrent();
  },true);

  // Auch beim Schließen/Neuladen des Tabs die aktuelle Auswahl sichern.
  window.addEventListener('pagehide',commitCurrent);
  window.addEventListener('beforeunload',commitCurrent);

  // Alten v1-Handler entfernen: Navigation bleibt wieder vollständig beim Originaltrainer.
  const btn=document.getElementById('nextBtn');
  if(btn) delete btn.dataset.progressSavePatch;
})();
