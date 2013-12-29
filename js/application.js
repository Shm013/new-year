$(document).ready(function(){
    
    //Сдесь подключать словари
    charList.add(punctuation);
    charList.add(english);
    charList.add(russian);

    //Размер клеток
    cellSizeX=10;
    cellSizeY=10;
    //Высота строки
    cellInLine=7;
    
    $('#q0').slideDown();
    $('#q0').on('click','button',function(){
        $('#q1').slideDown();
    });
    $('#q1').on('click','button',function(){
        text = $(this).closest('#q1').find('textarea').val();
        text = " " + text + ",\nC Новым\n Годом!";
        
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        canvas.height = maxLineNum(text)*cellSizeY*cellInLine;
        canvas.width = (maxLineSize(text)+1)*cellSizeX*5;
        
        write(text,ctx);
        $('#message').slideDown();
    });
    $('#message').on('click','button',function(){
        $('#present').slideDown();
    });
});

function maxLineSize(value){
    var lines = value.split(/\r|\n/g);
    var biggest;
    
    lines.forEach(function(line){
        if(!biggest||line.length>biggest.length){
            biggest = line;
        }
    });
    return biggest.length;
}

function maxLineNum(value){
    var lines = value.split(/\r|\n/g);
    return lines.length;
}

charList={};
charList.add=function(list){
    for(var key in list){
        if(charList[key])
            clonsole.log("Ahtung! Double letters name in charList!");
        charList[key]=list[key];
    }
}

function Field(){
    this.line=0;
    this.value=[[],
                [],
                [],
                [],
                [],
                [],
                []];
    this.add = function(a){
        var j=0;
        for(var i=this.line;i<this.value.length;i++){
            this.value[i]=this.value[i].concat(0,a[j]);
            j++;
        }
    }
    this.newLine = function(){
        this.line+=cellInLine;
        for(var i=0;i<cellInLine;i++){
            this.value[this.value.length++]=[];
        }
    }
}

//Парсим любой текст - возвращяем двумерный массив из 0 и 1 согласно словарям.
function parse(text){
    var total = new Field();
    for(var i=0;i<text.length;i++){
        c=text[i];
        var tmp = null;
        
        if(c=="\n"){
            total.newLine();
            continue;
        }
    
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
        for(j=0;j<a[i].length;j++)
            if(a[i][j]==1){
                var color = 'rgb(' + Math.floor(Math.random()*255) + ','
                               + Math.floor(Math.random()*255) + ','
                               + Math.floor(Math.random()*255) + ')';
                ctx.fillStyle = color;
                ctx.fillRect(j*cellSizeX,i*cellSizeY,cellSizeX,  cellSizeY);
            }
}

function write(text,ctx){
    var text=text.toUpperCase();
    var test=parse(text);
    if(test){
        draw(test,ctx);
    }
}

