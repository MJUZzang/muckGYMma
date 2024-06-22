# 캡스톤디자인 
# ✍️먹짐마
먹짐마라는 프로젝트 이름을 갖고 개발에 착수.  
팀인원 총 4명 (프론트 2명, 백엔드 2명)

# 🙃프로젝트 아이디어
- (식단관리, 피트니스, 커뮤니티) 웹앱
- 섭취한 음식 사진 업로드 후 AI를 통한 영양성분 분석
- 섭취한 칼로리를 소모할 운동플랜 자동 생성 및 추천
- 운동플랜 재생 기능
- 식사 일기 (커뮤니티 포스팅)
- 피드 조회 및 부가 커뮤니티 기능 (댓글, 팔로잉, 좋아요)

# 📜프로젝트 구조
Repository의 root에 위치한 projects 폴더에 부프로젝트 폴더들이 위치함
- projects/fe (프론트 프로젝트)
- projects/paygo-be (백엔드 프로젝트)

# 🎨프론트 주요 기술 스택
- next.js
- typescript
- tailwindcss
- shadcn
- apexchart
- react-easy-crop
  
## 🖥️백엔드 주요 기술 스택
- spring boot
- mysql
- docker
- querydsl
- gradle
- elastic beanstalk

# 📹최종 결과물 영상
유튜브 영상: <a href="https://youtu.be/lX7CzpYh6HU">링크 클릭</a>  

## 😎프로젝트 결과
<img 
  src="https://github.com/MJUZzang/muckGYMma/assets/62019774/e47b6a97-8322-4a0e-8d59-b17f2dbb8e4a" 
  alt="상장사진"
  style="width: 50vw;"
/>

## 부록
커밋메시지에 관한 팀 컨벤션을 지킬 수 없었다.  
CORS문제로 인해 백엔드의 api를 프론트에 적용하고 테스트를 해보는 것이 불가능했기 때문.  

때문에 매번 짧게 커밋을 만들고 ec2 인스턴스에서 직접 브랜치를 pull을 한 후에 build하여 테스트를 해야 했다.  
개발 초기에는 팀 스타일 가이드를 잘 구축하고 커밋을 형식에 맞게 작성해주었지만 후반에는 포기하게 되었다.
