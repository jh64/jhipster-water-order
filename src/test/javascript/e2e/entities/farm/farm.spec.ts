import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FarmComponentsPage, FarmDeleteDialog, FarmUpdatePage } from './farm.page-object';

const expect = chai.expect;

describe('Farm e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let farmComponentsPage: FarmComponentsPage;
  let farmUpdatePage: FarmUpdatePage;
  let farmDeleteDialog: FarmDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Farms', async () => {
    await navBarPage.goToEntity('farm');
    farmComponentsPage = new FarmComponentsPage();
    await browser.wait(ec.visibilityOf(farmComponentsPage.title), 5000);
    expect(await farmComponentsPage.getTitle()).to.eq('Farms');
    await browser.wait(ec.or(ec.visibilityOf(farmComponentsPage.entities), ec.visibilityOf(farmComponentsPage.noResult)), 1000);
  });

  it('should load create Farm page', async () => {
    await farmComponentsPage.clickOnCreateButton();
    farmUpdatePage = new FarmUpdatePage();
    expect(await farmUpdatePage.getPageTitle()).to.eq('Create or edit a Farm');
    await farmUpdatePage.cancel();
  });

  it('should create and save Farms', async () => {
    const nbButtonsBeforeCreate = await farmComponentsPage.countDeleteButtons();

    await farmComponentsPage.clickOnCreateButton();

    await promise.all([farmUpdatePage.setNameInput('name'), farmUpdatePage.userSelectLastOption()]);

    expect(await farmUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await farmUpdatePage.save();
    expect(await farmUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await farmComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Farm', async () => {
    const nbButtonsBeforeDelete = await farmComponentsPage.countDeleteButtons();
    await farmComponentsPage.clickOnLastDeleteButton();

    farmDeleteDialog = new FarmDeleteDialog();
    expect(await farmDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Farm?');
    await farmDeleteDialog.clickOnConfirmButton();

    expect(await farmComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
