class TuneHub {
    constructor() {
        // Initialize properties
        this.words = [];
        this.wordList = [];
        this.currentWordIndex = 0;
        this.currentLetterIndex = 0;
        this.correctLetters = 0;
        this.totalLetters = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.startTime = null;
        this.endTime = null;
        this.timer = null;
        this.timeLeft = 15;
        this.timeLimit = 15;
        this.isRunning = false;
        this.isPaused = false;
        this.testMode = 'time'; // time, words, quote, zen, code
        this.wordCount = 50;
        this.codeLanguage = 'javascript'; // html, css, javascript, jsx, typescript, python
        this.codeLevel = 'basic'; // basic, intermediate, advanced
        this.theme = 'dark';
        this.theme = 'dark';
        this.soundEnabled = true;
        this.soundEnabled = true;
        this.volume = 1.0; // Default max volume
        this.strictMode = false;

        // DOM Elements
        this.elements = {};

        // Initialize
        this.init();
    }

    async init() {
        // Cache DOM elements
        this.cacheElements();

        // Load word list
        await this.loadWordList();

        // Bind events
        this.bindEvents();

        // Initialize test
        this.generateTest();

        // Hide loading screen
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 1000);

        // Check authentication session
        this.checkAuth();
    }

    async checkAuth() {
        try {
            const response = await fetch('/auth/me');
            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    console.log('User logged in:', data.user);
                    // Update UI or state here
                    // e.g., display user avatar or name
                    this.user = data.user;
                    localStorage.setItem('tunehub-user-email', data.user.email);
                }
            }
        } catch (error) {
            // Context: likely running static file without backend
            console.log('Auth check skipped (no backend detected)');
        }
    }

    cacheElements() {
        // Main containers
        this.elements.loadingScreen = document.getElementById('loadingScreen');
        this.elements.mainContainer = document.getElementById('mainContainer');

        // Test elements
        this.elements.wordsWrapper = document.getElementById('wordsWrapper');
        this.elements.wordsInput = document.getElementById('wordsInput');
        this.elements.caret = document.getElementById('caret');
        this.elements.comboDisplay = document.getElementById('comboDisplay');
        this.elements.comboCount = document.querySelector('.combo-count');
        this.elements.comboBar = document.querySelector('.combo-bar');

        // Stats elements
        this.elements.wpmStat = document.getElementById('wpmStat');
        this.elements.accStat = document.getElementById('accStat');
        this.elements.timeStat = document.getElementById('timeStat');
        this.elements.comboStat = document.getElementById('comboStat');

        // Control buttons
        this.elements.startBtn = document.getElementById('startBtn');
        this.elements.restartBtn = document.getElementById('restartBtn');
        this.elements.pauseBtn = document.getElementById('pauseBtn');

        // Config buttons
        this.elements.configBtns = document.querySelectorAll('.config-btn');
        this.elements.customTestBtn = document.getElementById('customTestBtn');

        // Navigation
        this.elements.navBtns = document.querySelectorAll('.nav-btn');
        this.elements.pages = document.querySelectorAll('.page');

        // Theme elements
        this.elements.themeToggle = document.getElementById('themeToggle');
        this.elements.themeOptions = document.querySelectorAll('.theme-option');

        // Settings elements
        this.elements.soundToggleSetting = document.getElementById('soundToggleSetting');
        this.elements.clickSoundToggle = document.getElementById('clickSoundToggle');
        this.elements.errorSoundToggle = document.getElementById('errorSoundToggle');
        this.elements.errorSoundToggle = document.getElementById('errorSoundToggle');

        // Modal elements
        this.elements.resultModal = document.getElementById('resultModal');
        this.elements.resultWpm = document.getElementById('resultWpm');
        this.elements.resultAcc = document.getElementById('resultAcc');
        this.elements.resultTime = document.getElementById('resultTime');
        this.elements.resultCombo = document.getElementById('resultCombo');
        this.elements.modalClose = document.querySelector('.modal-close');
        this.elements.tryAgainBtn = document.getElementById('tryAgainBtn');
        this.elements.shareResultBtn = document.getElementById('shareResultBtn');

        // New Modals
        this.elements.infoBtn = document.getElementById('infoBtn');
        this.elements.settingsBtn = document.getElementById('settingsBtn');
        this.elements.infoModal = document.getElementById('infoModal');
        this.elements.settingsModal = document.getElementById('settingsModal');
        this.elements.modalOverlays = document.querySelectorAll('.modal-overlay');
        this.elements.closeModalBtns = document.querySelectorAll('.close-modal');

        // New Settings Inputs
        this.elements.fontSizeSetting = document.getElementById('fontSizeSetting');
        this.elements.caretStyleSetting = document.getElementById('caretStyleSetting');
        this.elements.strictModeSetting = document.getElementById('strictModeSetting');
        this.elements.liveWpmSetting = document.getElementById('liveWpmSetting');
        this.elements.masterSoundSetting = document.getElementById('masterSoundSetting');
    }

    async loadWordList() {
        // Common English words (MonkeyType uses a list of 200 words)
        const commonWords = [
            // Short (1-3 chars)
            'the', 'be', 'to', 'of', 'and', 'a', 'in', 'it', 'is', 'on', 'at', 'as', 'he', 'we', 'do', 'up', 'my', 'go', 'me', 'us', 'no', 'by', 'so', 'if', 'or', 'an',
            // Medium (4-6 chars)
            'that', 'have', 'this', 'from', 'word', 'what', 'some', 'your', 'with', 'said', 'each', 'time', 'will', 'many', 'then', 'them', 'make', 'like', 'look', 'more', 'write', 'number', 'sound', 'people', 'water', 'first', 'place', 'where', 'after', 'little', 'know', 'year', 'live', 'back', 'only', 'round', 'man', 'came', 'show', 'every', 'good', 'story', 'much', 'before', 'move', 'right', 'boy', 'old', 'same', 'she', 'all', 'there', 'when', 'use', 'how', 'way', 'about', 'out', 'then', 'them', 'these', 'long', 'thing', 'see', 'him', 'two', 'has', 'look', 'day', 'part', 'over', 'new', 'take', 'come', 'work', 'place', 'made', 'live', 'where', 'after', 'back', 'little', 'only', 'round', 'man', 'year', 'came', 'show', 'every', 'good', 'me', 'give', 'our', 'under', 'name',
            // Long / Advanced (7+ chars)
            'through', 'between', 'sentence', 'another', 'thought', 'picture', 'country', 'different', 'follow', 'change', 'animal', 'letter', 'mother', 'answer', 'study', 'should', 'America', 'world', 'high', 'start', 'school', 'father', 'plant', 'never', 'light', 'might', 'story', 'example', 'paper', 'group', 'always', 'music', 'those', 'both', 'mark', 'often', 'book', 'until', 'mile', 'river', 'enough', 'plain', 'girl', 'usual', 'young', 'ready', 'above', 'ever', 'list', 'though', 'feel', 'talk', 'bird', 'soon', 'body', 'dog', 'family', 'direct', 'pose', 'leave', 'song', 'measure', 'door', 'product', 'black', 'short', 'class', 'wind', 'question', 'happen', 'complete', 'ship', 'area', 'half', 'rock', 'order', 'fire', 'south', 'problem', 'piece', 'told', 'knew', 'pass', 'since', 'top', 'whole', 'king', 'street', 'inch', 'multiply', 'nothing', 'course', 'stay', 'wheel', 'full', 'force', 'blue', 'object', 'decide', 'surface', 'deep', 'moon', 'island', 'foot', 'system', 'busy', 'test', 'record', 'boat', 'common', 'gold', 'possible', 'plane', 'stead', 'dry', 'wonder', 'laugh', 'thousand', 'ago', 'ran', 'check', 'game', 'shape', 'equate', 'hot', 'miss', 'brought', 'heat', 'snow', 'tire', 'bring', 'yes', 'distant', 'fill', 'east', 'paint', 'language', 'among', 'unit', 'power', 'town', 'fine', 'certain', 'fly', 'fall', 'lead', 'cry', 'dark', 'machine', 'note', 'wait', 'plan', 'figure', 'star', 'box', 'noun', 'field', 'rest', 'correct', 'able', 'pound', 'done', 'beauty', 'drive', 'stood', 'contain'
        ];

        this.wordList = commonWords;
    }

    bindEvents() {
        // Input events
        this.elements.wordsInput.addEventListener('input', (e) => this.handleInput(e));
        this.elements.wordsInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.elements.wordsInput.addEventListener('focus', () => this.handleFocus());
        this.elements.wordsInput.addEventListener('blur', () => this.handleBlur());

        // Control buttons
        this.elements.startBtn.addEventListener('click', () => this.startTest());
        this.elements.restartBtn.addEventListener('click', () => this.restartTest());
        this.elements.pauseBtn.addEventListener('click', () => this.togglePause());


        // Config buttons
        this.elements.configBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setTestConfig(e));
        });


        // Custom test button
        this.elements.customTestBtn.addEventListener('click', () => {
            this.startCustomTest();
        });

        // Mode buttons (quote, custom, code)
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setMode(e));
        });

        // Language buttons (for code mode)
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setLanguage(e));
        });

        // Level buttons (for code mode)
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setLevel(e));
        });

        // Header icon navigation
        document.querySelectorAll('.header-right [data-page]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.currentTarget.dataset.page;
                this.showPage(page);
            });
        });

        // Theme toggle
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Theme options
        this.elements.themeOptions.forEach(option => {
            option.addEventListener('click', (e) => this.setTheme(e));
        });

        // Settings toggles
        this.elements.soundToggleSetting.addEventListener('change', (e) => this.toggleSound(e));
        this.elements.clickSoundToggle.addEventListener('change', (e) => this.toggleClickSound(e));
        this.elements.errorSoundToggle.addEventListener('change', (e) => this.toggleErrorSound(e));
        this.elements.errorSoundToggle.addEventListener('change', (e) => this.toggleErrorSound(e));

        // Modal events
        this.elements.modalClose.addEventListener('click', () => this.closeResultModal());
        this.elements.tryAgainBtn.addEventListener('click', () => {
            this.closeResultModal();
            this.restartTest();
        });
        this.elements.shareResultBtn.addEventListener('click', () => this.shareResult());

        // Social Login
        const googleBtn = document.querySelector('.social-btn.google');
        if (googleBtn) googleBtn.addEventListener('click', () => window.location.href = '/auth/google');

        const githubBtn = document.querySelector('.social-btn.github');
        if (githubBtn) githubBtn.addEventListener('click', () => window.location.href = '/auth/github');

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Tab to restart
            if (e.key === 'Tab' && !e.ctrlKey) {
                e.preventDefault();
                this.restartTest();
            }

            // Escape to pause/resume
            if (e.key === 'Escape' && this.isRunning) {
                this.togglePause();
            }

            // Ctrl + Shift + P to toggle theme
            if (e.ctrlKey && e.shiftKey && e.key === 'P') {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        // Focus input when clicking anywhere
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.modal') && !e.target.closest('.modal-overlay') && !e.target.closest('.page')?.id?.includes('settings')) {
                this.elements.wordsInput.focus({ preventScroll: true });
            }
        });

        // New Modal Event Listeners
        this.elements.infoBtn.addEventListener('click', () => this.openModal('infoModal'));
        this.elements.settingsBtn.addEventListener('click', () => this.openModal('settingsModal'));

        this.elements.closeModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal-overlay');
                this.closeModal(modal.id);
            });
        });

        this.elements.modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) this.closeModal(overlay.id);
            });
        });

        // New Settings Event Listeners
        this.elements.fontSizeSetting.addEventListener('change', (e) => this.updateFontSize(e.target.value));
        this.elements.caretStyleSetting.addEventListener('change', (e) => this.updateCaretStyle(e.target.value));
        this.elements.strictModeSetting.addEventListener('change', (e) => {
            this.strictMode = e.target.checked;
            localStorage.setItem('tunehub-strict-mode', this.strictMode);
        });
        this.elements.liveWpmSetting.addEventListener('change', (e) => {
            const display = e.target.checked ? 'flex' : 'none';
            document.getElementById('wpmStat').parentElement.style.display = display;
        });
        this.elements.masterSoundSetting.addEventListener('change', (e) => {
            this.soundEnabled = e.target.checked;
            localStorage.setItem('tunehub-sound', this.soundEnabled);
        });

        // Global Esc to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.elements.modalOverlays.forEach(m => {
                    if (m.classList.contains('active')) this.closeModal(m.id);
                });
            }
        });
    }

    generateTest() {
        // Clear previous words
        this.words = [];
        this.elements.wordsWrapper.innerHTML = '';

        // Generate words based on test mode
        let wordCount;
        if (this.testMode === 'words') {
            wordCount = this.wordCount;
        } else if (this.testMode === 'time') {
            // Estimate words needed for time limit (assuming 5 chars per word)
            wordCount = Math.ceil(this.timeLimit * 4);
        } else if (this.testMode === 'code') {
            // Code mode
            this.words = this.generateCodeWords();
            wordCount = this.words.length;
        } else {
            wordCount = 100; // Default for zen mode
        }

        // Only generate random words if not in code mode
        if (this.testMode !== 'code') {
            const limit = this.testMode === 'time' ? 50 : wordCount;
            for (let i = 0; i < limit; i++) {
                const randomWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
                this.words.push(randomWord);
            }
        }

        // Create word elements
        this.words.forEach((wordContent, i) => {
            // Create word element
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            wordSpan.dataset.index = i;

            // Handle both string words and code words
            const wordStr = String(wordContent);

            // Add letters
            wordStr.split('').forEach((letter, letterIndex) => {
                const letterSpan = document.createElement('span');
                letterSpan.className = 'letter';
                letterSpan.textContent = letter;
                letterSpan.dataset.index = letterIndex;
                wordSpan.appendChild(letterSpan);
            });

            // Add space after word
            const spaceSpan = document.createElement('span');
            spaceSpan.className = 'letter space';
            spaceSpan.textContent = ' ';
            wordSpan.appendChild(spaceSpan);

            this.elements.wordsWrapper.appendChild(wordSpan);
        });

        // Reset test state
        this.currentWordIndex = 0;
        this.currentLetterIndex = 0;
        this.correctLetters = 0;
        this.totalLetters = 0;
        this.combo = 0;
        this.maxCombo = 0;

        // Update UI
        this.updateWordHighlight();
        this.updateStats();
        this.updateComboDisplay();

        // Reset input
        this.elements.wordsInput.value = '';
        this.elements.wordsInput.disabled = false;
        this.elements.wordsInput.focus({ preventScroll: true });

        // Reset buttons
        this.elements.startBtn.style.display = 'flex';
        this.elements.pauseBtn.style.display = 'none';
        this.elements.startBtn.innerHTML = '<i class="fas fa-play"></i><span>start test</span>';

        // Reset timer display
        this.timeLeft = this.timeLimit;
        this.elements.timeStat.textContent = this.timeLeft;
    }

    updateWordHighlight() {
        // Remove active class from all words
        document.querySelectorAll('.word').forEach(word => {
            word.classList.remove('active');
        });

        // Add active class to current word
        const currentWord = document.querySelector(`.word[data-index="${this.currentWordIndex}"]`);
        if (currentWord) {
            currentWord.classList.add('active');
        }

        // Update caret position
        this.updateCaretPosition();
    }

    updateCaretPosition() {
        const currentWord = document.querySelector(`.word[data-index="${this.currentWordIndex}"]`);
        if (!currentWord) return;

        const letters = currentWord.querySelectorAll('.letter');
        let caretPosition = 0;

        if (this.currentLetterIndex < letters.length) {
            const letter = letters[this.currentLetterIndex];
            const rect = letter.getBoundingClientRect();
            const wrapperRect = this.elements.wordsWrapper.getBoundingClientRect();
            caretPosition = rect.left - wrapperRect.left;
        } else {
            // After last letter
            const lastLetter = letters[letters.length - 1];
            if (lastLetter) {
                const rect = lastLetter.getBoundingClientRect();
                const wrapperRect = this.elements.wordsWrapper.getBoundingClientRect();
                caretPosition = rect.right - wrapperRect.left + 4;
            }
        }

        this.elements.caret.style.left = `${caretPosition}px`;
    }

    handleInput(e) {
        if (!this.isRunning || this.isPaused) return;

        const input = e.target.value;
        const currentWord = this.words[this.currentWordIndex];
        const currentWordElement = document.querySelector(`.word[data-index="${this.currentWordIndex}"]`);
        const letters = currentWordElement.querySelectorAll('.letter');

        // Reset letter states
        letters.forEach(letter => {
            letter.classList.remove('correct', 'incorrect', 'extra', 'active');
        });

        // Check each character
        for (let i = 0; i < input.length; i++) {
            if (i < letters.length) {
                if (input[i] === currentWord[i]) {
                    letters[i].classList.add('correct');
                    this.correctLetters++;
                } else {
                    letters[i].classList.add('incorrect');
                    this.combo = 0;
                    this.updateComboDisplay();
                    this.playSound('error');

                    // Strict Mode: Stop processing remaining chars if an error is found
                    if (this.strictMode) break;
                }
                this.totalLetters++;
            } else {
                // Extra characters
                if (i === letters.length) {
                    // Create extra indicator
                    const extraSpan = document.createElement('span');
                    extraSpan.className = 'letter extra';
                    extraSpan.textContent = input[i];
                    currentWordElement.appendChild(extraSpan);
                }
                this.combo = 0;
                this.updateComboDisplay();
                this.playSound('error');
            }
        }

        // Highlight current position
        if (input.length < letters.length) {
            letters[input.length].classList.add('active');
            this.currentLetterIndex = input.length;
        } else {
            this.currentLetterIndex = letters.length;
        }

        // Move to next word on space
        if (input.endsWith(' ') && input.trim().length > 0) {
            this.moveToNextWord();
            e.target.value = '';
        }

        // Update caret position
        this.updateCaretPosition();

        // Update stats
        this.updateStats();

        // Play click sound
        if (input.length > 0) {
            this.playSound('click');
        }
    }

    handleKeyDown(e) {
        // Backspace handling
        if (e.key === 'Backspace' && this.isRunning && !this.isPaused) {
            const input = e.target.value;
            const currentWordElement = document.querySelector(`.word[data-index="${this.currentWordIndex}"]`);

            // Remove extra indicators
            const extras = currentWordElement.querySelectorAll('.letter.extra');
            if (extras.length > 0 && input.length === this.words[this.currentWordIndex].length) {
                extras[extras.length - 1].remove();
            }

            // Update letter highlighting
            const letters = currentWordElement.querySelectorAll('.letter:not(.extra)');
            if (input.length < letters.length) {
                letters[input.length].classList.add('active');
                this.currentLetterIndex = input.length;
                this.updateCaretPosition();
            }
        }
    }

    handleFocus() {
        this.elements.caret.style.display = 'block';
    }

    handleBlur() {
        this.elements.caret.style.display = 'none';
    }

    moveToNextWord() {
        const currentWord = this.words[this.currentWordIndex];
        const input = this.elements.wordsInput.value.trim();

        // Check if word is complete
        if (input === currentWord) {
            this.combo++;
            if (this.combo > this.maxCombo) {
                this.maxCombo = this.combo;
            }
            this.updateComboDisplay();

            // Visual feedback for correct word
            const currentWordElement = document.querySelector(`.word[data-index="${this.currentWordIndex}"]`);
            currentWordElement.style.animation = 'none';
            setTimeout(() => {
                currentWordElement.style.animation = 'combo-pulse 0.3s ease';
            }, 10);
        } else {
            this.combo = 0;
            this.updateComboDisplay();
        }

        // Move to next word
        this.currentWordIndex++;
        this.currentLetterIndex = 0;

        // Check if test is complete
        if (this.currentWordIndex >= this.words.length) {
            this.completeTest();
            return;
        }

        // Update highlight
        this.updateWordHighlight();
    }

    startTest() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.startTime = Date.now();
        this.elements.wordsInput.focus({ preventScroll: true });

        // Update button states
        this.elements.startBtn.style.display = 'none';
        this.elements.pauseBtn.style.display = 'flex';

        // Start timer if in time mode
        if (this.testMode === 'time') {
            this.startTimer();
        }

        // Play start sound
        this.playSound('click');
    }

    startTimer() {
        this.timer = setInterval(() => {
            if (!this.isPaused) {
                this.timeLeft--;
                this.elements.timeStat.textContent = this.timeLeft;

                if (this.timeLeft <= 0) {
                    this.completeTest();
                }
            }
        }, 1000);
    }

    togglePause() {
        if (!this.isRunning) return;

        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.elements.pauseBtn.innerHTML = '<i class="fas fa-play"></i><span>resume test</span>';
            this.elements.wordsInput.disabled = true;
            this.elements.caret.style.display = 'none';

            if (this.testMode === 'time') {
                clearInterval(this.timer);
            }
        } else {
            this.elements.pauseBtn.innerHTML = '<i class="fas fa-pause"></i><span>pause test</span>';
            this.elements.wordsInput.disabled = false;
            this.elements.wordsInput.focus({ preventScroll: true });

            if (this.testMode === 'time') {
                this.startTimer();
            }
        }
    }

    completeTest() {
        this.isRunning = false;
        this.endTime = Date.now();

        // Clear timer
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        // Calculate WPM
        const timeInMinutes = (this.endTime - this.startTime) / 60000;
        const wordsTyped = this.currentWordIndex + (this.currentLetterIndex / this.words[this.currentWordIndex]?.length || 0);
        const wpm = Math.round(wordsTyped / timeInMinutes);

        // Calculate accuracy
        const accuracy = this.totalLetters > 0
            ? Math.round((this.correctLetters / this.totalLetters) * 100)
            : 100;

        // Update result modal
        this.elements.resultWpm.textContent = wpm;
        this.elements.resultAcc.textContent = `${accuracy}%`;
        this.elements.resultTime.textContent = `${Math.round((this.endTime - this.startTime) / 1000)}s`;
        this.elements.resultCombo.textContent = this.maxCombo;

        // Show result modal
        this.showResultModal();

        // Play finish sound
        this.playSound('finish');
    }

    restartTest() {
        // Clear timer
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        // Reset state
        this.isRunning = false;
        this.isPaused = false;
        this.timeLeft = this.timeLimit;

        // Regenerate test
        this.generateTest();

        // Focus input
        this.elements.wordsInput.focus({ preventScroll: true });

        // Play click sound
        this.playSound('click');
    }

    updateStats() {
        if (!this.isRunning || this.startTime === null) {
            this.elements.wpmStat.textContent = '0';
            this.elements.accStat.textContent = '100%';
            return;
        }

        // Calculate WPM
        const timeInMinutes = (Date.now() - this.startTime) / 60000;
        const wordsTyped = this.currentWordIndex + (this.currentLetterIndex / this.words[this.currentWordIndex]?.length || 0);
        const wpm = Math.max(0, Math.round(wordsTyped / timeInMinutes));

        // Calculate accuracy
        const accuracy = this.totalLetters > 0
            ? Math.max(0, Math.round((this.correctLetters / this.totalLetters) * 100))
            : 100;

        // Update display
        this.elements.wpmStat.textContent = wpm;
        this.elements.accStat.textContent = `${accuracy}%`;
        this.elements.comboStat.textContent = this.combo;
    }

    updateComboDisplay() {
        if (this.combo >= 5) {
            this.elements.comboDisplay.classList.add('active');
            this.elements.comboCount.textContent = this.combo;

            // Update combo bar width
            const maxCombo = 50;
            const percentage = Math.min(this.combo / maxCombo, 1);
            this.elements.comboBar.style.width = `${percentage * 100}%`;
        } else {
            this.elements.comboDisplay.classList.remove('active');
        }
    }

    setTestConfig(e) {
        const btn = e.currentTarget;

        // Remove active class from all config buttons
        this.elements.configBtns.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Update test configuration
        if (btn.dataset.time) {
            this.testMode = 'time';
            this.timeLimit = parseInt(btn.dataset.time);
            this.timeLeft = this.timeLimit;
            this.elements.timeStat.textContent = this.timeLeft;
        } else if (btn.dataset.mode) {
            this.testMode = btn.dataset.mode;
            if (this.testMode === 'words') {
                this.wordCount = 50;
            }
        }

        // Regenerate test if not running
        if (!this.isRunning) {
            this.generateTest();
        }

        // Play click sound
        this.playSound('click');
    }

    startCustomTest() {
        // Prompt user for custom settings
        const timeInput = prompt('Enter test duration in seconds (or leave empty for word mode):');
        const wordInput = prompt('Enter number of words (default: 50):');

        if (timeInput && !isNaN(timeInput)) {
            // Time mode
            this.testMode = 'time';
            this.timeLimit = parseInt(timeInput);
            this.timeLeft = this.timeLimit;
            this.elements.timeStat.textContent = this.timeLeft;
        } else if (wordInput && !isNaN(wordInput)) {
            // Word mode
            this.testMode = 'words';
            this.wordCount = parseInt(wordInput);
        }

        // Deactivate all config buttons
        this.elements.configBtns.forEach(b => b.classList.remove('active'));
        this.elements.customTestBtn.classList.add('active');

        // Regenerate test with custom settings
        this.generateTest();

        // Play click sound
        this.playSound('click');
    }

    setMode(e) {
        const mode = e.currentTarget.dataset.mode;

        // Update mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        // Show/hide code options
        const codeOptions = document.getElementById('codeOptions');
        if (codeOptions) {
            if (mode === 'code') {
                codeOptions.style.display = 'flex';
                this.testMode = 'code';
            } else {
                codeOptions.style.display = 'none';
                this.testMode = mode;
            }
        }

        // Regenerate test with new mode
        this.generateTest();

        // Play click sound
        this.playSound('click');
    }

    setLanguage(e) {
        const lang = e.currentTarget.dataset.lang;
        this.codeLanguage = lang;

        // Update active state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Regenerate test with new language
        if (this.testMode === 'code') {
            this.generateTest();
        }

        // Play click sound
        this.playSound('click');
    }

    setLevel(e) {
        const level = e.currentTarget.dataset.level;
        this.codeLevel = level;

        // Update active state
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.level === level);
        });

        // Regenerate test with new level
        if (this.testMode === 'code') {
            this.generateTest();
        }

        // Play click sound
        this.playSound('click');
    }

    getRandomCodeSnippet() {
        // Get snippets for selected language and level
        // Ensure codeSnippets is available globally
        if (typeof codeSnippets === 'undefined') {
            console.error('Code snippets database not found!');
            return 'console.log("Error: Snippets not loaded");';
        }

        const langSnippets = codeSnippets[this.codeLanguage];
        if (!langSnippets) return 'console.log("Language not found");';

        const levelSnippets = langSnippets[this.codeLevel];
        if (!levelSnippets) return 'console.log("Level not found");';

        // Return random snippet
        const randomIndex = Math.floor(Math.random() * levelSnippets.length);
        return levelSnippets[randomIndex];
    }

    generateCodeWords() {
        // Get a random code snippet
        const snippet = this.getRandomCodeSnippet();

        // Split into words (preserve newlines and spaces)
        // Convert newlines to a special token first to visualize them if needed? 
        // Or better, just split by whitespace but treat newlines as characters?
        // For typing tests, typically we rely on visual layout. 
        // Let's replace newlines with a special character or just keep them in the stream.
        // However, the current engine splits by space. 
        // Let's replace newlines with a generic token for now or break it down.

        // Simple approach: Replace \n with space? No, indentation matters.
        // Let's assume standard whitespace splitting for now but replace newlines with a visible return symbol if possible?
        // Actually, let's simply split by spaces/tabs/newlines but keep structure?
        // The existing engine expects an array of words.

        // Better approach for code: 
        // 1. Replace all newlines with " \n " (space newline space)
        // 2. Split by spaces
        // 3. Filter empty strings

        // Note: The current engine might render "\n" literally.
        // Let's try to map it to a symbol or keep it text.

        const withNewlines = snippet.replace(/\n/g, ' ↵ ');
        const words = withNewlines.split(' ').filter(word => word.length > 0);

        return words;
    }

    showPage(pageName) {
        // Hide all pages
        this.elements.pages.forEach(p => p.classList.remove('active'));

        // Show selected page
        const targetPage = document.getElementById(`page${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Play click sound
        this.playSound('click');

        // Update SEO
        if (window.seoManager) {
            window.seoManager.update(pageName);
        }
    }

    toggleTheme() {
        const themes = ['dark', 'light', 'ocean', 'forest', 'royal', 'crimson'];
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.setThemeFromName(themes[nextIndex]);
    }

    setTheme(e) {
        const theme = e.currentTarget.dataset.theme;
        this.setThemeFromName(theme);

        // Update theme options active state
        this.elements.themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });
    }

    setThemeFromName(themeName) {
        // Theme colors map
        const themeColors = {
            dark: '#e2b714',     // Yellow
            light: '#3b88c3',    // Blue  
            ocean: '#29b6f6',    // Cyan
            forest: '#4caf50',   // Green
            royal: '#9c27b0',    // Purple
            crimson: '#e53935'   // Red
        };

        this.theme = themeName;
        document.body.setAttribute('data-theme', themeName);
        document.documentElement.style.setProperty('--accent-color', themeColors[themeName]);

        // Save to localStorage
        localStorage.setItem('tunehub-theme', themeName);
    }

    toggleSound(e) {
        this.soundEnabled = e.target.checked;
        localStorage.setItem('tunehub-sound', this.soundEnabled);
    }

    toggleClickSound(e) {
        const enabled = e.target.checked;
        localStorage.setItem('tunehub-click-sound', enabled);
    }

    toggleErrorSound(e) {
        const enabled = e.target.checked;
        localStorage.setItem('tunehub-error-sound', enabled);
    }



    playSound(type) {
        if (!this.soundEnabled) return;

        // In a real implementation, you would play actual sound files
        // For now, we'll just log the sound type
        console.log(`Playing ${type} sound`);

        // Create audio element
        const audio = new Audio();
        audio.volume = 0.3;

        // Set sound based on type
        switch (type) {
            case 'click':
                if (!this.elements.clickSoundToggle?.checked) return;
                // Simulate click sound with Web Audio API
                this.playClickSound();
                break;
            case 'error':
                if (!this.elements.errorSoundToggle?.checked) return;
                this.playErrorSound();
                break;
            case 'finish':
                this.playFinishSound();
                break;
        }
    }

    playClickSound() {
        // Create Web Audio API click sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        // Use current volume
        const vol = 0.1 * this.volume;
        gainNode.gain.setValueAtTime(vol, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    playErrorSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 200;
        oscillator.type = 'sawtooth';

        // Use current volume
        const vol = 0.2 * this.volume;
        gainNode.gain.setValueAtTime(vol, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }

    playFinishSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Play a sequence of notes
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        const duration = 0.1;
        const noteVolume = 0.1 * this.volume;

        notes.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = freq;
            oscillator.type = 'sine';

            const startTime = audioContext.currentTime + (index * duration);

            gainNode.gain.setValueAtTime(noteVolume, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        });
    }

    showResultModal() {
        this.elements.resultModal.classList.add('active');
    }

    closeResultModal() {
        this.elements.resultModal.classList.remove('active');
    }

    shareResult() {
        const wpm = this.elements.resultWpm.textContent;
        const acc = this.elements.resultAcc.textContent;
        const time = this.elements.resultTime.textContent;
        const combo = this.elements.resultCombo.textContent;

        const text = `🏆 TuneHub Typing Test Results 🏆\n\n` +
            `WPM: ${wpm}\n` +
            `Accuracy: ${acc}\n` +
            `Time: ${time}\n` +
            `Max Combo: ${combo}\n\n` +
            `Try it yourself at: ${window.location.href}`;

        // Copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            alert('Results copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    hideLoadingScreen() {
        this.elements.loadingScreen.style.opacity = '0';
        setTimeout(() => {
            this.elements.loadingScreen.style.display = 'none';
            this.elements.mainContainer.style.display = 'block';
            this.elements.wordsInput.focus({ preventScroll: true });
        }, 500);
    }

    handleRegister(e) {
        e.preventDefault();

        const username = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const verifyEmail = document.getElementById('reg-verify-email').value.trim();
        const password = document.getElementById('reg-password').value;
        const verifyPassword = document.getElementById('reg-verify-password').value;

        // Validation
        if (!username || !email || !verifyEmail || !password || !verifyPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (email !== verifyEmail) {
            alert('Emails do not match');
            return;
        }

        if (password !== verifyPassword) {
            alert('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        // Success (Demo)
        alert(`Registration successful! Welcome, ${username}.`);
        this.playSound('click');

        // Clear form
        document.getElementById('registerForm').reset();

        // Switch to test page
        this.showPage('test');
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            this.isPaused = true;
            if (this.isRunning) {
                this.elements.pauseBtn.innerHTML = '<i class="fas fa-play"></i><span>resume test</span>';
            }
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    updateFontSize(size) {
        this.elements.wordsWrapper.style.fontSize = size;
        this.updateCaretPosition();
        localStorage.setItem('tunehub-font-size', size);
    }

    updateCaretStyle(style) {
        this.elements.caret.className = 'caret ' + style;
        localStorage.setItem('tunehub-caret-style', style);
    }

    handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const remember = document.getElementById('remember-me').checked;

        if (!email || !password) {
            alert('Please enter email and password');
            return;
        }

        // Success (Demo)
        alert('Login successful!');
        this.playSound('click');

        if (remember) {
            localStorage.setItem('tunehub-user-email', email);
        }

        // Switch to test page
        this.showPage('test');
    }

    // Load saved settings from localStorage
    loadSettings() {
        const savedTheme = localStorage.getItem('tunehub-theme');
        if (savedTheme) {
            this.setThemeFromName(savedTheme);
        }

        const savedSound = localStorage.getItem('tunehub-sound');
        if (savedSound !== null) {
            this.soundEnabled = savedSound === 'true';
            if (this.elements.soundToggleSetting) {
                this.elements.soundToggleSetting.checked = this.soundEnabled;
            }
        }

        const savedUser = localStorage.getItem('tunehub-user-email');
        if (savedUser) {
            const emailInput = document.getElementById('login-email');
            if (emailInput) emailInput.value = savedUser;
            const remember = document.getElementById('remember-me');
            if (remember) remember.checked = true;
        }

        // New Settings
        const savedFontSize = localStorage.getItem('tunehub-font-size') || '32px';
        this.updateFontSize(savedFontSize);
        if (this.elements.fontSizeSetting) this.elements.fontSizeSetting.value = savedFontSize;

        const savedCaretStyle = localStorage.getItem('tunehub-caret-style') || 'line';
        this.updateCaretStyle(savedCaretStyle);
        if (this.elements.caretStyleSetting) this.elements.caretStyleSetting.value = savedCaretStyle;

        const savedStrictMode = localStorage.getItem('tunehub-strict-mode') === 'true';
        this.strictMode = savedStrictMode;
        if (this.elements.strictModeSetting) this.elements.strictModeSetting.checked = savedStrictMode;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tunehub = new TuneHub();

    // Load saved settings
    window.tunehub.loadSettings();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TuneHub;
}
