# tasc-assessment
TASC Interview Assessment

[View the live site!](https://tasc.mitchell.mosure.me)

## Tests
View the following test carts:
* [Test 1](https://tasc.mitchell.mosure.me/invoice/test1)
* [Test 2](https://tasc.mitchell.mosure.me/invoice/test2)
* [Test 3](https://tasc.mitchell.mosure.me/invoice/test3)

Note: The results are consistent with the assessment brief.

## Architecture
The shopping cart is seperated into the following components:

### Frontend (React)
We use React to display the catalog of items, manage local cart state, rendering the invoice, etc...

Includes jest tests to verify correct invoice calculation.

Hosted on AWS CloudFront.

### Backend (AWS Lambda)
Used to retrieve the catalog of items (with pagination) and 'purchase' carts.

List of endpoints:
* GET /items
* GET /invoices/:id
* POST /invoices

### Database (AWS RDS)
Stores the catalog of items and purchased carts.

Purchased carts are saved so the invoice can be viewed after the client state of the application has been abandoned.

The schema of the database is defined below:

### CI/CD (AWS CodeBuild/CodePipeline)
CodePipeline setup on AWS to automatically deploy to AWS CloudFront CDN.

### CDN (AWS CloudFront)
Distributes frontend

### DNS (AWS Route53)
Manages DNS lookup to CDN.

## Reflection
Note: this is not an ideal solution, the following are some considerations of a production system:
* Better testing coverage
* Project structure refactoring (different react state management)
* More documentation
* Pagination would need to be fully implemented
