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
import { Automate } from "./Automate";
import { GenericPair } from "./GenericPair";
export class AutomateAvecEspaces extends Automate {
    // Entrée : numérique ou - unaire ou . flottant ou espace
    litEtat0(idx) {
        const car = this.chaine.charAt(idx);
        if (car === " ") {
            return this.litEtat0(idx + 1);
        }
        return super.litEtat0(idx);
    }
    // Entrée : numérique ou . flottant ou espace
    litEtat1(idx) {
        const car = this.chaine.charAt(idx);
        if (car === " ") {
            return this.litEtat1(idx + 1);
        }
        return super.litEtat1(idx);
    }
    // Entrée : numérique, . flottant, opérateur, =, espace
    litEtat3(idx) {
        const car = this.chaine.charAt(idx);
        if (car === " ") {
            return this.litEtat5(idx + 1);
        }
        return super.litEtat3(idx);
    }
    // Entrée : numérique, opérateur, =, espace
    litEtat4(idx) {
        const car = this.chaine.charAt(idx);
        if (car === " ") {
            return this.litEtat5(idx + 1);
        }
        return super.litEtat4(idx);
    }
    // Entrée : opérateur, =, espace
    litEtat5(idx) {
        const car = this.chaine.charAt(idx);
        if (car === "*" || car === "/" || car === "+" || car == "-") {
            return this.litEtat0(idx + 1);
        }
        if (car === "=") {
            return true;
        }
        if (car === " ") {
            return this.litEtat5(idx + 1);
        }
        return new GenericPair(idx, "Attendu : numérique, opérateur, =");
    }
}
