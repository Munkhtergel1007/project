class Calculator {
    constructor(previous, current){
      this.previous = previous;
      this.current = current;
      this.clearAll();
    }
    
    clearAll() {
      this.previousText = "";
      this.currentText = "";
      this.specialText = undefined;
    }
    
    clear(){
      this.currentText = this.currentText.toString().slice(0, -1);
    }
    
    insertNumber(num){  
      if(num === '.' && this.currentText.includes('.')) return;
      this.currentText = this.currentText.toString() + num.toString();
      
    }
    
    insertSpecial(special){
      if(this.currentText === '') return;
      if (this.previousText !== '') {
        this.equal();
      }
      this.specialText = special;
      this.previousText = this.currentText;
      this.currentText = '';
      // this.previousText = this.previousText + " " + this.specialText;
    }
    
    equal(){
      let result;
      const prev = parseFloat(this.previousText);
      const curr = parseFloat(this.currentText);
      if(isNaN(prev) || isNaN(curr)){
        return;
      }
      
      switch (this.specialText) {
        case '+':
          result = prev + curr;
          break;
          
          case '-':
            result = prev - curr;
            break;
            case '*':
              result = prev * curr;
              break;
              case '/':
                result = prev / curr;
                break;
        default:
          return;
        }
        
        this.currentText = result;
        this.specialText = undefined;
        this.previousText = '';
      }
      
      getNumber(num) { 
        const string = num.toString();
        const buhelHeseg = parseFloat(string.split('.')[0]);
        const butarhaiheseg = string.split('.')[1];
        let setDisplay;
  
        if (isNaN(buhelHeseg)) setDisplay = '';
        else {
          setDisplay = buhelHeseg.toLocaleString('en', {
            maximumFractionDigits: 0})
          }
          
          if (butarhaiheseg != null) {
            return `${buhelHeseg}.${butarhaiheseg}`;
          } else {
            return setDisplay;
          }
        }
        
        
        update(){ 
          this.current.innerText =  this.getNumber(this.currentText);
          if (this.specialText !== null && this.specialText !== undefined){
            this.previous.innerText = `${this.previousText} ${this.specialText}`;
          } else {
            this.previous.innerText = ''; 
          }
          // this.current.innerText = this.currentText;
          // this.previous.innerText = this.previousText;
        }
        
      }
      const numberBtn = document.querySelectorAll('#number');
      const specialBtn = document.querySelectorAll('#special');
      const clearAllBtn = document.querySelector('#clear');
      const clearBtn = document.querySelector('#delete');
      const equalBtn = document.querySelector('#equal');
      const previous = document.querySelector('#previous');
      const current = document.querySelector('#current');
      
      const calculator = new Calculator (previous, current);
      
  numberBtn.forEach(e => {
    e.addEventListener('click', () => {
      calculator.insertNumber(e.innerText);
      calculator.update();
    })
  })
  
  
  specialBtn.forEach(e => {
    e.addEventListener('click', () => {
      calculator.insertSpecial(e.innerText);
      calculator.update();
    })
  })
  
  equalBtn.addEventListener('click', () => {
    calculator.equal();
    calculator.update();
  
  })
  
  clearAllBtn.addEventListener('click', () => {
     calculator.clearAll();
     calculator.update();
  })
  
  clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.update();
  })