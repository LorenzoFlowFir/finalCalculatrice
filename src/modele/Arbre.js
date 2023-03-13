import { Automate } from "./Automate.js";
export class Arbre {
    constructor(contenu, fg = null, fd = null) {
        this.contenu = contenu;
        this.fg = fg;
        this.fd = fd;
    }
    static createSimple(contenu, fg, fd) {
        const a = new Arbre(contenu);
        if (fg !== "")
            a._fg = new Arbre(fg);
        if (fd !== "")
            a._fd = new Arbre(fd);
        return a;
    }
    set contenu(contenu) {
        this._contenu = contenu;
    }
    set fg(fg) {
        this._fg = fg;
    }
    set fd(fd) {
        this._fd = fd;
    }
    /**
     * Parcours en profondeur d'abord
     */
    parcours() {
        if (this._fg != null) {
            this._fg.parcours();
        }
        console.log(" " + this._contenu);
        if (this._fd != null) {
            this._fd.parcours();
        }
    }
    /**
     * @param string $s la formule à valider
     * @return string
     *
     * Vérification de la validité de la formule
     *
     */
    static verifie(s) {
        let a = new Automate(s);
        return a.evalue();
    }
    /**
     * création d'un arbre à partir d'une formule sous forme de chaîne
     */
    static createArbreFormule(chaine) {
        const tab = [];
        if (chaine.charAt(chaine.length - 1) === "=") {
            chaine = chaine.substring(0, chaine.length - 1);
        }
        // Distinction entre opérateurs unaires et binaires
        chaine = Arbre.traiteOperateursUnaires(chaine);
        // remplacement des expressions entre parenthèses par P0, P1, P2
        // P0 sera stocké dans tab[0]
        const s = Arbre.expurgeParentheses(chaine, tab);
        // Les Pi peuvent également contenir des parenthèses, on les traite récursivement
        let i = 0;
        while (i < tab.length) {
            tab[i] = Arbre.expurgeParentheses(tab[i], tab);
            i++;
        }
        return Arbre.createArbre(s, tab);
    }
    /**
     *
     * Création d'un arbre une fois les parenthèses éliminées
     *
     */
    static createArbre(s, tab) {
        let operateur = "";
        // Priorité 2 : opération +- binaire de gauche à droite
        let idx = -1;
        let idx1 = s.lastIndexOf("+");
        let idx2 = s.lastIndexOf("-");
        if (idx1 !== -1 && idx2 !== -1) {
            idx = Math.max(idx1, idx2);
            if (idx1 > idx2) {
                operateur = "+";
            }
            else {
                operateur = "-";
            }
        }
        else if (idx2 == -1) {
            operateur = "+";
            idx = idx1;
        }
        else {
            operateur = "-";
            idx = idx2;
        }
        if (idx !== -1) {
            return new Arbre(operateur, Arbre.createArbre(s.substring(0, idx), tab), Arbre.createArbre(s.substring(idx + 1), tab));
        }
        // Priorité 1 : opération */, de gauche àdroite
        idx1 = s.lastIndexOf("*");
        idx2 = s.lastIndexOf("/");
        if (idx1 !== -1 && idx2 !== -1) {
            idx = Math.max(idx1, idx2);
            if (idx1 > idx2) {
                operateur = "*";
            }
            else {
                operateur = "/";
            }
        }
        else if (idx2 == -1) {
            operateur = "*";
            idx = idx1;
        }
        else {
            operateur = "/";
            idx = idx2;
        }
        if (idx !== -1) {
            return new Arbre(operateur, Arbre.createArbre(s.substring(0, idx), tab), Arbre.createArbre(s.substring(idx + 1), tab));
        }
        idx = s.indexOf("s");
        if (idx !== -1) {
            return new Arbre("-", null, Arbre.createArbre(s.substring(idx + 1), tab));
        }
        // Sinon : feuille (nombre)
        const feuille = s;
        if (feuille.startsWith("P")) {
            const numeroSousFormule = Number.parseInt(feuille.substring(1));
            return Arbre.createArbre(tab[numeroSousFormule], tab);
        }
        return new Arbre(feuille);
    }
    // Remplacement des - unaires par un autre opérateur : 's'
    static traiteOperateursUnaires(s) {
        const operateurs = ["+", "-", "*", "/", "s", "S"];
        // Tous les opérateurs - sont renommés pour sortir de la boucle
        let idx;
        do {
            idx = s.indexOf("-");
            if (idx !== -1) {
                // - en 1ère position => - unaire
                if (idx === 0) {
                    s = "s" + s.substring(1);
                    // - après un opérateur => - unaire
                }
                else if (operateurs.indexOf(s.charAt(idx - 1)) !== -1) {
                    s = s.substring(0, idx) + "s" + s.substring(idx + 1);
                    // sinon - binaire
                }
                else {
                    s = s.substring(0, idx) + "S" + s.substring(idx + 1);
                }
            }
        } while (idx != -1);
        // opérateurs binaires - reprennent leur valeur
        s = s.replaceAll("S", "-");
        return s;
    }
    /**
     *
     * Remplacement des sous-formules entre parenthèses par des Pi
     *
     * Les Pi sont stockées dans la table tab pour traitement récursif
     *
     */
    /* TODO : en PHP, on avait une ref sur le tableau !!! */
    static expurgeParentheses(chaine, tab) {
        let idx = chaine.indexOf("(");
        if (idx === -1) {
            return chaine;
        }
        else {
            // recherche de la 1ère sous-formule
            // (les suivantes seront traitées par appel récursif de cette fonction (cf return fin de fonction)
            let ssChaine = chaine.substring(idx + 1);
            let nbParentheses = 1;
            let i = 0;
            while (i < ssChaine.length && nbParentheses > 0) {
                if (ssChaine.charAt(i) === "(") {
                    nbParentheses++;
                }
                else if (ssChaine.charAt(i) == ")") {
                    nbParentheses--;
                }
                i++;
            }
            let sousFormule = ssChaine.substring(0, i - 1);
            tab.push(sousFormule);
            // remplacement de cette sous-formule par un Pi dans la formule traitée
            let chaineGauche;
            if (idx === 0) {
                chaineGauche = "";
            }
            else {
                chaineGauche = chaine.substring(0, idx);
            }
            let chaineDroite;
            if (idx + 1 + i >= chaine.length - 1) {
                chaineDroite = "";
            }
            else {
                chaineDroite = chaine.substring(idx + 1 + i);
            }
            chaine = chaineGauche + "P" + (tab.length - 1) + chaineDroite;
            return Arbre.expurgeParentheses(chaine, tab);
        }
    }
    /**
     * Fonction d'affichage en mode DEBUG
     */
    parcoursGraphique() {
        let resultat = "";
        if (this._fg != null) {
            resultat = "fg";
            resultat += this._fg.parcoursGraphique();
        }
        if (this._fd != null) {
            resultat += "fd";
            resultat += this._fd.parcoursGraphique();
        }
        resultat += this._contenu;
        return resultat;
    }
    resoud() {
        // feuille
        if (this._fg == null && this._fd == null) {
            return Number.parseFloat(this._contenu);
        }
        // - unaire
        if (this._fg == null) {
            let valeur = this._fd.resoud();
            if (this._contenu === "-") {
                return -valeur;
            }
            throw new Error("Opérateur " + this._contenu + " sans fils gauche !");
        }
        // cas général
        const res = Arbre.resolution(this._contenu, this._fg.resoud(), this._fd.resoud());
        return res;
    }
    static resolution(operateur, vg, vd) {
        let res = 0;
        switch (operateur) {
            case "*":
                res = vg * vd;
                break;
            case "/":
                res = vg / vd;
                break;
            case "+":
                res = vg + vd;
                break;
            case "-":
                res = vg - vd;
                break;
        }
        return res;
    }
}
