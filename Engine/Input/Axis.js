class Axis
{
    constructor(id, positiveKeyID, negativeKeyID, rate, delay)
    {
        this.id = id;
        this.rate = rate;
        this.delay = delay;
        this.delayStore = delay;

        this.positiveKeyID = positiveKeyID;
        this.negativeKeyID = negativeKeyID;

        this.increaseFactor = 0;
        this.decreaseFactor = 0;
        
        Input.axis.push(this);
    }

    get axisValue()
    {
        return this.increaseFactor - this.decreaseFactor;
    }

    culculateFactor = function(factor, key)
    {
        if(Input.instance.keys[key] == true)
            factor += this.rate; 
        else if(factor - this.rate >= 0)
            factor -= this.rate;
        else 
            factor = 0;

        if(factor > 1)
            return 1;

        return factor;
    }

    update = function()
    {
        if(this.delay > 0)
        {
            this.delay -= Engine.instance.deltaTime;
            return;
        }

        this.delay = this.delayStore;
        
        this.increaseFactor = this.culculateFactor(this.increaseFactor, this.positiveKeyID);
        this.decreaseFactor = this.culculateFactor(this.decreaseFactor, this.negativeKeyID);
    }
}