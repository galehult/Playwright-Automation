import { type Page, type Locator } from '@playwright/test';

export class PIMPage {
    readonly page: Page;
    readonly pimNavigation: Locator;
    readonly searchButton: Locator;
    readonly nameFilter: Locator;
    readonly idFilter: Locator;
    readonly resetButton: Locator;
    readonly addEmployee: Locator;
    readonly saveButton: Locator;
    readonly firstNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;


    constructor(page: Page) {
        this.page = page;
        this.pimNavigation = page.getByRole('link', { name: 'PIM' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.nameFilter = page.locator('.oxd-input-group').filter({ hasText: 'Employee Name'}).getByPlaceholder('Type for hints...');
        this.idFilter = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id'}).locator('.oxd-input--active');
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.addEmployee = page.getByRole('button', { name: 'Add' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.middleNameInput = page.getByPlaceholder('Middle Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.employeeIdInput = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('.oxd-input--active');
    }

    async navigation() {
        await this.pimNavigation.click();
    }

    async searchFilter() {
        await this.searchButton.click();
    }

    async employeeNameFilter(employeeName: string) {
        await this.nameFilter.fill(employeeName);
    }

    async employeeIdFilter(employeeId: string) {
        await this.idFilter.fill(employeeId);
    }

    async resetFilter() {
        await this.resetButton.click();
    }

    async addButton() {
        await this.addEmployee.click();
    }

    async saveEmployee() {
        await this.saveButton.click();
    }

    async inputEmployeeDetails(firstName: string, middlename: string, lastName: string, employeeId: string) {
        await this.firstNameInput.fill(firstName);
        await this.middleNameInput.fill(middlename);
        await this.lastNameInput.fill(lastName);
        await this.employeeIdInput.fill(employeeId);
    }
}