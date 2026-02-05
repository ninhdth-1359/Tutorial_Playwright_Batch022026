function sum(a: number, b: number): number {
  return a+b;
}

const multiply = (x: number, y: number): number => {
  return x * y;
};

function greet(name: string, role: string = 'Guest'): void {
  console.log(`Hello ${name}, your role is ${role}`);
}


async function delayPrint(message: string, delay: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, delay));
  console.log(message);
}

// Test the functions
console.log(`Sum(5 + 5): ${sum(5, 10)}`);
console.log(`Multiply(4 * 3): ${multiply(4, 3)}`);
greet('Hai Ninh');
greet('Hai Ninh', 'developer');
delayPrint('This message is printed after 2 seconds', 2000);
