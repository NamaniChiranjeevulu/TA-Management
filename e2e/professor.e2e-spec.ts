import {element, by, browser, protractor} from "protractor";

describe('Professor Page', () => {

    let EC = protractor.ExpectedConditions;

    beforeEach(() => {
        browser.get('/');
        element(by.css('.first-element')).click();
        browser.sleep(200);
        element(by.css('.login-button')).click();
        browser.sleep(200);
        let email = element(by.name('email'));
        email.sendKeys('ad@ufl.edu');
        let password = element(by.name('password'));
        password.sendKeys('ad');
        element(by.id('ok')).click();
        browser.sleep(1000);
    });

    it('should display professor home page', () => {
        browser.sleep(500);
        expect(element(by.css('.header-name')).getText()).toEqual('Welcome Professor');
        expect(element(by.css('.middle')).isPresent()).toBe(true)
    });

    it('should have student list', () => {
        browser.sleep(1000);
        let students = element.all(by.id('students'));
        browser.sleep(200);
        expect(students).toBeTruthy();
        expect(students.count()).toEqual(9)
    });

    it('should search student', () => {
        browser.sleep(1200);
        let search = element(by.name('search-input'));
        browser.sleep(200);
        expect(search).toBeTruthy();
        search.sendKeys('Anna');
        browser.sleep(1000);
        let students = element.all(by.id('students'));
        browser.sleep(200);
        expect(students.count()).toEqual(1);
        let studentName = element(by.id('student-name'));
        browser.sleep(200);
        // browser.wait(EC.not(EC.presenceOf(studentName)), 5000);
        expect(studentName).toBeTruthy();
        expect(studentName.getText()).toContain('Anna');
        browser.sleep(2000);
    });

    it('students should have name', () => {
        browser.sleep(1000);
        let students = element.all(by.id('students'));
        browser.sleep(500);
        expect(students.count()).toEqual(9);

        for (let i = 0; i < 9; i++){
            expect(students.get(i).element(by.css('student-name'))).toBeTruthy();
        }
    });

    it('should direct to announcement Page', () =>{
        browser.sleep(1000);
        let announcements = element(by.id('announcements'));
        browser.sleep(200);
        browser.executeScript(function (elem) { elem.click(); }, announcements.getWebElement());
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain('course');
    });

    it('should direct to message Page', () =>{
        browser.sleep(1000);
        let messages = element(by.id('messages'));
        browser.sleep(200);
        browser.executeScript(function (elem) { elem.click(); }, messages.getWebElement());
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain('course');
    });

    it('should direct to file Page', () =>{
        browser.sleep(1000);
        let files = element(by.id('files'));
        browser.sleep(200);
        browser.executeScript(function (elem) { elem.click(); }, files.getWebElement());
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain('course');
    });

    it('should download the student list', () => {
        browser.sleep(1000);
        let download = element(by.id('download'));
        browser.sleep(200);
        browser.executeScript(function (elem) { elem.click(); }, download.getWebElement());
        browser.sleep(1000);
    });

});
