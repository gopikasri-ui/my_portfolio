/* ---- DATA ---- */
let skills = [
  {name:"Python",            level:"Expert",       icon:"fab fa-python"},
  {name:"Scikit-learn",      level:"Advanced",     icon:"fas fa-chart-bar"},
  {name:"TensorFlow",        level:"Intermediate", icon:"fas fa-brain"},
  {name:"NumPy & Pandas",    level:"Advanced",     icon:"fas fa-table"},
  {name:"Matplotlib",        level:"Advanced",     icon:"fas fa-chart-line"},
  {name:"Machine Learning",  level:"Advanced",     icon:"fas fa-robot"},
  {name:"SQL",               level:"Intermediate", icon:"fas fa-database"},
  {name:"JavaScript",        level:"Intermediate", icon:"fab fa-js"},
  {name:"HTML & CSS",        level:"Intermediate", icon:"fab fa-html5"},
  {name:"Java",              level:"Intermediate", icon:"fab fa-java"},
  {name:"Git & GitHub",      level:"Advanced",     icon:"fab fa-git-alt"},
  {name:"Oracle Cloud (OCI)",level:"Intermediate", icon:"fas fa-cloud"},
  {name:"RESTful APIs",      level:"Intermediate", icon:"fas fa-plug"},
  {name:"DSA",               level:"Advanced",     icon:"fas fa-code"}
];

let projects = [
  {
    title:"Emergency Crowd Management System",
    desc:"Built a multi-class ML classification model to predict crowd density levels (Low / Moderate / Critical) from sensor data. Designed end-to-end preprocessing pipeline and benchmarked Random Forest, SVM, and Logistic Regression. Implemented automated alert pipeline for emergency authority notifications and real-time heatmap dashboards.",
    tech:["Python","Scikit-learn","TensorFlow","NumPy","Pandas","Matplotlib"],
    github:"https://github.com/gopikasri-ui/crowd-management-system",
    demo:""
  },
  {
    title:"Cyber Incident Portal",
    desc:"Full-stack web portal for logging, tracking, and resolving cybersecurity incidents with multi-role workflows. Designed normalized relational database schema with optimized indexing. Implemented JWT-based authentication, RBAC, and RESTful CRUD APIs integrated with real-time status dashboards.",
    tech:["Python","JavaScript","HTML/CSS","SQL","JWT Authentication","RBAC"],
    github:"https://github.com/gopikasri-ui/cyberportal",
    demo:""
  }
];

let certs = [
  {name:"Oracle Cloud Infrastructure 2025 — AI Foundations Associate", org:"Oracle",           icon:"fas fa-certificate"},
  {name:"Software Engineering Job Simulation",                         org:"Forage (2024–2025)",icon:"fas fa-laptop-code"},
  {name:"HackIndia National Hackathon Participant",                    org:"HackIndia",        icon:"fas fa-trophy"},
  {name:"179+ DSA Problems Solved",                                    org:"LeetCode Platform", icon:"fas fa-medal"}
];

/* ---- RENDER SKILLS ---- */
function renderSkills(){
  document.getElementById("skills-grid").innerHTML = skills.map((s,i)=>`
    <div class="skill-card fade-up" style="animation-delay:${i*0.06}s">
      <div class="skill-icon"><i class="${s.icon||'fas fa-code'}"></i></div>
      <h4>${s.name}</h4>
      <span class="skill-badge badge-${s.level}">${s.level}</span>
    </div>
  `).join("");
  observeFades();
}

/* ---- RENDER PROJECTS ---- */
function renderProjects(){
  document.getElementById("projects-grid").innerHTML = projects.map((p,i)=>`
    <div class="project-card fade-up" style="animation-delay:${i*0.1}s">
      <div class="project-header">
        <div class="project-num">0${i+1}</div>
        <div class="project-icon"><i class="fas fa-code-branch"></i></div>
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tech-tags">${p.tech.map(t=>`<span class="tech-tag">${t}</span>`).join("")}</div>
        <div class="project-links">
          ${p.github?`<a href="${p.github}" target="_blank" class="plink plink-main"><i class="fab fa-github"></i> GitHub</a>`:""}
          ${p.demo?`<a href="${p.demo}" target="_blank" class="plink"><i class="fas fa-external-link-alt"></i> Live Demo</a>`:""}
        </div>
      </div>
    </div>
  `).join("");
  observeFades();
}

/* ---- RENDER CERTS ---- */
function renderCerts(){
  document.getElementById("certs-grid").innerHTML = certs.map((c,i)=>`
    <div class="cert-card fade-up" style="animation-delay:${i*0.07}s">
      <div class="cert-icon"><i class="${c.icon||'fas fa-certificate'}"></i></div>
      <div class="cert-info">
        <h4>${c.name}</h4>
        <span>${c.org}</span>
      </div>
    </div>
  `).join("");
  observeFades();
}

