//khai bao bien voi cac kieu du lieu co ban
const userName: string = 'Dao Thi Hai Ninh';
const age: number = 32;
const isActive: boolean = true;
const roles: string[] = ['developer', 'automation tester'];
const user: {
    name: string
    email: string,
    isAdmin: false,
} = {
  name: userName,
  email: 'dao.thi.hai.ninh@gmail.com',
  isAdmin: false,
};

// Ham nang cao
function checkAge(userAge: number): string {
  return userAge < 18 ? 'Under 18' : 'Adult';
}

//In thong tin user theo mong muon
console.log(`User: ${user.name} (email: ${user.email}), Roles: ${roles.join(', ')}, Active: ${isActive}`);
console.log(checkAge(age));
