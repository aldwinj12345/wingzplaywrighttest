const {test, expect} = require('@playwright/test');
const assert = require('assert');

test.beforeEach(async({page})=>{
    //launch the test url on each test
    await page.goto('https://auth.wingz.me/auth/signin')
    //then login as a user
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('tester@wingz.com');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('TestAccount123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('link', { name: 'Account' }).click();
})

test.afterEach(async({page})=>{
    await page.close()
})

test.describe('My Profile Test Suites',()=>{
    test('Test My Profile Tab Link',async({page})=>{
        await expect(page.getByRole('link', { name: 'My Profile' ,href: '/account/profile'})).toBeVisible()
        await expect(page.getByRole('link', { name: 'My Profile' ,href: '/account/profile'})).toHaveText('My Profile')
        //then I will click the My Profile Tab
        await page.getByRole('link', { name: 'My Profile' ,href: '/account/profile'}).click()
        //then verify background color and font color for My Profile 
        await expect(page.locator('li a[href="/account/profile"]')).toHaveCSS('background-color', 'rgb(166, 166, 219)'); // Assert background color
        await expect(page.locator('li a[href="/account/profile"]')).toHaveCSS('color', 'rgb(255, 255, 255)') //font color
    })
    test('Test My Profile form page title',async({page})=>{
        //click My Profile Tab
        await page.getByRole('link', { name: 'My Profile' ,href: '/account/profile'}).click()
        //verify heading title My Profile
        await expect(page.getByRole('heading', { name: 'My Profile' })).toBeVisible()
        await expect(page.getByRole('heading', { name: 'My Profile' })).toHaveText('My Profile')
        await expect(page.getByRole('heading', { name: 'My Profile' })).toHaveCSS('font-weight', '700') // means bold text
        await expect(page.getByRole('heading', { name: 'My Profile' })).toHaveCSS('color', 'rgb(51, 50, 104)') // font color

    })
})