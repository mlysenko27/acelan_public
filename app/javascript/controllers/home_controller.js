import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = [ "languageSelect" , "languageSelector", "languageModalWindow", "languageModalWindowText" ]
    static values = { lang: { type: String, default: "EN"} }

    initialize() {
        this.languageModalWindowTarget.hidden = true;
    }

    toggleLanguageSelect() {
        const menu = this.element.querySelector(".absolute");
        if (menu.style.display === "none") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    }

    changeLanguage() {
        let text = "";
        switch(this.languageSelectorTarget.selectedOptions[0].text){
            case "RU":
                text = "Язык успешно изменён";
                break;
            default:
                text = "Language successfully changed";
        }
        this.languageModalWindowTextTarget.textContent = text;
        this.languageModalWindowTarget.hidden = false;
    }

    closeLanguageModalWindow() {
        this.languageModalWindowTarget.hidden = true;
    }
}

