import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WaterOrderComponentsPage, WaterOrderDeleteDialog, WaterOrderUpdatePage } from './water-order.page-object';

const expect = chai.expect;

describe('WaterOrder e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let waterOrderComponentsPage: WaterOrderComponentsPage;
  let waterOrderUpdatePage: WaterOrderUpdatePage;
  let waterOrderDeleteDialog: WaterOrderDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load WaterOrders', async () => {
    await navBarPage.goToEntity('water-order');
    waterOrderComponentsPage = new WaterOrderComponentsPage();
    await browser.wait(ec.visibilityOf(waterOrderComponentsPage.title), 5000);
    expect(await waterOrderComponentsPage.getTitle()).to.eq('Water Orders');
    await browser.wait(ec.or(ec.visibilityOf(waterOrderComponentsPage.entities), ec.visibilityOf(waterOrderComponentsPage.noResult)), 1000);
  });

  it('should load create WaterOrder page', async () => {
    await waterOrderComponentsPage.clickOnCreateButton();
    waterOrderUpdatePage = new WaterOrderUpdatePage();
    expect(await waterOrderUpdatePage.getPageTitle()).to.eq('Create or edit a Water Order');
    await waterOrderUpdatePage.cancel();
  });

  it('should create and save WaterOrders', async () => {
    const nbButtonsBeforeCreate = await waterOrderComponentsPage.countDeleteButtons();

    await waterOrderComponentsPage.clickOnCreateButton();

    await promise.all([
      waterOrderUpdatePage.setStartTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      waterOrderUpdatePage.setDurationInput('5'),
      waterOrderUpdatePage.statusSelectLastOption(),
      waterOrderUpdatePage.userSelectLastOption(),
      waterOrderUpdatePage.farmSelectLastOption(),
    ]);

    expect(await waterOrderUpdatePage.getStartTimestampInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startTimestamp value to be equals to 2000-12-31'
    );
    expect(await waterOrderUpdatePage.getDurationInput()).to.eq('5', 'Expected duration value to be equals to 5');

    await waterOrderUpdatePage.save();
    expect(await waterOrderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await waterOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last WaterOrder', async () => {
    const nbButtonsBeforeDelete = await waterOrderComponentsPage.countDeleteButtons();
    await waterOrderComponentsPage.clickOnLastDeleteButton();

    waterOrderDeleteDialog = new WaterOrderDeleteDialog();
    expect(await waterOrderDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Water Order?');
    await waterOrderDeleteDialog.clickOnConfirmButton();

    expect(await waterOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
