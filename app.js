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

function getWIBDateString() {
  // Returns 'YYYY-MM-DD' in WIB timezone (UTC+7)
  // NOTE: toISOString() always returns UTC, so we format manually
  const wib = getWIBDate();
  const y = wib.getFullYear();
  const m = String(wib.getMonth() + 1).padStart(2, '0');
  const d = String(wib.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
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
    emoji: '🎨',
    title: 'Studio Lukis Profesional!',
    desc: 'Lukis mahakaryamu dengan brush lembut, spray, fill, dan shape pro!',
    tag: 'Pro Paint Studio',
    tagClass: 'unlocked',
    content: 'day4',
  },
  {
    date: '2026-07-17',
    label: 'Hari ke-5',
    dayName: 'Jumat, 17 Juli',
    emoji: '✍️',
    title: 'Game Menulis Kreatif!',
    desc: 'Hampir selesai! Ungkapkan isi hatimu lewat game menulis yang seru!',
    tag: 'Writing Game',
    tagClass: 'matcha',
    content: 'day5',
  },
  {
    date: '2026-07-18',
    label: 'Hari ke-6',
    dayName: 'Sabtu, 18 Juli',
    emoji: '🍪',
    title: 'Kamu Berhasil + Dubai Cookie! 🏆',
    desc: 'Hari terakhir — tangkap makanan favoritmu & klaim hadiah Dubai Chewy Cookie!',
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

      <ul class="checklist" id="checklist-day1">
        <li data-key="d1c1"><div class="check-box"></div><span>Minum 1 gelas air sebelum rapat 💧</span></li>
        <li data-key="d1c2"><div class="check-box"></div><span>Bawa camilan kesukaan ke rapat 🍜</span></li>
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

      <ul class="checklist" id="checklist-day2">
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

      <ul class="checklist" id="checklist-day3">
        <li data-key="d3c1"><div class="check-box"></div><span>Baca minimal 5 halaman buku hari ini 📖</span></li>
        <li data-key="d3c2"><div class="check-box"></div><span>Tulis 1 hal yang kamu syukuri hari ini 🙏</span></li>
        <li data-key="d3c3"><div class="check-box"></div><span>Berikan dirimu pujian setelah rapat selesai 🌟</span></li>
      </ul>
    `;
  },

  /* ===== DAY 4: Pro Painting Studio ===== */
  day4() {
    return `
      <div class="modal-day-header">
        <div class="modal-day-emoji">🎨</div>
        <div class="modal-day-label">Hari ke-4 • Kamis 16 Juli</div>
        <div class="modal-day-title">Studio Lukis Profesionalmu! 🖌️</div>
      </div>

      <div class="quote-card">
        "Seni adalah jiwa yang berbicara tanpa kata — dan lukisanmu,  Ecaaak, selalu bicara tentang keindahan."
        <div class="quote-author">— Selalu kagum melihatmu,  Ecaaak 🌸</div>
      </div>

      <div class="love-letter">
         Ecaaak,<br/><br/>
        Hari keempat! Kamu <strong>luar biasa sekali</strong> 🎉 Empat hari dengan rapat panjang, tapi kamu masih berdiri tegak. Aku bangga banget sama kamu 💕<br/><br/>
        Karena kamu suka melukis, hari ini aku buatkan <strong>studio lukis digital lengkap</strong> khusus buat kamu! Ada brush profesional, pensil, spray, fill tool, shapes, dan masih banyak lagi. Ekspresikan dirimu bebas! 🎨🖌️
      </div>

      <div class="pro-studio-wrap" id="proStudioWrap">
        <!-- Toolbar -->
        <div class="studio-toolbar" id="studioToolbar">
          <div class="toolbar-group">
            <div class="tool-label">🖌️ Tool</div>
            <div class="studio-tools">
              <button class="tool-btn active" id="tool-pen" data-tool="pen" title="Pen">✏️</button>
              <button class="tool-btn" id="tool-brush" data-tool="brush" title="Brush Lembut">🖌️</button>
              <button class="tool-btn" id="tool-spray" data-tool="spray" title="Spray">🎨</button>
              <button class="tool-btn" id="tool-eraser" data-tool="eraser" title="Eraser">🗑️</button>
              <button class="tool-btn" id="tool-line" data-tool="line" title="Garis Lurus">📏</button>
              <button class="tool-btn" id="tool-rect" data-tool="rect" title="Persegi">⬜</button>
              <button class="tool-btn" id="tool-circle" data-tool="circle" title="Lingkaran">⭕</button>
              <button class="tool-btn" id="tool-fill" data-tool="fill" title="Fill Warna">🪣</button>
            </div>
          </div>
          <div class="toolbar-group">
            <div class="tool-label">🎨 Warna</div>
            <div class="studio-colors" id="studioColors">
              <div class="color-swatch active" style="background:#ff80b5" data-color="#ff80b5"></div>
              <div class="color-swatch" style="background:#e83e8c" data-color="#e83e8c"></div>
              <div class="color-swatch" style="background:#c2185b" data-color="#c2185b"></div>
              <div class="color-swatch" style="background:#ff5722" data-color="#ff5722"></div>
              <div class="color-swatch" style="background:#ffd54f" data-color="#ffd54f"></div>
              <div class="color-swatch" style="background:#6b8f71" data-color="#6b8f71"></div>
              <div class="color-swatch" style="background:#42a5f5" data-color="#42a5f5"></div>
              <div class="color-swatch" style="background:#9c27b0" data-color="#9c27b0"></div>
              <div class="color-swatch" style="background:#333333" data-color="#333333"></div>
              <div class="color-swatch" style="background:#ffffff;border:2px solid #ccc" data-color="#ffffff"></div>
              <input type="color" class="color-picker-input" id="customColorPicker" value="#ff80b5" title="Pilih warna custom"/>
            </div>
          </div>
          <div class="toolbar-group">
            <div class="tool-label">📏 Ukuran</div>
            <input type="range" class="size-slider" id="studioSize" min="1" max="60" value="8" />
            <span class="size-display" id="sizeDisplay">8px</span>
          </div>
          <div class="toolbar-group">
            <div class="tool-label">💧 Opacity</div>
            <input type="range" class="size-slider" id="studioOpacity" min="10" max="100" value="100" />
            <span class="size-display" id="opacityDisplay">100%</span>
          </div>
        </div>

        <!-- Canvas Area -->
        <div class="studio-canvas-wrap">
          <canvas id="drawCanvas" width="600" height="360"></canvas>
          <canvas id="previewCanvas" width="600" height="360"></canvas>
        </div>

        <!-- Bottom Actions -->
        <div class="studio-actions">
          <button class="draw-btn" id="undoBtn">↩️ Undo</button>
          <button class="draw-btn" id="clearCanvas">🗑️ Hapus Semua</button>
          <button class="draw-btn" id="fillBg">🌈 Warna Latar</button>
          <button class="draw-btn studio-save" id="saveCanvas">💾 Simpan Lukisan</button>
        </div>

        <!-- Status Bar -->
        <div class="studio-status" id="studioStatus">✏️ Pen — Klik dan seret untuk melukis!</div>
      </div>

      <div class="tip-box" style="background:linear-gradient(135deg,#fce4ec,#f8bbd0);margin-top:1rem;">
        <h4>🎨 Tips Pro untuk  Ecaaak</h4>
        <p>✨ <strong>Pen</strong>: garis tegas presisi | 🖌️ <strong>Brush</strong>: sapuan lembut | 🎨 <strong>Spray</strong>: efek kabut artistik | 🪣 <strong>Fill</strong>: isi area warna | ⬜⭕ <strong>Shape</strong>: bentuk geometris | 📏 <strong>Line</strong>: garis lurus sempurna</p>
      </div>

      <div class="tip-box" style="background:linear-gradient(135deg,#e8f5e9,#c8e6c9);">
        <h4>🌷 Fakta Bunga Lily Pink</h4>
        <p>Bunga lily pink melambangkan <strong>kasih sayang, kecantikan, dan keberuntungan</strong>. Di banyak budaya, lily adalah simbol wanita yang kuat dan anggun — persis seperti kamu,  Ecaaak! 🌸</p>
      </div>

      <ul class="checklist" style="margin-top:1.5rem;" id="checklist-day4">
        <li data-key="d4c1"><div class="check-box"></div><span>Lukis sesuatu yang kamu suka hari ini 🎨</span></li>
        <li data-key="d4c2"><div class="check-box"></div><span>Tersenyum pada diri sendiri di cermin 😊</span></li>
        <li data-key="d4c3"><div class="check-box"></div><span>Simpan lukisanmu sebagai kenangan! 💾</span></li>
        <li data-key="d4c4"><div class="check-box"></div><span>Ingat: 2 hari lagi dan semuanya selesai! 💪</span></li>
      </ul>
    `;
  },

  /* ===== DAY 5: Creative Writing Game ===== */
  day5() {
    return `
      <div class="modal-day-header">
        <div class="modal-day-emoji">✍️</div>
        <div class="modal-day-label">Hari ke-5 • Jumat 17 Juli</div>
        <div class="modal-day-title">Hampir Sampai,  Ecaaak! 🌟</div>
      </div>

      <div class="quote-card">
        "Kata-kata adalah jembatan antara hati dan dunia — dan ceritamu,  Ecaaak, selalu membuatku terpukau."
        <div class="quote-author">— Untuk  Ecaaak di hari kelima ✍️💕</div>
      </div>

      <div class="love-letter">
         Ecaaak,<br/><br/>
        <strong>HARI KELIMA!</strong> 🎊 Kamu hampir sampai di garis akhir! Tinggal satu hari lagi setelah ini — kamu sudah melewati yang terberatnya dengan sangat indah 🌸<br/><br/>
        Kamu suka membaca, tapi hari ini aku ingin kamu jadi <strong>penulisnya</strong>! Main game menulis kreatif ini — pilih kategori cerita, dapatkan prompt seru, lalu tulis cerita pendekmu. Ekspresikan hatimu dengan kata-kata! ✍️📖
      </div>

      <div class="writing-game-wrap" id="writingGameWrap">
        <!-- Category Selection -->
        <div class="writing-categories" id="writingCategories">
          <div class="game-title">📖 Pilih Kategori Ceritamu</div>
          <div class="category-grid">
            <button class="category-btn active" data-cat="romance">💕 Romansa</button>
            <button class="category-btn" data-cat="adventure">🌟 Petualangan</button>
            <button class="category-btn" data-cat="daily">☕ Keseharian</button>
            <button class="category-btn" data-cat="fantasy">🧚 Fantasi</button>
            <button class="category-btn" data-cat="friendship">🌸 Persahabatan</button>
            <button class="category-btn" data-cat="motivation">💪 Motivasi</button>
          </div>
        </div>

        <!-- Writing Prompt -->
        <div class="writing-prompt-box" id="writingPromptBox">
          <div class="prompt-label">✨ Prompt Ceritamu:</div>
          <div class="prompt-text" id="writingPromptText">Klik "Dapat Prompt" untuk mendapatkan inspirasi menulis!</div>
          <button class="draw-btn" id="getPromptBtn" style="margin-top:.8rem;">🎲 Dapat Prompt Baru</button>
        </div>

        <!-- Writing Area -->
        <div style="margin-top:1rem;">
          <div class="writing-header">
            <div class="game-title" style="margin-bottom:.3rem;">✍️ Tulis Ceritamu di Sini</div>
            <div class="writing-stats">
              <span id="wordCount">0 kata</span>
              <span id="charCount">0 karakter</span>
              <span id="writingTimer">⏱️ 0:00</span>
            </div>
          </div>
          <textarea class="writing-textarea" id="writingArea" placeholder="Mulai ceritamu di sini... tulis apa saja yang ada di hatimu 💕&#10;&#10;Nggak ada yang menghakimi — ini ruang ekspresimu sendiri! 🌸"></textarea>
        </div>

        <!-- Writing Tools -->
        <div class="writing-tools">
          <button class="draw-btn" id="clearWritingBtn">🗑️ Hapus</button>
          <button class="draw-btn" id="saveWritingBtn">💾 Simpan Cerita</button>
          <button class="writing-submit-btn" id="submitWritingBtn">✨ Selesai & Nilai!</button>
        </div>

        <!-- Writing Result -->
        <div class="writing-result" id="writingResult" style="display:none;"></div>

        <!-- Writing Challenges -->
        <div class="writing-challenges" id="writingChallenges">
          <div class="game-title">🏆 Tantangan Menulis</div>
          <div class="challenge-list">
            <div class="challenge-item" id="ch-50words">
              <span class="challenge-icon">📝</span>
              <span class="challenge-text">Tulis minimal 50 kata</span>
              <span class="challenge-status" id="status-50">0/50</span>
            </div>
            <div class="challenge-item" id="ch-100words">
              <span class="challenge-icon">✍️</span>
              <span class="challenge-text">Tulis minimal 100 kata</span>
              <span class="challenge-status" id="status-100">0/100</span>
            </div>
            <div class="challenge-item" id="ch-5min">
              <span class="challenge-icon">⏱️</span>
              <span class="challenge-text">Tulis selama 5 menit</span>
              <span class="challenge-status" id="status-5min">0:00</span>
            </div>
          </div>
        </div>
      </div>

      <div class="tip-box" style="margin-top:1rem;">
        <h4>✍️ Tips Menulis untuk  Ecaaak</h4>
        <p>Jangan khawatir soal tata bahasa atau ejaan — tulis saja apa yang ada di hati. Menulis bebas selama 5-10 menit bisa membantu meredakan stres dan merefresh pikiran. Kamu sudah baca banyak buku, sekarang giliran kamu jadi penulisnya! 📚💕</p>
      </div>

      <div class="game-title" style="margin-top:1rem;">💆 Progress Mingguanmu</div>
      <div style="margin-bottom:.5rem;font-size:.85rem;color:var(--text-mid);">Kamu sudah melewati...</div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" id="weekProgress" style="width:0%"></div>
      </div>
      <div style="text-align:center;font-size:.88rem;color:var(--pink-500);font-weight:700;margin-bottom:1.5rem;" id="progressLabel">Menghitung...</div>

      <ul class="checklist" id="checklist-day5">
        <li data-key="d5c1"><div class="check-box"></div><span>Tulis cerita pendek hari ini ✍️</span></li>
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
        <strong>HARI INI ADALAH HARI TERAKHIR!</strong> 🎉🎊 Kamu sudah melewati 6 hari yang luar biasa dengan sangat gagah berani — dan kamu TETAP berdiri dengan kepala tegak dan senyum ceriamu yang khas.<br/><br/>
        Kamu adalah wanita yang paling kuat yang aku kenal. Keceriaanmu adalah kekuatanmu, dan hobimu menggambar dan membaca adalah jiwa yang membuatmu begitu indah.<br/><br/>
        Sekarang, sebagai hadiah terakhir — <strong>tangkap makanan favoritmu</strong> dan ada <strong>hadiah spesial Dubai Chewy Cookie</strong> yang menunggumu! 🍜🔥🍪✨
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

      <!-- Dubai Chewy Cookie Section -->
      <div class="dubai-cookie-section">
        <div class="dubai-cookie-header">
          <div class="dubai-cookie-badge">🏆 HADIAH SPESIAL</div>
          <div class="dubai-cookie-title">🍪 Dubai Chewy Cookie</div>
          <div class="dubai-cookie-subtitle">Untuk  Ecaaak yang luar biasa! ✨</div>
        </div>

        <div class="dubai-cookie-info">
          <div class="cookie-info-card">
            <div class="cookie-info-icon">🍪</div>
            <h4>Apa itu Dubai Chewy Cookie?</h4>
            <p>Dubai Chewy Cookie adalah camilan viral kekinian yang terinspirasi dari dessert Timur Tengah! Teksturnya super <strong>kenyal dan chewy</strong> dari lapisan marshmallow, dengan isian <strong>pasta pistachio + kataifi</strong> (mi tipis renyah khas kunafe) yang gurih dan mewah. Rasanya perpaduan manis-gurih yang bikin nagih! 😍</p>
          </div>

          <div class="cookie-details-grid">
            <div class="cookie-detail-item">
              <span class="detail-icon">🌟</span>
              <div>
                <div class="detail-title">Tekstur Unik</div>
                <div class="detail-desc">Lapisan luar kenyal dari marshmallow yang meleleh di mulut</div>
              </div>
            </div>
            <div class="cookie-detail-item">
              <span class="detail-icon">🥜</span>
              <div>
                <div class="detail-title">Isian Pistachio</div>
                <div class="detail-desc">Pasta pistachio premium yang kaya rasa dan creamy</div>
              </div>
            </div>
            <div class="cookie-detail-item">
              <span class="detail-icon">✨</span>
              <div>
                <div class="detail-title">Kataifi Renyah</div>
                <div class="detail-desc">Mi tipis ala kunafe yang digoreng garing sebagai isian</div>
              </div>
            </div>
            <div class="cookie-detail-item">
              <span class="detail-icon">🌍</span>
              <div>
                <div class="detail-title">Viral Internasional</div>
                <div class="detail-desc">Terinspirasi dari dessert mewah Dubai yang sedang trending!</div>
              </div>
            </div>
          </div>

          <div class="cookie-recipe">
            <div class="recipe-title">📋 Bahan-bahan Dubai Chewy Cookie</div>
            <div class="recipe-grid">
              <div class="recipe-section">
                <div class="recipe-subtitle">🍫 Lapisan Luar</div>
                <ul class="recipe-list">
                  <li>250 gr Marshmallow</li>
                  <li>50 gr Mentega</li>
                  <li>30 gr Cokelat bubuk</li>
                  <li>10 gr Susu bubuk</li>
                </ul>
              </div>
              <div class="recipe-section">
                <div class="recipe-subtitle">🥜 Isian Lezat</div>
                <ul class="recipe-list">
                  <li>150 gr Kataifi / Kunafe</li>
                  <li>250 gr Pistachio spread</li>
                  <li>Kacang pistachio cincang</li>
                  <li>Sedikit mentega untuk sangrai</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Cookie Quiz interactive -->
          <div style="background:rgba(0,0,0,0.03);border-radius:14px;padding:1rem;border:1.5px solid #f5d76e;margin-bottom:1rem;">
            <div style="font-size:.85rem;font-weight:800;color:#92400e;margin-bottom:.6rem;">🎯 Tebak Langkah Pembuatan!</div>
            <div style="font-size:.82rem;color:#78350f;margin-bottom:.8rem;">Susun urutan langkah membuat Dubai Chewy Cookie:</div>
            <div id="cookieSteps" style="display:flex;flex-direction:column;gap:.4rem;margin-bottom:.7rem;"></div>
            <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
              <button onclick="checkCookieOrder()" style="padding:.4rem 1rem;border-radius:20px;border:none;background:linear-gradient(135deg,#c8860a,#f5d76e);color:#fff;font-family:'Nunito',sans-serif;font-weight:800;font-size:.8rem;cursor:pointer;">✓ Cek Urutan</button>
              <button onclick="shuffleCookieSteps()" style="padding:.4rem .9rem;border-radius:20px;border:1px solid #f5d76e;background:transparent;color:#92400e;font-family:'Nunito',sans-serif;font-weight:700;font-size:.8rem;cursor:pointer;">🔄 Acak Ulang</button>
            </div>
            <div id="cookieStepResult" style="margin-top:.6rem;font-size:.85rem;font-weight:700;"></div>
          </div>

          <div class="cookie-message">
            <div style="font-size:2rem;">🍪💕</div>
            <p><strong>Hadiah untukmu,  Ecaaak!</strong> Setelah semua kerja keras ini, kamu SANGAT pantas mencoba Dubai Chewy Cookie yang mewah dan viral ini. Ini bukan sekadar camilan — ini adalah perayaan atas semua perjuanganmu selama 6 hari! 🏆✨</p>
          </div>
        </div>
      </div>

      <div class="game-title" style="margin-top:1.5rem;">💌 Pesan Terakhir Untukmu</div>
      <div style="background:linear-gradient(135deg,var(--pink-50),#fce4ec);border-radius:var(--radius);padding:1.5rem;border:1.5px solid var(--pink-200);margin-bottom:1.5rem;text-align:center;">
        <div style="font-size:2.5rem;margin-bottom:.8rem;">🌸🍵🎨📚🍪</div>
        <p style="font-family:'Playfair Display',serif;font-size:1.05rem;color:var(--text-dark);line-height:1.8;">
          Terima kasih sudah menjadi dirimu sendiri —<br/>
          si ceria yang suka lily pink, matcha, menggambar, dan membaca.<br/>
          Kamu sempurna apa adanya,  Ecaaak 💕
        </p>
        <button class="breath-btn" id="launchConfetti" style="margin-top:1rem;">🎉 Rayakan Bersama!</button>
      </div>

      <ul class="checklist" id="checklist-day6">
        <li data-key="d6c1"><div class="check-box"></div><span>Makan seblak atau gacoan sebagai reward! 🍜</span></li>
        <li data-key="d6c2"><div class="check-box"></div><span>Coba buat atau beli Dubai Chewy Cookie 🍪</span></li>
        <li data-key="d6c3"><div class="check-box"></div><span>Istirahat yang cukup malam ini 😴</span></li>
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

  const foods = ['🍜','🌶️','🔥','🍳','🫙','🌸','🍵','🎉','💕','🍲','🍪','🍪'];

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
      let points = 1;
      if (item.textContent === '🍪') {
        points = 3;
        const toast = document.createElement('div');
        toast.textContent = '+3 Dubai Cookie! 🍪';
        toast.style.cssText = `
          position: absolute;
          left: ${item.style.left};
          top: ${item.offsetTop}px;
          color: #d97706;
          font-weight: 900;
          font-size: 1rem;
          pointer-events: none;
          transition: all 0.5s ease-out;
          z-index: 10;
        `;
        wrap.appendChild(toast);
        setTimeout(() => {
          toast.style.transform = 'translateY(-30px)';
          toast.style.opacity = '0';
        }, 50);
        setTimeout(() => toast.remove(), 600);
      }
      catchScore += points;
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

/* ---------- PRO PAINTING STUDIO (DAY 4) ---------- */
function initDrawingCanvas() {
  const canvas = document.getElementById('drawCanvas');
  const previewCanvas = document.getElementById('previewCanvas');

  // If pro studio mode (day4 has previewCanvas)
  if (canvas && previewCanvas) {
    initProStudio(canvas, previewCanvas);
    return;
  }

  // Basic canvas (day1)
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
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
    if (e.touches) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  canvas.addEventListener('mousedown', (e) => { painting = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
  canvas.addEventListener('mousemove', (e) => {
    if (!painting) return;
    const p = getPos(e);
    ctx.lineTo(p.x, p.y); ctx.strokeStyle = currentColor; ctx.lineWidth = brushSize;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  });
  canvas.addEventListener('mouseup', () => { painting = false; ctx.beginPath(); });
  canvas.addEventListener('mouseleave', () => { painting = false; });
  canvas.addEventListener('touchstart', (e) => { e.preventDefault(); painting = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); }, { passive: false });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); if (!painting) return;
    const p = getPos(e);
    ctx.lineTo(p.x, p.y); ctx.strokeStyle = currentColor; ctx.lineWidth = brushSize;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  }, { passive: false });
  canvas.addEventListener('touchend', () => { painting = false; });
  const controls = document.getElementById('drawControls');
  if (controls) {
    controls.querySelectorAll('.color-btn').forEach(btn => {
      btn.onclick = () => { controls.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentColor = btn.dataset.color; };
    });
  }
  const sizeSlider = document.getElementById('brushSize');
  if (sizeSlider) sizeSlider.oninput = e => brushSize = parseInt(e.target.value);
  const clearBtn = document.getElementById('clearCanvas');
  if (clearBtn) clearBtn.onclick = () => { const rect = canvas.getBoundingClientRect(); ctx.fillStyle = '#fff8fc'; ctx.fillRect(0, 0, rect.width, rect.height); };
  const saveBtn = document.getElementById('saveCanvas');
  if (saveBtn) saveBtn.onclick = () => { const a = document.createElement('a'); a.download = 'lukisan-Ecaaak.png'; a.href = canvas.toDataURL(); a.click(); };
}

