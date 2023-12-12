var socket = io();
socket.on("received_credentials", () => {
  // window.location.replace("./messaging");
  // localStorage.socket = id;
  document.getElementById("login_interface").style.visibility = "none";
  {
    //   document.getElementById("style").innerHTML = `
    //   body {
    //     font-family: Arial, sans-serif;
    //     margin: 0;
    //     padding: 0;
    //     color: white;
    //     background-color: #182726;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     height: 100vh;
    //     margin: 0;
    // }
    // .chat-area {
    //     /* margin-top: 50px; */
    //     width: 77%;
    //     height: 100%;
    //     display: flex;
    //     flex-direction: column;
    //     overflow: hidden;
    // }
    // .container {
    //     margin-top: 56px;
    //     background-color: #182726   ;
    //     height: calc(100vh - 50px);
    //     width: 100%;
    //     position: relative;
    //     overflow-y: scroll;
    //     overflow-x: hidden;
    // }
    // .message_container {
    //     background-color: #182726;
    //     border-style: groove;
    //     border-color: black;
    //     transition: all 1s;
    //     width: fit-content;
    //     padding: 8px 10px 0px 10px;
    //     margin: 5px;
    //     clear: both;
    //     position: relative;
    //     max-width: 40vw;
    // }
    // .receiving {
    //     border-width: 0px 0px 0px 3px;
    //     border-radius: 0px 10px 10px 0px;
    //     float: left;
    //     /* #32524d; */
    //     background-color: hsl(165, 22%, 17%);;
    // }
    // .sending {
    //     border-radius: 10px 0px 0px 10px;
    //     border-width: 0px 3px 0px 0px;
    //     float: right;
    //     background-color:darkslategrey;
    // }
    // .username {
    //     color: white;
    //     margin-top: 4px;
    //     margin-left: 4px;
    // }
    // .receiving .colored_portion {
    //     padding: 5px;
    //     border-radius: 4px;
    // }
    // .sending .colored_portion {
    //     padding: 5px;
    //     border-radius: 4px;
    // }
    // .time {
    //     font-size: 12px;
    //     padding-top: 4px;
    //     text-align: right;
    // }
    // #message-input {
    //     width: calc(67% - 90px);
    //     border: 1px solid #ccc;
    //     padding: 19px;
    //     padding-top:11px;
    //     padding-bottom:13px;
    //     padding-right:1px;
    //     /* border-radius: 5px; */
    //     color:white;
    //     position: fixed;
    //     bottom: 6px;
    //     left: 350px;
    //     z-index: 3;
    //     /* border:none; */
    //     border-left:none;
    //     border-right:none;
    //     border-top:none;
    //     background-color: #182726;
    // }
    // #send-button {
    //     background-color: #273f3e ;
    //     transition: background-color 0.3s ;
    //     color: white;
    //     border: none;
    //     height: 45px;
    //     width: 90px;
    //     cursor: pointer;
    //     position: fixed;
    //     bottom: 8px;
    //     right: 12px;
    //     border-radius: 4px;
    //     font-size: 14px;
    // }
    // .scrollable-chat-list {
    //     width: 23%;
    //     height: 100%;
    //     /* border: 2px solid #1f1f1f;; */
    //     border-right-color: white;
    //     overflow-x: hidden;
    //     overflow-y: scroll;
    //     background-color: #213635;
    //     /* margin: -6px; */
    // }
    // .scrollable-content {
    //     margin-top:53px;
    //     padding: 10px;
    //     padding-left: 0px;
    // }
    // .uname-search {
    //     width: 220px;
    //     font-size: 14px;
    //     /* height: 30px; */
    //     border-radius: 8px;
    //     border:1px solid whitesmoke;
    //     padding:5px;
    //     margin-left:    8px;
    //     padding-left: 15px;
    //     background-color: #213635;
    //     color:white;
    // }
    // .nav-bar {
    //     background-color: #273f3e;
    //      /* Background color for the fixed navbar */
    //     padding: 10px;
    //     position: fixed; /* Fix the navbar at the top */
    //     width: 100%;
    //     height:33px;
    //     z-index: 1; /* Ensure it appears above other content */
    // }
    // .chatbar-nav{
    //     background-color: #213635; /* Background color for the fixed navbar */
    //     padding: 10px;
    //     position: fixed; /* Fix the navbar at the top */
    //     width: 21.5%;
    //     /* height:30px;     */
    //     z-index: 1;
    //     padding-bottom: 0;
    // }
    // .chat-heads{
    //     /* border:2px solid red; */
    //     cursor: pointer;
    //     padding:10px;
    //     margin-bottom:1px;
    //     /* padding:0px; */
    //     height:40px;
    //     /* border:2px solid red; */
    //     /* background-color: darkslategrey;  */
    //     display: flex;
    //     align-items: center;
    //     width: 94%;
    // }
    // .chat-heads:hover{
    //     background:hsl(165,38%, 35%)
    // }
    // .chat-heads .avatar {
    //     width: 45px;
    //     height: 45px;
    //     background-color: #3498db; /* Background color for the avatar */
    //     border-radius: 50%; /* Create a circular shape */
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     font-size: 20px; /* Adjust the font size */
    //     color: white;
    // }
    // .text-container {
    //     padding: 10px;
    // }
    // .text{
    //     font-size: 14;
    //     color:white;
    //     max-width: 220px;
    //     max-height: 20px;
    //     overflow: hidden;
    // }
    // .recent-time{
    //     font-size:12px;
    // }
    // .text span {
    //     font-size: 12px;
    //     padding-left: 100px;
    // }
    // .text i {
    //     padding:5px;
    //     opacity: 0;
    // }
    // .recent {
    //     font-size: 12px;
    //     padding-top: 4px;
    //     color:#ccc;
    // }
    // .selected {
    //     background-color: darkslategrey;
    // }
    // #search-icon{
    //     color:red;
    //     /* z-index: -1; */
    // }
    // input:focus{
    //     outline: none   ;
    // }
    // textarea:focus{
    //     outline: none   ;
    // }
    // .icons{
    //     /* margin:10px; */
    //     /* padding:10px; */
    //     position: absolute;
    //     top:10px;
    //     left: 940px;
    //     /* padding-left:10px; */
    //     font-size: 20px;
    //     border-radius: 6px;
    // }
    // .icons i{
    //     margin-top:5px;
    //     margin-left: 10px;
    //     cursor: pointer;
    // }
    // #menu-button {
    //     /* position: fixed;
    //     top: 20px;
    //     left: 20px; */
    //     font-size: inherit;
    //     cursor: pointer;
    // }
    // #menu-bar {
    //     position: fixed;
    //     top: 0;
    //     left: -304px; /* Initially hidden to the left */
    //     width: 304px;
    //     height: 100%;
    //     background: #213635;
    //     color:white;
    //     transition: left 0.2s;
    //     z-index: 1;
    //     overflow-y: auto;
    //     padding-bottom: 10px;
    // }
    // /* Style for the close button */
    // #userinfo i {
    //     position: absolute;
    //     top: 20px;
    //     right: 20px;
    //     font-size: 20px;
    //     cursor: pointer;
    // }
    // .overlay {
    //     display: none;
    //     position: fixed;
    //     top: 0;
    //     left: 313px;
    //     width: 77%;
    //     height: 100%;
    //     background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
    //     transition: left 5s;
    //     z-index: 2; /* Place it above other content */
    // }
    // #avatar {
    //     width: 50px;
    //     height: 50px;
    //     background-color: #3498db; /* Background color for the avatar */
    //     border-radius: 50%; /* Create a circular shape */
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     font-size: 20px; /* Adjust the font size */
    //     color: white;
    //     margin-top:20px;
    //     margin-left:20px;
    // }
    // .account-info{
    //     margin-top:10px;
    //     margin-left:20px;
    //     font-size: 18px;
    // }
    // .account-info span{
    //     font-size: 14px;
    //     color:cadetblue;
    // }
    // #hr-setting{
    //     width:90%
    // }
    // .archive{
    //     margin-left:20px;
    //     height:30px;
    //     /* border: 2px solid red; */
    //     padding-top:10px;
    //     margin-right:12px;
    // }
    // .archive:hover{
    //     background:hsl(165,38%, 35%)
    // }
    // .archive i{
    //     padding-right:20px;
    //     font-size:18px;
    //     color:white;
    // }
    // .toggle-switch {
    //     top:4px;
    //     left:90px;
    //     position: relative;
    //     display: inline-block;
    //     width: 40px; /* Decreased width */
    //     height: 20px; /* Decreased height */
    // }
    // .toggle-switch input{
    //     display:none;
    // }
    // .slider {
    //     position: absolute;
    //     cursor: pointer;
    //     top:0;
    //     left:0;
    //     right: 0;
    //     bottom: 0;
    //     background-color: #ccc; /* Default background color for the switch */
    //     transition: 0.4s; /* Smooth transition effect */
    //     border-radius: 20px; /* Adjusted border radius */
    // }
    // .slider:before {
    //     position: absolute;
    //     content: "";
    //     height: 16px; /* Decreased height */
    //     width: 16px; /* Decreased width */
    //     left: 2px; /* Adjusted left position */
    //     bottom: 2px; /* Adjusted bottom position */
    //     background-color: white; /* Background color for the "on" state */
    //     transition: 0.4s; /* Smooth transition effect */
    //     border-radius: 50%;
    // }
    // input:checked + .slider{
    //     background-color: #2196F3;
    // }
    // input:checked + .slider:before{
    //     transform:translateX(16px);
    // }
    // .sender-info-menu {
    //     position: fixed;
    //     top: 0;
    //     right: -250px;
    //     width: 250px;
    //     height: 100%;
    //     background: #213635;
    //     color:white;
    //     transition: left 0.2s;
    //     z-index: 1;
    //     overflow-y: auto;
    //     /* padding-left:20px; */
    //     /* padding-top:20px; */
    // }
    // #avatar2{
    //     width: 65px;
    //     height: 65px;
    //     background-color: #3498db; /* Background color for the avatar */
    //     border-radius: 50%; /* Create a circular shape */
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     font-size: 20px; /* Adjust the font size */
    //     color: white;
    //     margin-left:20px;
    // }
    // #userinfo{
    //     padding-left:20px;
    //     margin:0;
    //     margin-top:20px;
    //     padding-bottom: 15px;
    //     /* position:absolute; */
    // }
    // #name {
    //     position:absolute;
    //     left:38%;
    //     top:75px;
    // }
    // #status {
    //     position:absolute;
    //     left:38%;
    //     top:95px;
    //     color:#ccc;
    //     font-size:12px;
    // }
    // .secondsection{
    //     padding-left:20px;
    // }
    // .notify{
    //     display: inline;
    // }
    // .thirdsection{
    //     padding-left:20px;
    // }
    // #block-user i{
    //     color:crimson;
    // }
    // #block-user {
    //     color:crimson;
    // }
    // .messages-box-div{
    //     width: calc(73% - 90px);
    //     border: 1px solid #ccc;
    //     padding: 15px;
    //     padding-top:31px;
    //     border-radius: 5px;
    //     color:white;
    //     position: fixed;
    //     bottom: 6px;
    //     left: 321px;
    //     /* z-index: 1; */
    //     /* border:none; */
    //     background-color: #182726;
    // }
    // .archive2{
    //     height:30px;
    //     padding-left:17px;
    //     /* border: 2px solid red; */
    //     padding-top:10px;
    //     margin-right:12px;
    // }
    // .archive2:hover{
    //     background:hsl(165,38%, 35%)
    // }
    // .archive2 i{
    //     padding-right:20px;
    //     font-size:18px;
    //     color:white;
    // }
    // #paperclip{
    //     position:absolute;
    //     font-size: 20px;
    //     bottom:3%;
    //     left: 24.53%;
    // }
    // #emoji-box{
    //     position:absolute;
    //     font-size: 20px;
    //     bottom:3%;
    //     right: 11%;
    // }
    // #mic{
    //     position:absolute;
    //     font-size: 20px;
    //     bottom:3%;
    //     right: 9%;
    // }
    //   `;
  }
  receiver = prompt("who you wanna talk to?").toLowerCase();

  // socket.emit("user_added", uname);
  socket.emit("receiver", receiver);
  // document.getElementById("register_interface").style.visibility = "none";
  // document.getElementById("wrong").style.visibility = "none";
  // document.getElementById("already_exist").style.visibility = "none";
  // document.getElementById("messaging_interface").style.visibility = "block";
});
socket.on("available", () => {
  document.getElementById("register_interface").style.display="none";
  document.getElementById("login_interface").style.display="none";
  document.getElementById("wrong").style.display="none";
  document.getElementById("already_exist").style.display="none";
  document.getElementById("style").innerHTML = `
  
  

  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    color: white;
    background-color: #182726;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.chat-area {
    /* margin-top: 50px; */
    width: 77%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.container {
    margin-top: 56px;
    background-color: #182726   ;
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
}

.message_container {
    background-color: #182726;
    border-style: groove;
    border-color: black;
    transition: all 1s;
    width: fit-content;
    padding: 8px 10px 0px 10px;
    margin: 5px;
    clear: both;
    position: relative;
    max-width: 40vw;
}

.receiving {
    border-width: 0px 0px 0px 3px;
    border-radius: 0px 10px 10px 0px;
    float: left;
    /* #32524d; */
    background-color: hsl(165, 22%, 17%);;
}

.sending {
    border-radius: 10px 0px 0px 10px;
    border-width: 0px 3px 0px 0px;
    float: right;
    background-color:darkslategrey;
}

.username {
    color: white;
    margin-top: 4px;
    margin-left: 4px;
}

.receiving .colored_portion {
    padding: 5px;
    border-radius: 4px;
}

.sending .colored_portion {
    padding: 5px;
    border-radius: 4px;
}

.time {
    font-size: 12px;
    padding-top: 4px;
    text-align: right;
}

#message-input {
    width: calc(67% - 90px);
    border: 1px solid #ccc;
    padding: 19px;
    padding-top:11px;
    padding-bottom:13px;
    padding-right:1px;
    /* border-radius: 5px; */
    color:white;
    position: fixed;
    bottom: 6px;
    left: 350px;
    z-index: 3;
    /* border:none; */
    border-left:none;
    border-right:none;
    border-top:none;

    background-color: #182726;

}

#send-button {
    background-color: #273f3e ;
    transition: background-color 0.3s ;
    color: white;
    border: none;
    height: 45px;
    width: 90px;
    cursor: pointer;
    position: fixed;
    bottom: 8px;
    right: 12px;
    border-radius: 4px;
    font-size: 14px;
    
}

.scrollable-chat-list {
    width: 23%;
    height: 100%;
    /* border: 2px solid #1f1f1f;; */
    border-right-color: white;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #213635;
    /* margin: -6px; */
}

.scrollable-content {
    margin-top:53px;

    padding: 10px;
    padding-left: 0px;
}
.uname-search {
    width: 220px;
    font-size: 14px;
    /* height: 30px; */
    border-radius: 8px;

    border:1px solid whitesmoke;
    padding:5px;
    margin-left:    8px;
    padding-left: 15px;
    background-color: #213635;
    color:white;

}

.nav-bar {
    background-color: #273f3e;
     /* Background color for the fixed navbar */
    padding: 10px;
    position: fixed; /* Fix the navbar at the top */
    width: 100%;
    height:33px;    
    z-index: 1; /* Ensure it appears above other content */
}
.chatbar-nav{
    background-color: #213635; /* Background color for the fixed navbar */
    padding: 10px;
    position: fixed; /* Fix the navbar at the top */
    width: 21.5%;
    /* height:30px;     */
    z-index: 1;
    padding-bottom: 0;
}

.chat-heads{
    /* border:2px solid red; */
    cursor: pointer;
    padding:10px;
    margin-bottom:1px;
    /* padding:0px; */
    height:40px;
    /* border:2px solid red; */
    /* background-color: darkslategrey;  */
    display: flex;
    align-items: center;
    width: 94%;
}
.chat-heads:hover{
    background:hsl(165,38%, 35%)
}


.chat-heads .avatar {
    width: 45px;
    height: 45px;
    background-color: #3498db; /* Background color for the avatar */
    border-radius: 50%; /* Create a circular shape */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px; /* Adjust the font size */
    color: white; 
}
.text-container {
    padding: 10px;
}
.text{
    font-size: 14;
    color:white;
    max-width: 220px;
    max-height: 20px;
    overflow: hidden;
}
.recent-time{
    font-size:12px;
}
.text span {
    font-size: 12px;
    padding-left: 100px;
}
.text i {
    padding:5px;
    opacity: 0;
}
.recent {
    font-size: 12px;
    padding-top: 4px;
    color:#ccc;
}
.selected {
    background-color: darkslategrey;
}
#search-icon{
    color:red;
    /* z-index: -1; */

}
input:focus{
    outline: none   ;
}
textarea:focus{
    outline: none   ;
}
.icons{
    /* margin:10px; */
    /* padding:10px; */
    position: absolute;
    top:10px;
    left: 940px;
    /* padding-left:10px; */
    font-size: 20px;
    border-radius: 6px;
}
.icons i{
    margin-top:5px;
    margin-left: 10px;
    cursor: pointer;
}
#menu-button {
    /* position: fixed;
    top: 20px;
    left: 20px; */
    font-size: inherit;
    cursor: pointer;
}
#menu-bar {
    position: fixed;
    top: 0;
    left: -304px; /* Initially hidden to the left */
    width: 304px;
    height: 100%;
    background: #213635;
    color:white;
    transition: left 0.2s;
    z-index: 1;
    overflow-y: auto;
    padding-bottom: 10px;
}

/* Style for the close button */
#userinfo i {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 20px;
    cursor: pointer;
}
.overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 313px;
    width: 77%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
    transition: left 5s;
    z-index: 2; /* Place it above other content */
}
#avatar {
    width: 50px;
    height: 50px;
    background-color: #3498db; /* Background color for the avatar */
    border-radius: 50%; /* Create a circular shape */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px; /* Adjust the font size */
    color: white; 
    margin-top:20px;
    margin-left:20px;
}
.account-info{
    margin-top:10px;
    margin-left:20px;
    font-size: 18px;
}
.account-info span{
    font-size: 14px;
    color:cadetblue;
}
#hr-setting{
    width:90%
}
.archive{
    margin-left:20px;
    height:30px;
    /* border: 2px solid red; */
    padding-top:10px;
    margin-right:12px;

}
.archive:hover{
    background:hsl(165,38%, 35%)
}
.archive i{
    padding-right:20px;
    font-size:18px;
    color:white;
}

.toggle-switch {
    top:4px;
    left:90px;
    position: relative;
    display: inline-block;
    width: 40px; /* Decreased width */
    height: 20px; /* Decreased height */
}
.toggle-switch input{
    display:none;
}
.slider {
    position: absolute;
    cursor: pointer;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    background-color: #ccc; /* Default background color for the switch */
    transition: 0.4s; /* Smooth transition effect */
    border-radius: 20px; /* Adjusted border radius */
}
.slider:before {
    position: absolute;
    content: "";
    height: 16px; /* Decreased height */
    width: 16px; /* Decreased width */
    left: 2px; /* Adjusted left position */
    bottom: 2px; /* Adjusted bottom position */
    background-color: white; /* Background color for the "on" state */
    transition: 0.4s; /* Smooth transition effect */
    border-radius: 50%;
}

input:checked + .slider{
    background-color: #2196F3; 
}

input:checked + .slider:before{
    transform:translateX(16px);
}

.sender-info-menu {
    position: fixed;
    top: 0;
    right: -250px;
    width: 250px;
    height: 100%;
    background: #213635;
    color:white;
    transition: left 0.2s;
    z-index: 1;
    overflow-y: auto;
    /* padding-left:20px; */
    /* padding-top:20px; */
}

#avatar2{
    width: 65px;
    height: 65px;
    background-color: #3498db; /* Background color for the avatar */
    border-radius: 50%; /* Create a circular shape */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px; /* Adjust the font size */
    color: white; 
    margin-left:20px;

}
#userinfo{
    padding-left:20px;
    margin:0;
    margin-top:20px;
    padding-bottom: 15px;
    /* position:absolute; */
}

#name {
    position:absolute;
    left:38%;
    top:75px;
}
#status {
    position:absolute;
    left:38%;
    top:95px;
    color:#ccc;
    font-size:12px;
}
.secondsection{
    padding-left:20px;
}
.notify{
    display: inline;
}
.thirdsection{
    padding-left:20px;
}
#block-user i{
    color:crimson;
}
#block-user {
    color:crimson;
}
.messages-box-div{
    width: calc(73% - 90px);
    border: 1px solid #ccc;
    padding: 15px;
    padding-top:31px;
    border-radius: 5px;
    color:white;
    position: fixed;
    bottom: 6px;
    left: 321px;
    /* z-index: 1; */
    /* border:none; */
    background-color: #182726;

}
.archive2{
    height:30px;
    padding-left:17px;
    /* border: 2px solid red; */
    padding-top:10px;
    margin-right:12px;

}
.archive2:hover{
    background:hsl(165,38%, 35%)
}
.archive2 i{
    padding-right:20px;
    font-size:18px;
    color:white;
}
#paperclip{
    position:absolute;
    font-size: 20px;
    bottom:3%;
    left: 24.53%;
}
#emoji-box{
    position:absolute;
    font-size: 20px;
    bottom:3%;
    right: 11%;
}
#mic{
    position:absolute;
    font-size: 20px;
    bottom:3%;
    right: 9%;
}
  `;
  document.getElementById("messaging_interface").style.display="flex";
  socket.emit("ready");
});

