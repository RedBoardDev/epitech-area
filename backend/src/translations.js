import fs from 'fs';

class Translation {
    constructor(path) {
        this.languages = {};
        this.path = path.endsWith('/') ? path : `${path}/`;
        this.loadLanguages();
    }

    loadLanguages() {
        const files = fs.readdirSync(this.path);
        files.forEach(element => {
            if (element.startsWith('_'))
                return;
            console.log(`Loading translation ${element}...`);
            const translation = JSON.parse(fs.readFileSync(`${this.path}${element}`, 'utf8'));
            this.languages[element.split('.')[0]] = translation;
        });
    }

    getUrlLang(req) {
        return req.originalUrl.split('/')[1];
    }

    t(lang, key) {
        if (!this.languages[lang])
            throw new Error(`Translation error: Language ${lang} not found`);
        if (!this.languages[lang][key])
            throw new Error(`Translation error: Key ${key} not found in language ${lang}`);
        return this.languages[lang][key];
    }
}

export default Translation;
