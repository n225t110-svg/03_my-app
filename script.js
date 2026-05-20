/**
 * Kansai-ben Converter - Core Logic
 */

class KansaiConverter {
    constructor() {
        this.inputElement = document.getElementById('input-text');
        this.outputElement = document.getElementById('output-text');
        this.convertBtn = document.getElementById('convert-btn');
        this.copyBtn = document.getElementById('copy-btn');
        this.clearBtn = document.getElementById('clear-btn');
        this.tagBtns = document.querySelectorAll('.tag-btn');
        
        // 変換辞書
        this.dictionary = [
            // 単語の置換
            { pattern: /本当に|すごく|とても/g, replacement: 'ほんまに' },
            { pattern: /本当/g, replacement: 'ほんま' },
            { pattern: /ありがとうございます/g, replacement: 'おおきに' },
            { pattern: /ダメ|無理|いけない/g, replacement: 'あかん' },
            { pattern: /違う|違います/g, replacement: 'ちゃう' },
            { pattern: /面白い/g, replacement: 'おもろい' },
            { pattern: /構わない|気にしないで/g, replacement: 'かまへん' },
            { pattern: /お腹が空いた/g, replacement: 'お腹減った' },
            { pattern: /捨てる/g, replacement: 'ほる' },
            { pattern: /片付ける/g, replacement: 'なおす' },
            { pattern: /馬鹿|バカ/g, replacement: 'あほ' },

            // 語尾・助詞の置換 (文末を優先)
            { pattern: /ですか？/g, replacement: 'なん？' },
            { pattern: /ですよ/g, replacement: 'やで' },
            { pattern: /ですね/g, replacement: 'やね' },
            { pattern: /だね/g, replacement: 'やんね' },
            { pattern: /だよね/g, replacement: 'やんな' },
            { pattern: /だ/g, replacement: 'や' },
            { pattern: /です/g, replacement: 'やねん' },
            
            // 否定形
            { pattern: /ないです/g, replacement: 'へんねん' },
            { pattern: /ない/g, replacement: 'へん' },
            
            // 進行形・状態
            { pattern: /ている/g, replacement: 'てる' },
            { pattern: /てしまう/g, replacement: 'てまう' },
            
            // 疑問・促し
            { pattern: /ください/g, replacement: 'してや' },
            { pattern: /なさい/g, replacement: 'しなはれ' }
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.convertBtn.addEventListener('click', () => this.convert());
        
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        
        this.clearBtn.addEventListener('click', () => {
            this.inputElement.value = '';
            this.outputElement.textContent = 'ここに変換結果が出るで〜';
        });

        this.tagBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.inputElement.value = btn.textContent;
                this.convert();
            });
        });

        // 入力中の自動変換 (オプション)
        this.inputElement.addEventListener('input', () => {
            if (this.inputElement.value.length > 0) {
                this.convert();
            }
        });
    }

    convert() {
        let text = this.inputElement.value;
        if (!text.trim()) {
            this.outputElement.textContent = '何か入力してや〜';
            return;
        }

        let converted = text;
        this.dictionary.forEach(item => {
            converted = converted.replace(item.pattern, item.replacement);
        });

        this.outputElement.textContent = converted;
    }

    copyToClipboard() {
        const text = this.outputElement.textContent;
        if (text === 'ここに変換結果が出るで〜' || text === '何か入力してや〜') return;

        navigator.clipboard.writeText(text).then(() => {
            this.showToast();
        });
    }

    showToast() {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    new KansaiConverter();
});
