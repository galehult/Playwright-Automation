import { test, expect } from '../fixtures/fixtures';
import { PIMPage } from '../pages/PIMPage';
import { apiTestDAta } from '../test-data/api-test-data';
import { uiTestData } from '../test-data/ui-test-data';


test('Open employee list', async ({ page, pimPage }) => {
    await pimPage.navigation();
    await expect(page).toHaveURL('/web/index.php/pim/viewEmployeeList');
});

test('Add new employee and filtering employee id', async ({ page, pimPage }) => {
    const uiEmployee = {
        ...uiTestData,
        employeeId: Date.now().toString().slice(-10)
    };
    await pimPage.navigation();
    await pimPage.addButton();
    await pimPage.inputEmployeeDetails(uiEmployee.firstName, uiEmployee.middleName, uiEmployee.lastName, uiEmployee.employeeId);
    await pimPage.saveEmployee();
    await page.waitForURL('**/pim/viewPersonalDetails/empNumber/*')
    await expect(
        page.getByText('Apple McPhee', { exact: true })
    ).toBeVisible();
    await pimPage.navigation();
    await pimPage.employeeIdFilter(uiEmployee.employeeId);
    await pimPage.searchFilter();
    const employeeRow = page.locator('.oxd-table-row')
        .filter({ hasText: uiEmployee.employeeId });
    await expect(
        employeeRow.getByText('Apple', { exact: true })
    ).toBeVisible();
    await expect(
        employeeRow.getByText('McPhee', { exact: true })
    ).toBeVisible();
});

test('Search by employee name', async ({ page, pimPage }) => {
    await pimPage.navigation();
    await pimPage.employeeNameFilter('Apple McPhee');
    await pimPage.searchFilter();
    const employeeRow = page.locator('.oxd-table-row')
        .filter({ hasText: 'Apple'})
        .filter({ hasText: 'McPhee' })
        .first();
    await expect(
        employeeRow.getByText('Apple', { exact: true })
    ).toBeVisible();
    await expect(
        employeeRow.getByText('McPhee', { exact: true })
    ).toBeVisible();
});

test('Search for a non-existent employee', async ({ page, pimPage }) => {
    await pimPage.navigation();
    await pimPage.employeeNameFilter('Banana McPhee');
    await pimPage.searchFilter();
    await expect(page.locator('span')
        .getByText('No Records Found'))
        .toBeVisible();
});

test('Clear search filters', async ({ page, pimPage }) => {
    await pimPage.navigation();
    await pimPage.employeeNameFilter('Banana McPhee');
    await pimPage.resetFilter();
    await expect(page.locator('.oxd-input-group')
        .filter({ hasText: 'Employee Name' })
        .getByPlaceholder('Type for hints...'))
        .toBeEmpty();
});

test('Retreive employee records', async ({ dashboard }) => {
    const response = await dashboard.request.get(
        '/web/index.php/api/v2/pim/employees',
        {
            params: {
                nameOrId: 'Apple',
                includeEmployees: 'onlyCurrent'
            }
        }
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.meta.total).toBeGreaterThan(0);
    expect(responseBody.data).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                firstName: 'Apple',
                lastName: 'McPhee'
            })
        ])
    );
});

test('Search/Filter employee records through the API', async ({ page, dashboard }) => {
    const response = await dashboard.request.get(
        '/web/index.php/api/v2/pim/employees',
        {
            params: {
                nameOrId: 'Apple',
                includeEmployees: 'onlyCurrent'
            }
        }
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.data[0].firstName).toBe('Apple');
    expect(responseBody.data[0].lastName).toBe('McPhee');
});

test('Creating and retreival an employee through the API', async ({ page, dashboard }) => {
    const apiData = {
        ...apiTestDAta,
        empPicture: null,
        employeeId: Date.now().toString().slice(-10)
    };
    const createResponse = await dashboard.request.post(
        '/web/index.php/api/v2/pim/employees',
        {
            data: {
                firstName: apiData.firstName,
                middleName: apiData.middleName,
                lastName: apiData.lastName,
                empPicture: apiData.empPicture,
                employeeId: apiData.employeeId
            }
        }
    );
    expect(createResponse.status()).toBe(200);
    const responseBody = await createResponse.json();
    expect(responseBody.data.lastName).toBe('dela Creme');
    expect(responseBody.data.firstName).toBe('Creme');
    expect(responseBody.data.middleName).toBe('');
    expect(responseBody.data.employeeId).toBe(apiData.employeeId);

    const filterResponse = await dashboard.request.get(
        '/web/index.php/api/v2/pim/employees',
        {
            params: {
                nameOrId: apiData.employeeId,
                includeEmployees: 'onlyCurrent'
            }
        }
    );
    expect(filterResponse.status()).toBe(200);
    const filterBody = await filterResponse.json();
    expect(filterBody.meta.total).toBe(1);
    expect(filterBody.data).toHaveLength(1);
    expect(filterBody.data[0].lastName).toBe('dela Creme');
    expect(filterBody.data[0].firstName).toBe('Creme');
});

test('Verify the created employee through a GET request', async ({ page, dashboard }) => {
    const response = await dashboard.request.get(
        '/web/index.php/api/v2/pim/employees',
        {
            params: {
                nameOrId: 'Creme',
                includeEmployees: 'onlyCurrent'
            }
        }
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.data[0].firstName).toBe('Creme');
    expect(responseBody.data[0].lastName).toBe('dela Creme');
});

test('Validate responses for an invalid or nonexistent employee ID', async ({ page, dashboard }) => {
    const response = await dashboard.request.get(
        '/web/index.php/api/v2/pim/employees',
        {
            params: {
                nameOrId: 'Nanneh',
                includeEmployees: 'onlyCurrent'
            }
        }
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.data).toHaveLength(0);
    expect(responseBody.meta.total).toBe(0);
})

test('Create employee and verify through GET request', async ({ dashboard }) => {
    const employee = {
        firstName: 'Misu',
        middleName: '',
        lastName: 'Tira',
        empPicture: null,
        employeeId: Date.now().toString().slice(-10)
    };

    const postResponse = await dashboard.request.post(
        '/web/index.php/api/v2/pim/employees',
        {
            data: employee
        }
    );

    expect(postResponse.status()).toBe(200);
    const postBody = await postResponse.json();
    expect(postBody.data.firstName).toBe(employee.firstName);
    expect(postBody.data.middleName).toBe(employee.middleName);
    expect(postBody.data.lastName).toBe(employee.lastName);
    expect(postBody.data.employeeId).toBe(employee.employeeId);

    const getResponse = await dashboard.request.get(
        '/web/index.php/api/v2/pim/employees',
        {
            params: {
                nameOrId: postBody.data.employeeId,
                includeEmployees: 'onlyCurrent'
            }
        }
    );

    expect(getResponse.status()).toBe(200);
    const getBody = await getResponse.json();
    expect(getBody.meta.total).toBe(1);
    expect(getBody.data[0].firstName).toBe(employee.firstName);
    expect(getBody.data[0].middleName).toBe(employee.middleName);
    expect(getBody.data[0].lastName).toBe(employee.lastName);
    expect(getBody.data[0].employeeId).toBe(employee.employeeId);
});