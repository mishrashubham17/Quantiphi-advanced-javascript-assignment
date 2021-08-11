class QueenAttack{
	constructor(qR,qC,oR,oC){
    	this.qR=qR;
      	this.qC=qC;
        this.oR=oR;
        this.oC=oC;
    }
    canQueenAttack()
    {
        if (this.qR == this.oR)
            return true;
     
        if (this.qC == this.oC)
            return true;
     
        if (Math.abs(this.qR - this.oR) == Math.abs(this.qC - this.oC))
            return true;
     
        return false;
    }
}

let queen = new QueenAttack(1,1,3,2);
let result=queen.canQueenAttack();
console.log(result);

 

 