socket.on("wrong_credentials", () => {
  document.getElementById("login_interface").style.display="none";
  document.getElementById("register_interface").style.display="none";
  document.getElementById("wrong").style.display="flex";
  document.getElementById("already_exist").style.display="none";
  document.getElementById("messaging_interface").style.display="none";
  register_button = document.getElementById("register");
  register_button.addEventListener("click", () => {
    console.log("kina vayena?");
    document.getElementById("wrong").style.display="none";
    document.getElementById("style").innerHTML = `
    .messaging_container {
      visibility: hidden;
    }
    .wrong {
      visibility: hidden;
    }
    .register_container {
      visibility: hidden;
    }
    .already_exist {
      visibility: hidden;
    }
    
    html {
      scroll-behavior: smooth;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;

    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      background: #121212; /* fallback for old browsers */
      overflow-x: hidden;

      height: 100%;

      /* code to make all text unselectable */
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
    }

    /* Disables selector ring */
    body:not(.user-is-tabbing) button:focus,
    body:not(.user-is-tabbing) input:focus,
    body:not(.user-is-tabbing) select:focus,
    body:not(.user-is-tabbing) textarea:focus {
      outline: none;
    }

    /* ########################################################## */

    h1 {
      color: white;

      font-size: 35px;
      font-weight: 800;
    }

    .flex-container {
      width: 100vw;

      margin-top: 60px;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .content-container {
      width: 500px;
      height: 350px;
    }

    .form-container {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 500px;
      height: 380px;

      margin-top: 5px;
      padding-top: 20px;

      border-radius: 12px;

      display: flex;
      justify-content: center;
      flex-direction: column;

      background: #1f1f1f;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.199);
    }

    .login-link{
      text-decoration: none;
      color:#38d39f70;
      transition: all 1s;
    }
    
    p{
      color:rgba(177, 177, 177, 0.3)
    }

    .subtitle {
      font-size: 11px;

      color: rgba(177, 177, 177, 0.3);
    }

    input {
      border: none;
      border-bottom: solid rgb(143, 143, 143) 1px;

      margin-bottom: 30px;

      background: none;
      color: rgba(255, 255, 255, 0.555);

      height: 35px;
      width: 300px;
    }

    .submit-btn {
      cursor: pointer;

      border: none;
      border-radius: 8px;

      box-shadow: 2px 2px 7px #38d39f70;

      background: #38d39f;
      color: rgba(255, 255, 255, 0.8);

      width: 80px;

      transition: all 1s;
    }

    .submit-btn:hover {
      color: rgb(255, 255, 255);

      box-shadow: none;
    }`;
    document.getElementById("register_interface").style.display="flex";
  });
});

