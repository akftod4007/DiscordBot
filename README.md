### 디스코드 챗봇 프로젝트

### 프로젝트 소개
도커 이미지와 구글 클라우드 플랫폼을 이용한 디스코드 챗봇을 사용한 일정 관리 시스템

### 구현화면
![image](https://github.com/akftod4007/DiscordBot/assets/113909192/be63fe03-359c-4c7c-a226-58f1f71218eb)



### 프로젝트 구조
![image](https://github.com/akftod4007/DiscordBot/assets/113909192/f5640688-0ba5-43a4-90f7-a67f8b9d942a)

챗봇에서 서버에 RESTful API를 axios를 통해 요청을 보내면 사용자가 입력한 메세지를 통해 정보를 서버에서 저장합니다.

handle는 챗봇의 작동을 담당하는 함수입니다.
utils는 챗봇에 작동에 필요한 함수들을 모듈화해 정리한 폴더입니다.
routes는 서버에서 챗봇에서 입력받은 정보를 저장하고 관리하기 위해 서버 기능을 라우터를 통해서 분리해놓은 폴더입니다.

사용자가 입력한 내용은 handle함수에서 전략패턴을 통해 관리됩니다.

이렇게 작성된 코드를 도커를 사용해서 이미지를 만들어 구글 클라우드 플랫폼에 업로드한 이후 사용 중 입니다.

### 아키택쳐
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

챗봇과 연결될 웹후크를 디스코드 서버에서 생성하고 웹후크 주소를 코드에 작성해 줍니다.(알람이 울릴 때 서버에서 메세지를 전송하게 합니다.

구글 클라우드에 도커 이미지를 올릴 컴퓨트엔진을 작성하고 그 컴퓨트 엔진에 mysql을 생성하고 그 ip주소에 맞춰서 config에 작성해주면됩니다.

### 수정 사항
.env에서 포트번호는 사용자가 원하는 포트번호를 사용해도 상관없습니다.

