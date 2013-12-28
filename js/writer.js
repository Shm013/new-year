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
//,
Comma=[[0],
       [0],
       [0],
       [0],
       [0],
       [1],
       [1]];

english={enA:{name:'A',value:A},
         enB:{name:'B',value:B},
         enC:{name:'C',value:C},
         enD:{name:'D',value:D},
         enE:{name:'E',value:E}};

punctuation={pQ:{name:'?',value:Question},
             pC:{name:',',value:Comma}};

charList={};
charList.add=function(list){
    for(var key in list){
        if(charList[key])
            clonsole.log("Ahtung! Double letters name in charList!");
        charList[key]=list[key];
    }
}
charList.add(punctuation);
charList.add(english);

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
            
        for(var p in charList){
            if(charList[p].name==c){
                tmp=charList[p].value;
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