var receiver = null;
var login_form = document.getElementById("login-form");
var username = document.getElementById("username");
var password = document.getElementById("password");
var uname = null;

login_form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("meow");
  uname = username.value;
  socket.emit("credentials", uname, password.value);
});

socket.on("not_available", () => {
  console.log("jhk");
  body = document.getElementById("body");
  body.innerHTML = "<h1>this human is not human search another human</h1>";
});

var register_form = document.getElementById("register-form");
var new_username = document.getElementById("new_username");
var new_password = document.getElementById("new_password");
register_form.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("register", new_username.value, new_password.value);
});
socket.on("already_exist", () => {
  document.getElementById("register_interface").style.display="none";
  document.getElementById("already_exist").style.display="flex";
  document.getElementById("signin").addEventListener("click", () => {
    document.getElementById("already_exist").style.display="none";
    document.getElementById("login_interface").style.display="flex";
  });
});

function num_to_day(num) {
  switch (num) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return "Something is definitely worng";
  }
}

// format

{
  /* <div class="receiving message_container">
        <div class="username"><b>name</b></div>
        <div class="colored_portion">
          <div class="message">hello brother me is not fine</div>
          <div class="time">12:30 PM</div>
        </div>
      </div> */
}
function add_messages(message, username, timestamp, type) {
  var da = new Date(timestamp);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  var year = da.getFullYear();
  var month = String(da.getMonth() + 1).padStart(2, "0");
  var date = String(da.getDate()).padStart(2, "0");
  var day = num_to_day(da.getDay());
  var time = da.toLocaleTimeString(undefined, options);
  const chat_container = document.getElementById("container");
  var msg_container = document.createElement("div");
  msg_container.classList.add("message_container", `${type}`);
  msg_container.innerHTML = `<div class="username"><b>${username}</b></div>
  <div class="colored_portion">
    <div class="message">${message}</div>
    <div class="time">${year}/${month}/${date}, ${day} ${time}</div>
  </div>`;
  chat_container.appendChild(msg_container);
  chat_container.scrollTop = chat_container.scrollHeight;
}

