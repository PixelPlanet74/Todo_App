var firebaseConfig = {
  apiKey: "AIzaSyBs9ABpGevF68Yh-N_gOkRIOvn-H0at6Kk",
  authDomain: "todoapp-d3ffb.firebaseapp.com",
  databaseURL: "https://todoapp-d3ffb-default-rtdb.firebaseio.com",
  projectId: "todoapp-d3ffb",
  storageBucket: "todoapp-d3ffb.appspot.com",
  messagingSenderId: "146714767156",
  appId: "1:146714767156:web:fded19619494f755ebbf61"
};

  
  var app = firebase.initializeApp(firebaseConfig);



var list = document.getElementById('list');
firebase.database().ref('todo-data').on('child_added',function(data){

    var lielement = document.createElement('li');
    var litext = document.createTextNode(data.val().value);
    lielement.appendChild(litext);
    list.appendChild(lielement);
    lielement .appendChild(document.createElement('br'));
    lielement .setAttribute('class','text');
    input.value = "";

    var delbtn = document.createElement('button');
    var delbtntxt = document.createTextNode('Delete');
    delbtn.appendChild(delbtntxt);
    lielement.appendChild(delbtn);
    
    delbtn.setAttribute('onclick','del(this)');
    delbtn.setAttribute('class','delbtn')
    delbtn.setAttribute('id',data.val().key);


    var editbtn = document.createElement('button');
    var editbtntxt = document.createTextNode('Edit');
    editbtn.appendChild(editbtntxt);
    lielement.appendChild(editbtn);
    editbtn.setAttribute('onclick','edit(this)')
    editbtn.setAttribute('class','editbtn')
    editbtn.setAttribute('id',data.val().key);

})


function add(){
    
    var input = document.getElementById('input');
    var normal = input.value.replace(/\s+/g, ' ');
    if(normal !== "" && normal !==" "){

      var database = firebase.database().ref('todo-data');
      var key = database.push().key;
      var obj = {
        value:input.value,
        key:key
        
      }
      database.child(key).set(obj)
    }
    else{
      alert("Enter Value");
      input.value = "";
    }
      
}

function delall(){
  firebase.database().ref('todo-data').remove()
    list.innerHTML = ""
}

function del(e){
  firebase.database().ref('todo-data').child(e.id).remove();
        e.parentNode.remove();

}

function edit(e){
    
    var editvalue = prompt("Enter new value",e.parentNode.firstChild.nodeValue);
    var editdata = {
      value:editvalue,
      key:e.id
    }
    firebase.database().ref('todo-data').child(e.id).set(editdata)
     e.parentNode.firstChild.nodeValue = editvalue;

}