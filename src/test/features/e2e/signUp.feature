Feature: Sign Up Functionallity

    Background:
        Given I open the sign-up page

    @TC04
    Scenario: Verify that the sign-up form is accessible
        Then I should see the input fields for Name, Email Address and the Signup button

    @TC05
    Scenario: Validate successful user registration
        When I submit in the sign-up form with valid name "<name>" & email "<email>"
        Examples:
            | name  | email           |
            | lemon | lemon@gmail.com |
