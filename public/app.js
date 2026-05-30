const socket=io();

const messages=

document.getElementById(
"messages"
);

function addMessage(
text,
mine,
id
){

const div=

document.createElement(
"div"
);

div.className=

"msg "+
(mine?
"me"
:
"other");

div.id=id;

div.innerHTML=

text+

(mine?

"<div class='status'>sent</div>"

:

"");

messages.appendChild(
div
);

messages.scrollTop=

messages.scrollHeight;

return div;

}

function send(){

const input=

document.getElementById(
"text"
);

const text=

input.value.trim();

if(!text)return;

const id=

Date.now()+"";

socket.emit(
"sendMessage",
{
text,
id
}
);

addMessage(
text,
true,
id
);

input.value="";

}

function sticker(s){

document
.getElementById(
"text"
)
.value+=s;

}

socket.on(
"receiveMessage",
(data)=>{

addMessage(
data.text,
false,
data.id
);

socket.emit(
"seen",
data.id
);

});

socket.on(
"delivered",
(id)=>{

const msg=

document.getElementById(
id
);

if(msg){

msg.querySelector(
".status"
).innerText=
"delivered";

}

});

socket.on(
"seen",
(id)=>{

const msg=

document.getElementById(
id
);

if(msg){

msg.querySelector(
".status"
).innerText=
"seen";

}

});
