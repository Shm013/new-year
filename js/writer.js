//English letters

A=[[0,0,0,0],
   [0,1,1,0],
   [1,0,0,1],
   [1,0,0,1],
   [1,1,1,1],
   [1,0,0,1],
   [0,0,0,0]];

B=[[0,0,0,0],
   [1,1,1,0],
   [1,0,0,1],
   [1,1,1,0],
   [1,0,0,1],
   [1,1,1,0],
   [0,0,0,0]];

C=[[0,0,0,0],
   [0,1,1,0],
   [1,0,0,1],
   [1,0,0,0],
   [1,0,0,1],
   [0,1,1,0],
   [0,0,0,0]];

D=[[0,0,0,0],
   [1,1,1,0],
   [1,0,0,1],
   [1,0,0,1],
   [1,0,0,1],
   [1,1,1,0],
   [0,0,0,0]];

E=[[0,0,0,0],
   [1,1,1,1],
   [1,0,0,0],
   [1,1,1,0],
   [1,0,0,0],
   [1,1,1,1],
   [0,0,0,0]];

//?
Question=[[0,1,1,0],
          [1,0,0,1],
          [0,0,0,1],
          [0,0,1,0],
          [0,0,0,0],
          [0,0,1,0],
          [0,0,0,0]];


english=[{name:'A',value:A},
         {name:'B',value:B},
         {name:'C',value:C},
         {name:'D',value:D},
         {name:'E',value:E}];

punctuation={pQ:{name:'?',value:Question}}

cellSizeX=10;
cellSizeY=10;

function Field(){
    this.value=[[],
                [],
                [],
                [],
                [],
                [],
                []];
    this.add = function(a){
        for(var i=0;i<this.value.length;i++)
            this.value[i]=this.value[i].concat(0,a[i]);
    }
}

function parse(text){
    var total = new Field();
    for(var i=0;i<text.length;i++){
        c=text[i];
        var tmp = null;
        
        for(var j=0;j<english.length;j++){

            if(c==english[j].name){
                tmp=english[j].value;
                break;
            }
        }
        if(!tmp)
            tmp=Question;        

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

