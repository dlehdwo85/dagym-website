# 문의 접수 설정 — 담당자가 문의를 확인하는 곳

홈페이지 문의폼은 **접수 경로가 설정되어 있을 때만** 신청서를 받습니다.
설정이 없으면 제출 버튼이 비활성화되고 "온라인 상담 접수를 준비하고 있습니다" 안내가 표시됩니다.
전달에 실패하면 방문자에게 오류를 알리고, **"접수 완료"는 실제 전달이 성공했을 때만** 표시됩니다.

| 환경변수 | 설명 |
| --- | --- |
| `CONTACT_WEBHOOK_URL` | 신청서를 JSON 으로 POST 할 주소 |
| `RESEND_API_KEY` + `CONTACT_EMAIL_TO` | 이메일로 받기 (Resend). 여러 명이면 쉼표로 구분 |
| `CONTACT_EMAIL_FROM` | (선택) 발신 주소. 도메인 인증 전에는 기본값 사용 |

두 경로를 함께 설정하면 둘 다 전달하고, 하나라도 성공하면 접수된 것으로 처리합니다.

---

## 권장: 구글 시트 + 메일 알림 (Google Apps Script)

신청서가 **구글 시트에 한 줄씩 쌓이고 담당자 메일로 알림**이 오도록 하는 방법을 권장합니다.
담당자는 **구글 시트 「홈페이지 상담 신청」** 과 **메일함**에서 문의를 확인합니다.

1. 구글 드라이브에서 새 스프레드시트 「홈페이지 상담 신청」을 만듭니다.
2. 메뉴 **확장 프로그램 → Apps Script** 를 열고 아래 코드를 붙여 넣습니다. `NOTIFY_TO` 에 담당자 메일을 입력합니다.
3. **배포 → 새 배포 → 유형: 웹 앱**, 실행 권한 "나", 액세스 "모든 사용자"로 배포하고 **웹 앱 URL** 을 복사합니다.
4. 호스팅(Vercel 등) 환경변수에 `CONTACT_WEBHOOK_URL=<웹 앱 URL>` 을 넣고 다시 배포합니다.

```js
const NOTIFY_TO = "담당자@회사메일"; // 알림 받을 메일 (쉼표로 여러 명)

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const l = data.lead;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["접수시각", "상담유형", "회사/단지명", "구분", "담당자", "연락처", "이메일", "지역", "시설", "규모", "문의내용", "처리상태"]);
  }
  sheet.appendRow([l.receivedAt, l.typeLabel, l.organization, l.role, l.name, l.phone, l.email, l.region, (l.facilities || []).join(", "), l.scale, l.message, "신규"]);
  MailApp.sendEmail({ to: NOTIFY_TO, subject: "[홈페이지 운영 상담] " + l.typeLabel + " · " + l.organization, body: data.text, replyTo: l.email });
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

## 설정 확인 방법

1. `https://<사이트주소>/api/contact` 를 브라우저로 열어 `{"ready":true,"channels":["webhook"]}` 인지 확인합니다.
2. 문의 페이지에서 테스트 신청서를 제출합니다.
3. **구글 시트에 새 줄이 생기고, 담당자 메일로 알림이 도착했는지** 확인합니다. 둘 다 확인된 뒤 운영을 시작하세요.

## 개발 중 검증 결과 (로컬)

| 상황 | 결과 |
| --- | --- |
| 접수 경로 없음 | `GET /api/contact` → `ready:false`, 제출 버튼 비활성, `POST` → 503 `not_configured` |
| 웹훅 정상 | 성공 화면 표시, 수신기에 신청서 전체(JSON + 알림 문구) 도착 |
| 웹훅 오류(500) | 오류 문구 표시, 성공 화면 미표시, `POST` → 502 `delivery_failed` |
