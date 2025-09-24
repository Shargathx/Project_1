const fs = require("fs");
const path = require("path");

class PageBanner {
    constructor(filename) {
        this.bannerPath = path.join(__dirname, "images", filename);
        this.bannerBase64 = "";
        this.loadBanner();
    }

    loadBanner() {
        if (!fs.existsSync(this.bannerPath)) {
            console.error("Banner file not found at:", this.bannerPath);
            return;
        }

        try {
            const data = fs.readFileSync(this.bannerPath);
            this.bannerBase64 = data.toString("base64");
            console.log("Banner loaded successfully.");
        } catch (err) {
            console.error("Error reading banner:", err);
        }
    }

    getHTML() {
        if (!this.bannerBase64) return "<p>Banner not available</p>";
        return `<img src="data:image/jpeg;base64,${this.bannerBase64}" alt="Banner">`;
    }
}

module.exports = PageBanner;