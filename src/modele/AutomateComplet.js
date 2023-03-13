/**
 * Class AutomateAvecEspaces
 *
 * Automate de vérification d'une formule définie comme suit :
 * - entiers ou réels
 * - opérateurs : * / + -
 * - les espaces surnuméraires sont acceptés
 *
 *
 */
import { AutomateAvecEspaces } from "./AutomateAvecEspaces";
import { GenericPair } from "./GenericPair";
export class AutomateComplet extends AutomateAvecEspaces {
    constructor(chaine) {
        super(chaine);
        this._nbParentheses = 0;
    }
    // Entrée : numérique ou - unaire ou . flottant ou espace ou (
    litEtat0(idx) {
        const car = this.chaine.charAt(idx);
        if (car === "(") {
            this._nbParentheses++;
            return this.litEtat0(idx + 1);
        }
        return super.litEtat0(idx);
    }
    // Entrée : numérique ou . flottant ou (
    litEtat1(idx) {
        const car = this.chaine.charAt(idx);
        if (car === "(") {
            this._nbParentheses++;
            return this.litEtat1(idx + 1);
        }
        return super.litEtat1(idx);
    }
    // Entrée : numérique, . flottant, opérateur, =, espace, )
    litEtat3(idx) {
        const car = this.chaine.charAt(idx);
        if (car === ")") {
            this._nbParentheses--;
            if (this._nbParentheses < 0) {
                return new GenericPair(idx, "parenthèse fermante inatendue.");
            }
            return this.litEtat5(idx + 1);
        }
        if (car === "=" && this._nbParentheses > 0) {
            return new GenericPair(idx, "fin d'expression sans avoir fermé toutes les parenthèses.");
        }
        return super.litEtat3(idx);
    }
    // Entrée : numérique, opérateur, =, espace, )
    litEtat4(idx) {
        const car = this.chaine.charAt(idx);
        if (car === ")") {
            this._nbParentheses--;
            if (this._nbParentheses < 0) {
                return new GenericPair(idx, "parenthèse fermante inatendue.");
            }
            return this.litEtat5(idx + 1);
        }
        if (car === "=" && this._nbParentheses > 0) {
            return new GenericPair(idx, "fin d'expression sans avoir fermé toutes les parenthèses.");
        }
        return super.litEtat4(idx);
    }
    // Entrée : opérateur, =, espace, )
    litEtat5(idx) {
        const car = this.chaine.charAt(idx);
        if (car === ")") {
            this._nbParentheses--;
            if (this._nbParentheses < 0) {
                return new GenericPair(idx, "parenthèse fermante inatendue.");
            }
            return this.litEtat5(idx + 1);
        }
        if (car === "=" && this._nbParentheses > 0) {
            return new GenericPair(idx, "fin d'expression sans avoir fermé toutes les parenthèses.");
        }
        return super.litEtat5(idx);
    }
}
