$(document).ready(function(){
    $('#q0').slideDown();
    $('#q0').on('click','button',function(){
        $('#q1').slideDown();
    });
    $('#q1').on('click','button',function(){
        $('#q2').slideDown();
    });
    $('#q2').on('click','button',function(){
        $('#q3').slideDown();
    });
    $('#q3').on('click','button',function(){
        text = $(this).closest('#q3').find('textarea').val();
        console.log(text);
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        write(text,ctx);
        $('#message').slideDown();
    });
    $('#message').on('click','button',function(){
        $('#present').slideDown();
    });
});


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
charList.add(russian);

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

