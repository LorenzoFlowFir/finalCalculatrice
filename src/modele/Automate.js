/**
 * Class Automate
 *
 * Automate de vérification d'une formule définie comme suit :
 * - entiers ou réels
 * - opérateurs : * / + -
 * - les espaces surnuméraires sont ne sont pas gérés
 *
 *
 */
import { GenericPair } from "./GenericPair.js";
export class Automate {
    constructor(chaine) {
        this._chaine = chaine;
    }
    get chaine() {
        return this._chaine;
    }
    evalue() {
        return this.litEtat0(0);
    }
    // Entrée : numérique ou - unaire ou . flottant
    litEtat0(idx) {
        const car = this._chaine.charAt(idx);
        if (car === "-") {
            return this.litEtat1(idx + 1);
        }
        if (car == ".") {
            return this.litEtat2(idx + 1);
        }
        if (Automate.estNombre(car)) {
            return this.litEtat3(idx + 1);
        }
        return new GenericPair(idx, "Attendu : numérique ou - unaire ou . flottant");
    }
    // Entrée : numérique ou . flottant
    litEtat1(idx) {
        const car = this._chaine.charAt(idx);
        if (car == ".") {
            return this.litEtat2(idx + 1);
        }
        if (Automate.estNombre(car)) {
            return this.litEtat3(idx + 1);
        }
        return new GenericPair(idx, "Attendu : numérique ou . flottant");
    }
    // Entrée : numérique
    litEtat2(idx) {
        const car = this._chaine.charAt(idx);
        if (Automate.estNombre(car)) {
            return this.litEtat4(idx + 1);
        }
        return new GenericPair(idx, "Attendu : numérique");
    }
    // Entrée : numérique, . flottant, opérateur, =
    litEtat3(idx) {
        const car = this._chaine.charAt(idx);
        if (car === "*" || car == "/" || car === "+" || car == "-") {
            return this.litEtat0(idx + 1);
        }
        if (Automate.estNombre(car)) {
            return this.litEtat3(idx + 1);
        }
        if (car === ".") {
            return this.litEtat4(idx + 1);
        }
        if (car === "=") {
            return true;
        }
        return new GenericPair(idx, "Attendu : numérique, .flottant, opérateur ou = ");
    }
    // Entrée : numérique, opérateur, =
    litEtat4(idx) {
        const car = this._chaine.charAt(idx);
        if (car === "*" || car === "/" || car === "+" || car == "-") {
            return this.litEtat0(idx + 1);
        }
        if (Automate.estNombre(car)) {
            return this.litEtat4(idx + 1);
        }
        if (car === "=") {
            return true;
        }
        return new GenericPair(idx, "Attendu : numérique, opérateur, =");
    }
    static estNombre(caractere) {
        let ok = false;
        try {
            ok = !isNaN(Number.parseInt(caractere));
        }
        catch (e) {
            // ok est déjà false
        }
        return ok;
    }
}
