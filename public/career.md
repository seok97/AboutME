## TA (Target Advisor)

> 프로젝트명 : TA
> 진행 기간 : 2025.03.10 ~ 진행중
> 발주 기관 : LG CNS
> 주요 역할 : google cloud platform 환경에서 was, airflow 구축 및 개발
> 기술 스택 : Spring Boot, Airflow, Docker, Google BigQuery, PostgreSQL, Google Cloud

### 업무 성과
- **Spring boot 프레임워크 구축**
  - Simba Google BigQuery JDBC 드라이버 적용 및 빅쿼리 실행 로직 개발
  - 다중 Datasource 설정 (PostgreSQL, BigQuery)
- **타 협력사 개발 지원 - LG 자체 spring 기반 프레임워크**
  - LG 자체 개발 프레임워크로 개발된 was 프로젝트에 기술지원을 하였다.
  - Simba Google BigQuery JDBC 설정, 샘플 추가
  - Google Cloud Storage 관련 기능 설정, 샘플 추가
- **Airflow 개발**
  - 배치/실시간 작업 요청 수행 airflow 설계 및 개발
  - 일일 빅쿼리 수행 dag 개발
  - 분단위 작업체크(Postgresql DB) 후 빅쿼리 수행 dag 개발
- **동시성 이슈 해결**
  - 프로세스가 동시에 병렬로 처리되어 발생한 이슈
    - 하나의 빅쿼리 테이블에 delete, update, insert 쿼리가 동시에 실행되어 충돌이 발생
      - 해결
        - 큐 방식으로 순차처리하는 google cloud tasks 를 사용해 해당 DML 처리 시 cloud tasks 를 통해 실행하도록 하여 직렬화 후 순서대로 처리하도록 하였다.
        - 이를 위해 다음과 같이 흐름을 수정하였다.
        - 흐름
          - airflow -> cloud run A (기존 airflow 주요 프로세스) -> 충돌 위험이 있는 DML 처리시 cloud tasks 로 요청 후 pub/sub 메세지 풀링 -> cloud run (빅쿼리 실행만 하는 서비스로 결과를 pub/sub 으로 push) -> cloud run A 에서 결과를 받고 다음 로직 실행

### 회고
- 기존 airflow 에서 실행하던 빅쿼리 실행 로직 일부분을 cloud run 서비스로 마이그레이션 하기위해 cloud run, cloud tasks, pub/sub 등의 환경을 세팅하는데 많은 시행착오를 겪어서 고생했지만, 그만큼 경험을 얻었기 때문에 다른 클라우드를 사용할때 비교적 빠르게 해결 할 수 있을 것 같다.

---

## DMP (데이터 매니지먼트 플랫폼)

> 프로젝트명 : LG DMP 고도화
> 진행 기간 : 2024.12.18 ~ 2025.02.25
> 발주 기관 : LG CNS
> 주요 역할 : DMP 고도화 백엔드 개발
> 기술 스택 : Spring Boot, REST API

### 업무 성과
- **spring boot API 개발**
  - 오디언스 생성 요청 API
  - 오디언스 수정 API
  - 유닛 카테고리 조회 API
  - 유사 오디언스 목록조회 API

---

## 기업인터넷포털 Bizon

> 프로젝트명 : LG 유플러스 Bizon 프로젝트
> 진행 기간 : 2024.10.14 ~ 2024.12.16
> 발주 기관 : LG 유플러스
> 주요 역할 : Bizon 백엔드 API 개발
> 기술 스택 : Spring Boot, REST API, Batch

### 업무 성과
- **백엔드 API 개발**
  - 마이페이지 조회 API
  - 약관 목록, 상세 조회 / 등록, 수정 API 개발
  - 고객만족도 평가 통계 조회 API 개발
  - 고객만족도 평가 주관식 목록, 상세 조회 API 개발
  - 회원정보 목록, 상세 조회 / 수정 API 개발
  - 가입 회원 정보 업데이트 및 해지고객 개인정보 파기 배치 개발

---

## UFMS 차량통제 시스템

> 프로젝트명 : LG 유플러스 UFMS 프로젝트
> 진행 기간 : 2024.06.24 ~ 2024.09.27
> 발주 기관 : LG 유플러스
> 주요 역할 : 기존 apollo, graphql API 서버 spring boot 로 이전 및 코드 리팩토링 / 쿼리 튜닝
> 기술 스택 : Spring Boot, GraphQL, Apollo Server, Query Tuning

