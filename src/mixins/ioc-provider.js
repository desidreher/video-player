import {IocKernel} from '../services/ioc-kernel.js';

/* @polymerMixin */
export const IocProviderMixin = (superClass) => class extends superClass {
  static get properties() {
    return {
      _iocKernel: {
        type: Object,
        value: () => new IocKernel(),
        readOnly: true,
      },
    };
  }

  /**
   * Initializes service bindings and adds listener for IOC requests.
   * @return {void}
   */
  constructor() {
    super();

    this.bindServices(this._iocKernel);
    this.addEventListener('ioc-request', (e) => {
      if(this._iocKernel.has(e.detail.key)) {
        e.detail.result = this._iocKernel.get(e.detail.key);
        e.stopPropagation();
      }
    });
  }

  /**
   * Binds services to kernel. Needs to be implemented by inheriting classes.
   * @return {void}
   */
  bindServices() { }

  /**
   * Gets a specific service from IOC kernel.
   * @param  {string} key The key of the service.
   * @return {Object} The service instance.
   */
  _getService(key) {
    return this._iocKernel.get(key);
  }
};
