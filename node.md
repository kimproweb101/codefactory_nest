19. Post 모듈 생성하기
    nest cli 로 posts 생성
    nest g resourse

20. Postman을 사용해서 요청 보내기

21. REST API 세트
    GET POST PATCH PUT DELETE 설명
    PATCH 8이라는 ID가 존재할때만 작동
    PUT : 8이라는 ID가 있으면 변경 없으면 생성, 여차하면 생성해야할수도있어서 모든 데이터를 넣어준다
    DELETE

QUERY GET
BODY POST PATCH PUT DELETE

22. Get Post 구현하기

23. Not Found Exception 던지기

24. 기본적으로 제공되는 Exception들 찾는 곳
    공식문서 docs.nestjs.com/exception-filters

25. Post 요청 만들기
    201 post 요청 했을때 성공시 응답코드
    입력 요청시 마지막 id 값 구해서 1더하는 코드

26. Patch Post 엔드폰인트 생성하기
    수정시 모든 필드를 수정하지 않아도 작동 되도록 물음표 처리

27. Service 소개
    아키텍쳐 :
    이런식으로 작성해보니 코드가 효율 적이더라,
    협업, 구조때문에 문제될일 최소화

컨트롤러 요청을 받는 역할
서비스 로직은 서비스로

30. Service 로 모든 로직 옮기기

31. VSC에서 Postgresql db연결
    ctrl+shift+p
    postgresql:add conne
    127.0.0.1
    userid
    userpw
    port
    nestjs_local_database 이름 상관 없음

32. NestJS에 Typeorm 설정하기

```
pnpm add @nestjs/typeorm typeorm pg @nestjs/config
```

42. Entity로 테이블 생성하기

#49. Typeorm 공부할 프로젝트 세팅하기

#60. Relation Option

```
@OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find() 실행 할때마다 항상 가져올 relation
    eager: true,
    // 저장할때 relation을 한번에 같이 저장가능
    cascade: true,
  })
```

73. 디버거 사용하기

74. 로그인 로직 정리하기

### 설치

```sh
nest g resource
auth
rest api
no
```

75. 토큰 signing 해보기

설치

```sh
pnpm add @nestjs/jwt bcrypt
```

등록

## Dependency 에러 해결법

90. Pipe 소개 & ParseIntPipe 사용해보기