function initProStudio(canvas, previewCanvas) {
  const ctx = canvas.getContext('2d');
  const pCtx = previewCanvas.getContext('2d');
  const statusEl = document.getElementById('studioStatus');

  const ratio = window.devicePixelRatio || 1;
  const setupCanvas = (c, cx) => {
    const rect = c.getBoundingClientRect();
    c._cssWidth = rect.width;
    c._cssHeight = rect.height;
    c.width = rect.width * ratio;
    c.height = rect.height * ratio;
    cx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  setupCanvas(canvas, ctx);
  setupCanvas(previewCanvas, pCtx);
  ctx.fillStyle = '#fff8fc';
  ctx.fillRect(0, 0, canvas._cssWidth, canvas._cssHeight);

  let tool = 'pen';
  let color = '#ff80b5';
  let size = 8;
  let opacity = 1;
  let painting = false;
  let startX = 0, startY = 0;
  let shapeStartX = 0, shapeStartY = 0;
  let undoStack = [];
  let sprayInterval = null;

  const getPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const saveUndo = () => {
    if (undoStack.length > 20) undoStack.shift();
    undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  };

  const setStatus = (msg) => { if (statusEl) statusEl.textContent = msg; };

  // Tool buttons
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tool = btn.dataset.tool;
      const labels = { pen: '✏️ Pen — klik dan seret untuk menggambar', brush: '🖌️ Brush Lembut — sapuan lembut', spray: '🎨 Spray — tahan untuk efek kabut', eraser: '🗑️ Eraser — hapus area', line: '📏 Garis — klik lalu seret untuk garis lurus', rect: '⬜ Persegi — seret untuk menggambar kotak', circle: '⭕ Lingkaran — seret untuk menggambar lingkaran', fill: '🪣 Fill — klik area untuk mengisi warna' };
      setStatus(labels[tool] || '');
    };
  });

  // Color swatches
  const colorContainer = document.getElementById('studioColors');
  if (colorContainer) {
    colorContainer.querySelectorAll('.color-swatch').forEach(sw => {
      sw.onclick = () => {
        colorContainer.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        sw.classList.add('active');
        color = sw.dataset.color;
        const cp = document.getElementById('customColorPicker');
        if (cp) cp.value = color;
      };
    });
    const cp = document.getElementById('customColorPicker');
    if (cp) cp.oninput = (e) => { color = e.target.value; colorContainer.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active')); };
  }

  // Size slider
  const sizeSlider = document.getElementById('studioSize');
  const sizeDisp = document.getElementById('sizeDisplay');
  if (sizeSlider) sizeSlider.oninput = (e) => { size = +e.target.value; if (sizeDisp) sizeDisp.textContent = size + 'px'; };

  // Opacity slider
  const opSlider = document.getElementById('studioOpacity');
  const opDisp = document.getElementById('opacityDisplay');
  if (opSlider) opSlider.oninput = (e) => { opacity = +e.target.value / 100; if (opDisp) opDisp.textContent = e.target.value + '%'; };

  // Draw helpers
  const hexToRgba = (hex, a) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  };

  const drawSpray = (x, y) => {
    const density = Math.max(10, size * 3);
    for (let i = 0; i < density; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const rad = Math.random() * size * 1.5;
      const sx = x + Math.cos(angle) * rad;
      const sy = y + Math.sin(angle) * rad;
      ctx.fillStyle = hexToRgba(color, opacity * 0.3);
      ctx.fillRect(sx, sy, 1.5, 1.5);
    }
  };

  const drawShape = (px, py, cx, cy) => {
    pCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    pCtx.strokeStyle = hexToRgba(color, opacity);
    pCtx.lineWidth = size;
    pCtx.lineCap = 'round';
    pCtx.beginPath();
    if (tool === 'line') {
      pCtx.moveTo(px, py);
      pCtx.lineTo(cx, cy);
      pCtx.stroke();
    } else if (tool === 'rect') {
      pCtx.strokeRect(px, py, cx - px, cy - py);
    } else if (tool === 'circle') {
      const rx = Math.abs(cx - px) / 2, ry = Math.abs(cy - py) / 2;
      const ex = px + (cx - px) / 2, ey = py + (cy - py) / 2;
      pCtx.ellipse(ex, ey, rx, ry, 0, 0, Math.PI * 2);
      pCtx.stroke();
    }
  };

  const floodFill = (x, y, fillColor) => {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const w = canvas.width, h = canvas.height;
    const px = (Math.round(x * (window.devicePixelRatio || 1)));
    const py = (Math.round(y * (window.devicePixelRatio || 1)));
    const idx = (py * w + px) * 4;
    const tR = data[idx], tG = data[idx+1], tB = data[idx+2], tA = data[idx+3];
    const fR = parseInt(fillColor.slice(1,3),16), fG = parseInt(fillColor.slice(3,5),16), fB = parseInt(fillColor.slice(5,7),16);
    if (tR === fR && tG === fG && tB === fB) return;
    const stack = [[px, py]];
    while (stack.length) {
      const [cx2, cy2] = stack.pop();
      if (cx2 < 0 || cx2 >= w || cy2 < 0 || cy2 >= h) continue;
      const i = (cy2 * w + cx2) * 4;
      if (Math.abs(data[i]-tR) > 30 || Math.abs(data[i+1]-tG) > 30 || Math.abs(data[i+2]-tB) > 30) continue;
      data[i] = fR; data[i+1] = fG; data[i+2] = fB; data[i+3] = 255;
      stack.push([cx2+1,cy2],[cx2-1,cy2],[cx2,cy2+1],[cx2,cy2-1]);
    }
    ctx.putImageData(imgData, 0, 0);
  };

  // Mouse events
  const onDown = (e) => {
    e.preventDefault();
    const p = getPos(e);
    painting = true;
    startX = p.x; startY = p.y;
    shapeStartX = p.x; shapeStartY = p.y;
    saveUndo();

    if (tool === 'fill') {
      floodFill(p.x, p.y, color);
      painting = false;
      return;
    }
    if (tool === 'spray') {
      drawSpray(p.x, p.y);
      sprayInterval = setInterval(() => { drawSpray(startX, startY); }, 30);
    } else if (tool !== 'line' && tool !== 'rect' && tool !== 'circle') {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    }
  };

  const onMove = (e) => {
    e.preventDefault();
    if (!painting) return;
    const p = getPos(e);
    startX = p.x; startY = p.y;

    if (tool === 'pen') {
      ctx.strokeStyle = hexToRgba(color, opacity);
      ctx.lineWidth = size; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.lineTo(p.x, p.y); ctx.stroke();
    } else if (tool === 'brush') {
      ctx.strokeStyle = hexToRgba(color, opacity * 0.4);
      ctx.lineWidth = size * 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.lineTo(p.x, p.y); ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.clearRect(p.x - size/2, p.y - size/2, size, size);
    } else if (tool === 'line' || tool === 'rect' || tool === 'circle') {
      drawShape(shapeStartX, shapeStartY, p.x, p.y);
    }
  };

  const onUp = (e) => {
    if (!painting) return;
    const p = getPos(e);
    if (tool === 'line' || tool === 'rect' || tool === 'circle') {
      ctx.drawImage(previewCanvas, 0, 0, canvas._cssWidth, canvas._cssHeight);
      pCtx.clearRect(0, 0, previewCanvas._cssWidth, previewCanvas._cssHeight);
    }
    if (sprayInterval) { clearInterval(sprayInterval); sprayInterval = null; }
    painting = false;
    ctx.beginPath();
  };

  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseup', onUp);
  canvas.addEventListener('mouseleave', onUp);
  canvas.addEventListener('touchstart', onDown, { passive: false });
  canvas.addEventListener('touchmove', onMove, { passive: false });
  canvas.addEventListener('touchend', onUp);

  // Action buttons
  const undoBtn = document.getElementById('undoBtn');
  if (undoBtn) undoBtn.onclick = () => { if (undoStack.length) { ctx.putImageData(undoStack.pop(), 0, 0); } };

  const clearBtn = document.getElementById('clearCanvas');
  if (clearBtn) clearBtn.onclick = () => { saveUndo(); ctx.fillStyle = '#fff8fc'; ctx.fillRect(0, 0, canvas._cssWidth, canvas._cssHeight); };

  const fillBgBtn = document.getElementById('fillBg');
  if (fillBgBtn) fillBgBtn.onclick = () => { saveUndo(); ctx.fillStyle = hexToRgba(color, opacity); ctx.fillRect(0, 0, canvas._cssWidth, canvas._cssHeight); };

  const saveBtn = document.getElementById('saveCanvas');
  if (saveBtn) saveBtn.onclick = () => {
    const merged = document.createElement('canvas');
    merged.width = canvas.width; merged.height = canvas.height;
    const mCtx = merged.getContext('2d');
    mCtx.drawImage(canvas, 0, 0);
    const a = document.createElement('a');
    a.download = 'studio-Ecaaak.png'; a.href = merged.toDataURL(); a.click();
  };

  setStatus('✏️ Pen — Klik dan seret untuk melukis!');
}

