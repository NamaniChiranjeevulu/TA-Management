
import {browser} from "protractor";

describe('Home Page', () => {

    beforeEach(() => {
        browser.get('/');
        browser.ignoreSynchronization = true;
    });

    it('should display browser title as TA Management', () => {
        expect(browser.getTitle()).toEqual('TA Management');
    });
});