var message_form = document.getElementById("message-form");
var msg_cont = document.getElementById("message-input");

socket.on("initial", (value) => {
  // let messages = value["messages"];
  // console.log(value)
  for (each in value) {
    let timestamp = each;
    let message = value[each]["message"];
    console.log(message);
    if (value[each]["sender"] == uname) {
      add_messages(message, uname, parseInt(timestamp), "sending");
    } else {
      add_messages(message, receiver, parseInt(timestamp), "receiving");
    }
    // add_messages(message, uname, parseInt(timestamp), "sending");
  }
});

socket.on("ting", (msg, username, time) => {
  console.log("meowoew");
  if (username == uname) {
    add_messages(msg, username, time, "sending");
  } else {
    add_messages(msg, username, time, "receiving");
  }
});
message_form.addEventListener("submit", (event) => {
  console.log("meow");
  event.preventDefault();
  if (msg_cont.value) {
    let time = new Date().getTime();
    // add_messages(msg_cont.value, uname, time, "sending");
    socket.emit("msg_sent", uname, receiver, msg_cont.value, time);
    msg_cont.value = "";
  }
});

// from pk

const senderCardbtn = document.getElementById("sender-info");
const card = document.getElementById("sender-info-menu");
const close_btn = document.getElementById("close-button");
senderCardbtn.addEventListener("click", () => {
  card.style.right = "0px";
  overlay.style.visibility = "block";
  // console.log('hi')
});
close_btn.addEventListener("click", () => {
  card.style.right = "-250px";
});
card.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.body.addEventListener("click", (event) => {
  if (
    event.target !== senderCardbtn &&
    event.target !== card &&
    event.target !== close_btn
  ) {
    card.style.right = "-250px";
    console.log("helo");
  }
});

