const io = require("socket.io")(3002,{
    cors:{
        origin:"http://localhost:3000",
    },
});




let users=[];

const useradder = (userID,socketID) =>{
    !users.some((elem)=>{elem.userid===userID}) && users.push({userid:userID,socketid:socketID});
}


const userremover = (socketID) =>{
    users = users.filter((elem)=>elem.socketid!==socketID);
}

const getreceiver = (receiverId) =>{
    return users.find((elem)=>elem.userid===receiverId);
}





io.on("connection",(socket)=>{
    console.log(`user is connected: ${socket.id}`);

    

    socket.on("addMe",(data)=>{
        useradder(data,socket.id);
        io.emit("onlinefrens",users);

        setInterval(() => {
            io.to(socket.id).emit("newestdata");
        }, 1700);
    });


    

    socket.on("textclient",(data)=>{
        console.log(data);
        const receiver=getreceiver(data.receiverid);
        
        if (receiver != null){
            io.to(receiver.socketid).emit("textserver",{
                sender:data.senderid,
                recenttext:data.recenttext,
                converid:data.converid,
                saveID:data.saveID,
                curchat:data.curchat,
                order:data.order,
                holders:data.holders,
                status:data.status,
                brand: data.brand,
                branding: data.branding,
                effected: data.effected,
                recbranding: data.recbranding,
                receffected: data.receffected,
                newconversationlineup: data.newconversationlineup,
                newlatestchat: data.newlatestchat
            });
        }


    });

    socket.on("clienttypes",(data)=>{

        const receiver=getreceiver(data.receiverid);

        if (receiver != null){
            io.to(receiver.socketid).emit("servertypes",{
                status:data.status,
                dims:data.dims,
                curchat:data.curchat
            });
        }
    
    });


    socket.on("clientseen",(data)=>{

        const receiver=getreceiver(data.receiverid);

        if (receiver != null){
            io.to(receiver.socketid).emit("serverseen",{
                status:data.status,
                messagesREC:data.messagesREC,
                receiverid:data.receiverid,
                curchat:data.curchat
            });
        }

    });


    socket.on("clienttextdel",(data)=>{

        const receiver=getreceiver(data.receiverid);

        if (receiver != null){
            console.log("deleted!!!");
            io.to(receiver.socketid).emit("servertextdel",{
                convid:data.convid
            });
        }

    });

    socket.on("clientdelchange",(data)=>{

        const receiver=getreceiver(data.receiverid);

        if (receiver != null){
            io.to(receiver.socketid).emit("serverdelchange",{
                status:'nocomment'
            });
        }

    });

    socket.on("clientaddholder",(data)=>{

        const receiver=getreceiver(data.receiverid);

        if (receiver != null){
            io.to(receiver.socketid).emit("serveraddholder",{
                curchat:data.curchat,
                members:data.members
            });
        }

    });



    socket.on("clientchangetextnums",(data)=>{

        const receiver=getreceiver(data.receiverid);

        if (receiver != null){
            io.to(receiver.socketid).emit("serverchangetextnums",{
                convid:data.convid,
                nevermessages:data.nevermessages
            });
        }

    });


    socket.on('disconnect',(reason)=>{
        console.log("a user has disconnected. reason-",reason);
        userremover(socket.id);
        io.emit("onlinefrens",users);
    })

});





















