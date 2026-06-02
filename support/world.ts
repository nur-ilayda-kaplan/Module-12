import { setWorldConstructor } from '@cucumber/cucumber';
import { Page } from 'playwright';

interface CustomWorld {
  page: Page;
}

class World implements CustomWorld {
  page!: Page;
}

setWorldConstructor(World);