/* ---------- WRITING GAME (DAY 5) ---------- */
const writingPrompts = {
  romance: [
    'Ceritakan tentang pertemuan pertama dua orang yang tak terduga di perpustakaan pada sore yang hujan...',
    'Ada seorang gadis yang setiap hari menemukan bunga di mejanya, tapi tidak tahu dari siapa...',
    'Dua sahabat lama bertemu kembali setelah 5 tahun — apa yang terjadi selanjutnya?',
    'Tulis surat kepada seseorang yang belum pernah kamu temui tapi selalu ada di hatimu...',
  ],
  adventure: [
    'Kamu menemukan peta kuno di buku tua — ke mana peta itu membawamu?',
    'Dalam perjalanan pulang, kamu tersasar di hutan ajaib. Apa yang kamu temukan?',
    'Sebuah pintu muncul di kamarmu tiba-tiba — kamu memberanikan diri membukanya...',
    'Kamu adalah explorer pertama yang menemukan pulau tersembunyi di lautan luas...',
  ],
  daily: [
    'Ceritakan tentang hari paling berkesan dalam hidupmu — dari sudut pandang orang lain...',
    'Pagi hari yang sempurna menurutmu: bagaimana rasanya, suaranya, baunya?',
    'Kamu menemukan diary lama dari 5 tahun lalu — apa yang ditulis di sana?',
    'Deskripsikan momen sederhana yang membuatmu merasa paling hidup...',
  ],
  fantasy: [
    'Di dunia di mana setiap orang punya kekuatan berdasarkan makanan favoritnya — apa kekuatanmu?',
    'Ada seorang penyihir yang bisa melukis perasaan menjadi nyata — ceritakan kisahnya...',
    'Kamu adalah penjaga perpustakaan ajaib di mana setiap buku membawamu ke dunia berbeda...',
    'Seekor naga kecil tiba-tiba tinggal di halaman rumahmu — bagaimana hidupmu berubah?',
  ],
  friendship: [
    'Ceritakan tentang sahabat terbaikmu — momen paling tak terlupakan bersama mereka...',
    'Dua sahabat yang berjanji akan selalu ada untuk satu sama lain — uji janji itu...',
    'Tulis tentang persahabatan yang tumbuh dari hal-hal kecil yang tidak terduga...',
    'Sahabat yang mengerti tanpa perlu berkata-kata — gambarkan momen itu...',
  ],
  motivation: [
    'Tulis surat dari dirimu di masa depan 5 tahun lagi untuk dirimu sekarang...',
    'Hari paling sulit yang pernah kamu lalui — dan bagaimana kamu bangkit...',
    'Ceritakan tentang mimpi terbesarmu dan langkah pertama untuk menggapainya...',
    'Kamu adalah pahlawan dalam ceritamu sendiri — kisah apa yang ingin kamu ceritakan?',
  ],
};

