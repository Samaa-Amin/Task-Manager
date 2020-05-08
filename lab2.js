var form = document. getElementById("form");
var input = document.getElementById("input");
form.addEventListener('click', addhandler);
var inprogress=document.getElementById("inprogress");
var arr=[];
var obj;

// function dragable and on drag start
function dragableAndDragstart(element){
    element.setAttribute('draggable','true');
    element.addEventListener("dragstart" ,function(event){
        event.dataTransfer.setData( 'text', event.target.id);
        console.log('darg start');
    })
}
// add new task to inprogress by default
function addhandler(e){
    e.preventDefault()
        if(input.value){
        var newdiv=document.createElement("div");
        inprogress.appendChild(newdiv);
        newdiv.innerHTML=input.value;
        var newval=input.value;
        input.value="";
        newdiv.setAttribute('id', arr.length)
        // add dragable attribute and drag start event
        dragableAndDragstart(newdiv)
        dragover();
        // createobj to save in local storage
        var obj ={
            id:arr.length,
            value:newval,
            parent:newdiv.parentNode.id,
        }
        arr.push(obj);
        console.log(arr)
        localStorage.setItem("key",JSON.stringify(arr));
}
}

// dragOver and Drop 
var section = document.getElementsByClassName("section");
var secarr = Array.from(section);
function dragover(){
    for(var i=0 ; i<secarr.length ;i++){
    secarr[i].addEventListener('dragover',function(event){
        event.preventDefault(event);
        console.log("allowdrop");
    })
    secarr[i].addEventListener('drop',function(event){
        var appelement = event.dataTransfer.getData('text');
        event.target.appendChild(document.getElementById(appelement));
        console.log("dragover");
        // change value of inprogress
        for(var y=0 ; y<arr.length ;y++){
            if(arr[y].id==document.getElementById(appelement).id){
            arr[y].parent=event.target.id;
            }
        }
        localStorage.setItem("key",JSON.stringify(arr));
    })
}
}

// get from local storage
var getarr = JSON.parse(localStorage.getItem("key"));
console.log(getarr)
if(getarr){
    createtask()
}

// get tasks on reload
function createtask(){

    for(var i=0; i<getarr.length ;i++){
        var newtask=document.createElement("div");
        document.getElementById(getarr[i].parent).appendChild(newtask);
        newtask.innerHTML=getarr[i].value;
        newtask.setAttribute("draggable", "true");
        newtask.setAttribute('id', i)
        dragableAndDragstart(newtask)
        dragover();
        obj={
            id: getarr[i].id,
            value: newtask.innerHTML,
            parent: getarr[i].parent,
            }
            arr.push(obj);
    }
    localStorage.setItem("key",JSON.stringify(arr));
}
