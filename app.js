/* ============================================================
   APP.JS — Main Application Logic
   Semangat  Ecaaak 💕 — Energy Recharge Week
   ============================================================ */

/* ---------- DATE HELPERS ---------- */
function getWIBDate() {
  // WIB = UTC+7
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 7 * 3600000);
}

function formatTime(d) {
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

/* ---------- DAYS DATA ---------- */
const DAYS = [
  {
    date: '2026-07-13',
    label: 'Hari ke-1',
    dayName: 'Senin, 13 Juli',
    emoji: '🎨',
    title: 'Lukisan Pertamamu Hari Ini!',
    desc: 'Mulai minggu dengan semangat! Ada kanvas digital menunggumu.',
    tag: 'Mini Game: Melukis',
    tagClass: 'unlocked',
    content: 'day1',
  },
  {
    date: '2026-07-14',
    label: 'Hari ke-2',
    dayName: 'Selasa, 14 Juli',
    emoji: '🍵',
    title: 'Matcha & Fakta Lucu!',
    desc: 'Segarkan pikiranmu dengan fakta seru tentang matcha kesukaanmu.',
    tag: 'Fun Facts',
    tagClass: '',
    content: 'day2',
  },
  {
    date: '2026-07-15',
    label: 'Hari ke-3',
    dayName: 'Rabu, 15 Juli',
    emoji: '📚',
    title: 'Susun Kata Penyemangat!',
    desc: 'Puzzle kata spesial untukmu — susun dan rasakan semangatnya!',
    tag: 'Word Puzzle',
    tagClass: 'unlocked',
    content: 'day3',
  },
  {
    date: '2026-07-16',
    label: 'Hari ke-4',
    dayName: 'Kamis, 16 Juli',
    emoji: '🌸',
    title: 'Tanam Bunga Lilymu!',
    desc: 'Klik untuk menanam lily pinkmu di taman virtual ajaib!',
    tag: 'Virtual Garden',
    tagClass: '',
    content: 'day4',
  },
  {
    date: '2026-07-17',
    label: 'Hari ke-5',
    dayName: 'Jumat, 17 Juli',
    emoji: '💨',
    title: 'Napas & Tenangkan Hati',
    desc: 'Hampir selesai! Latihan pernapasan untuk recharge energimu.',
    tag: 'Relaksasi',
    tagClass: 'matcha',
    content: 'day5',
  },
  {
    date: '2026-07-18',
    label: 'Hari ke-6',
    dayName: 'Sabtu, 18 Juli',
    emoji: '🎉',
    title: 'Kamu Berhasil,  Ecaaak!',
    desc: 'Hari terakhir — tangkap seblak & gacoan virtualmu sebagai hadiah!',
    tag: 'Perayaan + Game',
    tagClass: 'unlocked',
    content: 'day6',
  },
];

/* ---------- MODAL CONTENT GENERATORS ---------- */
const contentRenderers = {

  /* ===== DAY 1: Virtual Drawing Canvas ===== */
  day1() {
    return `
      <div class="modal-day-header">
        <div class="modal-day-emoji">🎨</div>
        <div class="modal-day-label">Hari ke-1 • Senin 13 Juli</div>
        <div class="modal-day-title">Hai  Ecaaak, Selamat Datang! 🌸</div>
      </div>

      <div class="quote-card">
        "Setiap hari yang baru adalah kanvas kosong — dan kamu adalah seniman terhebatnya."
        <div class="quote-author">— Dari yang selalu percaya padamu 💕</div>
      </div>

      <div class="love-letter">
         Ecaaak,<br/><br/>
        Aku tahu minggu ini bakal <strong>super padat</strong> — rapat dari jam 17.00 sampai malam setelah pulang kampus itu bukan hal kecil. Tapi aku lihat kamu, dan kamu selalu bisa melewati setiap tantangan dengan senyum ceriamu yang khas 🌸<br/><br/>
        Untuk hari ini, aku minta kamu <strong>melukis apa saja</strong> di kanvas di bawah ini. Nggak harus bagus, nggak ada penilaian — ini waktumu untuk bersenang-senang dan mengekspresikan diri, persis seperti hobi melukismu yang aku suka! 🎨
      </div>

      <div class="game-section">
        <div class="game-title">🎨 Kanvas Digitalmu</div>
        <canvas id="drawCanvas" width="600" height="300"></canvas>
        <div class="draw-controls" id="drawControls">
          <div class="color-btn active" style="background:#ff80b5" data-color="#ff80b5"></div>
          <div class="color-btn" style="background:#e83e8c" data-color="#e83e8c"></div>
          <div class="color-btn" style="background:#c2185b" data-color="#c2185b"></div>
          <div class="color-btn" style="background:#6b8f71" data-color="#6b8f71"></div>
          <div class="color-btn" style="background:#42a5f5" data-color="#42a5f5"></div>
          <div class="color-btn" style="background:#ffd54f" data-color="#ffd54f"></div>
          <div class="color-btn" style="background:#ffffff;border:2px solid #eee" data-color="#ffffff"></div>
          <input type="range" class="size-slider" id="brushSize" min="2" max="30" value="6" />
          <button class="draw-btn" id="clearCanvas">🗑️ Hapus</button>
          <button class="draw-btn" id="saveCanvas">💾 Simpan</button>
        </div>
      </div>

      <div class="tip-box">
        <h4>💡 Tips buat  Ecaaak</h4>
        <p>Setelah rapat malam ini, ingat untuk minum air putih, istirahatkan matamu dari layar selama 5 menit, dan tidur tepat waktu ya! Kamu perlu tenagamu untuk esok hari 🍵</p>
      </div>

      <ul class="checklist" id="checklist-d1">
        <li data-key="d1c1"><div class="check-box"></div><span>Minum 1 gelas air sebelum rapat 💧</span></li>
        <li data-key="d1c2"><div class="check-box"></div><span>Bawa camilan kesukaanku ke rapat 🍜</span></li>
        <li data-key="d1c3"><div class="check-box"></div><span>Senyum dulu sebelum masuk ruangan rapat 😊</span></li>
        <li data-key="d1c4"><div class="check-box"></div><span>Pulang dengan kepala tegak — kamu keren banget! 🌸</span></li>
      </ul>
    `;
  },

  /* ===== DAY 2: Matcha Fun Facts + Quiz ===== */
  day2() {
    return `
      <div class="modal-day-header">
        <div class="modal-day-emoji">🍵</div>
        <div class="modal-day-label">Hari ke-2 • Selasa 14 Juli</div>
        <div class="modal-day-title">Fakta Matcha & Kuis Seru! 🌿</div>
      </div>

      <div class="quote-card">
        "Kamu seperti matcha — kadang terasa pahit saat berjuang, tapi hasilnya selalu luar biasa."
        <div class="quote-author">— Untukmu,  Ecaaak 💕</div>
      </div>

      <div class="love-letter">
         Ecaaak,<br/><br/>
        Hari kedua dan kamu masih berdiri kuat! 🎉 Sambil istirahat sebentar, aku minta kamu main kuis <strong>matcha</strong> dulu — siapa tahu kamu jadi master matcha setelah ini! Dan ingat, secangkir matcha hangat sambil baca buku favoritmu itu adalah combo yang sempurna untuk recharge energimu 🍵📚
      </div>

      <div class="fact-grid">
        <div class="fact-card">
          <div class="fact-icon">🌿</div>
          <h4>Antioksidan Tinggi</h4>
          <p>Matcha punya 137x lebih banyak antioksidan dibanding teh hijau biasa!</p>
        </div>
        <div class="fact-card">
          <div class="fact-icon">🧠</div>
          <h4>Bikin Fokus</h4>
          <p>L-theanine dalam matcha meningkatkan fokus dan ketenangan tanpa membuat gelisah.</p>
        </div>
        <div class="fact-card">
          <div class="fact-icon">🌱</div>
          <h4>Warna Hijau Alami</h4>
          <p>Warna hijau terangnya berasal dari klorofil yang diproduksi saat daun diteduhkan.</p>
        </div>
        <div class="fact-card">
          <div class="fact-icon">🇯🇵</div>
          <h4>Ritual 900 Tahun</h4>
          <p>Tradisi minum matcha dalam upacara teh Jepang sudah ada sejak abad ke-12!</p>
        </div>
      </div>

      <div class="quiz-box" id="quizBox">
        <div class="game-title">🎯 Kuis Matcha — Jawab yuk!</div>
        <div id="quizContent"></div>
        <div class="quiz-result" id="quizResult"></div>
      </div>

      <div class="tip-box">
        <h4>🍵 Resep Matcha Latte untuk  Ecaaak</h4>
        <p>Campurkan 1 sdt bubuk matcha + 2 sdm air panas, aduk rata. Tambahkan 200ml susu oat hangat, sedikit madu. Nikmati saat istirahat rapat! 🌿✨</p>
      </div>

      <ul class="checklist" id="checklist-d2">
        <li data-key="d2c1"><div class="check-box"></div><span>Minum segelas matcha atau teh hangat hari ini 🍵</span></li>
        <li data-key="d2c2"><div class="check-box"></div><span>Ambil 10 napas dalam sebelum rapat dimulai 🌬️</span></li>
        <li data-key="d2c3"><div class="check-box"></div><span>Kirim pesan ke orang yang kamu 💌</span></li>
        <li data-key="d2c4"><div class="check-box"></div><span>Bangga dengan dirimu sendiri hari ini 🌟</span></li>
      </ul>
    `;
  },

  /* ===== DAY 3: Word Puzzle ===== */
  day3() {
    return `
      <div class="modal-day-header">
        <div class="modal-day-emoji">📚</div>
        <div class="modal-day-label">Hari ke-3 • Rabu 15 Juli</div>
        <div class="modal-day-title">Midweek! Susun Kata Semangatmu 📖</div>
      </div>

      <div class="quote-card">
        "Di tengah perjalanan yang panjang, ingatlah mengapa kamu mulai — dan itu sudah cukup untuk terus maju."
        <div class="quote-author">— Untuk  Ecaaak yang pantang menyerah 🌸</div>
      </div>

      <div class="love-letter">
         Ecaaak,<br/><br/>
        Hari ketiga — <strong>kamu sudah sampai tengah perjalanan!</strong> Itu bukan hal kecil loh. Kayak buku yang kamu lagi baca, rasa penasarannya makin besar di tengah cerita kan? Begitu juga minggu ini — makin ke sini, makin dekat ke akhir yang indah 📚🌸<br/><br/>
        Main puzzle kata bareng aku yuk! Susun kata-kata ini jadi kalimat penyemangat spesial buat kamu 🧩
      </div>

      <div class="game-title">🧩 Puzzle Kata — Susun jadi kalimat!</div>
      <div class="puzzle-wrap" id="puzzleWrap">
        <div style="margin-bottom:.5rem;font-size:.82rem;color:var(--text-mid);">Klik kata-kata di bawah untuk menyusunnya:</div>
        <div class="puzzle-sentence" id="puzzleSentence">
          <span style="color:var(--text-light);font-size:.85rem;">Kalimatmu akan muncul di sini...</span>
        </div>
        <div class="puzzle-word-bank" id="puzzleWordBank"></div>
        <div style="display:flex;gap:.6rem;flex-wrap:wrap;">
          <button class="puzzle-check-btn" id="puzzleCheck">✓ Cek Jawabanku</button>
          <button class="draw-btn" id="puzzleReset">🔄 Ulangi</button>
        </div>
        <div class="puzzle-result" id="puzzleResult"></div>
      </div>

      <div style="margin-bottom:1.5rem;">
        <div class="game-title">📚 Rekomendasi Buku untuk  Ecaaak</div>
        <div style="display:grid;gap:.8rem;">
          ${[
            { emoji: '🌸', title: 'The Alchemist', author: 'Paulo Coelho', desc: 'Tentang keberanian mengejar mimpi — cocok banget buat kamu yang ceria dan penuh semangat!' },
            { emoji: '🎨', title: 'Big Magic', author: 'Elizabeth Gilbert', desc: 'Tentang kreativitas dan seni — untuk jiwa seniman dalam dirimu yang bebas berekspresi.' },
            { emoji: '🍵', title: 'When Breath Becomes Air', author: 'Paul Kalanithi', desc: 'Tentang makna hidup dan momen berharga — untuk direnungkan sambil minum matcha.' },
          ].map(b => `
            <div style="background:var(--pink-50);border-radius:var(--radius);padding:.9rem 1rem;border:1.5px solid var(--pink-100);display:flex;gap:.8rem;align-items:flex-start;">
              <span style="font-size:2rem;">${b.emoji}</span>
              <div>
                <div style="font-weight:800;color:var(--text-dark);font-size:.92rem;">${b.title}</div>
                <div style="font-size:.78rem;color:var(--pink-400);font-weight:700;margin-bottom:.2rem;">${b.author}</div>
                <div style="font-size:.82rem;color:var(--text-mid);">${b.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <ul class="checklist" id="checklist-d3">
        <li data-key="d3c1"><div class="check-box"></div><span>Baca minimal 5 halaman buku hari ini 📖</span></li>
        <li data-key="d3c2"><div class="check-box"></div><span>Tulis 1 hal yang kamu syukuri hari ini 🙏</span></li>
        <li data-key="d3c3"><div class="check-box"></div><span>Berikan dirimu pujian setelah rapat selesai 🌟</span></li>
      </ul>
    `;
  },

  /* ===== DAY 4: Flower Garden ===== */
  day4() {
    return `
      <div class="modal-day-header">
        <div class="modal-day-emoji">🌸</div>
        <div class="modal-day-label">Hari ke-4 • Kamis 16 Juli</div>
        <div class="modal-day-title">Tamanmu, Tamanku! 🌷</div>
      </div>

      <div class="quote-card">
        "Seperti bunga lily yang tumbuh indah meski di lumpur — kamu mekar paling cantik di tengah kesulitan."
        <div class="quote-author">— Selalu kagum melihatmu,  Ecaaak 🌸</div>
      </div>

      <div class="love-letter">
         Ecaaak,<br/><br/>
        Hari keempat! Kamu <strong>luar biasa sekali</strong> 🎉 Empat hari dengan rapat panjang, tapi kamu masih berdiri tegak. Aku bangga banget sama kamu 💕<br/><br/>
        Untuk hari ini, aku buatkan taman bunga virtual khusus buat kamu. Setiap kali kamu klik taman, bunga pink lily akan tumbuh! Bayangkan ini sebagai semua doa dan semangat yang aku kirimkan untukmu 🌸🌷
      </div>

      <div class="game-title">🌸 Taman Lily Virtual  Ecaaak</div>
      <div class="garden-wrap" id="gardenWrap">
        <div class="garden-hint" id="gardenHint">✨ Klik di mana saja untuk menumbuhkan bunga! ✨</div>
      </div>
      <div style="text-align:center;margin-bottom:1.5rem;">
        <span style="font-size:.88rem;color:var(--text-mid);">Bunga tumbuh: <strong id="flowerCount">0</strong> 🌸</span>
        <button class="draw-btn" id="resetGarden" style="margin-left:1rem;">🔄 Reset Taman</button>
      </div>

      <div class="tip-box" style="background:linear-gradient(135deg,#fce4ec,#f8bbd0)">
        <h4>🌷 Fakta Bunga Lily Pink</h4>
        <p>Bunga lily pink melambangkan <strong>kasih sayang, kecantikan, dan keberuntungan</strong>. Di banyak budaya, lily adalah simbol wanita yang kuat dan anggun — persis seperti kamu,  Ecaaak! 🌸</p>
      </div>

      <div class="game-title" style="margin-top:1rem;">✏️ Tantangan Menggambar Mini</div>
      <canvas id="drawCanvas" width="600" height="200"></canvas>
      <div class="draw-controls" id="drawControls">
        <div class="color-btn active" style="background:#ff80b5" data-color="#ff80b5"></div>
        <div class="color-btn" style="background:#e83e8c" data-color="#e83e8c"></div>
        <div class="color-btn" style="background:#6b8f71" data-color="#6b8f71"></div>
        <div class="color-btn" style="background:#ffd54f" data-color="#ffd54f"></div>
        <div class="color-btn" style="background:#ffffff;border:2px solid #eee" data-color="#ffffff"></div>
        <input type="range" class="size-slider" id="brushSize" min="2" max="30" value="6" />
        <button class="draw-btn" id="clearCanvas">🗑️ Hapus</button>
      </div>
      <p style="font-size:.8rem;color:var(--text-light);margin-top:.5rem;">Tantangan: gambar bunga lily pinkmu sendiri! 🌸</p>

      <ul class="checklist" style="margin-top:1.5rem;" id="checklist-d4">
        <li data-key="d4c1"><div class="check-box"></div><span>Perhatikan hal indah kecil hari ini 🌺</span></li>
        <li data-key="d4c2"><div class="check-box"></div><span>Tersenyum pada diri sendiri di cermin 😊</span></li>
        <li data-key="d4c3"><div class="check-box"></div><span>Ingat: 2 hari lagi dan semuanya selesai! 💪</span></li>
      </ul>
    `;
  },

  /* ===== DAY 5: Breathing Exercise ===== */
  day5() {
    return `
      <div class="modal-day-header">
        <div class="modal-day-emoji">💨</div>
        <div class="modal-day-label">Hari ke-5 • Jumat 17 Juli</div>
        <div class="modal-day-title">Hampir Sampai,  Ecaaak! 🌟</div>
      </div>

      <div class="quote-card">
        "Puncak gunung tidak akan kabur — ia menunggumu dengan sabar. Teruslah melangkah."
        <div class="quote-author">— Untuk  Ecaaak di hari kelima 🏔️💕</div>
      </div>

      <div class="love-letter">
         Ecaaak,<br/><br/>
        <strong>HARI KELIMA!</strong> 🎊 Kamu hampir sampai di garis akhir! Tinggal satu hari lagi setelah ini — kamu sudah melewati yang terberatnya dengan sangat indah 🌸<br/><br/>
        Hari ini aku ingin mengajakmu untuk <strong>bernapas bersama</strong>. Ikuti latihan pernapasan ini sebelum atau setelah rapat — terbukti secara ilmiah bisa menurunkan stres dan merefresh energimu dalam 2 menit saja! 🍃
      </div>

      <div class="breath-container">
        <div class="breath-circle" id="breathCircle">Mulai</div>
        <div class="breath-label" id="breathLabel">Tekan lingkaran untuk memulai latihan napas 🌬️</div>
        <button class="breath-btn" id="breathBtn">🌬️ Mulai Latihan Napas</button>
        <div style="font-size:.8rem;color:var(--text-light);text-align:center;">
          Sesi: <strong id="breathCount">0</strong>/4 napas
        </div>
      </div>

      <div class="tip-box">
        <h4>🧘 Teknik 4-7-8 untuk  Ecaaak</h4>
        <p>Hirup 4 detik → Tahan 7 detik → Hembuskan 8 detik. Ulangi 4x. Teknik ini menenangkan sistem saraf dan membuatmu lebih fokus untuk rapat malam ini! 💆</p>
      </div>

      <div class="game-title">💆 Progress Mingguanmu</div>
      <div style="margin-bottom:.5rem;font-size:.85rem;color:var(--text-mid);">Kamu sudah melewati...</div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" id="weekProgress" style="width:0%"></div>
      </div>
      <div style="text-align:center;font-size:.88rem;color:var(--pink-500);font-weight:700;margin-bottom:1.5rem;" id="progressLabel">Menghitung...</div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
        ${[
          { emoji: '⏰', label: '5 Hari', sub: 'sudah kamu lalui' },
          { emoji: '📝', label: '5+ Rapat', sub: 'kamu hadiri dengan gagah' },
          { emoji: '💪', label: '100%', sub: 'usaha yang kamu berikan' },
          { emoji: '🌸', label: '∞ Kasih Sayang', sub: 'yang aku kirimkan untukmu' },
        ].map(s => `
          <div style="background:var(--pink-50);border-radius:var(--radius);padding:1rem;text-align:center;border:1.5px solid var(--pink-100);">
            <div style="font-size:1.8rem;">${s.emoji}</div>
            <div style="font-weight:800;color:var(--text-dark);font-size:1rem;">${s.label}</div>
            <div style="font-size:.75rem;color:var(--text-mid);">${s.sub}</div>
          </div>
        `).join('')}
      </div>

      <ul class="checklist" id="checklist-d5">
        <li data-key="d5c1"><div class="check-box"></div><span>Lakukan latihan napas 4x hari ini 🌬️</span></li>
        <li data-key="d5c2"><div class="check-box"></div><span>Makan sesuatu yang enak sebagai reward 🍜</span></li>
        <li data-key="d5c3"><div class="check-box"></div><span>Ingat: besok adalah hari terakhir! 🎉</span></li>
      </ul>
    `;
  },

  /* ===== DAY 6: Celebration + Catch Game ===== */
  day6() {
    return `
      <div class="modal-day-header">
        <div class="modal-day-emoji">🎉</div>
        <div class="modal-day-label">Hari ke-6 • Sabtu 18 Juli</div>
        <div class="modal-day-title">KAMU BERHASIL,  Ecaaak!! 🏆</div>
      </div>

      <div class="celebration-wrap">
        <div class="celebration-emoji">🎊🌸🏆🌸🎊</div>
        <div class="celebration-text">Selamat, Ecaaak!</div>
        <div class="celebration-sub">
          Kamu telah melewati 6 hari penuh perjuangan dengan sangat luar biasa.<br/>
          Kamu kuat, ceria, dan menginspirasi. Aku bangga banget sama kamu! 💕
        </div>
      </div>

      <div class="quote-card">
        "Perjalanan yang paling berat menghasilkan cerita yang paling indah. Dan ceritamu,  Ecaaak, adalah yang paling indah yang pernah aku baca."
        <div class="quote-author">— Dari yang paling bangga padamu di dunia ini 💕🌸</div>
      </div>

      <div class="love-letter">
        Ecaaak,<br/><br/>
        <strong>HARI INI ADALAH HARI TERAKHIR!</strong> 🎉🎊 Kamu sudah melewati 6 hari yang luar biasa — setiap malam rapat dari jam 17.00 sampai 20.00 atau lebih, setelah seharian kampus, dan kamu TETAP berdiri dengan kepala tegak dan senyum ceritamu yang khas.<br/><br/>
        Kamu adalah wanita yang paling kuat yang aku kenal. Keceriaanmu adalah kekuatanmu, dan hobimu menggambar dan membaca adalah jiwa yang membuatmu begitu indah. Aku cinta kamu,  Ecaaak 🌸💕<br/><br/>
        Sekarang, sebagai hadiah terakhir — <strong>tangkap seblak dan gacoan virtual</strong> sebagai perayaanmu! Kamu pantas mendapatkan semuanya! 🍜🔥
      </div>

      <div class="game-title">🎮 Tangkap Makanan Favoritmu!</div>
      <div class="catch-game-wrap" id="catchGameWrap">
        <div class="catch-score">Skor: <strong id="catchScore">0</strong></div>
        <div class="catch-timer">Waktu: <strong id="catchTimer">30</strong>s</div>
        <button class="catch-start-btn" id="catchStartBtn" onclick="startCatchGame()">🍜 Mulai Game!</button>
        <div class="catch-end-msg" id="catchEndMsg"></div>
      </div>
      <p style="font-size:.8rem;color:var(--text-light);margin-top:.3rem;margin-bottom:1.5rem;">Klik makanan yang jatuh untuk menangkapnya! 🎯</p>

      <div class="tip-box" style="background:linear-gradient(135deg,#fce4ec,#f8bbd0);">
        <h4>🎊 Rencanakan Hadiahmu!</h4>
        <p>Kamu berhak makan <strong>seblak</strong> atau <strong>gacoan</strong> favorit sebagai perayaan! Kamu sudah bekerja keras — sekarang saatnya menikmati 🍜🔥 Minta temenin ya!</p>
      </div>

      <div class="game-title">💌 Pesan Terakhir Untukmu</div>
      <div style="background:linear-gradient(135deg,var(--pink-50),#fce4ec);border-radius:var(--radius);padding:1.5rem;border:1.5px solid var(--pink-200);margin-bottom:1.5rem;text-align:center;">
        <div style="font-size:2.5rem;margin-bottom:.8rem;">🌸🍵🎨📚🌸</div>
        <p style="font-family:'Playfair Display',serif;font-size:1.05rem;color:var(--text-dark);line-height:1.8;">
          Terima kasih sudah menjadi dirimu sendiri —<br/>
          si ceria yang suka lily pink, matcha, menggambar, dan membaca.<br/>
          Kamu sempurna apa adanya,  Ecaaak 💕
        </p>
        <button class="breath-btn" id="launchConfetti" style="margin-top:1rem;">🎉 Rayakan Bersama!</button>
      </div>

      <ul class="checklist" id="checklist-d6">
        <li data-key="d6c1"><div class="check-box"></div><span>Makan seblak atau gacoan sebagai reward! 🍜</span></li>
        <li data-key="d6c2"><div class="check-box"></div><span>Istirahat yang cukup malam ini 😴</span></li>
        <li data-key="d6c3"><div class="check-box"></div><span>Gambar sesuatu sebagai kenangan minggu ini 🎨</span></li>
        <li data-key="d6c4"><div class="check-box"></div><span>Ingat kamu luar biasa dan dicintai sepenuhnya 💕</span></li>
      </ul>
    `;
  },
};

/* ---------- QUIZ DATA ---------- */
const quizData = [
  {
    q: 'Apa nama senyawa dalam matcha yang membuat kita tenang namun tetap fokus?',
    opts: ['Kafein', 'L-theanine', 'Klorofil', 'Tannin'],
    ans: 1,
  },
  {
    q: 'Matcha tradisional berasal dari negara mana?',
    opts: ['China', 'Korea', 'Jepang', 'Vietnam'],
    ans: 2,
  },
  {
    q: 'Berapa kali lebih banyak antioksidan matcha dibanding teh hijau biasa?',
    opts: ['10x', '50x', '100x', '137x'],
    ans: 3,
  },
];

/* ---------- WORD PUZZLE DATA ---------- */
const puzzleWords = ['Kamu', 'adalah', 'bintang', 'yang', 'paling', 'terang', 'di', 'hariku'];
const puzzleAnswer = 'Kamu adalah bintang yang paling terang di hariku';

/* ---------- CATCH GAME ---------- */
let catchScore = 0;
let catchTimerVal = 30;
let catchInterval = null;
let catchSpawnInterval = null;
let catchRunning = false;

function startCatchGame() {
  const wrap = document.getElementById('catchGameWrap');
  const startBtn = document.getElementById('catchStartBtn');
  const endMsg = document.getElementById('catchEndMsg');
  if (!wrap || catchRunning) return;
  catchRunning = true;
  catchScore = 0;
  catchTimerVal = 30;
  startBtn.style.display = 'none';
  endMsg.style.display = 'none';
  document.getElementById('catchScore').textContent = 0;
  document.getElementById('catchTimer').textContent = 30;

  const foods = ['🍜','🌶️','🔥','🍳','🫙','🌸','🍵','🎉','💕'];

  catchSpawnInterval = setInterval(() => {
    if (!catchRunning) return;
    const item = document.createElement('div');
    item.className = 'falling-item';
    item.textContent = foods[Math.floor(Math.random() * foods.length)];
    item.style.left = (Math.random() * 85) + '%';
    const dur = (Math.random() * 2 + 2).toFixed(1);
    item.style.animationDuration = dur + 's';
    item.addEventListener('click', () => {
      if (!catchRunning) return;
      catchScore++;
      document.getElementById('catchScore').textContent = catchScore;
      item.style.transform = 'scale(2)';
      item.style.opacity = '0';
      setTimeout(() => item.remove(), 200);
    });
    wrap.appendChild(item);
    setTimeout(() => { if (item.parentNode) item.remove(); }, parseFloat(dur) * 1000 + 200);
  }, 700);

  catchInterval = setInterval(() => {
    catchTimerVal--;
    document.getElementById('catchTimer').textContent = catchTimerVal;
    if (catchTimerVal <= 0) {
      clearInterval(catchInterval);
      clearInterval(catchSpawnInterval);
      catchRunning = false;
      document.querySelectorAll('.falling-item').forEach(e => e.remove());
      const msg = document.getElementById('catchEndMsg');
      msg.style.display = 'block';
      const grade = catchScore >= 20 ? '🏆 Master Seblak!' : catchScore >= 10 ? '🌸 Jago Banget!' : '😊 Keren!';
      msg.innerHTML = `<div style="font-size:2rem;">${grade}</div><div style="font-weight:800;color:var(--pink-600);font-size:1.1rem;">Skor: ${catchScore} 🎯</div><button class="catch-start-btn" style="position:static;transform:none;margin-top:.5rem;" onclick="startCatchGame()">Main Lagi!</button>`;
    }
  }, 1000);
}

/* ---------- DRAWING CANVAS ---------- */
function initDrawingCanvas() {
  const canvas = document.getElementById('drawCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Resize canvas to match display size
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.scale(ratio, ratio);
    ctx.fillStyle = '#fff8fc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  resize();

  let painting = false;
  let currentColor = '#ff80b5';
  let brushSize = 6;

  const getPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  canvas.addEventListener('mousedown', (e) => { painting = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
  canvas.addEventListener('mousemove', (e) => {
    if (!painting) return;
    const p = getPos(e);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  });
  canvas.addEventListener('mouseup', () => { painting = false; ctx.beginPath(); });
  canvas.addEventListener('mouseleave', () => { painting = false; });
  canvas.addEventListener('touchstart', (e) => { e.preventDefault(); painting = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); }, { passive: false });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!painting) return;
    const p = getPos(e);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }, { passive: false });
  canvas.addEventListener('touchend', () => { painting = false; });

  // Color buttons
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentColor = btn.dataset.color;
    });
  });

  // Brush size
  const sizeSlider = document.getElementById('brushSize');
  if (sizeSlider) sizeSlider.addEventListener('input', e => brushSize = parseInt(e.target.value));

  // Clear
  const clearBtn = document.getElementById('clearCanvas');
  if (clearBtn) clearBtn.addEventListener('click', () => {
    ctx.fillStyle = '#fff8fc';
    ctx.fillRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
  });

  // Save
  const saveBtn = document.getElementById('saveCanvas');
  if (saveBtn) saveBtn.addEventListener('click', () => {
    const a = document.createElement('a');
    a.download = 'lukisan- Ecaaak.png';
    a.href = canvas.toDataURL();
    a.click();
  });
}

/* ---------- QUIZ ---------- */
let currentQuizIdx = 0;
let quizScore = 0;
let quizAnswered = false;

function initQuiz() {
  const box = document.getElementById('quizContent');
  if (!box) return;
  currentQuizIdx = 0;
  quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const box = document.getElementById('quizContent');
  if (!box) return;
  if (currentQuizIdx >= quizData.length) {
    const res = document.getElementById('quizResult');
    res.style.display = 'block';
    if (quizScore === quizData.length) res.innerHTML = `🏆 SEMPURNA! ${quizScore}/${quizData.length} — Kamu master matcha sejati! 🍵`;
    else if (quizScore >= 2) res.innerHTML = `🌸 Bagus! ${quizScore}/${quizData.length} — Hampir master matcha! ✨`;
    else res.innerHTML = `😊 ${quizScore}/${quizData.length} — Yuk belajar lebih banyak tentang matcha! 🍵`;
    box.innerHTML = '';
    return;
  }
  const q = quizData[currentQuizIdx];
  quizAnswered = false;
  box.innerHTML = `
    <div class="quiz-question">${currentQuizIdx + 1}. ${q.q}</div>
    <div class="quiz-options">
      ${q.opts.map((o, i) => `<button class="quiz-option" data-idx="${i}">${o}</button>`).join('')}
    </div>
  `;
  box.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (quizAnswered) return;
      quizAnswered = true;
      const idx = parseInt(btn.dataset.idx);
      btn.classList.add(idx === q.ans ? 'correct' : 'wrong');
      if (idx !== q.ans) box.querySelectorAll('.quiz-option')[q.ans].classList.add('correct');
      if (idx === q.ans) quizScore++;
      setTimeout(() => { currentQuizIdx++; renderQuizQuestion(); }, 1200);
    });
  });
}

/* ---------- WORD PUZZLE ---------- */
let puzzleSelected = [];

function initPuzzle() {
  const bankEl = document.getElementById('puzzleWordBank');
  const sentenceEl = document.getElementById('puzzleSentence');
  if (!bankEl) return;

  puzzleSelected = [];
  const shuffled = [...puzzleWords].sort(() => Math.random() - .5);

  bankEl.innerHTML = shuffled.map(w => `<div class="puzzle-word" data-word="${w}">${w}</div>`).join('');
  sentenceEl.innerHTML = '<span style="color:var(--text-light);font-size:.85rem;">Kalimatmu akan muncul di sini...</span>';

  bankEl.querySelectorAll('.puzzle-word').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('used')) return;
      btn.classList.add('used');
      puzzleSelected.push(btn.dataset.word);
      renderSentence();
    });
  });

  document.getElementById('puzzleCheck').addEventListener('click', checkPuzzle);
  document.getElementById('puzzleReset').addEventListener('click', () => {
    document.getElementById('puzzleResult').textContent = '';
    initPuzzle();
  });
}

function renderSentence() {
  const el = document.getElementById('puzzleSentence');
  if (puzzleSelected.length === 0) {
    el.innerHTML = '<span style="color:var(--text-light);font-size:.85rem;">Kalimatmu akan muncul di sini...</span>';
    return;
  }
  el.innerHTML = puzzleSelected.map(w => `<span class="puzzle-slot">${w}</span>`).join(' ');
}

function checkPuzzle() {
  const res = document.getElementById('puzzleResult');
  const userSentence = puzzleSelected.join(' ');
  if (userSentence === puzzleAnswer) {
    res.innerHTML = '🎉 <span style="color:var(--pink-600);">Benar!! Kamu adalah bintang paling terang di hariku! 🌟💕</span>';
  } else if (puzzleSelected.length < puzzleWords.length) {
    res.innerHTML = '💭 <span style="color:var(--text-mid);">Masih kurang kata — coba tambahkan lagi!</span>';
  } else {
    res.innerHTML = '🌸 <span style="color:var(--text-mid);">Hampir! Coba urutkan lagi ya ~ 🔄</span>';
  }
}

/* ---------- BREATHING EXERCISE ---------- */
let breathRunning = false;
let breathSessionCount = 0;
let breathAnimTimeout = null;

function initBreathing() {
  const btn = document.getElementById('breathBtn');
  if (!btn) return;
  btn.addEventListener('click', toggleBreath);
  animateProgress();
}

function toggleBreath() {
  breathRunning = !breathRunning;
  const circle = document.getElementById('breathCircle');
  const label = document.getElementById('breathLabel');
  const btn = document.getElementById('breathBtn');

  if (breathRunning) {
    btn.textContent = '⏹ Berhenti';
    runBreathCycle();
  } else {
    btn.textContent = '🌬️ Mulai Latihan Napas';
    clearTimeout(breathAnimTimeout);
    circle.classList.remove('breathing');
    circle.textContent = 'Lanjut?';
    label.textContent = 'Tekan tombol untuk melanjutkan 🌬️';
  }
}

function runBreathCycle() {
  if (!breathRunning) return;
  const circle = document.getElementById('breathCircle');
  const label = document.getElementById('breathLabel');
  const countEl = document.getElementById('breathCount');

  const steps = [
    { text: 'Hirup...', label: 'Hirup perlahan — 4 detik 🌬️', dur: 4000, class: 'breathing' },
    { text: 'Tahan...', label: 'Tahan napas — 7 detik 🤫', dur: 7000, class: '' },
    { text: 'Hembuskan', label: 'Hembuskan perlahan — 8 detik 💨', dur: 8000, class: '' },
  ];

  let stepIdx = 0;
  const nextStep = () => {
    if (!breathRunning) return;
    if (stepIdx >= steps.length) {
      breathSessionCount++;
      if (countEl) countEl.textContent = breathSessionCount;
      if (breathSessionCount >= 4) {
        circle.textContent = '✅ Selesai!';
        circle.classList.remove('breathing');
        label.textContent = 'Luar biasa! Kamu sudah melakukan 4 siklus napas! 🌸';
        breathRunning = false;
        document.getElementById('breathBtn').textContent = '🌬️ Ulangi';
        breathSessionCount = 0;
        return;
      }
      stepIdx = 0;
    }
    const s = steps[stepIdx];
    circle.textContent = s.text;
    label.textContent = s.label;
    circle.classList.toggle('breathing', s.class === 'breathing');
    stepIdx++;
    breathAnimTimeout = setTimeout(nextStep, s.dur);
  };
  nextStep();
}

function animateProgress() {
  const bar = document.getElementById('weekProgress');
  const lbl = document.getElementById('progressLabel');
  if (!bar) return;
  setTimeout(() => {
    bar.style.width = '83%';
    if (lbl) lbl.textContent = '83% — Tinggal 1 hari lagi! 🎉';
  }, 300);
}

/* ---------- FLOWER GARDEN ---------- */
let flowerCount = 0;
const flowerEmojis = ['🌸','🌷','🌺','💐','🌼','🌻','🌹'];

function initGarden() {
  const wrap = document.getElementById('gardenWrap');
  const hint = document.getElementById('gardenHint');
  const countEl = document.getElementById('flowerCount');
  const resetBtn = document.getElementById('resetGarden');
  if (!wrap) return;

  flowerCount = 0;

  wrap.addEventListener('click', (e) => {
    if (e.target === resetBtn || resetBtn?.contains(e.target)) return;
    if (hint) hint.style.display = 'none';
    const flower = document.createElement('div');
    flower.className = 'flower-planted';
    flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    wrap.appendChild(flower);
    flowerCount++;
    if (countEl) countEl.textContent = flowerCount;
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.flower-planted').forEach(f => f.remove());
      flowerCount = 0;
      if (countEl) countEl.textContent = 0;
      if (hint) hint.style.display = 'block';
    });
  }
}

/* ---------- CONFETTI ---------- */
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas') || (() => {
    const c = document.createElement('canvas');
    c.id = 'confettiCanvas';
    document.body.appendChild(c);
    return c;
  })();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const pieces = [];
  const colors = ['#ff80b5','#e83e8c','#6b8f71','#ffd54f','#42a5f5','#ff8fab','#a8c5a2'];
  for (let i = 0; i < 180; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 12 + 5,
      h: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - .5) * 4,
      vy: Math.random() * 4 + 2,
      rot: Math.random() * Math.PI,
      rotV: (Math.random() - .5) * .15,
    });
  }
  let frames = 0;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.rotV;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frames++;
    if (frames < 200) requestAnimationFrame(draw);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); }
  };
  draw();
}

/* ---------- CHECKLIST ---------- */
function initChecklist(id) {
  const list = document.getElementById(id);
  if (!list) return;
  list.querySelectorAll('li').forEach(li => {
    const key = li.dataset.key;
    if (localStorage.getItem(key) === '1') li.classList.add('done');
    if (li.classList.contains('done')) li.querySelector('.check-box').textContent = '✓';

    li.addEventListener('click', () => {
      li.classList.toggle('done');
      const done = li.classList.contains('done');
      li.querySelector('.check-box').textContent = done ? '✓' : '';
      localStorage.setItem(key, done ? '1' : '0');
    });
  });
}

/* ---------- MODAL SYSTEM ---------- */
function openModal(dayIndex) {
  const wib = getWIBDate();
  const today = wib.toISOString().split('T')[0];
  const day = DAYS[dayIndex];

  if (day.date > today) {
    showLockedToast();
    return;
  }

  const overlay = document.getElementById('modalOverlay');
  const body = document.getElementById('modalBody');

  body.innerHTML = contentRenderers[day.content]();
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Reset game states
  catchRunning = false;
  catchScore = 0;
  breathRunning = false;
  breathSessionCount = 0;

  // Init interactive elements
  requestAnimationFrame(() => {
    initDrawingCanvas();
    initQuiz();
    initPuzzle();
    initBreathing();
    initGarden();
    initChecklist(`checklist-${day.content}`);

    // Day 6 special
    const confettiBtn = document.getElementById('launchConfetti');
    if (confettiBtn) confettiBtn.addEventListener('click', launchConfetti);

    // Week progress animation
    animateProgress();
  });
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
  catchRunning = false;
  clearInterval(catchInterval);
  clearInterval(catchSpawnInterval);
  breathRunning = false;
  clearTimeout(breathAnimTimeout);
}

function showLockedToast() {
  const existing = document.querySelector('.lock-toast');
  if (existing) return;
  const toast = document.createElement('div');
  toast.className = 'lock-toast';
  toast.style.cssText = `
    position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);
    background:linear-gradient(135deg,var(--pink-500),var(--pink-300));
    color:#fff;padding:.8rem 1.8rem;border-radius:100px;
    font-weight:700;font-size:.9rem;z-index:300;
    box-shadow:var(--shadow-pink);
    animation:toastIn .3s cubic-bezier(.34,1.56,.64,1);
  `;
  toast.textContent = '🔒 Konten ini belum waktunya! Sabar ya,  Ecaaak 🌸';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

/* ---------- RENDER CARDS ---------- */
function renderCards() {
  const wib = getWIBDate();
  const today = wib.toISOString().split('T')[0];
  const grid = document.getElementById('cardsGrid');
  if (!grid) return;

  grid.innerHTML = DAYS.map((day, i) => {
    const isLocked = day.date > today;
    const isToday = day.date === today;
    const isPast = day.date < today;

    return `
      <div class="day-card ${isLocked ? 'locked' : ''} ${isToday ? 'today-card' : ''}"
           onclick="${isLocked ? '' : `openModal(${i})`}" role="button" tabindex="0"
           aria-label="${isLocked ? 'Terkunci' : day.title}">
        ${isLocked ? '<div class="lock-overlay">🔒</div>' : isToday ? '<div class="today-pulse"></div>' : ''}
        <div class="card-day-num">${day.label}</div>
        <div class="card-date">${day.dayName}</div>
        <span class="card-emoji">${isLocked ? '🔒' : day.emoji}</span>
        <div class="card-title">${isLocked ? 'Belum saatnya...' : day.title}</div>
        <div class="card-desc">${isLocked ? 'Konten ini akan terbuka pada harinya. Semangat tunggu ya,  Ecaaak! 🌸' : day.desc}</div>
        <div class="card-tag ${day.tagClass}">${isLocked ? '🔐 Terkunci' : isPast ? '✅ Sudah Dibuka' : isToday ? '✨ Buka Sekarang!' : day.tag}</div>
      </div>
    `;
  }).join('');

  // Keyboard accessibility
  grid.querySelectorAll('.day-card:not(.locked)').forEach((card, i) => {
    const realIdx = parseInt(card.getAttribute('onclick').match(/\d+/)[0]);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openModal(realIdx); });
  });
}

/* ---------- TODAY BADGE ---------- */
function renderTodayBadge() {
  const wib = getWIBDate();
  const today = wib.toISOString().split('T')[0];
  const badge = document.getElementById('todayBadge');
  if (!badge) return;

  const found = DAYS.find(d => d.date === today);
  if (found) {
    badge.textContent = `✨ Hari ini: ${found.dayName} — Buka kejutanmu!`;
  } else if (today < DAYS[0].date) {
    badge.textContent = `⏳ Dimulai 13 Juli 2026 — Tunggu sebentar lagi,  Ecaaak! 🌸`;
  } else if (today > DAYS[DAYS.length - 1].date) {
    badge.textContent = `🎊 Minggu semangat sudah selesai! Kamu luar biasa,  Ecaaak 💕`;
  } else {
    badge.textContent = '';
  }
}

/* ---------- WIB CLOCK ---------- */
function startClock() {
  const el = document.getElementById('wibClock');
  const update = () => {
    if (el) el.textContent = formatTime(getWIBDate()) + ' WIB';
  };
  update();
  setInterval(update, 1000);
}

/* ---------- FLOATING PETALS ---------- */
function spawnPetals() {
  const container = document.getElementById('petalsContainer');
  if (!container) return;
  const petals = ['🌸', '🌷', '✿', '🌺', '💕'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petals[Math.floor(Math.random() * petals.length)];
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 10 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.fontSize = (Math.random() * .8 + .8) + 'rem';
    container.appendChild(p);
  }
}

/* ---------- SCROLL TO TOP ---------- */
function initScrollTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.innerHTML = '↑';
  btn.title = 'Kembali ke atas';
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  });
}

/* ---------- MODAL CLOSE EVENTS ---------- */
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  startClock();
  spawnPetals();
  renderCards();
  renderTodayBadge();
  initScrollTop();

  // Add toast animation style
  const style = document.createElement('style');
  style.textContent = `@keyframes toastIn { from{transform:translateX(-50%) translateY(20px);opacity:0} to{transform:translateX(-50%) translateY(0);opacity:1} }`;
  document.head.appendChild(style);
});

// Expose to global for inline onclick
window.openModal = openModal;
window.startCatchGame = startCatchGame;

/* ============================================================
   BACKGROUND MUSIC PLAYER — Malapetaka by Juicy Luicy
   Uses YouTube IFrame API (hidden player)
   ============================================================ */
(function () {
  // ── Video ID for "Malapetaka - Juicy Luicy" ──
  const VIDEO_ID = 'gCYcHz2k5x0';

  let ytPlayer = null;
  let isPlaying = false;
  let isMuted = false;
  let playerReady = false;
  let autoplayTriggered = false;

  const widget       = document.getElementById('musicWidget');
  const playBtn      = document.getElementById('musicPlayBtn');
  const volBtn       = document.getElementById('musicVolBtn');
  const playIcon     = document.getElementById('playIcon');
  const pauseIcon    = document.getElementById('pauseIcon');
  const volOnIcon    = document.getElementById('volOnIcon');
  const volOffIcon   = document.getElementById('volOffIcon');

  // ── Called by YouTube API when ready ──
  window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player('ytPlayer', {
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: VIDEO_ID,  // needed for loop
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        mute: 0
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError
      }
    });
  };

  function onPlayerReady(e) {
    playerReady = true;
    e.target.setVolume(60);

    // Try autoplay immediately
    tryAutoplay();

    // Pulse hint to draw attention
    if (widget) widget.classList.add('hint-pulse');
    setTimeout(() => { if (widget) widget.classList.remove('hint-pulse'); }, 5000);
  }

  function onPlayerStateChange(e) {
    if (e.data === YT.PlayerState.PLAYING) {
      setPlayingState(true);
    } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
      setPlayingState(false);
    }
  }

  function onPlayerError(e) {
    // If video not playable (embedding disabled), silently handle
    console.warn('Music player error:', e.data);
  }

  function tryAutoplay() {
    if (!playerReady || !ytPlayer) return;
    try {
      ytPlayer.playVideo();
    } catch (err) {
      // Browser blocked autoplay — wait for user interaction
    }
  }

  // ── On first user interaction, start music ──
  function onFirstInteraction() {
    if (autoplayTriggered) return;
    autoplayTriggered = true;
    document.removeEventListener('click',      onFirstInteraction);
    document.removeEventListener('touchstart', onFirstInteraction);
    document.removeEventListener('keydown',    onFirstInteraction);

    if (playerReady && ytPlayer && !isPlaying) {
      ytPlayer.playVideo();
    }
  }

  document.addEventListener('click',      onFirstInteraction, { once: false });
  document.addEventListener('touchstart', onFirstInteraction, { once: false, passive: true });
  document.addEventListener('keydown',    onFirstInteraction, { once: false });

  // ── UI state ──
  function setPlayingState(playing) {
    isPlaying = playing;
    if (widget) widget.classList.toggle('playing', playing);
    if (playIcon)  playIcon.style.display  = playing ? 'none'        : 'block';
    if (pauseIcon) pauseIcon.style.display = playing ? 'block'       : 'none';
  }

  function setMuteState(muted) {
    isMuted = muted;
    if (!ytPlayer) return;
    muted ? ytPlayer.mute() : ytPlayer.unMute();
    if (volOnIcon)  volOnIcon.style.display  = muted ? 'none'  : 'block';
    if (volOffIcon) volOffIcon.style.display = muted ? 'block' : 'none';
  }

  // ── Button handlers ──
  if (playBtn) {
    playBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!playerReady || !ytPlayer) return;
      if (isPlaying) {
        ytPlayer.pauseVideo();
      } else {
        ytPlayer.playVideo();
      }
    });
  }

  if (volBtn) {
    volBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setMuteState(!isMuted);
    });
  }

})();
