var express = require("express");
var fileuploader = require("express-fileupload");
var mysql = require("mysql2");
var app = express();

app.listen(2004, function () {
    console.log("Welcome");
})
app.use(express.static("Files"));
app.use(fileuploader());
var dbConfig = {
    host: "127.0.0.1",
    user: "root",
    password: "P@rv954182",
    database: "cab",
    dateStrings: true
}
var dbCon = mysql.createConnection(dbConfig);
dbCon.connect(function (jasoos) {
    if (jasoos == null)
        console.log("Connected Successfulllyyy...");
    else
        console.log(jasoos);
})
app.use(express.urlencoded(true));
// ============================= API STARTS =============================
app.get("/profile-driver",function(req,resp){
    resp.sendFile(process.cwd()+"/Files/profile-driver.html");
})
app.get("/profile-customer",function(req,resp){
    resp.sendFile(process.cwd()+"/Files/profile-customer.html");
})
app.get("/dash-driver",function(req,resp)
{
    resp.sendFile(process.cwd()+"/Files/dash-driver.html")
})
app.get("/dash-customer",function(req,resp)
{
    resp.sendFile(process.cwd()+"/Files/dash-customer.html")
})
app.get("/dash-admin",function(req,resp)
{
    resp.sendFile(process.cwd()+"/Files/dash-admin.html")
})
app.get("/find-car",function(req,resp)
{
    resp.sendFile(process.cwd()+"/Files/find-car.html")
})
app.get("/manage-cars",function(req,resp){
    resp.sendFile(process.cwd()+"/Files/Manage-Car.html");
})
app.get("/check-request",function(req,resp){
    resp.sendFile(process.cwd()+"/Files/requests.html");
})
app.get("/my-bookings",function(req,resp){
    resp.sendFile(process.cwd()+"/Files/my-bookings.html");
})
// ============================= HTML PAGE API END ======================

