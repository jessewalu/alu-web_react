import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StyleSheetTestUtils } from 'aphrodite';

Enzyme.configure({ adapter: new Adapter() });

// Aphrodite tries to inject <style> tags asynchronously, which breaks tests.
StyleSheetTestUtils.suppressStyleInjection();