let writingTimerInterval = null;
let writingSeconds = 0;
let writingStarted = false;
let selectedCategory = 'romance';

function initWritingGame() {
  const wrap = document.getElementById('writingGameWrap');
  if (!wrap) return;

  // Category buttons
  const catBtns = wrap.querySelectorAll('.category-btn');
  catBtns.forEach(btn => {
    btn.onclick = () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCategory = btn.dataset.cat;
      getNewPrompt();
    };
  });

  // Get prompt button
  const promptBtn = document.getElementById('getPromptBtn');
  if (promptBtn) promptBtn.onclick = getNewPrompt;
  getNewPrompt();

  // Writing area
  const textarea = document.getElementById('writingArea');
  if (textarea) {
    textarea.addEventListener('input', () => {
      updateWritingStats(textarea.value);
      if (!writingStarted && textarea.value.trim().length > 0) {
        writingStarted = true;
        startWritingTimer();
      }
    });
    textarea.addEventListener('focus', () => {
      if (!writingStarted) {
        writingStarted = true;
        startWritingTimer();
      }
    });
  }

  // Clear button
  const clearBtn = document.getElementById('clearWritingBtn');
  if (clearBtn) clearBtn.onclick = () => {
    if (textarea) { textarea.value = ''; updateWritingStats(''); }
    stopWritingTimer();
    writingStarted = false;
    writingSeconds = 0;
    updateTimerDisplay();
    const res = document.getElementById('writingResult');
    if (res) { res.style.display = 'none'; }
  };

  // Save button
  const saveBtn = document.getElementById('saveWritingBtn');
  if (saveBtn) saveBtn.onclick = () => {
    if (!textarea || !textarea.value.trim()) return;
    const blob = new Blob([textarea.value], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.download = 'cerita-ecaaak.txt'; a.href = URL.createObjectURL(blob); a.click();
  };

  // Submit button
  const submitBtn = document.getElementById('submitWritingBtn');
  if (submitBtn) submitBtn.onclick = evaluateWriting;

  animateProgress();
}

