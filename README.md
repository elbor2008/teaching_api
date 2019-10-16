# Handy Booking Management System (for Administrators)
Level Three

Objective: Deliver a tradie booking management system for super administration which includes:

1. CRUD bookings/orders for users/tradies
2. assign related tradie to the user
3. CRUD tradies profile and services' details
4. view order history of tradies
5. send notifications when creating orders
6. view transactions
7. issue payslips for tradies
8. export payslips as pdf
9. track orders

# Front-end:
A portal for staff/admin to manage the handyapp

# Back-end API/DB
1. Query Tradie
2. Book/Update Tradie
3. Payment
4. SQL/nosql
 
# Roles
    Staff
        CRUD Customer and Tradie
        CRUD transactions
        CRUD bookings
    Super Admin
        CRUD Customer and Tradie
        CRUD transactions
        CRUD bookings

# Models
    Order
        Order ID
        created time
        updated time
        unit price
        length
        total price
        service
        client
        service provider
        payment status
            - recieved
            - unpaid
            - pending
            - etc
        service status
            - pending
            - processing
            - unfinished
            - done
            - etc

# Service
    name
    description
    price

# Transaction