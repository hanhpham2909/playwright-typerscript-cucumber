Feature: Sign Up Functionallity

    Background:
        Given I open the sign-up page

    # @TC04
    # Scenario: Verify that the sign-up form is accessible
    #     Then I should see the input fields for Name, Email Address and the Signup button

    @TC05
    Scenario: Validate successful user registration
        When I submit in the sign-up form with valid name "<name>" and email "<email>"
        And I fill my information:
            | gender   | password   | firstName   | lastName   | address   | country   | state   | city   | zipCode   | phone   |
            | <gender> | <password> | <firstName> | <lastName> | <address> | <country> | <state> | <city> | <zipCode> | <phone> |
        Then Then I successfully create an account
        Examples:
            | name | email        | gender | password | firstName | lastName | address | country     | state | city | zipCode | phone    |
            | k99  | k99@test.com | male   | 123456   | John      | Doe      | 123 St  | New Zealand | CA    | LA   | 90001   | 12345678 |



