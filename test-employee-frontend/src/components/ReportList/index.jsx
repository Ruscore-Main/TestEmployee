import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTestResultsReport, setCurrentReportPage } from '../../redux/slices/reportSlice';
import Pagination from 'components/Pagination';
import { Table } from 'react-bootstrap';
import SortPopup from 'components/SortPopup';
import s from './ReportList.module.scss';
import Chart from 'components/Chart';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuth } from 'hooks/useAuth';

const ReportList = () => {
  const { status, items, currentPage, amountPages, sortBy } = useSelector(({ reports }) => reports);
  const { role } = useAuth();
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  const [averageBall, setAverageBall] = useState(0);

  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape' });
      pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save('download.pdf');
    });
  };

  const updateTable = () => {
    dispatch(
      getTestResultsReport({
        sortBy,
        currentPage,
      }),
    ).then((res) => {
      console.log('ress -==', res);
      if (res.payload?.items) {
        const result = res.payload.items;
        setChartData([
          result.filter((el) => (el.countTrueAnswers / el.countQuestions) * 100 < 20).length,
          result.filter(
            (el) =>
              (el.countTrueAnswers / el.countQuestions) * 100 >= 20 &&
              (el.countTrueAnswers / el.countQuestions) * 100 < 40,
          ).length,
          result.filter(
            (el) =>
              (el.countTrueAnswers / el.countQuestions) * 100 >= 40 &&
              (el.countTrueAnswers / el.countQuestions) * 100 < 60,
          ).length,
          result.filter(
            (el) =>
              (el.countTrueAnswers / el.countQuestions) * 100 >= 60 &&
              (el.countTrueAnswers / el.countQuestions) * 100 < 80,
          ).length,
          result.filter(
            (el) =>
              (el.countTrueAnswers / el.countQuestions) * 100 >= 80 &&
              (el.countTrueAnswers / el.countQuestions) * 100 <= 100,
          ).length,
        ]);
        const balls = result.map((el) => (el.countTrueAnswers / el.countQuestions) * 100);
        setAverageBall(balls.reduce((sum, el) => sum + el, 0) / balls.length);
      }
    });
  };

  React.useEffect(() => {
    updateTable();
  }, [sortBy, currentPage]);

  if (role == 'Director') {
    return (
      <div>
        <button className="button" onClick={printDocument}>
          Скачать
        </button>
        <div id="divToPrint">
          <br />
          <h4>Средний процент выполнения: {averageBall.toFixed(2)}%</h4>
          <Chart chartData={chartData} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Список отчетов</h2>
      <div className={s.sort}>
        <SortPopup />
      </div>

      <Table hover responsive striped className="mt-2 mb-4">
        <thead>
          <tr>
            <th>#</th>
            <th>ID пользователя</th>
            <th>Стаж работы (в месяцах)</th>
            <th>Название теста</th>
            <th>Затраченное время</th>
            <th>Кол-во верных ответов</th>
            <th>Кол-во вопросов</th>
            <th>% верности решения</th>
            <th>Дата прохождения</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {status === 'success' ? (
            items.map((testResult) => (
              <tr key={testResult.id}>
                <td>{testResult.id}</td>
                <td>{testResult.userId}</td>
                <td>{testResult.workExperience}</td>
                <td>{testResult.testName}</td>
                <td>{testResult.timeSpent}</td>
                <td>{testResult.countTrueAnswers}</td>
                <td>{testResult.countQuestions}</td>
                <td>
                  {Math.floor((testResult.countTrueAnswers / testResult.countQuestions) * 100)}%
                </td>
                <td>{new Date(testResult.datePassing).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          )}
        </tbody>
      </Table>
      {amountPages < 2 || (
        <Pagination
          currentPage={currentPage}
          amountPages={amountPages}
          setCurrentPage={(page) => dispatch(setCurrentReportPage(page))}
        />
      )}
      {status === 'success' ? (
        <>
          <button className="button" onClick={printDocument}>
            Отправить отчет
          </button>
          <div id="divToPrint">
            <br />
            <h4>Средний процент выполнения: {averageBall.toFixed(2)}%</h4>
            <Chart chartData={chartData} />
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default ReportList;
