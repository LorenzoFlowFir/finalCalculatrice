import { Arbre } from './modele/Arbre.js';

let value="0";

  function init() {

    const display = document.querySelector('p#display');
    const calcBtns = document.querySelectorAll('.calcButton');

    const handleDisplayUpdate = () => display.textContent = value;
    

    const handleBtnClick = (e) => {
      e.preventDefault();
      
      let btn = e.currentTarget.id;
      if (btn === 'clear') {
        value="0"
        handleDisplayUpdate();
        return;
      } else if (btn === 'evaluate') {
        value+="=";
        handleDisplayUpdate();
        let a = Arbre.createArbreFormule(value);
        value = a.resoud();
        handleDisplayUpdate();
        return;
      } else {
        btn =e.currentTarget.dataset.value;
        if (value==="0") {
          value="";
        }
        value+=btn;
        handleDisplayUpdate();
      }
    }
  
    calcBtns.forEach(btn => btn.addEventListener('click', handleBtnClick));
  }
  
  document.addEventListener('DOMContentLoaded', init);