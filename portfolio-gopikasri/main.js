/* =============================================
   PORTFOLIO — GOPIKASRI R
   All data pre-filled from resume.
   Everything persists in localStorage.
   ============================================= */

const DEFAULTS = {
  profile: {
    name: "Gopikasri R",
    role: "AI & ML Engineering Student",
    tagline: "Aspiring Machine Learning Engineer · 179+ LeetCode · Oracle Cloud Certified",
    email: "gopikasri268@gmail.com",
    phone: "+91-8428863078",
    location: "Tamil Nadu, India",
    linkedin: "https://linkedin.com/in/gopikasri-r",
    github: "https://github.com/gopikasri-ui",
    resume: "#",
    college: "Muthayammal Engineering College, Tamil Nadu",
    cgpa: "7.53",
    about1: "Motivated B.E. AI & Machine Learning student (CGPA: 7.53) with hands-on project experience building ML classification models and full-stack web applications. Proficient in Python, Scikit-learn, and TensorFlow fundamentals.",
    about2: "Oracle Cloud AI Foundations Certified with 179+ LeetCode problems solved. Seeking an internship in Machine Learning or Data Science to apply and grow my skills in a real-world environment.",
    photo: "https://via.placeholder.com/180x180/1a1a2e/e8c56d?text=GR"
  },
  skills: [
    { id: 1,  name: "Python",          icon: "fab fa-python"     },
    { id: 2,  name: "C / C++",         icon: "fas fa-code"       },
    { id: 3,  name: "JavaScript",      icon: "fab fa-js"         },
    { id: 4,  name: "SQL",             icon: "fas fa-database"   },
    { id: 5,  name: "HTML & CSS",      icon: "fab fa-html5"      },
    { id: 6,  name: "Scikit-learn",    icon: "fas fa-brain"      },
    { id: 7,  name: "TensorFlow",      icon: "fas fa-robot"      },
    { id: 8,  name: "NumPy & Pandas",  icon: "fas fa-table"      },
    { id: 9,  name: "Matplotlib",      icon: "fas fa-chart-line" },
    { id: 10, name: "Git & GitHub",    icon: "fab fa-github"     },
    { id: 11, name: "Jupyter / Colab", icon: "fas fa-book-open"  },
    { id: 12, name: "Oracle Cloud",    icon: "fas fa-cloud"      },
    { id: 13, name: "RESTful APIs",    icon: "fas fa-plug"       },
    { id: 14, name: "DSA (LeetCode)",  icon: "fas fa-sitemap"    }
  ],
  projects: [
    {
      id: 1,
      title: "Emergency Crowd Management System",
      desc: "Multi-class ML classification model to predict crowd density levels (Low / Moderate / Critical) from sensor data. Built end-to-end preprocessing pipeline with normalization, missing value imputation, and label encoding. Benchmarked Random Forest, SVM, and Logistic Regression; built automated alert pipeline with real-time heatmap dashboards.",
      tech: "Python,Scikit-learn,TensorFlow,NumPy,Pandas,Matplotlib",
      github: "https://github.com/gopikasri-ui/crowd-management-system",
      demo: "",
      img: ""
    },
    {
      id: 2,
      title: "Cyber Incident Portal",
      desc: "Full-stack web portal for logging, tracking, and resolving cybersecurity incidents with multi-role workflows for admins and regular users. Implemented JWT-based authentication, RBAC, and RESTful CRUD APIs integrated with real-time status dashboards.",
      tech: "Python,JavaScript,HTML/CSS,SQL,JWT,RBAC",
      github: "https://github.com/gopikasri-ui/cyberportal",
      demo: "",
      img: ""
    }
  ],
  certs: [
    {
      id: 1,
      title: "Oracle Cloud Infrastructure 2025 — AI Foundations Associate",
      issuer: "Oracle",
      date: "2025",
      link: "https://education.oracle.com"
    },
    {
      id: 2,
      title: "Software Engineering Job Simulation",
      issuer: "Forage",
      date: "2025–2026",
      link: "https://www.theforage.com"
    }
  ],
  experience: [
    {
      id: 1,
      role: "Hackathon Participant",
      company: "HackIndia National Hackathon",
      duration: "2025",
      type: "Competition",
      desc: "Ideated, prototyped, and presented a tech solution under competitive deadlines. Collaborated with team members to build a working MVP and pitch it to judges."
    }
  ],
  education: [
    {
      id: 1,
      degree: "B.E. — Artificial Intelligence & Machine Learning",
      school: "Muthayammal Engineering College, Tamil Nadu",
      year: "2024 – 2028 (Pursuing)",
      grade: "CGPA: 7.53 / 10"
    },
    {
      id: 2,
      degree: "Higher Secondary Certificate (Class XII)",
      school: "Vethathiri Maharishi Matric Higher Secondary School, Tamil Nadu",
      year: "Completed 2024",
      grade: ""
    }
  ]
};

