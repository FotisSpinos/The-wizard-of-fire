class SquareShape extends Component
{
    constructor(color)
    {
        super();
        this.color = color == null ? 'yellow' : color;
    }

    render()
    {
        // get Game Object variables
        var scale = this.gameObject.transform.scale;
        var objPos = this.gameObject.transform.pos; 
        var ctx = this.gameObject.canvas.ctx;

        ctx.fillStyle = this.color;
        ctx.fillRect(objPos.x, objPos.y, scale.x, scale.y);
    }

    print = function()
    {
        console.log('SquareShape component attached to: ' + this.gameObject.id);
    }
}

class CircleShape extends Component
{
    constructor(radious, color)
    {
        super();
        this.startAng = 0;
        this.endAng = 360;

        this.radious = radious;
        this.color = color == null ? 'yellow' : color;
    }

    render()
    {
        var objPos = this.gameObject.transform.pos; 
        var objScale = this.gameObject.transform.scale;
        var ctx = this.gameObject.canvas.ctx;

        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(objPos.x, objPos.y, this.radious, this.startAng, this.endAng);
        ctx.stroke();
    }
}

class ImageRect extends Component
{    
    static addImageToDocument(imageURL, id)
    {
        var img = document.createElement("img");
        img.src = imageURL;
        img.id = 'imageid';
        
        var body = document.getElementById("body");
        body.appendChild(img);
    }

    constructor(img)
    {
        super();
        this.img = img;
    }

    render()
    {
        var objPos = this.gameObject.transform.pos; 
        var objScale = this.gameObject.transform.scale;
        var ctx = this.gameObject.canvas.ctx;

        ctx.drawImage(this.img, objPos.x, objPos.y, objScale.x, objScale.y);
    }
}