class Router {
  constructor(app) {
    this.app = app;
    this.routes = [];
    this.params = [];
    this.hashChange = this.hashChange.bind(this);

    addEventListener('hashchange', this.hashChange);
    addEventListener('pageshow', this.hashChange);
  }

  addRoute(componentName, url) {
    this.routes.push({
      componentName,
      url,
    });
  }

  hashChange() {
    const hash = window.location.hash;
    const route = this.routes.find(route => hash.match(new RegExp(route.url)));
    console.log('route', route);

    if (route) {
      this.params = new RegExp(route.url).exec(hash);
      this.app.showComponent(route.componentName);
    } else {
      this.app.showComponent();
    }
  }
}
