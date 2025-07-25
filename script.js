
const skills = [
  'VOICE ARTIST',
  'ANCHOR',
  'MIMICRY',
  'VOICE MODULATION',
  'ALL EMOTION VOICE'
];
const rotatingSkills = document.getElementById('rotatingSkills');
let currentSkill = 0;
// Create skill elements
skills.forEach((skill, idx) => {
  const span = document.createElement('span');
  span.className = 'skill-text' + (idx === 0 ? ' active' : '');
  span.textContent = skill;
  rotatingSkills.appendChild(span);
});
const skillElements = document.querySelectorAll('.skill-text');
setInterval(() => {
  skillElements[currentSkill].classList.remove('active');
  currentSkill = (currentSkill + 1) % skills.length;
  skillElements[currentSkill].classList.add('active');
}, 1800);

// MIMICRY section logic
const mimicryBtn = document.getElementById('mimicryBtn');
const mimicryList = document.getElementById('mimicryList');
const actors = [
  { name: 'Amitabh Bachhan', file: 'amitabhbchaan.m4a' },
  { name: 'Pankaj Tripathi', file: 'Pankaj tripathi.m4a' },
  { name: 'Sunny Deol', file: 'sunny deol.mp3' },
  { name: 'Ajay Devgn', file: 'ajay devgon.mp3' },
  { name: 'Amrish Puri', file: 'amrish puri.mp3' },
  { name: 'Nawazuddin Siddiqui', file: 'Nawazuiddin sidduqi.m4a' },
  { name: 'SRK', file: 'SRK.mp3' },
  { name: 'Nana Patekar', file: 'nana patekhar.mp3' },
  { name: 'Gaur Gopal Das', file: 'gaur gopal das.mp3' },
  { name: 'Kulbhushan Khanda', file: 'k.mp3' }
];
let mimicryVisible = false;
mimicryBtn.addEventListener('click', () => {
  mimicryVisible = !mimicryVisible;
  mimicryList.style.display = mimicryVisible ? 'grid' : 'none';
  mimicryBtn.textContent = mimicryVisible ? 'Hide Mimicry' : 'MIMICRY';
  if (mimicryVisible) {
    mimicryList.innerHTML = '';
    actors.forEach((actor) => {
      const card = document.createElement('div');
      card.className = 'actor-card';
      const name = document.createElement('div');
      name.className = 'actor-name';
      name.textContent = actor.name;
      const playBtn = document.createElement('button');
      playBtn.className = 'play-btn';
      playBtn.textContent = 'Play';
      let audio = null;
      if (actor.file) {
        audio = document.createElement('audio');
        audio.src = `voices/${actor.file}`;
        audio.preload = 'none';
        playBtn.addEventListener('click', () => {
          // Pause all other audios
          document.querySelectorAll('.actor-card audio').forEach(a => { if (a !== audio) a.pause(); });
          if (audio.paused) {
            audio.currentTime = 0;
            audio.play();
          } else {
            audio.pause();
          }
        });
      } else {
        playBtn.disabled = true;
        playBtn.textContent = 'No Audio';
      }
      card.appendChild(name);
      card.appendChild(playBtn);
      if (audio) card.appendChild(audio);
      mimicryList.appendChild(card);
    });
  }
});

// ALL EMOTION VOICES section logic
const emotionBtn = document.getElementById('emotionBtn');
const emotionList = document.getElementById('emotionList');
const emotions = [
  { name: 'Angry', emoji: '😡', className: 'emotion-angry', file: 'angry.mp3' },
  { name: 'Shy', emoji: '🫣', className: 'emotion-shy', file: 'shy.mp3' },
  { name: 'Happy', emoji: '😃', className: 'emotion-happy', file: 'happy.mp3' },
  { name: 'Sad', emoji: '😢', className: 'emotion-sad', file: 'sad.mp3' },
  { name: 'Surprised', emoji: '😲', className: 'emotion-surprised', file: 'surprised.mp3' },
  { name: 'Confident', emoji: '😎', className: 'emotion-confident', file: 'confident.mp3' },
  { name: 'Confused', emoji: '😕', className: 'emotion-confused', file: 'confused.mp3' },
  { name: 'Excited', emoji: '🤩', className: 'emotion-excited', file: 'excited.mp3' }
];
let emotionVisible = false;
emotionBtn.addEventListener('click', () => {
  emotionVisible = !emotionVisible;
  emotionList.style.display = emotionVisible ? 'grid' : 'none';
  emotionBtn.textContent = emotionVisible ? 'Hide Emotion Voices' : 'ALL EMOTION VOICES';
  if (emotionVisible) {
    emotionList.innerHTML = '';
    emotions.forEach((emotion) => {
      const card = document.createElement('div');
      card.className = `emotion-card ${emotion.className}`;
      const emoji = document.createElement('div');
      emoji.className = 'emoji';
      emoji.textContent = emotion.emoji;
      const name = document.createElement('div');
      name.className = 'emotion-name';
      name.textContent = emotion.name;
      const playBtn = document.createElement('button');
      playBtn.className = 'play-btn';
      playBtn.textContent = 'Play';
      let audio = null;
      if (emotion.file) {
        audio = document.createElement('audio');
        audio.src = `voices/${emotion.file}`;
        audio.preload = 'none';
        playBtn.addEventListener('click', () => {
          // Pause all other audios
          document.querySelectorAll('.emotion-card audio').forEach(a => { if (a !== audio) a.pause(); });
          if (audio.paused) {
            audio.currentTime = 0;
            audio.play();
          } else {
            audio.pause();
          }
        });
      } else {
        playBtn.disabled = true;
        playBtn.textContent = 'No Audio';
      }
      card.appendChild(emoji);
      card.appendChild(name);
      card.appendChild(playBtn);
      if (audio) card.appendChild(audio);
      emotionList.appendChild(card);
    });
  }
});
// Dynamic role animation
const roles = [
  'MIMICRY',
  'VOICE MODULATION',
  'ALL EMOTION VOICES',
  'ANCHORING'
];
const animatedRole = document.getElementById('animated-role');
let roleIndex = 0;
function showRole() {
  animatedRole.style.opacity = 0;
  setTimeout(() => {
    animatedRole.textContent = roles[roleIndex];
    animatedRole.style.opacity = 1;
    setTimeout(() => {
      animatedRole.style.opacity = 0;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(showRole, 400);
    }, 1800);
  }, 400);
}
animatedRole.style.transition = 'opacity 0.4s';
showRole();
// Scroll to Contact Details section
function scrollToContact() {
  const contactSection = document.getElementById('contact-details');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    contactSection.classList.remove('highlight');
    // Force reflow to restart animation if needed
    void contactSection.offsetWidth;
    contactSection.classList.add('highlight');
    setTimeout(() => {
      contactSection.classList.remove('highlight');
    }, 1500);
  }
}