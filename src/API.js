class API {
  constructor(url) {
    this.url = url;
  }

  async getDogs() {
    const dogs = await fetch(`${this.url}/dogs`);
    return await dogs.json();
  }

  async getDog(ID) {
    const dog = await fetch(`${this.url}/dogs/${ID}`);
    return await dog.json();
  }
}
