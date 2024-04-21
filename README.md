# InForce-Test-Task
This repo is implementation of test task for AQA candidates

How to install:

1. git clone [reference to repo]
2. npm install

Open Cypress
1. npx cypress open
2. E2E Testing
3. Start E2E testing
 
All the tests are in the folder e2e
There are three test suites :
1. checkout.cy.js - checks some cases upon checkout
2. login.cy.js - checks the user's ability to log in
3. products.cy.js - checks capability of putting products into the cart
                  
Page Objects are in the folder cypress/support/pages


Notes:
    1. I should mention that pre-filling, for some reason, doesn't work on the "checkout-step-one" page, so this test will fail each time it runs. There is a workaroud I've commented out. To make the test pass, just delete a comment.  
     
       