/* ---- EDIT PANEL RENDERS ---- */
function renderEpSkills(){
  document.getElementById("ep-skills-list").innerHTML = skills.map((s,i)=>`
    <div class="ep-item"><span>${s.name} — ${s.level}</span><button class="ep-del" onclick="delSkill(${i})">🗑</button></div>
  `).join("")||"<p style='color:var(--muted);font-size:.85rem;'>No skills yet.</p>";
}
function renderEpProjects(){
  document.getElementById("ep-projects-list").innerHTML = projects.map((p,i)=>`
    <div class="ep-item"><span>${p.title}</span><button class="ep-del" onclick="delProject(${i})">🗑</button></div>
  `).join("")||"<p style='color:var(--muted);font-size:.85rem;'>No projects yet.</p>";
}
function renderEpCerts(){
  document.getElementById("ep-certs-list").innerHTML = certs.map((c,i)=>`
    <div class="ep-item"><span>${c.name}</span><button class="ep-del" onclick="delCert(${i})">🗑</button></div>
  `).join("")||"<p style='color:var(--muted);font-size:.85rem;'>No certs yet.</p>";
}

/* ---- ADD ---- */
function addSkill(){
  const n=document.getElementById("ns-name").value.trim();
  const l=document.getElementById("ns-level").value;
  if(!n){showToast("⚠ Enter a skill name!");return;}
  skills.push({name:n,level:l,icon:"fas fa-code"});
  document.getElementById("ns-name").value="";
  renderEpSkills();showToast("✅ Skill added!");
}
function addProject(){
  const t=document.getElementById("np-title").value.trim();
  const d=document.getElementById("np-desc").value.trim();
  const tech=document.getElementById("np-tech").value.split(",").map(x=>x.trim()).filter(Boolean);
  const g=document.getElementById("np-github").value.trim();
  const demo=document.getElementById("np-demo").value.trim();
  if(!t){showToast("⚠ Enter a project title!");return;}
  projects.push({title:t,desc:d,tech,github:g,demo});
  ["np-title","np-desc","np-tech","np-github","np-demo"].forEach(id=>document.getElementById(id).value="");
  renderEpProjects();showToast("✅ Project added!");
}
function addCert(){
  const n=document.getElementById("nc-name").value.trim();
  const o=document.getElementById("nc-org").value.trim();
  if(!n){showToast("⚠ Enter certification name!");return;}
  certs.push({name:n,org:o,icon:"fas fa-certificate"});
  document.getElementById("nc-name").value="";
  document.getElementById("nc-org").value="";
  renderEpCerts();showToast("✅ Certification added!");
}

/* ---- DELETE ---- */
function delSkill(i){skills.splice(i,1);renderEpSkills();}
function delProject(i){projects.splice(i,1);renderEpProjects();}
function delCert(i){certs.splice(i,1);renderEpCerts();}

/* ---- SAVE ---- */
function saveAll(){
  renderSkills();renderProjects();renderCerts();
  closeEdit();showToast("💾 Portfolio updated successfully!");
}

/* ---- EDIT PANEL ---- */
function openEdit(){
  document.getElementById("editPanel").classList.add("on");
  document.getElementById("editOverlay").classList.add("on");
  renderEpSkills();renderEpProjects();renderEpCerts();
}
function closeEdit(){
  document.getElementById("editPanel").classList.remove("on");
  document.getElementById("editOverlay").classList.remove("on");
}
function epTab(tab,btn){
  document.querySelectorAll(".ep-tab-content").forEach(t=>t.classList.remove("on"));
  document.querySelectorAll(".ep-tab").forEach(b=>b.classList.remove("on"));
  document.getElementById("ep-"+tab).classList.add("on");
  btn.classList.add("on");
}

/* ---- TOAST ---- */
function showToast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg;t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),3000);
}

/* ---- SCROLL FADE ---- */
function observeFades(){
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");});
  },{threshold:0.1});
  document.querySelectorAll(".fade-up").forEach(el=>io.observe(el));
}

/* ---- PARTICLES ---- */
function initParticles(){
  const container=document.getElementById("particles");
  const colors=["#e8b86d","#38c9b0","#7c5c9e","#ffffff"];
  for(let i=0;i<30;i++){
    const p=document.createElement("div");
    p.className="particle";
    const size=Math.random()*4+2;
    const color=colors[Math.floor(Math.random()*colors.length)];
    p.style.cssText=`
      width:${size}px;height:${size}px;
      background:${color};
      left:${Math.random()*100}%;
      animation-duration:${Math.random()*15+10}s;
      animation-delay:${Math.random()*10}s;
    `;
    container.appendChild(p);
  }
}

/* ---- ACTIVE NAV ---- */
window.addEventListener("scroll",()=>{
  const sections=document.querySelectorAll("section[id]");
  const links=document.querySelectorAll(".nav-links a");
  let current="";
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-140)current=s.id;});
  links.forEach(l=>{
    l.style.color="";
    if(l.getAttribute("href")==="#"+current)l.style.color="#e8b86d";
  });
});

/* ---- INIT ---- */
document.addEventListener("DOMContentLoaded",()=>{
  initParticles();
  renderSkills();
  renderProjects();
  renderCerts();
  observeFades();
});