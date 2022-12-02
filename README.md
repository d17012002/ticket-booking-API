## ticket-booking-API
It is a booking system API where we have 500 seats that can be booked, using this API user can fetch available seats, book seat of two or more users simultaneously with consistency. User can also select seat which they want to book also enables cancelling of the booked seats.

POST method: https://ticket-booking-api.onrender.com/booking <br>
`/booking` route - Takes 3 parameters as key value pair. <br>
name: user_name <br>
gender: male/female <br>
seat: seat_number <br>

GET method: https://ticket-booking-api.onrender.com/available <br>
`/available` route - To fetch total number of available seats. <br>

GET method: https://ticket-booking-api.onrender.com/details <br>
`/details` route - To get the details of all the booked seats. <br>

GET method: https://ticket-booking-api.onrender.com/details/25 <br>
`/details/seat_number` route - To fetch the booking details of a particular seat number. <br>

DELETE method: https://ticket-booking-api.onrender.com/cancel/25 <br>
`/cancel/seat_number` route - To cancel the booked seat. <br>

Demonstration video: 

https://user-images.githubusercontent.com/81901470/192521546-b641ec0c-8762-45a9-8df2-c352c0316de0.mp4