function getNewPrompt() {
  const prompts = writingPrompts[selectedCategory] || writingPrompts.romance;
  const idx = Math.floor(Math.random() * prompts.length);
  const el = document.getElementById('writingPromptText');
  if (el) {
    el.style.opacity = '0';
    setTimeout(() => { el.textContent = prompts[idx]; el.style.opacity = '1'; }, 200);
  }
}

function updateWritingStats(text) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const wordEl = document.getElementById('wordCount');
  const charEl = document.getElementById('charCount');
  if (wordEl) wordEl.textContent = words + ' kata';
  if (charEl) charEl.textContent = chars + ' karakter';

  // Update challenges
  const s50 = document.getElementById('status-50');
  const s100 = document.getElementById('status-100');
  const ch50 = document.getElementById('ch-50words');
  const ch100 = document.getElementById('ch-100words');
  if (s50) s50.textContent = Math.min(words, 50) + '/50';
  if (s100) s100.textContent = Math.min(words, 100) + '/100';
  if (ch50) ch50.classList.toggle('challenge-done', words >= 50);
  if (ch100) ch100.classList.toggle('challenge-done', words >= 100);
}

function startWritingTimer() {
  if (writingTimerInterval) return;
  writingTimerInterval = setInterval(() => {
    writingSeconds++;
    updateTimerDisplay();
    const mins5 = document.getElementById('status-5min');
    const ch5 = document.getElementById('ch-5min');
    if (mins5) mins5.textContent = Math.floor(writingSeconds/60) + ':' + String(writingSeconds%60).padStart(2,'0');
    if (ch5) ch5.classList.toggle('challenge-done', writingSeconds >= 300);
  }, 1000);
}

