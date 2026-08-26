(()=>{
  function resetCategory(cat){
    const ids=new Set(ALL.filter(q=>q.category===cat).map(q=>q.id));
    Object.keys(state.results||{}).forEach(id=>{if(ids.has(id)) delete state.results[id];});
    state.flagged=(state.flagged||[]).filter(id=>!ids.has(id));
    save();
    home();
  }
  function addResetButtons(){
    document.querySelectorAll('#topics .topic').forEach(topic=>{
      const cat=topic.querySelector('.tn')?.textContent?.trim();
      const acts=topic.querySelector('.acts');
      if(!cat||!acts||acts.querySelector('.catReset')) return;
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='b sm danger catReset';
      btn.textContent='🗑 '+cat+' Fortschritt löschen';
      btn.addEventListener('click',()=>{
        if(confirm('Nur den Fortschritt für '+cat+' löschen? Die anderen E-Bereiche bleiben erhalten.')) resetCategory(cat);
      });
      acts.appendChild(btn);
    });
  }
  const oldHome=home;
  home=function(){oldHome();addResetButtons();};
  addResetButtons();
})();