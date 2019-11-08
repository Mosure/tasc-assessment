# tasc-assessment
TASC Interview Assessment

[View the live site!](https://tasc.mitchell.mosure.me)

## Architecture
The shopping cart is seperated into the following components:

### Frontend (React)
We use React to display the catalog of items, manage local cart state, rendering the invoice, etc...

Includes jest tests to verify correct invoice calculation.

### Backend (AWS Lambda)
Used to retrieve the catalog of items (with pagination) and 'purchase' carts.

### Database (AWS RDS)
Stores the catalog of items and purchased carts.

Purchased carts are saved so the invoice can be viewed after the client state of the application has been abandoned.

The schema of the database is defined below:

## Reflection
Note: this is not an ideal solution, the following are some considerations of a production system:
* Better testing coverage
* Project structure refactoring (different react state management)
* CI/CD
* More documentation
* Pagination would need to be fully implemented
