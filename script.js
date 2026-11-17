(() => {
  const form = document.getElementById('applicationForm');
  if (!form) return;
  const steps = [...form.querySelectorAll('.form-step')];
  const count = document.getElementById('stepCount');
  const bar = document.getElementById('progressBar');
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  const submit = document.getElementById('submitBtn');
  const error = document.getElementById('formError');
  const success = document.getElementById('formSuccess');
  let current = 0;
  const day = form.querySelector('[name="birthDay"]');
  for (let i=1;i<=31;i++) day.add(new Option(String(i).padStart(2,'0'), String(i).padStart(2,'0')));
  const month = form.querySelector('[name="birthMonth"]');
  ['January','February','March','April','May','June','July','August','September','October','November','December'].forEach((m,i)=>month.add(new Option(m,String(i+1).padStart(2,'0'))));
  const year = form.querySelector('[name="birthYear"]');
  const thisYear = new Date().getFullYear();
  for(let y=thisYear-17;y>=thisYear-85;y--) year.add(new Option(String(y),String(y)));
  function showStep(index) {
    current = index;
    steps.forEach((step,i)=>step.classList.toggle('active',i===current));
    count.textContent = `${String(current+1).padStart(2,'0')} / ${String(steps.length).padStart(2,'0')}`;
    bar.style.width = `${((current+1)/steps.length)*100}%`;
    prev.disabled = current===0;
    next.hidden = current===steps.length-1;
    submit.hidden = current!==steps.length-1;
    error.textContent = '';
  }
  function validateCurrent() {
    for (const field of steps[current].querySelectorAll('input,select')) {
      if (!field.checkValidity()) { field.reportValidity(); return false; }
    }
    return true;
  }
  next.addEventListener('click',()=>{ if(validateCurrent()) showStep(Math.min(current+1,steps.length-1)); });
  prev.addEventListener('click',()=>showStep(Math.max(current-1,0)));
  form.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(!validateCurrent()) return;
    // DEMO ONLY: connect this form to the official admissions CRM/form endpoint before launch.
    form.hidden = true;
    success.hidden = false;
  });
  showStep(0);
})();