// ── DB HELPERS ────────────────────────────────
function dbGet(key) {
  try { return JSON.parse(localStorage.getItem('portfolio_' + key)); } catch { return null; }
}
function dbSet(key, val) {
  localStorage.setItem('portfolio_' + key, JSON.stringify(val));
}

let profile    = dbGet('profile')    || { ...DEFAULTS.profile };
let skills     = dbGet('skills')     || [...DEFAULTS.skills];
let projects   = dbGet('projects')   || [...DEFAULTS.projects];
let certs      = dbGet('certs')      || [...DEFAULTS.certs];
let experience = dbGet('experience') || [...DEFAULTS.experience];
let education  = dbGet('education')  || [...DEFAULTS.education];
let messages   = dbGet('messages')   || [];

let nextId = Date.now();
function uid() { return ++nextId; }

// ── SAVE ALL ──────────────────────────────────
function saveAll() {
  dbSet('profile', profile); dbSet('skills', skills);
  dbSet('projects', projects); dbSet('certs', certs);
  dbSet('experience', experience); dbSet('education', education);
  renderAll();
  showToast('✅ Saved!');
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div'); t.id = 'toast';
    t.style.cssText = `position:fixed;bottom:5.5rem;right:2rem;z-index:9999;background:#2a2a55;color:#e8c56d;
      padding:0.6rem 1.3rem;border-radius:10px;font-size:0.9rem;font-weight:600;
      box-shadow:0 4px 20px rgba(0,0,0,0.4);transition:opacity 0.4s;pointer-events:none;`;
    document.body.appendChild(t);
  }
  t.textContent = msg; t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.style.opacity = '0', 2200);
}

// ── LIVE UPDATE ───────────────────────────────
function liveUpdate(field, val) { profile[field] = val; applyProfile(); }

function applyProfile() {
  const p = profile;
  setText('nav_name', p.name);
  setText('hero_name', p.name);
  setText('hero_role', p.role);
  setText('hero_tagline', p.tagline);
  setAttr('hero_resume', 'href', p.resume);
  setAttr('hero_github', 'href', p.github);
  setAttr('hero_linkedin', 'href', p.linkedin);
  setAttr('hero_email_link', 'href', 'mailto:' + p.email);
  setAttr('nav_resume', 'href', p.resume);
  const ph = document.getElementById('hero_photo');
  if (ph && p.photo) ph.src = p.photo;
  setText('about_p1', p.about1);
  setText('about_p2', p.about2);
  setText('about_college', p.college);
  setText('about_cgpa', p.cgpa);
  setText('about_email', p.email);
  setText('about_phone', p.phone);
  setText('about_location', p.location);
  setText('c_email_display', p.email);
  setText('c_phone_display', p.phone);
  setText('c_location_display', p.location);
  setAttr('c_github', 'href', p.github);
  setAttr('c_linkedin', 'href', p.linkedin);
  setText('footer_name', p.name);
}

function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function setAttr(id, attr, val) { const el = document.getElementById(id); if (el && val) el.setAttribute(attr, val); }

// ── RENDER ALL ────────────────────────────────
function renderAll() {
  applyProfile(); renderSkills(); renderProjects();
  renderCerts(); renderExperience(); renderEducation();
}

function renderSkills() {
  const grid = document.getElementById('skills_display');
  if (!grid) return;
  grid.innerHTML = skills.length
    ? skills.map(s => `<div class="skill-chip"><i class="${s.icon||'fas fa-star'}"></i>${s.name}</div>`).join('')
    : emptyState('fa-code','No skills added yet.');
  const list = document.getElementById('skills_list');
  if (!list) return;
  list.innerHTML = skills.map(s =>
    `<div class="edit-list-item"><i class="${s.icon||'fas fa-star'}" style="color:var(--gold);margin-right:0.4rem;"></i>
     <span>${s.name}</span><button class="del-btn" onclick="deleteSkill(${s.id})"><i class="fas fa-trash"></i></button></div>`
  ).join('');
}

