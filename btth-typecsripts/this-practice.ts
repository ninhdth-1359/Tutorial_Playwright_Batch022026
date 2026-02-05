class Counter {
  count: number = 0;

  increment(){
    this.count += 1;
    console.log(`Count is now: ${this.count}`);
  }

  reset(){
    this.count = 0;
    console.log(`Counter reset: ${this.count}`);
  }
}

const counter = new Counter();
counter.increment();
counter.increment();
counter.reset();