const menuButton = document.getElementById("menu-button");
const menuBar = document.getElementById("menu-bar");
const closeButton = document.getElementById("close-button");
const overlay = document.getElementById("overlay");

menuButton.addEventListener("click", () => {
  menuBar.style.left = "0px";
  overlay.style.visibility = "block";
});

menuBar.addEventListener("click", (event) => {
  // Prevent clicks inside the menu bar from propagating and closing the menu
  event.stopPropagation();
});

document.body.addEventListener("click", (event) => {
  if (event.target !== menuButton && event.target !== menuBar) {
    menuBar.style.left = "-304px";
    overlay.style.visibility = "none";
  }
});

var divElements = document.querySelectorAll(".chat-heads");

// Add a click event listener to each div
var selectedDiv = null;

divElements.forEach(function (divElement) {
  divElement.addEventListener("click", function () {
    // Deselect the previously selected div (if any)
    if (selectedDiv) {
      selectedDiv.classList.remove("selected");
    }

    // Select the clicked div
    divElement.classList.add("selected");
    selectedDiv = divElement;
  });

  divElement.addEventListener("dblclick", function (event) {
    // Prevent the default action of double-click (text selection)
    event.preventDefault();
    // Remove the "selected" class on double-click to deselect
    divElement.classList.remove("selected");
    selectedDiv = null;
  });
});
