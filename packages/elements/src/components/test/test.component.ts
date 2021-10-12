import { customElement, html, LitElement, property, unsafeCSS } from 'lit-element';
import { nothing } from 'lit-html';
import { TestModel } from 'mutation-testing-metrics';
import { getContextClassForTestStatus } from '../../lib/htmlHelpers';
import style from './test.scss';
import { bootstrap } from '../../style';
import { createCustomEvent } from '../../lib/custom-events';

/**
 * @fires test-selected
 */
@customElement('mte-test')
export class MutationTestReportTestComponent extends LitElement {
  @property({ attribute: false })
  public test: TestModel | undefined;

  @property({ type: Boolean })
  public active = false;

  @property({ type: Boolean })
  public show = true;

  public static styles = [bootstrap, unsafeCSS(style)];

  private readonly testClicked = (event: Event) => {
    this.active = !this.active;
    event.stopPropagation();
    this.dispatchTestSelected();
  };

  private dispatchTestSelected() {
    this.dispatchEvent(createCustomEvent('test-selected', { selected: this.active, test: this.test }, { bubbles: true, composed: true }));
  }

  public render() {
    // This part is newline significant, as it is rendered in a <code> block.
    // No unnecessary new lines
    return this.test && this.show
      ? html`<span class="badge bg-${this.active ? 'info' : getContextClassForTestStatus(this.test.status)}" @click="${this.testClicked}"
          >${this.test.id}</span
        >`
      : nothing;
  }
}