function renderProjects() {
  const grid = document.getElementById('projects_display');
  if (!grid) return;
  if (!projects.length) { grid.innerHTML = emptyState('fa-folder-open','No projects added yet.'); return; }
  grid.innerHTML = projects.map(p => {
    const tags = p.tech.split(',').filter(t=>t.trim()).map(t=>`<span class="project-tag">${t.trim()}</span>`).join('');
    const imgHTML = p.img
      ? `<img src="${p.img}" class="project-img" alt="${p.title}" onerror="this.style.display='none'">`
      : `<div class="project-img-placeholder"><i class="fas fa-code"></i></div>`;
    const gBtn = p.github ? `<a href="${p.github}" target="_blank" class="link-github"><i class="fab fa-github"></i> Code</a>` : '';
    const dBtn = p.demo   ? `<a href="${p.demo}"   target="_blank" class="link-demo"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : '';
    return `<div class="project-card">${imgHTML}
      <div class="project-body">
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-tags">${tags}</div>
        <div class="project-links">${gBtn}${dBtn}</div>
      </div></div>`;
  }).join('');
  const list = document.getElementById('projects_list');
  if (!list) return;
  list.innerHTML = projects.map(p =>
    `<div class="edit-list-item"><span>${p.title}</span>
     <button class="del-btn" onclick="deleteProject(${p.id})"><i class="fas fa-trash"></i></button></div>`
  ).join('');
}

function renderCerts() {
  const grid = document.getElementById('certs_display');
  if (!grid) return;
  grid.innerHTML = certs.length
    ? certs.map(c => `<div class="cert-card">
        <div class="cert-icon"><i class="fas fa-certificate"></i></div>
        <div class="cert-body">
          <div class="cert-title">${c.title}</div>
          <div class="cert-issuer">${c.issuer}</div>
          <div class="cert-date">${c.date}</div>
          ${c.link?`<a href="${c.link}" target="_blank" class="cert-link">View Certificate ↗</a>`:''}
        </div></div>`).join('')
    : emptyState('fa-certificate','No certifications added yet.');
  const list = document.getElementById('certs_list');
  if (!list) return;
  list.innerHTML = certs.map(c =>
    `<div class="edit-list-item"><span>${c.title} — ${c.issuer}</span>
     <button class="del-btn" onclick="deleteCert(${c.id})"><i class="fas fa-trash"></i></button></div>`
  ).join('');
}

function renderExperience() {
  const el = document.getElementById('experience_display');
  if (!el) return;
  el.innerHTML = experience.length
    ? experience.map(e => `<div class="timeline-item"><div class="timeline-card">
        <div class="timeline-role">${e.role}</div>
        <div class="timeline-company">${e.company}</div>
        <div class="timeline-meta"><span>${e.duration}</span><span>${e.type}</span></div>
        <div class="timeline-desc">${e.desc}</div>
      </div></div>`).join('')
    : emptyState('fa-briefcase','No experience added yet.');
  const list = document.getElementById('experience_list');
  if (!list) return;
  list.innerHTML = experience.map(e =>
    `<div class="edit-list-item"><span>${e.role} @ ${e.company}</span>
     <button class="del-btn" onclick="deleteExperience(${e.id})"><i class="fas fa-trash"></i></button></div>`
  ).join('');
}

function renderEducation() {
  const el = document.getElementById('education_display');
  if (!el) return;
  el.innerHTML = education.length
    ? education.map(e => `<div class="timeline-item"><div class="timeline-card">
        <div class="timeline-role">${e.degree}</div>
        <div class="timeline-company">${e.school}</div>
        <div class="timeline-meta"><span>${e.year}</span>${e.grade?`<span>${e.grade}</span>`:''}</div>
      </div></div>`).join('')
    : emptyState('fa-graduation-cap','No education added yet.');
  const list = document.getElementById('education_list');
  if (!list) return;
  list.innerHTML = education.map(e =>
    `<div class="edit-list-item"><span>${e.degree} — ${e.school}</span>
     <button class="del-btn" onclick="deleteEducation(${e.id})"><i class="fas fa-trash"></i></button></div>`
  ).join('');
}

function renderMessages() {
  const list = document.getElementById('messages_list');
  if (!list) return;
  list.innerHTML = messages.length
    ? [...messages].reverse().map(m => `<div class="msg-card">
        <div class="msg-meta">From: <strong>${m.name}</strong> &lt;${m.email}&gt; · ${m.date}</div>
        <div class="msg-subject">Subject: ${m.subject||'(No subject)'}</div>
        <div class="msg-body">${m.message}</div>
      </div>`).join('')
    : `<div class="no-msgs"><i class="fas fa-inbox"></i><br>No messages yet. Messages from the contact form appear here.</div>`;
}

function clearMessages() {
  if (!confirm('Clear all messages?')) return;
  messages = []; dbSet('messages', messages); renderMessages();
  showToast('🗑️ Messages cleared');
}

function emptyState(icon, txt) {
  return `<div class="empty-state"><i class="fas ${icon}"></i>${txt}</div>`;
}

// ── ADD / DELETE ──────────────────────────────
function addSkill() {
  const name = document.getElementById('new_skill').value.trim();
  const icon = document.getElementById('new_skill_icon').value.trim();
  if (!name) return;
  skills.push({ id: uid(), name, icon: icon || 'fas fa-star' });
  document.getElementById('new_skill').value = '';
  document.getElementById('new_skill_icon').value = '';
  saveAll();
}
function deleteSkill(id) { skills = skills.filter(s => s.id !== id); saveAll(); }

function addProject() {
  const f = (id) => document.getElementById(id).value.trim();
  if (!f('p_title')) return;
  projects.push({ id: uid(), title: f('p_title'), desc: f('p_desc'), tech: f('p_tech'), github: f('p_github'), demo: f('p_demo'), img: f('p_img') });
  ['p_title','p_desc','p_tech','p_github','p_demo','p_img'].forEach(id => document.getElementById(id).value = '');
  saveAll();
}
function deleteProject(id) { projects = projects.filter(p => p.id !== id); saveAll(); }

function addCert() {
  const f = (id) => document.getElementById(id).value.trim();
  if (!f('c_title')) return;
  certs.push({ id: uid(), title: f('c_title'), issuer: f('c_issuer'), date: f('c_date'), link: f('c_link') });
  ['c_title','c_issuer','c_date','c_link'].forEach(id => document.getElementById(id).value = '');
  saveAll();
}
function deleteCert(id) { certs = certs.filter(c => c.id !== id); saveAll(); }

function addExperience() {
  const f = (id) => document.getElementById(id).value.trim();
  if (!f('ex_role')) return;
  experience.push({ id: uid(), role: f('ex_role'), company: f('ex_company'), duration: f('ex_duration'), type: f('ex_type'), desc: f('ex_desc') });
  ['ex_role','ex_company','ex_duration','ex_type','ex_desc'].forEach(id => document.getElementById(id).value = '');
  saveAll();
}
function deleteExperience(id) { experience = experience.filter(e => e.id !== id); saveAll(); }

function addEducation() {
  const f = (id) => document.getElementById(id).value.trim();
  if (!f('edu_degree')) return;
  education.push({ id: uid(), degree: f('edu_degree'), school: f('edu_school'), year: f('edu_year'), grade: f('edu_grade') });
  ['edu_degree','edu_school','edu_year','edu_grade'].forEach(id => document.getElementById(id).value = '');
  saveAll();
}
function deleteEducation(id) { education = education.filter(e => e.id !== id); saveAll(); }

// ── CONTACT FORM ──────────────────────────────
function sendMessage() {
  const f = (id) => document.getElementById(id).value.trim();
  if (!f('f_name') || !f('f_email') || !f('f_message')) { alert('Please fill Name, Email and Message.'); return; }
  messages.push({ id: uid(), name: f('f_name'), email: f('f_email'), subject: f('f_subject'), message: f('f_message'),
    date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) });
  dbSet('messages', messages);
  ['f_name','f_email','f_subject','f_message'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('form_success').style.display = 'block';
  setTimeout(() => document.getElementById('form_success').style.display = 'none', 4000);
  showToast('📬 Message stored!');
}

// ── PANEL ─────────────────────────────────────
function togglePanel() {
  document.getElementById('editPanel').classList.contains('open') ? closePanel() : openPanel();
}
function openPanel() {
  document.getElementById('editPanel').classList.add('open');
  document.getElementById('panelOverlay').classList.add('open');
  fillProfileFields();
  renderSkills(); renderProjects(); renderCerts();
  renderExperience(); renderEducation(); renderMessages();
}
function closePanel() {
  document.getElementById('editPanel').classList.remove('open');
  document.getElementById('panelOverlay').classList.remove('open');
}
function fillProfileFields() {
  const p = profile;
  const map = { e_name:p.name,e_role:p.role,e_tagline:p.tagline,e_email:p.email,e_phone:p.phone,
    e_location:p.location,e_linkedin:p.linkedin,e_github:p.github,e_resume:p.resume,
    e_college:p.college,e_cgpa:p.cgpa,e_about1:p.about1,e_about2:p.about2,e_photo:p.photo };
  Object.entries(map).forEach(([id,val]) => { const el=document.getElementById(id); if(el) el.value=val||''; });
}

// ── TABS ──────────────────────────────────────
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector(`[onclick="switchTab('${name}')"]`).classList.add('active');
  document.getElementById('tab-' + name).classList.add('active');
  if (name === 'messages') renderMessages();
}

// ── INIT ─────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
});
document.getElementById('footer_year').textContent = new Date().getFullYear();
renderAll();