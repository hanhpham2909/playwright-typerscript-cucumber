import {Locator} from "playwright";

export async function getValidationMessage(inputField:Locator) : Promise<string>{
    return inputField.evaluate((input)=> (input as HTMLInputElement).validationMessage);
};