function stopWritingTimer() {
  if (writingTimerInterval) { clearInterval(writingTimerInterval); writingTimerInterval = null; }
}

function updateTimerDisplay() {
  const el = document.getElementById('writingTimer');
  if (el) el.textContent = '⏱️ ' + Math.floor(writingSeconds/60) + ':' + String(writingSeconds%60).padStart(2,'0');
}

function evaluateWriting() {
  const textarea = document.getElementById('writingArea');
  const res = document.getElementById('writingResult');
  if (!textarea || !res) return;
  const text = textarea.value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  res.style.display = 'block';
  if (words === 0) {
    res.innerHTML = '💭 <span>Yuk mulai nulis dulu! Satu kata pun sudah luar biasa 🌸</span>';
    return;
  }
  const msgs = [
    { min: 200, icon: '🏆', msg: `LUAR BIASA! ${words} kata! Kamu penulis sejati, Ecaaak! Bakatmu sungguh memukau 💕✨` },
    { min: 100, icon: '🌟', msg: `WOW! ${words} kata! Kamu sungguh ekspresif dan berbakat — ceritamu pasti indah! 🌸` },
    { min: 50, icon: '🎉', msg: `Hebat! ${words} kata sudah kamu tulis! Terus semangat — kamu sedang mekar! 📖💪` },
    { min: 20, icon: '💕', msg: `Bagus sekali! ${words} kata untuk memulai. Setiap penulis besar pun dimulai dari sini! ✍️` },
    { min: 1, icon: '🌱', msg: `Kamu sudah mulai! ${words} kata adalah langkah pertama yang luar biasa. Lanjutkan! 🌸` },
  ];
  const result = msgs.find(m => words >= m.min) || msgs[msgs.length-1];
  res.innerHTML = `<div style="font-size:2rem;">${result.icon}</div><div style="font-weight:800;color:var(--pink-600);margin:.4rem 0;">${result.msg}</div>`;
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
  const res = document.getElementById('quizResult');
  if (res) {
    res.style.display = 'none';
    res.innerHTML = '';
  }
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
  const checkBtn = document.getElementById('puzzleCheck');
  const resetBtn = document.getElementById('puzzleReset');
  if (!checkBtn || !resetBtn) return;

  checkBtn.onclick = checkPuzzle;
  resetBtn.onclick = () => {
    const res = document.getElementById('puzzleResult');
    if (res) res.textContent = '';
    setupPuzzleBoard();
  };

  setupPuzzleBoard();
}

