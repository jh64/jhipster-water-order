import { element, by, ElementFinder } from 'protractor';

export class WaterOrderComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-water-order div table .btn-danger'));
  title = element.all(by.css('jhi-water-order div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class WaterOrderUpdatePage {
  pageTitle = element(by.id('jhi-water-order-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  startTimestampInput = element(by.id('field_startTimestamp'));
  durationInput = element(by.id('field_duration'));
  statusSelect = element(by.id('field_status'));

  userSelect = element(by.id('field_user'));
  farmSelect = element(by.id('field_farm'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setStartTimestampInput(startTimestamp: string): Promise<void> {
    await this.startTimestampInput.sendKeys(startTimestamp);
  }

  async getStartTimestampInput(): Promise<string> {
    return await this.startTimestampInput.getAttribute('value');
  }

  async setDurationInput(duration: string): Promise<void> {
    await this.durationInput.sendKeys(duration);
  }

  async getDurationInput(): Promise<string> {
    return await this.durationInput.getAttribute('value');
  }

  async setStatusSelect(status: string): Promise<void> {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async farmSelectLastOption(): Promise<void> {
    await this.farmSelect.all(by.tagName('option')).last().click();
  }

  async farmSelectOption(option: string): Promise<void> {
    await this.farmSelect.sendKeys(option);
  }

  getFarmSelect(): ElementFinder {
    return this.farmSelect;
  }

  async getFarmSelectedOption(): Promise<string> {
    return await this.farmSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class WaterOrderDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-waterOrder-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-waterOrder'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
