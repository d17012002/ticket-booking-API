const database_url = require(__dirname + "/url.js");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(database_url);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is compulsory"],
      },
    gender: String,
    seatNumber: {
        type: Number,
        required: [true, "seat number is compulsory"],
    }
})

const Booking = mongoose.model("Booking", bookingSchema);

//*********** Middleware **************************/
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });


app.route("/")
    .get((req, res) => {
        res.send("Ticket Booking API")
    })


//******* For booking POST method ***********/
app.route("/booking")
   .post((req, res)=>{
    const Name = req.body.name;
    const Gender = req.body.gender;
    const Seat = req.body.seat;
    var SeatArr = Seat.split(' ');


    for(let i=0; i<SeatArr.length; i++) {

        Booking.findOne({seatNumber: SeatArr[i]}, function(err, foundBooking){
            if(SeatArr[i] <= 0 || SeatArr[i] > 500) {
                console.log(`Invalid Seat Number ${SeatArr[i]}`)
            }
            else if(foundBooking){
                // if seat is already booked by someone
                console.log(`Seat number ${SeatArr[i]} is already booked.`)
            }
            else{
                //if not booked
                const newBooking = new Booking({
                    name: Name,
                    gender: Gender,
                    seatNumber: parseInt(SeatArr[i])
                });
                
                newBooking.save(function(err) {
                    if(err) {
                        console.log(err);
                    }
                })
            }
        })

    }

    res.send(`Success ✔.`);

   });

//********* GET all booking details ******/
app.route("/available")
   .get((req, res) => {
       var count = 0;
       Booking.find(function (err, Bookings) {
        if(err){
            console.log(err);
        }
        else{
            Bookings.forEach(element => {
                count += 1;
            })
            res.send(`${500-count} seats are available out of 500.`)
        }
       })
   });


app.route("/details")
   .get((req, res) => {
       Booking.find(function (err, Bookings) {
        if(err){
            console.log(err);
        }
        else{
            res.send(Bookings);
        }
       })
   });

app.route("/details/:seatNum")
   .get((req, res) => {
       Booking.findOne({seatNumber: req.params.seatNum}, function (err, seatDetail) {
          if(seatDetail){
            res.send(seatDetail);
        }
        else{
              res.send("Not booked by anyone");
          }
       })
   });


/*****Cancel seat booking *********/
app.route("/cancel/:seat")
   .delete(function(req, res){
      Booking.deleteOne({seatNumber: req.params.seat}, function(err) {
        if(err) {
            res.send(err);
        }
        else{
            res.send(`Booking cancelled for seat number ${req.params.seat}`)
        }
      })
   })


app.listen(process.env.PORT || 3000, function () {
    console.log("Server running at 🚀: http://localhost:3000/");
});
  