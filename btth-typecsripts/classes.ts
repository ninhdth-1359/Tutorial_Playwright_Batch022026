interface IUSER {
  name: string;
  email: string;
  isAdmin: boolean;
}

class User implements IUSER {
  name: string;
  email: string;
  isAdmin: boolean;

  constructor(name: string, email: string, isAdmin: boolean) {
    this.name = name;
    this.email = email;
    this.isAdmin = isAdmin;
  }

  getInfo(): string {
    return `User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`;
  }
}

class AdminUser extends User {
  constructor(name: string, email: string) {
    super(name, email, true);
  }

  deleteUser(user: User): string {
    return `Admin ${this.name} deleted user ${user.name}`;
  }
}

// Tao instance cua user va goi displayInfo
const user1 = new User('Dao Thi Hai Ninh', 'dao.thi.hai.ninh@gmail.com', false);
console.log(user1.getInfo());

// Tao mang chua AdminUser va User. Duyet mang va in thong tin
const user2 = new User('User Two', 'user.two@gmail.com', false);
const admin1 = new AdminUser('Admin User', 'admin.@gmail.com');
const users: User[] = [user2, admin1];
for (const user of users) {
  console.log(user.getInfo());
}
