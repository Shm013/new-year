//English letters

A=[[0,0,0,0],
   [0,1,1,0],
   [1,0,0,1],
   [1,0,0,1],
   [1,1,1,1],
   [1,0,0,1]];

//?
_=[[0,1,1,0],
   [1,0,0,1],
   [0,0,0,1],
   [0,0,1,0],
   [0,0,0,0],
   [0,0,1,0]];


cellSizeX=10;
cellSizeY=10;

function Field(){
    this.value=[[0],
                [0],
                [0],
                [0],
                [0],
                [0]];
    this.add = function(a){
        for(var i=0;i<this.value.length;i++)
            this.value[i]=this.value[i].concat(a[i]);
    }
}

function parse(text){
    var total = new Field();
    console.log(text);
    for(var i=0;i<text.length;i++){
        console.log(i);
        c=text[i];
        var tmp;
        switch(c){
            case 'A':
                tmp = A;
                break;
            default:
                tmp = _;
                break;
        }
        total.add(tmp);
    }
    return total.value;
}

function draw(a,ctx){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    
    for(i=0;i<a.length;i++)
        for(j=0;j<a[0].length;j++)
            if(a[i][j]==1){
                color = 'rgb(' + Math.floor(Math.random()*255) + ','
                               + Math.floor(Math.random()*255) + ','
                               + Math.floor(Math.random()*255) + ')';
                ctx.fillStyle = color;
                ctx.fillRect(j*cellSizeX,i*cellSizeY,cellSizeX,  cellSizeY);
            }
}

function write(text,ctx){
    text=text.toUpperCase();
    test=parse(text);
    if(test){
        draw(test,ctx);
    }
}

