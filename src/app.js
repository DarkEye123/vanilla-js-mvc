class App {
  constructor(id) {
    this.app = document.querySelector(id);
    this.componentsByName = {};
    this.currentComponent = {};
  }

  addComponent(component = {}) {
    console.log('adding component', component);
    this.componentsByName[component.name] = component;
    component.model = this.proxify(component.model);
  }

  showComponent(name) {
    this.currentComponent = this.componentsByName[name];
    console.log(
      'showing component',
      this.currentComponent ? this.currentComponent.name : 'unknown',
    );

    if (this.currentComponent) {
      this.currentComponent.controller(this.currentComponent.model);
    }
    this.updateView();
  }

  updateView() {
    console.log(
      'rendering component',
      this.currentComponent ? this.currentComponent.name : 'unknown',
    );

    if (this.currentComponent) {
      this.app.innerHTML = this.currentComponent.view(
        this.currentComponent.model,
      );
    } else {
      this.app.innerHTML = '<h3>Not Found</h3>';
    }
  }

  proxify(model) {
    const self = this;
    return new Proxy(model, {
      set(target, property, value) {
        console.log(
          'Changing',
          property,
          'from',
          target[property],
          'to',
          value,
        );
        target[property] = value;
        self.updateView();
        return true;
      },
    });
  }
}
