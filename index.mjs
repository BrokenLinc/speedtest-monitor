import date from 'date-fns';
import GoogleSpreadsheet from 'google-spreadsheet';
import speedTest from 'speedtest-net';

import credentials from './client_secret.json';

const LOG_SHEET_ID = '1HH1O8yNhS0_Uen7AKHci6zFoJMBd2OU6UnO6MBG5GAo';
const WORKSHEET_ID = 1;
const DATE_FORMAT = 'MM/DD/YYYY H:mm';
const TEST_FREQUENCY = (1000 * 60) * 1; // 10 minutes

const writeToSheet = ({ speeds: { download, upload } }, datetime) => {
  const sheet = new GoogleSpreadsheet(LOG_SHEET_ID);
  sheet.useServiceAccountAuth(credentials, function (err) {
    if(err) console.error(err);
    if(!err) {
      const rowData = {
        datetime: date.format(datetime, DATE_FORMAT),
        download,
        upload,
      };
      sheet.addRow(WORKSHEET_ID, rowData, (err) => {
        if(err) console.error(err);
      });
    }
  });
};

const runTest = () => {
  const datetime = new Date();
  const test = speedTest({maxTime: 5000});

  test.on('data', data => {
    writeToSheet(data, datetime);
  });
};

runTest(); // leading call
setInterval(runTest, TEST_FREQUENCY);