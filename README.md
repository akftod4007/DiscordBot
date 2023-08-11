### 디스코드 챗봇 프로젝트

### 핵심 코드
<details>
<summary>여기를 눌러주세요</summary>
<div markdown="1">       

handlers 함수
-사용자의 요청을 분류하고 입력받은 챗봇에 모듈화한 함수에 전송해 처리함
입력 받은 사용자의 요청을 처리하기 위해 기능에 따라서 모듈화함
![image](https://github.com/akftod4007/DiscordBot/assets/113909192/dfcc5c35-6f2b-4e07-80b6-0f91a1bde180)

utils 함수



</div>
</details>


### 프로젝트 소개
도커 이미지와 구글 클라우드 플랫폼을 이용한 디스코드 챗봇을 사용한 일정 관리 시스템


### 구현 화면
![image](https://github.com/akftod4007/DiscordBot/assets/113909192/be63fe03-359c-4c7c-a226-58f1f71218eb)



### 프로젝트 설명

<details>
<summary>여기를 눌러주세요</summary>
<div markdown="1">       

챗봇에서 특정 커맨드를 입력하면 서버에 RESTful API요청을 Axios를 통해 요청을 보내면 서버에서 입력한 사항을 저장하고 지정된 시간이 되면 서버에서 채널로 메세지를 전송해 줍니다.

handlers는 챗봇의 작동을 담당하는 함수입니다.
utils는 챗봇에 작동에 필요한 함수들을 모듈화해 정리한 폴더입니다.
routes는 서버에서 챗봇에서 입력받은 정보를 저장하고 관리하기 위해 서버 기능을 라우터를 통해서 분리해놓은 폴더입니다.

사용자가 입력한 내용은 handle함수에서 전략패턴을 통해 관리됩니다.

이렇게 작성된 코드를 도커를 사용해서 이미지를 만들어 구글 클라우드 플랫폼에 업로드한 이후 베포 중 입니다.

</div>
</details>


### 아키택쳐
![KakaoTalk_20230811_172041387](https://github.com/akftod4007/DiscordBot/assets/113909192/3405e807-5702-4075-b4c8-027c8881ee8f)



언어: JavaScript

프레임워크: Node.js, Express

컨테이너: Docker

클라우드 플랫폼: Google Cloud Platform 

### 사전 요구사항
프로젝트를 실행하기 위해 필요한 사전 요구사항을 설명하세요. 예를 들어 다음과 같은 요구사항을 명시할 수 있습니다.

Node.js 설치

Docker 설치

Google Cloud Platform 계정 및 프로젝트 생성

Discord Webhook 생성 및 깃허브 연결

OpenWeather API키


###   디스코드 챗봇 사용법
챗봇을 서버에 초대하고 권한을 설정해 줍니다.

챗봇이 메세지를 보낼 수 있고 챗봇이 메세지를 읽어올 수 있도록 권한을 설정해서 초대해 줍니다.

디스코드와 웹서버를 연결할 웹후크를 디스코드 서버에서 생성하고 웹후크 주소를 코드에 작성해 줍니다.(이 주소가 없으면 서버에서 메세지를 보낼 수 없습니다.)

## Google Cloud Platform 사용법
구글 클라우드에 도커 이미지를 올릴 컴퓨트엔진을 작성하고 그 컴퓨트 엔진에 MySQL을 생성하고 그 ip주소에 맞춰서 config에 작성해주면됩니다.

또 다른 방법으로는 Google Cloud SQL과 컴퓨트 엔진을 연결하고 Google Cloud Sql Proxy를 통해 연결을 구성하고 그 환경에 맞춰서 Google Cloud Platform에서 연결 설정을 다시 해주시면 됩니다.

현재 올라가 있는 패키지는 Google Cloud SQL과 별도로 연결된 도커 이미지입니다.

## 도커 사용법

도커에서 실행하는 방법으로는 MySQL을 추가해서 도커 이미지를 다시 만들서 사용하시면 됩니다.

