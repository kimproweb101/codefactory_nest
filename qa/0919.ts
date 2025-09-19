class User {
  constructor(private readonly id: number, private readonly name: string) {}

  getInfo() {
    return `${this.id}: ${this.name}`;
  }
}

const u = new User(1, "Kim");

// ✅ 읽기 가능 (클래스 메서드 내부에서만)
console.log(u.getInfo());

// ❌ 외부 접근 불가 (private)
// console.log(u.id);

// ❌ 수정 불가 (readonly)
// u.name = "Park"; // 에러 발생
