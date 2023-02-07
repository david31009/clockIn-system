# clockIn-system

1. 設計一打卡系統，完成後端 server 和資料庫，使能透過 API 進行系統操作，假想有一
   前端呼叫這些 API
2. 用 member.json 作為員工出勤資料，按需求設計資料庫存放

- 此資料集包含員工工號、日期、上班時間、下班時間

## Table of Contents

- [API 文件](#api-文件)
- [Database Table Schema](#database-table-schema)
- [API 的設計與說明](#api-的設計與說明)
- [專案部屬方式](#專案部屬方式)

## API 文件

- 請參閱 api_doc.json
- 抑或查閱: https://app.swaggerhub.com/apis/david31009/clockIn-system/1.0.0

## Database Table Schema

- 查看題目所需的六支 API，將資料匯入同一張表，更能方便查詢。
- 初始資料 (member.json) 因部分 key 的名稱未統一，需先經過資料清理，才能導入資料庫。
- 因員工每日打卡只會有一筆紀錄，故將員工工號與日期設定為聯合主鍵，方便快速查詢。

<div align="center">
<img width="90%" alt="System Architecture" src="https://i.imgur.com/Nv3MRcp.png"/>
</div>

## API 的設計與說明

- 打卡與補打卡功能 (Clock)

  1. 打卡: (POST): https://appworks.online/api/1.0/clock 上班打卡與下班打卡為同一支 API。

  2. 補打卡: (POST): https://appworks.online/api/1.0/clock/makeup 針對上班未打卡的員工，可於下班進行補打卡，補打卡的時間將記錄於下班時間

- 列出員工出席資訊 (Attendance)

  3. 當日員工出席資訊: (GET): https://appworks.online/api/1.0/attendance/today

     - 其資訊須包含員工工號、上班時間、下班時間、休息時間、總工時。休息時間計算方時為: 若上班與下班時間包含完整休息時間，則以 1.5 紀錄，否則回傳 null。
     - 總工時為 `下班時間 - 上班時間`，以小時計算，四捨五入至小數點第一位。

  4. 指定日期員工出席資訊: (GET): https://appworks.online/api/1.0/attendance?date=2022-01-03 其 API 為 query string 設計，需輸入指定日期 (date) `YYYY-MM-DD` 或 `YYYYMMDD` 格式。

- 列出員工清單 (Employee)

  5. 指定日期，最早打卡的前五位員工清單: (GET) https://appworks.online/api/1.0/employee/firstFive?date=2022-01-03 其 API 為 query string 設計，需輸入指定日期 (date) `YYYY-MM-DD` 或 `YYYYMMDD` 格式。

  6. 指定日期區間，未打卡下班的員工清單: (GET) https://appworks.online/api/1.0/employee/noClockOut?dateFrom=2022-01-03&dateTo=2022-01-30 其 API 為 query string 設計，需輸入起始日期 (dateFrom) 與結束日期 (dateTo)，日期格式為 `YYYY-MM-DD` 或 `YYYYMMDD` 格式。

## 專案部屬方式

- 於 AWS 上開一台 EC2 的機器，其機器規格為 t2.micro。
- 將 clockIn-system 專案從 GitHub clone 於開好的 EC2 中。
- 架設所需的 Node.js 環境，及 MySQL 資料庫。
- 使用 AWS Elastic IP 服務，可讓 server 擁有固定的 IP 位址。
- 使用 PM2 套件，使專案能在背景中持續執行。
- 於 GoDaddy 購買域名，將域名指向 server 的 IP 位址。
- 於 ZeroSSL 申請 SSL certificate，使 server 成為 https 的安全網站。
- 利用 NGINX 作為 web server 反向代理，當有 http 請求時，自動綁定 80 port，經由 308 轉址至 https，然後導向 clockIn-system 的 server；當有 https 請求時，自動綁定 443 port，然後導向 clockIn-system 的 server。