function setupPuzzleBoard() {
  const bankEl = document.getElementById('puzzleWordBank');
  const sentenceEl = document.getElementById('puzzleSentence');
  if (!bankEl || !sentenceEl) return;

  puzzleSelected = [];
  const shuffled = [...puzzleWords].sort(() => Math.random() - .5);

  bankEl.innerHTML = shuffled.map(w => `<div class="puzzle-word" data-word="${w}">${w}</div>`).join('');
  sentenceEl.innerHTML = '<span style="color:var(--text-light);font-size:.85rem;">Kalimatmu akan muncul di sini...</span>';

  bankEl.querySelectorAll('.puzzle-word').forEach(btn => {
    btn.onclick = () => {
      if (btn.classList.contains('used')) return;
      btn.classList.add('used');
      puzzleSelected.push(btn.dataset.word);
      renderSentence();
    };
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

function shuffleCookieSteps() {
  const container = document.getElementById('cookieSteps');
  const result = document.getElementById('cookieStepResult');
  if (!container || !result) return;

  const steps = [
    'Panaskan wajan dan sangrai kataifi sampai harum.',
    'Lelehkan marshmallow dan mentega, lalu tambahkan cokelat serta susu bubuk.',
    'Oleskan pasta pistachio ke dalam adonan sebagai isian creamy.',
    'Bentuk adonan menjadi bola dan lapisi dengan kataifi renyah.',
    'Dinginkan sebentar sebelum disajikan agar tekstur chewy tetap nikmat.'
  ];

  const shuffled = [...steps].sort(() => Math.random() - 0.5);
  container.innerHTML = shuffled.map((step, idx) => `
    <button class="cookie-step-btn" data-step="${step}" type="button">${idx + 1}. ${step}</button>
  `).join('');
  result.textContent = 'Susun urutan langkahnya lalu klik Cek Urutan.';

  container.querySelectorAll('.cookie-step-btn').forEach(btn => {
    btn.onclick = () => {
      btn.classList.toggle('selected');
    };
  });
}

function checkCookieOrder() {
  const container = document.getElementById('cookieSteps');
  const result = document.getElementById('cookieStepResult');
  if (!container || !result) return;

  const selected = Array.from(container.querySelectorAll('.cookie-step-btn.selected')).map(btn => btn.textContent.replace(/^\d+\. /, ''));
  const correctOrder = [
    'Panaskan wajan dan sangrai kataifi sampai harum.',
    'Lelehkan marshmallow dan mentega, lalu tambahkan cokelat serta susu bubuk.',
    'Oleskan pasta pistachio ke dalam adonan sebagai isian creamy.',
    'Bentuk adonan menjadi bola dan lapisi dengan kataifi renyah.',
    'Dinginkan sebentar sebelum disajikan agar tekstur chewy tetap nikmat.'
  ];

  if (selected.length !== correctOrder.length) {
    result.textContent = 'Pilih semua langkah terlebih dahulu, lalu klik Cek Urutan.';
    return;
  }

  const isCorrect = selected.every((step, idx) => step === correctOrder[idx]);
  if (isCorrect) {
    result.innerHTML = '🎉 Tepat sekali! Kamu tahu cara membuat Dubai Chewy Cookie yang lezat. Hadiahmu sudah dekat!';
  } else {
    result.innerHTML = '🤔 Hmm, ada urutan yang kurang tepat. Coba lagi ya!';
  }
}

/* ---------- BREATHING EXERCISE ---------- */
let breathRunning = false;
let breathSessionCount = 0;
let breathAnimTimeout = null;

function initBreathing() {
  const btn = document.getElementById('breathBtn');
  if (!btn) return;
  btn.onclick = toggleBreath;
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
    if (circle) {
      circle.classList.remove('expand', 'hold', 'shrink');
      circle.textContent = 'Lanjut?';
    }
    if (label) label.textContent = 'Tekan tombol untuk melanjutkan 🌬️';
  }
}

function runBreathCycle() {
  if (!breathRunning) return;
  const circle = document.getElementById('breathCircle');
  const label = document.getElementById('breathLabel');
  const countEl = document.getElementById('breathCount');

  const steps = [
    { text: 'Hirup...', label: 'Hirup perlahan — 4 detik 🌬️', dur: 4000, class: 'expand' },
    { text: 'Tahan...', label: 'Tahan napas — 7 detik 🤫', dur: 7000, class: 'hold' },
    { text: 'Hembuskan', label: 'Hembuskan perlahan — 8 detik 💨', dur: 8000, class: 'shrink' },
  ];

  let stepIdx = 0;
  const nextStep = () => {
    if (!breathRunning) return;
    if (stepIdx >= steps.length) {
      breathSessionCount++;
      if (countEl) countEl.textContent = breathSessionCount;
      if (breathSessionCount >= 4) {
        if (circle) {
          circle.textContent = '✅ Selesai!';
          circle.classList.remove('expand', 'hold', 'shrink');
        }
        if (label) label.textContent = 'Luar biasa! Kamu sudah melakukan 4 siklus napas! 🌸';
        breathRunning = false;
        const btn = document.getElementById('breathBtn');
        if (btn) btn.textContent = '🌬️ Ulangi';
        breathSessionCount = 0;
        return;
      }
      stepIdx = 0;
    }
    const s = steps[stepIdx];
    if (circle) {
      circle.textContent = s.text;
      circle.classList.remove('expand', 'hold', 'shrink');
      if (s.class) circle.classList.add(s.class);
    }
    if (label) label.textContent = s.label;
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

  wrap.onclick = (e) => {
    if (e.target === resetBtn || resetBtn?.contains(e.target)) return;
    if (hint) hint.style.display = 'none';
    const flower = document.createElement('div');
    flower.className = 'flower-planted';
    flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    wrap.appendChild(flower);
    flowerCount++;
    if (countEl) countEl.textContent = flowerCount;
  };

  if (resetBtn) {
    resetBtn.onclick = (e) => {
      e.stopPropagation();
      document.querySelectorAll('.flower-planted').forEach(f => f.remove());
      flowerCount = 0;
      if (countEl) countEl.textContent = 0;
      if (hint) hint.style.display = 'block';
    };
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
  const today = getWIBDateString();
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
  clearInterval(catchInterval);
  clearInterval(catchSpawnInterval);
  breathRunning = false;
  clearTimeout(breathAnimTimeout);
  breathSessionCount = 0;

  // Init interactive elements
  requestAnimationFrame(() => {
    initDrawingCanvas();
    initQuiz();
    initPuzzle();
    initBreathing();
    initGarden();
    initWritingGame();
    initChecklist(`checklist-${day.content}`);

    // Day 6 special
    const confettiBtn = document.getElementById('launchConfetti');
    if (confettiBtn) confettiBtn.onclick = launchConfetti;

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
  stopWritingTimer();
  writingStarted = false;
  writingSeconds = 0;
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
  const today = getWIBDateString();
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
  const today = getWIBDateString();
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
  const VIDEO_ID = 'kL2-QNLQvqs'; // Malapetaka - Juicy Luicy (Official)

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
  function initYTPlayer() {
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
  }

  if (window.YT && window.YT.Player) {
    initYTPlayer();
  } else {
    window.onYouTubeIframeAPIReady = initYTPlayer;
  }

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
