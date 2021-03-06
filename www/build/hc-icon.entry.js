import { r as registerInstance, h, H as Host, c as getElement } from './core-3c51ccf2.js';

const Icon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.spin = false;
    }
    componentDidLoad() {
        this.renderIcon();
    }
    spinHandle(newValue) {
        if (newValue) {
            this.el.setAttribute('spin', `${newValue}`);
        }
        else {
            this.el.removeAttribute('spin');
        }
    }
    nameHandle() {
        this.renderIcon();
    }
    renderIcon() {
        const use = this.el.shadowRoot.querySelector('#use');
        const svg = this.el.shadowRoot.querySelector('.hc-icon');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `../../assets/iconfont.svg#icon-${this.name}`);
        if (this.size) {
            svg.style.fontSize = `${this.size}px`;
            svg.style.width = `${this.size}px`;
            svg.style.height = `${this.size}px`;
        }
        svg.style.color = this.color;
        if (!this.name) {
            this.el.style.display = 'none';
        }
        if (this.spin) {
            this.el.setAttribute('spin', 'true');
        }
    }
    render() {
        return (h(Host, null, h("svg", { class: "hc-icon", "aria-hidden": "true" }, h("use", { id: "use" }))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "spin": ["spinHandle"],
        "name": ["nameHandle"]
    }; }
    static get style() { return ":host {\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n}\n:host .hc-resource {\n  display: none;\n}\n:host .hc-icon {\n  width: 1rem;\n  height: 1rem;\n  font-size: 1rem;\n  fill: currentColor;\n  overflow: hidden;\n}\n:host .hc-icon svg {\n  color: inherit;\n  font-size: inherit;\n}\n\n:host([spin]) .hc-icon {\n  -webkit-animation: rotate 0.8s linear infinite;\n  animation: rotate 0.8s linear infinite;\n}\n\n\@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n\@keyframes rotate {\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}"; }
};

export { Icon as hc_icon };