// ============================== Driver save Data ======================
app.post("/driver-save", function (req, resp) {

    var txtemail = req.body.txtemail;
    var txtname = req.body.txtname;
    var txtnumber = req.body.txtnumber;
    var txtadd = req.body.txtadd;
    // var txtcity = req.body.txtcity;
    var txtproof = req.body.txtlicence;
     
    var txtfile = "nopic.jpg";
    if (req.files != null) {
        var txtfile = req.files.txtfile.name;
        var path = process.cwd() + "/Files/pics/" + txtfile;
        req.files.txtfile.mv(path);

    }

    dbCon.query("insert into drivers(email,name,mobile,address,proof,file) values(?,?,?,?,?,?)", [txtemail, txtname, txtnumber, txtadd, txtproof, txtfile], function (err) {
        if (err == null)
            resp.send("Account Created Successfully");
        else
            resp.send(err);
    })
})
// ============================== Driver update Data ====================
app.post("/driver-update",function(req,resp){

    var txtemail = req.body.txtemail;
    var txtname = req.body.txtname;
    var txtnumber = req.body.txtnumber;
    var txtadd = req.body.txtadd;
    // var txtcity = req.body.txtcity;
    var txtproof = req.body.txtlicence;
     
    var txtfile;
    if (req.files != null) {
        var txtfile = req.files.txtfile.name;
        var path = process.cwd() + "/Files/pics/" + txtfile;
        req.files.txtfile.mv(path);

    }
    else{
        txtfile = req.body.hdn;
    }

        dbCon.query("update drivers set name = ? , mobile = ?,address = ?,proof = ?,file =?, email = ?  " , [txtname, txtnumber, txtadd, txtproof, txtfile, txtemail],function(err, result){
            if (err == null)
            resp.send("Profile Updated");
        else
            resp.send(err);
        })
})
// ============================== Driver Search =========================
app.get("/driver-search",function(req,resp){
    dbCon.query("select * from drivers where email = ?",[req.query.emailkuch],function(err,resultTable){
            if(err==null){
                resp.send(resultTable);
            }
            else{
                resp.send(err);
            }
    })
})
// ============================== customer save Data ======================
app.post("/customer-save", function (req, resp) {

    var txtemail = req.body.txtemail;
    var txtname = req.body.txtname;
    var txtnumber = req.body.txtnumber;
    var txtadd = req.body.txtadd;
    // var txtcity = req.body.txtcity;
    var txtproof = req.body.txtlicence;
     
    var txtfile = "nopic.jpg";
    if (req.files != null) {
        var txtfile = req.files.txtfile.name;
        var path = process.cwd() + "/Files/pics/" + txtfile;
        req.files.txtfile.mv(path);

    }

    dbCon.query("insert into customers(email,name,mobile,address,proof,file) values(?,?,?,?,?,?)", [txtemail, txtname, txtnumber, txtadd, txtproof, txtfile], function (err) {
        if (err == null)
            resp.send("Account Created Successfully");
        else
            resp.send(err);
    })
})
// ============================== customer update Data ====================
app.post("/customer-update",function(req,resp){

    var txtemail = req.body.txtemail;
    var txtname = req.body.txtname;
    var txtnumber = req.body.txtnumber;
    var txtadd = req.body.txtadd;
    // var txtcity = req.body.txtcity;
    var txtproof = req.body.txtlicence;
     
    var txtfile;
    if (req.files != null) {
        var txtfile = req.files.txtfile.name;
        var path = process.cwd() + "/Files/pics/" + txtfile;
        req.files.txtfile.mv(path);

    }
    else{
        txtfile = req.body.hdn;
    }

        dbCon.query("update customers set name = ? , mobile = ?,address = ?,proof = ?,file =?, email = ?  " , [txtname, txtnumber, txtadd, txtproof, txtfile, txtemail],function(err, result){
            if (err == null)
            resp.send("Profile Updated");
        else
            resp.send(err);
        })
})
// ============================== customer Search =========================
app.get("/customer-search",function(req,resp){
    dbCon.query("select * from customers where email = ?",[req.query.emailkuch],function(err,resultTable){
            if(err==null){
                resp.send(resultTable);
            }
            else{
                resp.send(err);
            }
    })
})
// ============================== Add car ===============================
app.get("/avail-cars",function(req,resp){
    dbCon.query("insert into cars(email,city,brand,model,type,fuel,carcondition) values(?,?,?,?,?,?,?)",[req.query.kuchemail,req.query.kuchcity,req.query.kuchbrand,req.query.kuchmodel,req.query.kuchtype,req.query.kuchfuel,req.query.kuchcondition],function(err){
            if(err==null){
                resp.send("Car Added")
            }
            else{
                resp.send(err);
            }
    })
})
// ======================== manage your cars ============================
app.get("/manage-car",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
    dbCon.query("select * from cars where email =?",[eml],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// =========================== update your car ==========================
app.get("/delete-car",function(req,resp){
    // console.log(req.query.email);
    var srno=req.query.Srno;
    dbCon.query("delete from cars where Srno =?",[srno],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// =========================== Find distinct city from avail car ========
app.get("/find-city",function(req,resp){
    dbCon.query("Select distinct city from cars",function(err,table){
        if(err==null){
            resp.send(table);
        }
        else{
            resp.send(err);
        }
    })
})
// ====================find distinct type of cars from avail cars =======
app.get("/find-cars",function(req,resp){
    dbCon.query("Select distinct type from cars",function(err,table){
        if(err==null){
            resp.send(table);
            // console.log(table);
        }
        else{
            resp.send(err);
        }
    })
})
// =========================Find available cars for ride ================ 
app.get("/find-driver",function(req,resp){
        var city=req.query.citykuch;
        var car=req.query.carkuch;
        // console.log(city);
      dbCon.query("select drivers.email,drivers.name,drivers.mobile,cars.model,cars.carcondition from drivers inner join cars on drivers.email=cars.email where city=? and type=?",[city,car],function(err,resultTable)
      {
      if(err==null){
        resp.send(resultTable);
    }
      else
        resp.send(err); 
      })
})
// ========================= Send passengers details=====================
app.get("/booking-details",function(req,resp){
    var selRec = JSON.parse(req.query.ddata);
    var selRec2 = JSON.parse(req.query.cdata);

    var pemail =selRec.email;
    var pname =selRec.name;
    var pmobile =selRec.mobile;
    var email=selRec2.eml;
    var name=selRec2.name;
    var number=selRec2.number;
    var add=selRec2.add;
    var date=new Date(selRec2.date);
    var time=new Date(selRec2.time);
    var src=selRec2.src;
    var des=selRec2.des;
    // console.log(pemail);
    // console.log(pname);
    // console.log(pmobile);
    // console.log(email);
    // console.log(name);
    // console.log(number);
    // console.log(add);
    // console.log(date);
    // console.log(time);
    // console.log(src);
    // console.log(des);
    // console.log(email);
    dbCon.query("insert into passengers(pemail,pname,pmobile,email,name,mobile,pickadd,doj,picktime,src,des,track) values(?,?,?,?,?,?,?,?,?,?,?,0)",[pemail,pname,pmobile,email,name,number,add,date,time,src,des],function(err){
        if(err==null){
            resp.send("Car Booked");
        }
        else{
            resp.send(err); 
        }
    })
})
// ========================= Pending requestes ========================== 
app.get("/Booking-requests",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
    dbCon.query("select * from passengers where pemail =? && track = 0 ",[eml],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ========================= Accepted requestes ========================= 
app.get("/accepted-requests",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
    dbCon.query("select * from passengers where pemail =? && track = 2 ",[eml],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ========================= completed requests ========================= 
app.get("/completed-requests",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
    dbCon.query("select * from passengers where pemail =? && track = 3 ",[eml],function(err,result){
        if(err==null)
        {
            console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ======================== reject a request ============================
app.get("/reject-car",function(req,resp){
    // console.log(req.query.email);
    var srno=req.query.Srno;
    dbCon.query("update passengers set track = 1 where Srno =?",[srno],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ======================== Accept a request ============================
app.get("/accept-car",function(req,resp){
    // console.log(req.query.email);
    var srno=req.query.Srno;
    dbCon.query("update passengers set track = 2 where Srno =?",[srno],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ======================== complete a request ============================
app.get("/complete-car",function(req,resp){
    // console.log(req.query.email);
    var srno=req.query.Srno;
    dbCon.query("update passengers set track = 3 where Srno =?",[srno],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ======================== customer pending requests =====================
app.get("/my_pending",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
    dbCon.query("select * from passengers where email =? && track = 0 ",[eml],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ======================== customer rejected requests ====================
app.get("/my_rejected",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
    dbCon.query("select * from passengers where email =? && track = 1 ",[eml],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ======================== customer accepted requests ====================
app.get("/my_accepted",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
    dbCon.query("select * from passengers where email =? && track = 2 ",[eml],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ======================== Sign-up =====================================
app.get("/Sign-up", function (req, resp) {
    dbCon.query("insert into users(txtemail,txtpass,txtsel,dos,status) values(?,?,?,current_date(),1)", [req.query.kuchEmail, req.query.kuchpass, req.query.kuchsel], function (err, resultTable) {
        if (err == null) {
            if (resultTable.affectedRows == 1)
                resp.send("Signup successfully");
            else
                resp.send("Signup Unsuccessfully");
        }
        else
            resp.send(err);
    })
})
// ======================== login =======================================
app.get("/log-in",function(req,resp){
    dbCon.query("select * from users where txtemail=?" , [req.query.kuchEmail] , function(err , resJSON){
            if(err==null){
                if(resJSON.length==1 && resJSON[0].status==1 && resJSON[0].txtpass==req.query.kuchpass){
                        resp.send(resJSON[0].txtsel);       
                }
                else if(resJSON.length==1 && resJSON[0].status==1 &&  resJSON[0].txtpass!=req.query.kuchpass){
                        resp.send("Invalid Password");       
                }
                else if(resJSON.length==1 && resJSON[0].status==0 ){
                    resp.send("Account Blocked");
                }
                else{
                    resp.send("Invalid Email");
                }
            }
            else{
                resp.send(err);
            }
    })
})
// // ======================== send mail ===================================
// app.get("/send-mail",function(req,resp){
    
//     dbCon.query("select txtpass from users where txtemail=?",[req.query.kuchEmail2],function(err,password){
//         if(err==null){
//             var text=JSON.stringify(password);
//         var mailOptions = {
//             from: 'aarushg2218k@gmail',
//             to: req.query.kuchEmail2,
//             subject: 'Sending Email using Node.js',
//             text: text
//           };
//           transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//               console.log(error);
//             } else {
//               console.log('Email sent: ' + info.response);
//             }
//           });
//         }
//         else{
//             resp.send(err);
//           }
//     })
// })
// ========================= Change Password ================================
app.get("/chngpwd",function(req,resp){
    var email=req.query.email;
    var opwd=req.query.opwd;
    var npwd=req.query.npwd;
    dbCon.query("update users set txtpass=? where txtemail=? and txtpass=?",[npwd,email,opwd],function(err){
      if(err==null){
          resp.send("Password Updated");
        }
      else{
        resp.send(err);
  }
})
  })

// ======================== send mail =======================================
app.get("/send-mail",function(req,resp){
    
    dbCon.query("select txtpass from users where txtemail=?",[req.query.kuchEmail2],function(err,password){
        if(err==null){
            var msg='Dear your passwords is:-';
            var msg4='                                                                                                                               ';
            var msg2='                                      Use it to access your account and if you dont request it then please ignore this message.                                                                                                                                                                                                                                                                     your Team JoyRide';
            var text=JSON.stringify(password);
            var mailOptions = {
            from: 'aarushg2218k@gmail',
            to: req.query.kuchEmail2,
            subject: 'Sending Email using Node.js',
            text: msg+msg4+text+msg2 
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }
        else{
            resp.send(err);
          }
    })
})
// ========================= Change Password ================================

  //==CHANGE DRIVER PASSWORD
// app.get("/chngdriverpwd",function(req,resp){
//     var email=req.query.email;
//     var opwd=req.query.opwd;
//     var npwd=req.query.npwd;
//     dbCon.query("update users set Password=? where txtemail=? and Password=?",[npwd,email,opwd],function(err){
//       if(err==null){
//           resp.send(" Driver Password Updated");
//         }
//       else{
//         resp.send(err);
//       }
//     })
//   })
//========================  fetch all user for admin ========================
app.get("/angular-all-records",function(req,resp){
    dbCon.query("select * from users",function(err,table){
        if(err==null){
            resp.send(table);
        }
        else{
            resp.send(err);
        }
    })
})
// =========================    Block use ====================================
app.get("/block-user",function(req,resp)
{
    var email=req.query.email;                          
    dbCon.query("update users set status=0 where txtemail=?",[email],function(err,result)
    {
          if(err==null)
          {
            if(result.affectedRows==1)
              resp.send("Account Blocked ");
            else
              resp.send("Inavlid Email id");
            }
              else
            resp.send(err);
    })
})
// ==============================  Resume use ================================
app.get("/resume-user",function(req,resp)
{
    var email=req.query.email;                          
    dbCon.query("update users set status=1 where txtemail=?",[email],function(err,result)
    {
          if(err==null)
          {
            if(result.affectedRows==1)
              resp.send("Account Resumed");
            else
              resp.send("Inavlid Email id");
            }
              else
            resp.send(err);
    })
})
// ===========================  All drivers ==================================
app.get("/angular-driver-records",function(req,resp){
    dbCon.query("select * from drivers",function(err,table){
        if(err==null){
            resp.send(table);
        }
        else{
            resp.send(err);
        }
    })
})
// ============================ All Customers ================================
app.get("/angular-customer-records",function(req,resp){
    dbCon.query("select * from customers",function(err,table){
        if(err==null){
            resp.send(table);
        }
        else{
            resp.send(err);
        }
    })
})