### 업무 성과
- **시스템 전환 및 최적화**
  - auth, business 모듈 소스 spring boot 로 이전 및 코드 리팩토링
- **기존 쿼리 튜닝**
  - 서브쿼리 제거, count 조회 쿼리 분리
- **기존 node 서버 spring boot 전환**
  - 회원가입, 로그인, 토큰발행, SMS발송 API 전환

---

## FMS 차량통제 시스템

> 프로젝트명 : 엘지 유플러스 FMS 프로젝트
> 진행 기간 : 2024.04.05 ~ 2024.06.20
> 발주 기관 : LG 유플러스
> 주요 역할 : apollo, graphQL 서비스 api 검증테스트 및 유효성 검사 로직 추가
> 기술 스택 : Apollo Server, GraphQL, API Validation

### 업무 성과
- **API 검증 및 유효성 검사**
  - apollo 서버 auth, business 서비스 API 파라미터 유효성 검사 로직 추가

---

## 유플러스 추천플랫폼 전환

> 진행 기간 : 2023.09.18 ~ 2024.02.20
> 발주 기관 : LG 유플러스
> 주요 역할 : airflow DAG - 기존 RDB(mysql)에서 빅쿼리 이전 작업
> 기술 스택 : Airflow, BigQuery, MySQL, Performance Tuning

### 업무 성과
- **플랫폼 전환 및 성능 개선**
  - 하둡 시스템 -> airflow 전환
  - 기존 쿼리 성능 개선

---

## 상품출시지원 시스템

> 진행 기간 : 2023.05.16 ~ 2023.09.14
> 발주 기관 : LG 유플러스
> 주요 역할 : 상품출시지원 시스템 화면 개발
> 기술 스택 : Vue.js, Frontend

### 업무 성과
- **상품출시를 위한 사이트 Vue 화면 개발**
  - 프로젝트 생성/협업세팅 화면 개발
  - 메인 - 나의 프로젝트 목록 그리드 개발
  - 공지사항 팝업 개발
  - 프로젝트 조회 화면 개발
  - 리드타임 목록 조회 화면 개발

---

## 정보계현행화

> 진행 기간 : 2023.02.15 ~ 2023.03.11
> 발주 기관 : LG 유플러스
> 주요 역할 : kafka 수집 데이터 파싱 로직 구현
> 기술 스택 : Kafka, Data Parsing, Excel

### 업무 성과
- **데이터 처리 시스템 개발**
  - kafka 수집 데이터를 파싱 하여 DB등록하는 api 개발
  - 업로드한 엑셀파일을 읽고 DB등록하는 api 개발

---

## 서빙로봇 API 개발

> 진행 기간 : 2023.01.11 ~ 2023.05.11
> 발주 기관 : LG 유플러스
> 주요 역할 : 서빙로봇 앱 api 개발
> 기술 스택 : REST API, Mobile App

### 업무 성과
- **모바일 API 개발**
  - 서빙로봇 목록 조회 api 구현
  - 로봇 상세 정보 조회 api 구현
  - 마이페이지 api 구현

---

## 데이터레이크 포탈 (2차)

> 진행 기간 : 2022.05.01 ~ 2022.11.01 (6개월)
> 발주 기관 : LG CNS
> 주요 역할 : 데이터레이크 포털 - api 개발
> 기술 스택 : Big Data, Portal, Workflow

### 업무 성과
- **데이터레이크 포털 2차 api 추가개발 및 고도화**
  - 메일 템플릿 및 발송 api
  - 분석모형 운영이관 api 구현
  - 대외비데이터 권한 결재 요청/승인/반려 api 구현

---

## 데이터레이크 포탈 (1차)

> 진행 기간 : 2021.11.15 ~ 2022.04.27 (6개월)
> 발주 기관 : LG CNS
> 주요 역할 : 데이터레이크 포털 - api 개발
> 기술 스택 : Big Data, Portal, Sandbox

### 업무 성과
- **빅데이터 분석을 위한 분석환경 구축 포털 데이터레이크 포털 api 개발**
  - 분석과제 목록/상세 조회 및 검색 api 구현
  - 분석과제 임시저장/등록/수정/삭제 api 구현
  - 샌드박스 생성 요청 및 멤버등록/수정/삭제 api 구현
  - 운영자 요청 등록/승인/반려 api 구현
  - 결재 요청/승인/반려 api 구현
